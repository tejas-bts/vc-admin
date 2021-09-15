import React, {useEffect, useState } from 'react'
import { utils } from '../MakeCall/Utils';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar
} from "@chatscope/chat-ui-kit-react";
import { getCurrentUser } from '../../utils/user';
import {
    ChatClient,
    ChatThreadClient,
    ChatParticipant,
    CreateChatThreadResult,
  } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

import MakeCall from "../MakeCall/MakeCall";


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


    useEffect(() => {
      provisionNewUser();
    }, []);
  
    useEffect(() => {
      if (state.userIdentity != null) {
        init();
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
        "19:l7Ngsr7bUV9CgVELX31oy7KPm3unVTNwDa2GkNw4u7I1@thread.v2";
  
      let threadClient = await chatClients.getChatThreadClient(chatThreadId);
  
      const participants = await threadClient.listParticipants();
  
      console.log("Participants  :::: ", participants);
      console.log("Participants  :::: ", threadClient);
  
      await chatClients.startRealtimeNotifications();
  
      console.log(chatClients);
      setstate({ ...state, threadClient, chatThreadId });
  
      chatClients.on("chatMessageReceived", (message) => {
        console.log("Msg :::::::::", message);
  
        setstate({ ...state, chats: [...state.chats, message] });
      });
    };
      

    return (
    <>
      <p>
        Create New Chat Group / Join Existing :
        <input
          id="destination-group-input"
          type="text"
          placeholder="Chat Thread ID"
          // style="margin-bottom: 1em; width: 600px"
        />
      </p>

      <div>
        <button id="connect-button" type="button" disabled="false">
          Connect
        </button>
        <button id="disconnect-button" type="button" disabled="true">
          Disconnect
        </button>
        <button id="createChatThread" type="button" disabled="true">
          Create a Chat Thread
        </button>
      </div>
      <div class="footer">
        <p>
          <input id="chat-input" type="text" placeholder="Type your message" />
          <button id="chat-send" type="button" disabled="true">Send</button>

          ||||

          <input
            id="user-input"
            type="text"
            placeholder="User ID"
            // style="margin-bottom: 1em; width: 400px"
          />
          <button id="user-add" type="button" disabled="true">Add User</button>

          ||||

          <input
            id="remove-user-id"
            type="text"
            placeholder="User ID"
            // style="margin-bottom: 1em; width: 400px"
          />
          <button id="remove-user" type="button">Remove User</button>
        </p>
      </div>

      <div className="live-event-container">
        <div className="event-video-container">
          <MakeCall />
        </div>
        <div className="event-chat-container">
            <MainContainer>
            <ChatContainer>
                <MessageList>
                <Message
                    model={{
                    message: "Hello my friend",
                    sentTime: "just now",
                    sender: "Joe",
                    position:"last"
                    }}
                >
                    <Avatar src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg" name={"Zoe"} size="l" />
                </Message>
                <Message
                    model={{
                    message: "Hello",
                    sentTime: "just now",
                    sender: "Ramesh",
                    direction: "outgoing",
                    position: "last"
                    }}
                /> 
                </MessageList>
                <MessageInput placeholder="Type message here" >
                    <Avatar src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg" name={"Zoe"} size="l" />
                </MessageInput>
            </ChatContainer>
            </MainContainer>
        </div>
      </div>
    </>
    )
}

export default Chat
