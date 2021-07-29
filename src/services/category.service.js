import axios from "axios";

export const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchCategories?code=AmZcfWc33cNYGov432VKl0P8hGhuvmbz4AZ1YajJ//DaMBbdZS78qw==')
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
}