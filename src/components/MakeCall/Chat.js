import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useEffect } from "react";
import {
  ChatClient,
  ChatThreadClient,
  ChatParticipant,
  CreateChatThreadResult,
} from "@azure/communication-chat";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";
import { utils } from "./Utils";

function Chat() {
  let initialState = {
    chatClienta: null,
    userIdentity: null,
    senderDisplayName: null,
    accessToken: null,
    acsEndpoint: "https://vcatadevcommnicationserveus.communication.azure.com",
    chats: [],
  };

  const [state, setstate] = useState(initialState);

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

  useEffect(() => {
    provisionNewUser();
  }, []);

  useEffect(() => {
    if (state.userIdentity != null) {
      init();
    }
  }, [state.userIdentity]);

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
    <div>
      {state.chats.map((chat) => {
        <div>
          <b>
            {" "}
            {chat.message} || {chat.senderDisplayName}
          </b>{" "}
          <br />{" "}
        </div>;
      })}
    </div>
  );
}

export default Chat;
