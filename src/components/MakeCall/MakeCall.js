import React, { useEffect, useState } from "react";
import { CallClient, LocalVideoStream } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import {  TextField } from "office-ui-fabric-react";
import CallCard from "../MakeCall/CallCard";
import { setLogLevel } from "@azure/logger";
import { utils } from "./Utils";
import { getCurrentUser } from "../../utils/user";

const MakeCall = ({ userIdentity, accessToken, callSettings, onCallSettingsChanged, onCallChange}) => {

  console.log("Makecall Props ", userIdentity, accessToken)

  const [callClient, setCallClient] = useState();
  const [callAgent, setCallAgent] = useState();
  const [deviceManager , setDeviceManager] = useState();


  const [disName, setDisName] = useState();
  const [id, setId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [call, setCall] = useState();
  const [incomingCall, setIncomingCall] = useState()
  const [selectedCameraDeviceId, setSelectedCameraDeviceId] = useState(null);
  const [selectedSpeakerDeviceId, setSelectedSpeakerDeviceId] = useState(null);
  const [selectedMicrophoneDeviceId, setSelectedMicrophoneDeviceId] = useState(null);
  
  const [cameraDeviceOptions, setCameraDeviceOption] = useState();
  const [speakerDeviceOptions, setSpeakerDeviceOption] = useState();
  const [microphoneDeviceOptions, setMicrophoneDeviceOptions] = useState();

  const [callError, setCallError] = useState(null);

  const [showSpinner, setShowSpinner] = useState(false);
  const [disableInitializeButton, setDisableInitializationButton] = useState();


  const [destinationUserIds, setDestinationUserIds] = useState(null);
  const [destinationPhoneIds, setDestinationPhoneIds] = useState(null);

  /* Device unavailability Warnings */

  const [showCameraNotFoundWarning, setCameraNotFoundWarning] = useState();
  const [showMicrophoneNotFoundWarning, setMicrophoneNotFoundWarning] = useState();
  const [showSpeakerNotFoundWarning, setSpeakerNotFoundWarning] = useState();


  const [deviceManagerWarning, setDeviceManagerWarning] = useState();


  const requestPermission = async (deviceManager) => {
    await deviceManager.askDevicePermission({ audio: true });
    await deviceManager.askDevicePermission({ video: true });
  }


  useEffect(() => {
    if(deviceManager !== undefined) {
      requestPermission(deviceManager)
        .then(() => {
          console.log("Both permission provided");
        })
    }
  }, [deviceManager])

  useEffect(() => {
    console.log("Call Options :::::::::::::::::: %j", callSettings);
    if(call) {
      if(callSettings.isMicOn) 
        call.unmute();
      else
        call.mute();
      
      if(callSettings.isScreenShared)
        call.startScreenSharing();
      else
        call.stopScreenSharing();

      if(callSettings.isCallConnected === false) {
        call.hangUp();
      }

    }
  }, [callSettings])

  useEffect(() => {
    if(call) {
      console.log("Call ", call);
      call.on("isMutedChanged", () => onCallSettingsChanged({ ...callSettings, isMicOn: !call.isMuted }));
      call.on("isScreenSharingOnChanged", () => {onCallSettingsChanged({ ...callSettings, isScreenShared: call.isScreenShareOn })});
      call.on("remoteParticipantsUpdated", () => onCallChange(call))
    }
  }, [call])

  useEffect(() => {
    if(callAgent) {
      callAgent.on("callsUpdated", (e) => {
        console.log(`callsUpdated, added=${e.added}, removed=${e.removed}`);

        e.added.forEach((call) => {
          setCall(call);
        });

        e.removed.forEach((call) => {
          if (call && call === call) {
            displayCallEndReason(call.callEndReason);
          }
        });
      });
      callAgent.on("incomingCall", (args) => {
        const incomingCall = args.incomingCall;
        if (call) {
          incomingCall.reject();
          return;
        }

        setIncomingCall(incomingCall);

        incomingCall.on("callEnded", (args) => {
          displayCallEndReason(args.callEndReason);
        });
      });
    }
  },[callAgent])


  let destinationGroup


  const provisionNewUser = async () => {
    try {
      const currentUser = getCurrentUser();
      const userDetailsResponse = await utils.provisionNewUser();

      setShowSpinner(true);
      setDisableInitializationButton(true);
      setId(utils.getIdentifierText(userDetailsResponse.user));

      await handleLogIn({
        id: userIdentity,
        token: accessToken,
        displayName: currentUser? currentUser.firstName : 'Anonymous',
      });

      setLoggedIn(true);
      return userDetailsResponse;
    } catch (error) {
      console.log(error);
    } finally {
      setDisableInitializationButton(false);
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    console.log("This is called 23313", call, !loggedIn);
    if(!call && loggedIn) {
      console.log("############  Joining Call #############")
      joinGroup(true);
    }
  },[call, loggedIn]);

  useEffect(() => {
    console.log("Provisional User Called")
    provisionNewUser()
    .then((data) => {
      console.log("Provisional User from Make Calls", data);
    })
  },[])

  const handleLogIn = async (userDetails) => {
    console.log("Handle Login", userDetails)
    if (userDetails) {
      try {
        const tokenCredential = new AzureCommunicationTokenCredential(userDetails.token);
        console.log("tokenCredential", tokenCredential);
        setLogLevel("verbose");
        const callClient = new CallClient();
        setCallClient(callClient);
        console.log("Call Client");
        console.log("Call Client" +  callClient);
        const callAgent = await callClient.createCallAgent(
          tokenCredential,
          { displayName: userDetails.displayName }
        );
        console.log("Call Agent", callAgent)
        setCallAgent(callAgent);
        window.callAgent = callAgent;
        const deviceManager = await callClient.getDeviceManager();
        setDeviceManager(deviceManager);
        setLoggedIn(true);
        setDisName(userDetails.displayName)
        joinGroup(true);
      } catch (e) {
        console.error("Error", e);
      }
    }
  };

  const displayCallEndReason = (callEndReason) => {
    if (callEndReason.code !== 0 || callEndReason.subCode !== 0) {
      setCallError(`Call end reason: code: ${callEndReason.code}, subcode: ${callEndReason.subCode}`)
    }
    setCall(null);
    setIncomingCall(null)
  };

  const joinGroup = async (withVideo) => {
    try {
      console.log("Call Agent join Call::::::::::::::::",callAgent)
      if(callAgent) {
        const callOptions = await getCallOptions(withVideo);
        callAgent.join(
          { groupId: '29228d3e-040e-4656-a70e-890ab4e173e5' },
          callOptions
        );
      }
    } catch (e) {
      console.error("Failed to join a call", e);
      setCallError("Failed to join a call: " + e);
    }
  };

   const getCallOptions = async (withVideo) => {
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
    if(deviceManager) {
      requestPermission(deviceManager)
      const cameras = await deviceManager.getCameras();
      const cameraDevice = cameras[0];
      if (cameraDevice && cameraDevice?.id !== "camera:") {
        setSelectedCameraDeviceId(cameraDevice?.id);
        setCameraDeviceOption(cameras.map((camera) => {
          return { key: camera.id, text: camera.name };
        }));
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
        const speakers = await deviceManager.getSpeakers();
        const speakerDevice = speakers[0];
        if (!speakerDevice || speakerDevice.id === "speaker:") {
          throw new Error("No speaker devices found.");
        } else if (speakerDevice) {
          setSelectedSpeakerDeviceId(speakerDevice.id);
          setSpeakerDeviceOption(speakers.map((speaker) => {
            return { key: speaker.id, text: speaker.name };
          }));
          await deviceManager.selectSpeaker(speakerDevice);
        }
      } catch (e) {
        speakerWarning = e.message;
      }

      try {
        const microphones = await deviceManager.getMicrophones();
        const microphoneDevice = microphones[0];
        if (!microphoneDevice || microphoneDevice.id === "microphone:") {
          throw new Error("No microphone devices found.");
        } else {
          setSelectedMicrophoneDeviceId(microphoneDevice.id)
          setMicrophoneDeviceOptions(microphones.map((microphone) => {
            return { key: microphone.id, text: microphone.name };
          }));
          await deviceManager.selectMicrophone(microphoneDevice);
        }
      } catch (e) {
        microphoneWarning = e.message;
      }
    }

      if (cameraWarning || speakerWarning || microphoneWarning) {
        setDeviceManagerWarning(`${cameraWarning ? cameraWarning + " " : ""}
        ${speakerWarning ? speakerWarning + " " : ""}
        ${microphoneWarning ? microphoneWarning + " " : ""}`);
      }

    return callOptions;
  }


    // TODO: Create section component. Couldnt use the ExampleCard compoenent from uifabric becuase its buggy,
    //       when toggling their show/hide code functionality, videos dissapear from DOM.

    return (
      <div>
        {!incomingCall && !call && (
          <div className="ms-Grid-row mt-3">
            <div className="call-input-panel mb-5 ms-Grid-col ms-sm12 ms-lg12 ms-xl12 ms-xxl4">
              <input
                className="mb-3"
                disabled={call || !loggedIn}
                label="Group Id"
                placeholder="29228d3e-040e-4656-a70e-890ab4e173e5"
                defaultValue="29228d3e-040e-4656-a70e-890ab4e173e5"
                onChange={(e) => { destinationGroup = e.target.value } }
              />{" "}
              <br />
              <button
                className="primary-button"
                text="Join"
                disabled={call || !loggedIn}
                onClick={() => joinGroup(true)}>Join</button>
            </div>
          </div>
        )}
        {call && (
          <CallCard
            call={call}
            deviceManager={deviceManager}
            showSettings={callSettings.showSettings}
            selectedCameraDeviceId={selectedCameraDeviceId}
            cameraDeviceOptions={cameraDeviceOptions}
            speakerDeviceOptions={speakerDeviceOptions}
            microphoneDeviceOptions={microphoneDeviceOptions}
            onShowCameraNotFoundWarning={(show) => {
              setCameraNotFoundWarning(show)
            }}
            onShowSpeakerNotFoundWarning={(show) => {
              setSpeakerNotFoundWarning(show);
            }}
            onShowMicrophoneNotFoundWarning={(show) => {
              setMicrophoneNotFoundWarning(show);
            }}
            disName={disName}
          />
        )}
      </div>
    );
}

export default MakeCall;
