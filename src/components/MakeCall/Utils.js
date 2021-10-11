import {
  isCommunicationUserIdentifier,
  isPhoneNumberIdentifier,
  isMicrosoftTeamsUserIdentifier,
  isUnknownIdentifier,
} from "@azure/communication-common";
const CommunicationIdentityClient =
  require("@azure/communication-administration").CommunicationIdentityClient;
const config = require("./config.json");

export const utils = {
  getAppServiceUrl: () => {
    return window.location.origin;
  },
  provisionNewUser: async (userId) => {
    let response = await fetch("https://dev-vcata-dataapi-eus.azurewebsites.net/api/userAccessToken", {
      method: "POST",
      body: { userId },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    console.log("Resoponse C", response);

    if (response.ok) {
      return response.json();
    }

    throw new Error("Invalid token response");

    // New Code

    // if (
    //   !config ||
    //   !config.connectionString ||
    //   config.connectionString.indexOf("endpoint=") === -1
    // ) {
    //   throw new Error("Update `config.json` with connection string");
    // }
    // const communicationIdentityClient = new CommunicationIdentityClient(
    //   config.connectionString
    // );

    // let communicationUserId = await communicationIdentityClient.createUser();
    // const tokenResponse = await communicationIdentityClient.issueToken(
    //   communicationUserId,
    //   ["voip"]
    // );

    // return tokenResponse;
  },
  getIdentifierText: (identifier) => {
    if (isCommunicationUserIdentifier(identifier)) {
      return identifier.communicationUserId;
    } else if (isPhoneNumberIdentifier(identifier)) {
      return identifier.phoneNumber;
    } else if (isMicrosoftTeamsUserIdentifier(identifier)) {
      return identifier.microsoftTeamsUserId;
    } else if (
      isUnknownIdentifier(identifier) &&
      identifier.id === "8:echo123"
    ) {
      return "Echo Bot";
    } else {
      return "Unknown Identifier";
    }
  },
  getRemoteParticipantObjFromIdentifier(call, identifier) {
    switch (identifier.kind) {
      case "communicationUser": {
        return call.remoteParticipants.find((rm) => {
          return (
            rm.identifier.communicationUserId === identifier.communicationUserId
          );
        });
      }
      case "microsoftTeamsUser": {
        return call.remoteParticipants.find((rm) => {
          return (
            rm.identifier.microsoftTeamsUserId ===
            identifier.microsoftTeamsUserId
          );
        });
      }
      case "phoneNumber": {
        return call.remoteParticipants.find((rm) => {
          return rm.identifier.phoneNumber === identifier.phoneNumber;
        });
      }
      case "unknown": {
        return call.remoteParticipants.find((rm) => {
          return rm.identifier.id === identifier.id;
        });
      }
      default : {
        
      } 
    }
  },
};
