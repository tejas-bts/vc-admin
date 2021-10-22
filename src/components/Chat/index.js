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
import {addNewUserToChat, listChatParticipants} from '../../services/chat.service';

let sendMessage;

const   Chat = (props) => {
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

  const [draftMessage, setDraftMessage] = useState()

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
    const participants = []
    remoteParticipants.map((item) => {
      participants.push({
        communicationIdentifier: {
          rawId: item.identifier.communicationUserId,
          communicationUser: {
            id: item.identifier.communicationUserId,
          },
        },
        displayName: item.displayName ?? `User${Math.floor(1000 + Math.random() * 9000)}`,
      })
    });

   if(participants.length) {
     addNewUserToChat(participants)
     .then(listChatParticipants)
    }
  }, [remoteParticipants])

  useEffect(() => {
    if (state.userIdentity != null) {
      init();
      console.log("User Identity", state.userIdentity);
    }
  }, [state.userIdentity]);

  const provisionNewUser = async () => {
    try {
      // let userDetailsResponse = await utils.provisionNewUser();
      const commId = '8:acs:2010e5e9-f87e-4595-9261-f0259a17fd5c_0000000d-1a28-b298-ab49-09482200227a';
      // const accessTokenVar = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1Y18wMDAwMDAwZC0xYTI4LWIyOTgtYWI0OS0wOTQ4MjIwMDIyN2EiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQxMzkwNDkiLCJleHAiOjE2MzQyMjU0NDksImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1YyIsImlhdCI6MTYzNDEzOTA0OX0.P3-jLXSisoZ4CEypOvtFhnZQoaMmrr6eufodIKQkjxbayVTOgLCTjwbqcaer-6a28yZteKxKYrUlRZzkPys5Z8_pCX29ewUOAVdsg6DvfxrCZAkdkNVhQeweaIsjyRaRcnYmCxN7_aLDRcerlj0JiLQrHnoidI4esA3xxIFGLosWk8Uk6hw_Fl6DFxW7-fAvlwabCnn-Gb8f-souyt0XEXzWb1EfiSlK88L5kmWh5EscKF4AzU-4g5F5wXxbcs3DrkI_tUWaDTuGuaCnB7fKZZ6Rfhqyl4SOCxuAqMuF-IYXLmztUzgHnt8h_-V6WpG68g96Jq4mwwi9IH40P5kXUw';
      const accessTokenVar = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1Y18wMDAwMDAwZC00NDIyLTk3NjQtNWQ0Ny1hNjNhMGQwMDAwZTgiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQ4NDMyOTIiLCJleHAiOjE2MzQ5Mjk2OTIsImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1YyIsImlhdCI6MTYzNDg0MzI5Mn0.aqMKeU9un2L6mhN57qWO_fPWcmvY-DchOftBqpWtgzLISgBWEnMxTc_G3x_Pro69R7tUSdQsw8iEnimGeyMhKFD-Til1tp3foYE1fCK4F9iNFxmFn261lZJvwxE4_tT-a10AZrWbZK2mh4G7FbbE2dc30WBly0jariRTxfPB1Mj6NNAeNDPyKh8tuI-rmb5bHbI9KgenX7m1idO63uiqaUBJsWiliO8vDcOwbVav39WEo9ZQo-6Hv4ByXW-PvNS43iVTD87O9PWKYtvWI9BX0Xq3GKeS6dp3yJDwYCDm8msyVqioscv9feCKpxCjB4PYYxFW2MK2J9ZstEyQvH8g1g";

      setstate({
        ...state,
        userIdentity: commId, //userDetailsResponse.user.communicationUserId,
        accessToken: accessTokenVar //userDetailsResponse.token,
      });
      setUserIdentity(commId);
      setAccessToken(accessTokenVar);
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

    const chatThreadId = "19:rhDPfFbhlHxgFXzYVzGs1mZrzshMWWRzjshVJqSA3r41@thread.v2";

    let threadClient = await chatClients.getChatThreadClient(chatThreadId);

    const participants = await threadClient.listParticipants();

    console.log("Participants  :::: ", participants);
    console.log("Participants  :::: ", threadClient);

    await chatClients.startRealtimeNotifications();

    sendMessage = async (message) => {
      try {
        await threadClient.sendMessage({
          content: message,
          // senderDisplayName: "Anonymous User",
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
              {conversation.map((chat) => 
                <Message
                  model={{
                    message: chat.message,
                    sentTime: "just now",
                    sender: chat.sender.communicationUserId,
                    position: "last",
                    direction: (chat.sender.communicationUserId === state.userIdentity)? 1 : 0
                  }}
                >
                  <Avatar
                    src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg"
                    name={"Zoe"}
                    size="md"
                  />
                </Message>
              )}
            </MessageList>
            <MessageInput placeholder="Type message here"  onSend={sendMessage}>
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
