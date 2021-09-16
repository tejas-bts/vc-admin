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
import { getCurrentUser } from '../../utils/user';
import {
    ChatClient,
    ChatThreadClient,
    ChatParticipant,
    CreateChatThreadResult,
  } from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

import MakeCall from "../MakeCall/MakeCall";
import ConversationHeader from '@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader';


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
    <>
      <div className="live-event-container">
        <div className="event-video-container">
          <MakeCall />
        </div>
        <div className="event-chat-container">
            <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Content userName="Emily" info="Active 10 mins ago" />
              </ConversationHeader>
              <MessageList>
                <MessageSeparator className="mt-5">
                  {`User Identity : \n ${ state.userIdentity }`}
                </MessageSeparator>
                {
                  conversation.map((item) => 
                    <Message
                      key={item.id}
                      model={{
                      message: item.message,
                      sentTime: "just now",
                      sender: "Joe",
                      position:"last"
                      }}
                    >
                    <Avatar src="https://chatscope.io/storybook/react/static/media/zoe.e31a4ff8.svg" name={"Zoe"} size="s" />
                  </Message>
                  )
                } 
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
