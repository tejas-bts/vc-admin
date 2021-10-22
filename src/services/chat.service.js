import axios from './serviceConfiguration';
let configListParticipants = {
  method: "get",
  url: "https://vcatadevcommnicationserveus.communication.azure.com/chat/threads/19:rhDPfFbhlHxgFXzYVzGs1mZrzshMWWRzjshVJqSA3r41@thread.v2/participants?api-version=2021-09-07",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1Y18wMDAwMDAwZC0xYTI4LWIyOTgtYWI0OS0wOTQ4MjIwMDIyN2EiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQxMzkwNDkiLCJleHAiOjE2MzQyMjU0NDksImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1YyIsImlhdCI6MTYzNDEzOTA0OX0.P3-jLXSisoZ4CEypOvtFhnZQoaMmrr6eufodIKQkjxbayVTOgLCTjwbqcaer-6a28yZteKxKYrUlRZzkPys5Z8_pCX29ewUOAVdsg6DvfxrCZAkdkNVhQeweaIsjyRaRcnYmCxN7_aLDRcerlj0JiLQrHnoidI4esA3xxIFGLosWk8Uk6hw_Fl6DFxW7-fAvlwabCnn-Gb8f-souyt0XEXzWb1EfiSlK88L5kmWh5EscKF4AzU-4g5F5wXxbcs3DrkI_tUWaDTuGuaCnB7fKZZ6Rfhqyl4SOCxuAqMuF-IYXLmztUzgHnt8h_-V6WpG68g96Jq4mwwi9IH40P5kXUw",
  },
};

export const listChatParticipants = () => {
  return new Promise((resolve, reject) => {
    axios(configListParticipants)
      .then((response) => {
        resolve(JSON.stringify(response.data));
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export const addNewUserToChat = (participants) => {

    let data = JSON.stringify({
        participants
      });

      let configAddParticipants = {
        method: "post",
        url: "https://vcatadevcommnicationserveus.communication.azure.com/chat/threads/19:RdfMlpNgEQfypOTkmpz1MmBQlGRmkrmpKqe4bFAEgzc1@thread.v2/participants/:add?api-version=2021-09-07",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjEwMyIsIng1dCI6Ikc5WVVVTFMwdlpLQTJUNjFGM1dzYWdCdmFMbyIsInR5cCI6IkpXVCJ9.eyJza3lwZWlkIjoiYWNzOjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1Y18wMDAwMDAwZC0xYTBlLTk1NWMtNmVmYS0yMzQ4MjIwMDE4NzYiLCJzY3AiOjE3OTIsImNzaSI6IjE2MzQxMzczMzgiLCJleHAiOjE2MzQyMjM3MzgsImFjc1Njb3BlIjoidm9pcCxjaGF0IiwicmVzb3VyY2VJZCI6IjIwMTBlNWU5LWY4N2UtNDU5NS05MjYxLWYwMjU5YTE3ZmQ1YyIsImlhdCI6MTYzNDEzNzMzOH0.orj7tOPlKxBKA6XgweYKcZavQvnB0WVXxHTlvqqykAs8IbTNdNGrsFlesm5Wcetwe7bewb8_rLl9_pixZePBCRA1RYqMgKnP2y-bZ5PK8OTFVBsK4V05AYvNJbHis0UjhRltqU0ZcTdWdTOsuIoGtiKb2immpwc-f4570ytudWQPLDEExWIKwKEJE6OohF67SdbNirk8uUI07Cw-ubMcTL2K8eQJp23FEDOjDyR1EibvH6kCt15vkalmVTvxjzjafq2NDCd2vrMqJi7l5S-eTC93eTSpCbvSf2SmdP6K-YUVys3h2RngdP1bDgHV6B7u6xudNPnZi5n8pvyO_cIGBg",
      
          "Content-Type": "application/json",
        },
      
        data: data,
      };


    return new Promise((resolve, reject) => {
        axios(configAddParticipants)
          .then((response) => {
            resolve(JSON.stringify(response.data));
          })
          .catch((error) => {
            reject(error);
          });
      });
}

