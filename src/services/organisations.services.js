import axios from "axios";

export const createNewOrganisation = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateOrgs?code=nNLRBK8Rv4LQs1IF2AqVLXQOH129BTn1wWI/a/uRi6wv0GLHhlUyGQ=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const updateOrg = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateOrgs?code=nNLRBK8Rv4LQs1IF2AqVLXQOH129BTn1wWI/a/uRi6wv0GLHhlUyGQ=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const getAllOrganisations = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchOrgs?code=aQb815GaeZ/PFkzgw0cc9Vo/Pst3EUVFOgkeDF0bgh0V2ahJLo1e2g=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getOrganisationById = async (orgId) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchOrgs?code=aQb815GaeZ/PFkzgw0cc9Vo/Pst3EUVFOgkeDF0bgh0V2ahJLo1e2g=="
    return new Promise((resolve, reject) => {
        axios.get(url,{ params : { orgId }})
        .then((response) => {
            console.log("Responsessadasdsdsad", response.data)
            resolve(response.data.data);
        })
        .catch((err) => reject(err))
    })
}

export const getAllOrganisationType = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchOrgTypes?code=gnwS2jeEhQt1oukayKt7WyOyklXufKEiCvrkF0EbXBDgZgyT9PXebQ=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}
