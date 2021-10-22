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
    // let response = await fetch("/tokens/provisionUser", {
    //   method: "POST",
    //   body: { userId },
    //   headers: {
    //     Accept: "application/json, text/plain, */*",
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (response.ok) {
    //   return response.json();
    // }

    // throw new Error("Invalid token response");

    // New Code

    if (
      !config ||
      !config.connectionString ||
      config.connectionString.indexOf("endpoint=") === -1
    ) {
      throw new Error("Update `config.json` with connection string");
    }
    const communicationIdentityClient = new CommunicationIdentityClient(
      config.connectionString
    );

    let communicationUserId = await communicationIdentityClient.createUser();
    const tokenResponse = await communicationIdentityClient.issueToken(
      communicationUserId,
      ["voip", "chat"]
    );

    return tokenResponse;
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
    }
  },
};



export const formatDateforInput = (in_date) => {
  let date_ob = new Date(in_date);
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  const returnDate = year + "-" + month + "-" + date;
  return returnDate;
}

export const formatDateTimeforInput = (in_date) => {
  let date_ob = new Date(in_date);
  let hours = ("0" + date_ob.getHours()).slice(-2);
  let minutes = ("0" + date_ob.getMinutes()).slice(-2);
  let seconds = date_ob.getSeconds();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  const returnDate = year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
  console.log("Formatted Date", returnDate);
  return returnDate;
}