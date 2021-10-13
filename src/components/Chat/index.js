import React, { useEffect, useState } from "react";
import { utils } from "../MakeCall/Utils";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import {
  FiMic,
  FiMicOff,
  FiPause,
  FiPlay,
  FiVideo,
  FiVideoOff,
  FiMonitor,
  FiTv,
  FiSettings,
  FiPhoneOff,
  FiAlertCircle,
  FiMaximize,
  FiMessageSquare,
  FiMinimize,
  FiUsers,
} from "react-icons/fi";


import RemoteParticipantCard from "../MakeCall/RemoteParticipantCard";

import { getCurrentUser } from "../../utils/user";
import VideoModal from "./VideoModal";
import {
  ChatClient,
  ChatThreadClient,
  ChatParticipant,
  CreateChatThreadResult,
} from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

import MakeCall from "../MakeCall/MakeCall";
import ConversationHeader from "@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader";

let sendMessage;

const Chat = (props) => {
  let initialState = {
    chatClienta: null,
    userIdentity: null,
    senderDisplayName: null,
    accessToken: null,
    acsEndpoint: "https://vcatadevcommnicationserveus.communication.azure.com",
    chats: [],
  };

  const [state, setstate] = useState(initialState);
  const [conversation, setConversation] = useState([]);

  const [isFullScreen, setFullScreen] = useState(false);
  const [isChatHidden, setChatHidden] = useState(false);
  const [isParticipantsHidden, setParticipantsHidden] = useState(true);
  const [isPopUpShown, setPopUpShown] = useState(false);

  const [showSettings, setShowSettings] = useState();
  const [isCameraOn, setCameraOn] = useState();
  const [isMicOn, setMicOn] = useState(false);
  const [isScreenShared, setScreenShared] = useState();
  const [isCallPaused, setCallPaused] = useState();
  const [isCallConnected, setCallConnected] = useState();

  const [callOptions, setCallOptions] = useState({isCameraOn, isMicOn, isScreenShared, isCallPaused, isCallConnected});

  const [userIdentity, setUserIdentity] = useState();
  const [accessToken, setAccessToken] = useState();

  const [remoteParticipants, setRemoteParticipants] = useState([]);
  const [call, setCall] = useState();

  useEffect(() => {
    setCallOptions({
      isCameraOn, isMicOn, isScreenShared, isCallPaused, isCallConnected, showSettings
    })
  }, [isCameraOn, isMicOn, isScreenShared, isCallPaused, isCallConnected, showSettings])

  const handleFullScreen = () => {
    let elem = document.getElementById("event-container-box");
    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => {
          setFullScreen(true);
        })
        .catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  const handleChatToggle = () => {
    setChatHidden(!isChatHidden);
  };

  const handlePopUpToggle = () => {
    setPopUpShown(!isPopUpShown);
  };

  const handleParticipantsToggle = () => {
    setParticipantsHidden(!isParticipantsHidden);
  };

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings);
  };

  const handleScreenShareToggle = () => {
    setScreenShared(!isScreenShared);
  };

  const handleCallConnectionToggle = () => {
    setCallConnected(!isCallConnected);
  };

  const handleMicToggle = () => {
    setMicOn(!isMicOn);
  }

  const onCallSettingsChanged = (newCallSettings) => {
    console.log("Call Settings Changed", newCallSettings);

    setMicOn(newCallSettings.isMicOn);
    setScreenShared(newCallSettings.isScreenShared);
  }

  const handleCall = (call) => {
    console.log("Call Remote Participants :::::::::::::::", call.remoteParticipants);
    setCall(call);
    setRemoteParticipants(call.remoteParticipants);
  }

  useEffect(() => {
    provisionNewUser();
  }, []);

  useEffect(() => {
    if (state.userIdentity != null) {
      init();
      console.log("User Identity", state.userIdentity);
    }
  }, [state.userIdentity]);

  const provisionNewUser = async () => {
    try {
      let userDetailsResponse = await utils.provisionNewUser();
      setstate({
        ...state,
        userIdentity: userDetailsResponse.user.communicationUserId,
        accessToken: userDetailsResponse.token,
      });
      setUserIdentity(userDetailsResponse.user.communicationUserId);
      setAccessToken(userDetailsResponse.token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("User Identity :::::::::::", userIdentity);
    console.log("Access Token ::::::::::", accessToken);
  }, [userIdentity, accessToken]);

  const init = async () => {
    const tokenCredential = new AzureCommunicationTokenCredential(
      state.accessToken
    );
    let chatClients = new ChatClient(
      "https://vcatadevcommnicationserveus.communication.azure.com",
      tokenCredential
    );
    setstate({ ...state, chatClienta: chatClients });

    const chatThreadId =
      "19:ss2ay1KPqhc9jYiX2ciLR2HxhTSyhbGerTP2G-iRt481@thread.v2";

    let threadClient = await chatClients.getChatThreadClient(chatThreadId);

    const participants = await threadClient.listParticipants();

    console.log("Participants  :::: ", participants);
    console.log("Participants  :::: ", threadClient);

    await chatClients.startRealtimeNotifications();

    sendMessage = async (message) => {
      try {
        await threadClient.sendMessage({
          content: message,
          senderDisplayName: "Anonymous User",
        });
      } catch (error) {
        console.error("Send Message", error.message);
      }
    };

    console.log(chatClients);
    setstate({ ...state, threadClient, chatThreadId });
    chatClients.on("chatMessageReceived", (message) => {
      console.log("Msg :::::::::", message);
      conversation.push(message);
      setConversation([...conversation]);
      // const newConversation = [...conversation];
      // newConversation.push(message);
      // setConversation(newConversation);
    });
  };

  useEffect(() => {
    console.log("New msg Received", conversation);
  }, [conversation]);

  console.log("Conversation count", conversation.length);

  return (
    <div className="event-container" id="event-container-box">
      <div
        className={`event-participants-container ${
          isParticipantsHidden ? "participants-hidden" : ""
        }`}
      >
        {call && <h3> Participants ({remoteParticipants.length}) </h3>}
        <ul className="participants-panel-list">
          {remoteParticipants.map((remoteParticipant) => (
            <RemoteParticipantCard
              key={`${utils.getIdentifierText(
                remoteParticipant.identifier
              )}`}
              remoteParticipant={remoteParticipant}
              call={call}
            />
          ))}
        </ul>
      </div>
      <div className="event-video-container">
        {/* <video style={{ height: "100%" }} autoPlay preload>
            <source
              src="https://www.w3schools.com/tags/movie.mp4"
              type="video/mp4"
            />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video> */}
        {userIdentity && accessToken && (
          <MakeCall
            userIdentity={userIdentity}
            accessToken={accessToken}
            callSettings={callOptions}
            onCallChange={handleCall}
            onCallSettingsChanged={onCallSettingsChanged}
          />
        )}
        {/* <EventVideo /> */}
        <VideoModal show={isPopUpShown} onClose={handlePopUpToggle} />
        <div className="video-controls-container">
          <div className="video-controls-left">
            <button onClick={handleParticipantsToggle}>
              <FiUsers />
            </button>
            <button onClick={handlePopUpToggle}>
              <FiAlertCircle />
            </button>
            <button onClick={handleSettingsToggle}>
              <FiSettings />
            </button>
          </div>
          <div className="video-controls-right">
            <button title="Camera">
              {isCameraOn ? <FiVideo /> : <FiVideoOff />}
            </button>
            <button title="Microphone" onClick={handleMicToggle}>
              {isMicOn ? <FiMic /> : <FiMicOff />}
            </button>
            <button title="Play / Pause">
              {isCallPaused ? <FiPlay /> : <FiPause />}
            </button>
            <button title="Screen Share" onClick={handleScreenShareToggle}>
              {isScreenShared ? <FiTv /> : <FiMonitor />}
            </button>
            <button title="Disconnect Call" onClick={handleCallConnectionToggle}>
              {isCallConnected ? <FiPhoneOff /> : <FiPhoneOff />}
            </button>
            <button title="Change Fullscreen" onClick={handleFullScreen}>
              {isFullScreen ? <FiMinimize /> : <FiMaximize />}
            </button>
            <button onClick={handleChatToggle}>
              {isChatHidden ? <FiMessageSquare /> : <FiMessageSquare />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`event-chat-container ${isChatHidden ? "chat-hidden" : ""}`}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                  position: "last",
                }}
              >
                <Avatar
                  src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
                  name={"Zoe"}
                  size="md"
                />
              </Message>
              <Message
                model={{
                  message: "Hello",
                  sentTime: "just now",
                  sender: "Ramesh",
                  direction: "outgoing",
                  position: "last",
                }}
              />
            </MessageList>
            <MessageInput placeholder="Type message here">
              <Avatar
                src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
                name={"Zoe"}
                size="l"
              />
            </MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chat;
