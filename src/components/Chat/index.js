import React from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
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

let chatClient;
let threadClient;
let userIdentity;
let senderDisplayName;



const acsEndpoint =
  "https://vcatadevcommnicationserveus.communication.azure.com";

  const index = () => {

  const userName = "Admin";

  const connectButton = document.getElementById("connect-button");
  const removeUserId = document.getElementById("remove-user-id");
  const removeUser = document.getElementById("remove-user");
  const disconnectButton = document.getElementById("disconnect-button");
  // const userIdElement = document.getElementById("userId");
  const createChatThreadButton = document.getElementById("createChatThread");
  const destinationGroupElement = document.getElementById(
    "destination-group-input"
  );
  const chatContainer = document.getElementById("chat-container");
  const chatUsers = document.getElementById("chat-users");
  const chatInputElement = document.getElementById("chat-input");
  const chatSendButton = document.getElementById("chat-send");
  const userInputElement = document.getElementById("user-input");
  const userAddButton = document.getElementById("user-add");

  const user = getCurrentUser();
  async function init() {
      let tokenVal = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMiIsIng1dCI6IjNNSnZRYzhrWVNLd1hqbEIySmx6NTRQVzNBYyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1Y18wMDAwMDAwYy02YmNlLWVhZDItZmU0MS0wOTQ4MjIwMDA1MGUiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzEyMTM5MzAiLCJleHAiOjE2MzEzMDAzMzAsImFjc1Njb3BlIjoiY2hhdCIsInJlc291cmNlSWQiOiIyMDEwZTVlOS1mODdlLTQ1OTUtOTI2MS1mMDI1OWExN2ZkNWMiLCJpYXQiOjE2MzEyMTM5MzB9.sVkUi3OQ-KvqjKdv6Um-H3QWZ1ZJwcolVz_muc6fkSm3qPbn-ATrAFDAh1Egg564D9k1AjYrcs1Eoi9lUTTkgZQ7Tkyfw595GnEzoaXqE5GVBfxJHPfoU6MyQF7shvDpdp28vAyGsfqDmUvO8e1Do3C2gfNZ9iyIZ7xDQuXbRCExuavBscIzbQeda4z11vVObBXRMbWBAOHdbjxgBfYuogy3ALkhq-JmPk1_lpKmzRFrBIGmgasLEfGFO_nCr3fX7m3mNkUVnNiIfeDUdHUJ1gftuHoii1dnk4hY5r2ivWR51GIzLlpysDZvBH5pgZPlFxzbTqAWZMqR-P4ZKBvRew";
    
      let accessVal = "8:acs:2010e5e9-f87e-4595-9261-f0259a17fd5c_0000000c-6bce-ea42-fe41-09482200050d";
      userIdentity = accessVal;
      const tokenCredential = new AzureCommunicationTokenCredential(tokenVal);
    
      chatClient = new ChatClient(acsEndpoint, tokenCredential);
    
      // userIdElement.innerText = accessVal;
    }

    init();


    // connectButton.addEventListener("click", async () => {
    //   const chatThreadId = destinationGroupElement.value;
    //   threadClient = await chatClient.getChatThreadClient(chatThreadId);
    //   console.log("Chat Thread Client :::", threadClient);
    //   console.log("Chat Client :::", chatClient);
    //   await chatClient.startRealtimeNotifications();
    
    //   const participants = threadClient.listParticipants();
    //   for await (const participant of participants) {
    //     console.log(`participants in thread:${JSON.stringify(participant)}`);
    //     var li = document.createElement("li");
    
    //     li.appendChild(
    //       document.createTextNode(
    //         `🦹‍♂️ ${participant.displayName ? participant.displayName : ""} |  ${
    //           participant.id.communicationUserId
    //         } `
    //       )
    //     );
    //     chatUsers.appendChild(li);
    //   }
    
    //   chatClient.on("participantsAdded", (parti) => {
    //     console.log("Users Added :: ", parti);
    //     let userAdded = parti.participantsAdded[0];
    //     var li = document.createElement("li");
    //     li.appendChild(
    //       document.createTextNode(
    //         `🦹‍♂️ ${userAdded.displayName ? userAdded.displayName : ""} ${
    //           userAdded.id.communicationUserId
    //         }`
    //       )
    //     );
    //     chatUsers.appendChild(li);
    //   });
    
    //   chatClient.on("participantsRemoved", (removedU) => {
    //     console.log("Removed user ::: ", removedU);
    //   });
    
    //   chatClient.on("typingIndicatorReceived", (indication) => {
    //     console.log("Typing ::: ", indication);
    //   });
    
    //   chatClient.on("chatMessageReceived", (message) => {
    //     var li = document.createElement("li");
    //     console.log("Messages :: ", message);
    //     li.appendChild(
    //       document.createTextNode(
    //         `✉️ ${message.message} | 👨 ${message.senderDisplayName}  | ⏲️ : ${message.createdOn}`
    //       )
    //     );
    //     chatContainer.appendChild(li);
    //   });
    
    //   // toggle button states
    //   disconnectButton.disabled = false;
    //   connectButton.disabled = true;
    //   chatSendButton.disabled = false;
    //   userAddButton.disabled = false;
    // });


    // // disconnectButton.addEventListener("click", async () => {
    // //   await call.hangUp();
    
    // //   // toggle button states
    // //   disconnectButton.disabled = true;
    // //   connectButton.disabled = false;
    // // });
    

    // const chatSendFunction = async () => {
    //   await threadClient.sendMessage({
    //     content: chatInputElement.value,
    //     senderDisplayName: userName,
    //   });
    //   chatInputElement.value = "";
    // }
    
    // const createChatThread = async () => {
    //   let createChatThreadResult = await chatClient.createChatThread({
    //     topic: "DemoVCATA",
    //     participants: [
    //       {
    //         id: userIdentity,
    //         displayName: "Admin",
    //       },
    //     ],
    //   });
    //   let threadId = createChatThreadResult.chatThread.id;
    //   alert("New thread created. ID is: " + threadId);
    //   console.log(
    //     "Chat Thread Result is: " + JSON.stringify(createChatThreadResult)
    //   );
    //   destinationGroupElement.value = threadId;
    // }

    // const addParticipantFunction = async () => {
    //   threadClient.addParticipants({
    //     participants: [
    //       {
    //         id: { communicationUserId: userInputElement.value },
    //         displayName: "Tejas",
    //       },
    //     ],
    //   });
    //   alert("User added");
    // }
    
    // const removeUserFunction = async () => {
    //   await threadClient.removeParticipant({
    //     communicationUserId: removeUserId.value,
    //   });
    // }

    // chatSendButton.addEventListener("click", chatSendFunction);
    // createChatThreadButton.addEventListener("click", createChatThread);
    // userAddButton.addEventListener("click", addParticipantFunction);
    // removeUser.addEventListener("click", removeUserFunction);
      

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

export default index
