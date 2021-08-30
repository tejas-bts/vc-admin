import axios from "axios";
const feedback = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchFeedbacks?code=ZRmzJ5halqx6tLIw/VyA0ivvTmRGwRRmrKpzHSC/2UyzoY80ZwYCgA==";

export const getEventFeedback = async (eventId) => {
    return new Promise((resolve, reject) => {
        axios.post(feedback, JSON.stringify({ eventId }))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            else 
                resolve(res.data.data)
            })
        .catch((err) => reject(err))
    })
}