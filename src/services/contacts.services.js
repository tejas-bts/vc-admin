import axios from "axios";

export const getAllContacts = async (searchParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchContacts?code=w9OuziKMFs1NGqHRAKRnd1B3hUxGMSI1G8aeU9kSFA2cqg1BV7oLEw=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(searchParams))
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}