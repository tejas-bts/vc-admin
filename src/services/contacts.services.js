import axios from './serviceConfiguration';

export const getAllContacts = async (searchParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchContacts?code=w9OuziKMFs1NGqHRAKRnd1B3hUxGMSI1G8aeU9kSFA2cqg1BV7oLEw=="
    return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify(searchParams))
      .then((res) => {
        if(res.data.error)
          reject(new Error(res.data.data));
        else
          resolve(res.data.data.data);
      })
      .catch((err) => reject(err))
  })
}

export const getContactById = async (id) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchUserDetails?code=u6U01vtwGG2FBpmwMuuaG9LGz1bUnCoIPbg9eafKNIlXsuNpRTxr8w=="
    return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify({ "userId": id }))
      .then((res) => { 
        if(res.data.error)
          reject(new Error(res.data.data));
        else {
        resolve(res.data.data[0]);
        }
      })
      .catch((err) => reject(err))
  })
}

export const createOrUpdateContact = async (eventParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateContact?code=f5pGfslX12UhdKrV3FSrUzSgbIbxCtXqfZ93J6PQZtPBhi6gg82K9w=="
    return new Promise((resolve, reject) => {
        axios.post(url, JSON.stringify(eventParams)) 
        .then((res) => {
            if(res.data.error)
                reject(new Error(res.data.data))
            else
                resolve(res.data)
        })
        .catch((err) => reject(err))
    })
}

export const fetchContactTypes = async (eventParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchContactTypes?code=vt9lMtCv0d/Limh5ljRWSYJtrjIHN32h7jCOh0qFcxXE8GHrVno0dw=="
    return new Promise((resolve, reject) => {
        axios.get(url) 
        .then((res) => resolve(res.data.data))
        .catch((err) => reject(err))
    })
}


