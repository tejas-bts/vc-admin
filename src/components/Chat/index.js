import React, {useEffect, useState } from 'react'
import { utils } from '../MakeCall/Utils';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import {
  FiAlertCircle,
  FiMaximize,
  FiMessageSquare,
  FiMinimize,
} from "react-icons/fi";

import { getCurrentUser } from '../../utils/user';
import VideoModal from "./VideoModal";
import {
    ChatClient,
    ChatThreadClient,
    ChatParticipant,
    CreateChatThreadResult,
  } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

import MakeCall from "../MakeCall/MakeCall";
import ConversationHeader from '@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader';

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
  const [isPopUpShown, setPopUpShown] = useState(false);


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
  }



    useEffect(() => {
      provisionNewUser();
    }, []);
  
    useEffect(() => {
      if (state.userIdentity != null) {
        init();
        console.log("User Identity",state.userIdentity);
      }
    }, [state.userIdentity]);

  
    const provisionNewUser = async () => {
      try {
        let userDetailsResponse = await utils.provisionNewUser();
        setstate({
          ...state,
          userIdentity:  userDetailsResponse.user.communicationUserId,
          accessToken: userDetailsResponse.token,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
  
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
            senderDisplayName: 'Anonymous User',
          });
        }
        catch (error) {
          console.error('Send Message',error.message);
        }
      }
  
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
    },[conversation])

    console.log("Conversation count", conversation.length)

    return (
      <div className="event-container" id="event-container-box">
        <div className="event-video-container">
          {/* <video style={{ height: "100%" }} autoPlay preload>
            <source
              src="https://www.w3schools.com/tags/movie.mp4"
              type="video/mp4"
            />
            <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
          </video> */}
          <MakeCall userIdentity={state.userIdentity} accessToken={state.accessToken} />
          {/* <EventVideo /> */}
          <VideoModal show={isPopUpShown} onClose={handlePopUpToggle}/>
          <div className="video-controls-container">
            <div className="video-controls-left">
              <button onClick={handlePopUpToggle}>
                <FiAlertCircle />
              </button>
            </div>
            <div className="video-controls-right">
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
          className={`event-chat-container ${
            isChatHidden ? "chat-hidden" : null
          }`}
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
    )
}

export default Chat

