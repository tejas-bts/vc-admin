import axios from "axios";
import { getCurrentUser } from "../utils/user";

const user = getCurrentUser();  

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
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchMyEvents?code=LQHKaPRkoJNiBO7hCVqhpUSErls/DgiufLzmneinK0Fsm/3NdUpZfA=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify({...searchParams,
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0NCwiZmlyc3ROYW1lIjoiRXN0ZWJlIiwibGFzdE5hbWUiOiJTYWxnYWRvIiwiYmlydGhZZWFyIjoiMTk4Ny0xMC0xMlQwMDowMDowMC4wMDBaIiwiZW1haWxDb25maXJtZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwicHJvZmlsZUNvbXBsZXRlZCI6ZmFsc2UsInByb2ZpbGVJbWFnZSI6Imh0dHBzOi8vZGV2LnZpcnR1YWxjYXRhLmNvbS9hc3NldHMvaW1nL2F2YXRhcnMvZGVmYXVsdC1wcm9maWxlLWltYWdlLnBuZyIsImxvZ2luIjpmYWxzZSwiZW1haWwiOiJlc3RlYmVzYWxnYWRvQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiUmV0YWlsZXIiLCJpYXQiOjE2MzAxODAxMzV9.X1qASiIw2O4z9pQm21apM_jDdgwQJSUgZE9oduf8ew8"
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