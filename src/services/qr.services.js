import axios from './serviceConfiguration';

export const getAllQRcodes = async (eventId) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchQR?code=NZoNwIxm92T8C1xZnRMWVoDOLGOo8/EhEpkulkiAQ9DaFTJ7pykmVg=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify({ eventId }))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            else 
                resolve(res.data.data)
            })
        .catch((err) => reject(err))
    })
}

export const createQRcode = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateQR?code=XSZ0kHLPodUS71J8BacNaIy0EHhAUY8czqI6KJ4pmhnnmeaSEa3gYA=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(data))
        .then((res) => {
            if(res.data.error)
                reject(res.data.data);
            else 
                resolve(res.data.data)
            })
        .catch((err) => reject(err))
    })
}