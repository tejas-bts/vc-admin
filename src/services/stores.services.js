import axios from "axios";

export const createNewStore = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateStores?code=sWzvN0nZlo91caaHTIHeC2vMpbtHXP5RjC7/6SiCuae3PduhxJZjyA=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const updateStore = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateStores?code=sWzvN0nZlo91caaHTIHeC2vMpbtHXP5RjC7/6SiCuae3PduhxJZjyA=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const getAllStores = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchStores?code=zURZXAYa9EL6aTLpSiWyvtk24ksZPxUkSP9Qlu0PG1RZ7hNtFnozxw=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getStoreById = async (storeId) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchAllStoreDetails?code=m29k57VYPyPpQbA0a3XBgQ/LBmYEarUu4GFIpsK1iIvxx3JSb/ym0g=="
    return new Promise((resolve, reject) => {
        axios.get(url,{ params : { storeId }})
        .then((res) => {
            if(res.data.error)
                reject(new Error(res.data.data));
            else
              resolve(res.data.data[0]);
          })
        .catch((err) => reject(err))
    })
}

export const getAllStoreType = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchStoreTypes?code=pxbLC/ex6kKGstSrNCuMHHlR8ULL1Ns1Od8k7uW7bvOzJkRMd72ezA=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((response) => {
            console.log("Responsessadasdsdsad", response.data)
            resolve(response.data);
        })
        .catch((err) => reject(err))
    })
}