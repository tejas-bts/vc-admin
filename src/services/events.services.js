import axios from './serviceConfiguration';
import { getCurrentUser } from "../utils/user";



export const getAllEventsFields = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/EventFields?code=v5rGI/xtZaQp1L1npN0AVZlTg7jsPlWpunBs9G/vXlzDh6giFq0jIg=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err))
    })
}


export const getAllEvents = async (searchParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchEvents?code=fW1I5g5BhV7d3rqVw2FUYdi5GSmVXcVH6uDXWj7Pdo3RL7zz0zFgxw=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(searchParams))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            resolve(res.data.data);
        })
        .catch((err) => reject(err))
    })
}

export const getUserEvents = async (searchParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchMyEvents?code=LQHKaPRkoJNiBO7hCVqhpUSErls/DgiufLzmneinK0Fsm/3NdUpZfA==";
    const user = getCurrentUser();  
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify({...searchParams,
            token: user.token
        }))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            resolve(res.data.data);
        })
        .catch((err) => reject(err))
    })
}

export const getEventDetail = async (eventId) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchEventDetails?code=GwsgVTnkgaDuzSJ4nFHRYPSyhmkhIfPFh0ajFTASGky0Yqb1zqFWew=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify({ eventId }))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            else
                resolve(res.data.data);
        })
        .catch((err) => reject(err))
    })
}

export const createOrUpdateEvent = async (eventParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/UpsertEvent?code=LDx4hQmLyrFJFP7dBNTGtnus9B31cfjOaJZPF4UFAO4l2w7LCABm2Q=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(eventParams)) 
        .then((res) => {
            console.log("Response", )
            if(res.data && res.data.error)
                reject(res.data);
            else
                resolve(res.data);
        })
        .catch((err) => reject(err))
    })
}