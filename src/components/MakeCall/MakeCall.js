import React from "react";
import { CallClient, LocalVideoStream } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {
  PrimaryButton,
  TextField,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
// import { Icon } from "@fluentui/react/lib/Icon";
import IncomingCallCard from "./IncomingCallCard";
import CallCard from "../MakeCall/CallCard";
import Login from "./Login";
import { setLogLevel } from "@azure/logger";

export default class MakeCall extends React.Component {
  constructor(props) {
    super(props);
    this.callClient = null;
    this.callAgent = null;
    this.deviceManager = null;
    this.destinationUserIds = null;
    this.destinationPhoneIds = null;
    this.destinationGroup = null;
    this.meetingLink = null;
    this.threadId = null;
    this.messageId = null;
    this.organizerId = null;
    this.tenantId = null;
    this.callError = null;

    this.state = {
      disName: undefined,
      id: undefined,
      loggedIn: false,
      call: undefined,
      incomingCall: undefined,
      showCallSampleCode: false,
      showMuteUnmuteSampleCode: false,
      showHoldUnholdCallSampleCode: false,
      selectedCameraDeviceId: null,
      selectedSpeakerDeviceId: null,
      selectedMicrophoneDeviceId: null,
      deviceManagerWarning: null,
      callError: null,
    };
  }

  handleLogIn = async (userDetails) => {
    if (userDetails) {
      try {
        const tokenCredential = new AzureCommunicationTokenCredential(
          userDetails.token
        );
        setLogLevel("verbose");
        this.callClient = new CallClient();
        this.callAgent = await this.callClient.createCallAgent(
          tokenCredential,
          { displayName: userDetails.displayName }
        );
        window.callAgent = this.callAgent;
        this.deviceManager = await this.callClient.getDeviceManager();
        await this.deviceManager.askDevicePermission({ audio: true });
        await this.deviceManager.askDevicePermission({ video: true });

        this.callAgent.on("callsUpdated", (e) => {
          console.log(`callsUpdated, added=${e.added}, removed=${e.removed}`);

          e.added.forEach((call) => {
            this.setState({ call: call });
          });

          e.removed.forEach((call) => {
            if (this.state.call && this.state.call === call) {
              this.displayCallEndReason(this.state.call.callEndReason);
            }
          });
        });
        this.callAgent.on("incomingCall", (args) => {
          const incomingCall = args.incomingCall;
          if (this.state.call) {
            incomingCall.reject();
            return;
          }

          this.setState({ incomingCall: incomingCall });

          incomingCall.on("callEnded", (args) => {
            this.displayCallEndReason(args.callEndReason);
          });
        });

        this.setState({ loggedIn: true });
        this.setState({ disName: userDetails.displayName });
        this.joinGroup(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  displayCallEndReason = (callEndReason) => {
    if (callEndReason.code !== 0 || callEndReason.subCode !== 0) {
      this.setState({
        callError: `Call end reason: code: ${callEndReason.code}, subcode: ${callEndReason.subCode}`,
      });
    }

    this.setState({ call: null, incomingCall: null });
  };

  placeCall = async (withVideo) => {
    try {
      let identitiesToCall = [];
      const userIdsArray = this.destinationUserIds.value.split(",");
      const phoneIdsArray = this.destinationPhoneIds.value.split(",");

      userIdsArray.forEach((userId, index) => {
        if (userId) {
          userId = userId.trim();
          if (userId === "8:echo123") {
            userId = { id: userId };
          } else {
            userId = { communicationUserId: userId };
          }
          if (
            !identitiesToCall.find((id) => {
              return id === userId;
            })
          ) {
            identitiesToCall.push(userId);
          }
        }
      });

      phoneIdsArray.forEach((phoneNumberId, index) => {
        if (phoneNumberId) {
          phoneNumberId = phoneNumberId.trim();
          phoneNumberId = { phoneNumber: phoneNumberId };
          if (
            !identitiesToCall.find((id) => {
              return id === phoneNumberId;
            })
          ) {
            identitiesToCall.push(phoneNumberId);
          }
        }
      });

      const callOptions = await this.getCallOptions(withVideo);

      if (this.alternateCallerId.value !== "") {
        callOptions.alternateCallerId = {
          phoneNumber: this.alternateCallerId.value.trim(),
        };
      }

      this.callAgent.startCall(identitiesToCall, callOptions);
    } catch (e) {
      console.error("Failed to place a call", e);
      this.setState({ callError: "Failed to place a call: " + e });
    }
  };

  joinGroup = async (withVideo) => {
    try {
      const callOptions = await this.getCallOptions(withVideo);
      this.callAgent.join(
        { groupId: this.destinationGroup.value },
        callOptions
      );
    } catch (e) {
      console.error("Failed to join a call", e);
      this.setState({ callError: "Failed to join a call: " + e });
    }
  };

  joinTeamsMeeting = async (withVideo) => {
    try {
      const callOptions = await this.getCallOptions(withVideo);
      if (
        this.meetingLink.value &&
        !this.messageId.value &&
        !this.threadId.value &&
        this.tenantId &&
        this.organizerId
      ) {
        this.callAgent.join(
          { meetingLink: this.meetingLink.value },
          callOptions
        );
      } else if (
        !this.meetingLink.value &&
        this.messageId.value &&
        this.threadId.value &&
        this.tenantId &&
        this.organizerId
      ) {
        this.callAgent.join(
          {
            messageId: this.messageId.value,
            threadId: this.threadId.value,
            tenantId: this.tenantId.value,
            organizerId: this.organizerId.value,
          },
          callOptions
        );
      } else {
        throw new Error(
          "Please enter Teams meeting link or Teams meeting coordinate"
        );
      }
    } catch (e) {
      console.error("Failed to join teams meeting:", e);
      this.setState({ callError: "Failed to join teams meeting: " + e });
    }
  };

  async getCallOptions(withVideo) {
    let callOptions = {
      videoOptions: {
        localVideoStreams: undefined,
      },
      audioOptions: {
        muted: false,
      },
    };

    let cameraWarning = undefined;
    let speakerWarning = undefined;
    let microphoneWarning = undefined;

    // On iOS, device permissions are lost after a little while, so re-ask for permissions
    await this.deviceManager.askDevicePermission({ video: true });
    await this.deviceManager.askDevicePermission({ audio: true });

    const cameras = await this.deviceManager.getCameras();
    const cameraDevice = cameras[0];
    if (cameraDevice && cameraDevice?.id !== "camera:") {
      this.setState({
        selectedCameraDeviceId: cameraDevice?.id,
        cameraDeviceOptions: cameras.map((camera) => {
          return { key: camera.id, text: camera.name };
        }),
      });
    }
    if (withVideo) {
      try {
        if (!cameraDevice || cameraDevice?.id === "camera:") {
          throw new Error("No camera devices found.");
        } else if (cameraDevice) {
          callOptions.videoOptions = {
            localVideoStreams: [new LocalVideoStream(cameraDevice)],
          };
        }
      } catch (e) {
        cameraWarning = e.message;
      }
    }

    try {
      const speakers = await this.deviceManager.getSpeakers();
      const speakerDevice = speakers[0];
      if (!speakerDevice || speakerDevice.id === "speaker:") {
        throw new Error("No speaker devices found.");
      } else if (speakerDevice) {
        this.setState({
          selectedSpeakerDeviceId: speakerDevice.id,
          speakerDeviceOptions: speakers.map((speaker) => {
            return { key: speaker.id, text: speaker.name };
          }),
        });
        await this.deviceManager.selectSpeaker(speakerDevice);
      }
    } catch (e) {
      speakerWarning = e.message;
    }

    try {
      const microphones = await this.deviceManager.getMicrophones();
      const microphoneDevice = microphones[0];
      if (!microphoneDevice || microphoneDevice.id === "microphone:") {
        throw new Error("No microphone devices found.");
      } else {
        this.setState({
          selectedMicrophoneDeviceId: microphoneDevice.id,
          microphoneDeviceOptions: microphones.map((microphone) => {
            return { key: microphone.id, text: microphone.name };
          }),
        });
        await this.deviceManager.selectMicrophone(microphoneDevice);
      }
    } catch (e) {
      microphoneWarning = e.message;
    }

    if (cameraWarning || speakerWarning || microphoneWarning) {
      this.setState({
        deviceManagerWarning: `${cameraWarning ? cameraWarning + " " : ""}
                    ${speakerWarning ? speakerWarning + " " : ""}
                    ${microphoneWarning ? microphoneWarning + " " : ""}`,
      });
    }

    return callOptions;
  }
  render() {
    const callSampleCode = ``;

    const streamingSampleCode = ``;

    const muteUnmuteSampleCode = ``;

    const holdUnholdSampleCode = ``;

    const deviceManagerSampleCode = ``;

    // TODO: Create section component. Couldnt use the ExampleCard compoenent from uifabric becuase its buggy,
    //       when toggling their show/hide code functionality, videos dissapear from DOM.

    return (
      <div>
        <Login onLoggedIn={this.handleLogIn} />
        <div className="card">
          <div className="ms-Grid">
            {!this.state.incomingCall && !this.state.call && (
              <div className="ms-Grid-row mt-3">
                <div className="call-input-panel mb-5 ms-Grid-col ms-sm12 ms-lg12 ms-xl12 ms-xxl4">
                  {/* <h3 className="mb-1">Group Call</h3>
                  <div>Enter Group id.</div> */}
                  <TextField
                    className="mb-3"
                    disabled={this.state.call || !this.state.loggedIn}
                    label="Group Id"
                    placeholder="29228d3e-040e-4656-a70e-890ab4e173e5"
                    defaultValue="29228d3e-040e-4656-a70e-890ab4e173e5"
                    componentRef={(val) => (this.destinationGroup = val)}
                  />{" "}
                  <br />
                  <PrimaryButton
                    className="primary-button"
                    iconProps={{
                      iconName: "Video",
                      style: { verticalAlign: "middle", fontSize: "large" },
                    }}
                    text="Join"
                    disabled={this.state.call || !this.state.loggedIn}
                    onClick={() => this.joinGroup(true)}></PrimaryButton>
                </div>
              </div>
            )}
            {this.state.call && (
              <CallCard
                call={this.state.call}
                deviceManager={this.deviceManager}
                selectedCameraDeviceId={this.state.selectedCameraDeviceId}
                cameraDeviceOptions={this.state.cameraDeviceOptions}
                speakerDeviceOptions={this.state.speakerDeviceOptions}
                microphoneDeviceOptions={this.state.microphoneDeviceOptions}
                onShowCameraNotFoundWarning={(show) => {
                  this.setState({ showCameraNotFoundWarning: show });
                }}
                onShowSpeakerNotFoundWarning={(show) => {
                  this.setState({ showSpeakerNotFoundWarning: show });
                }}
                onShowMicrophoneNotFoundWarning={(show) => {
                  this.setState({ showMicrophoneNotFoundWarning: show });
                }}
                disName={this.state.disName}
              />
            )}
            {this.state.incomingCall && !this.state.call && (
              <IncomingCallCard
                incomingCall={this.state.incomingCall}
                acceptCallOptions={async () => await this.getCallOptions()}
                acceptCallWithVideoOptions={async () =>
                  await this.getCallOptions(true)
                }
                onReject={() => {
                  this.setState({ incomingCall: undefined });
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
