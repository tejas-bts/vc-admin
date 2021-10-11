import axios from 'axios';

export const getAllSuppliers = async (searchParams) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchSupplier?code=Bug0hejd/AOcM13Acf4yDGTzTz7bta5MODauXZO3ggK9aG1JUyN3qA=="
    return new Promise((resolve, reject) => {
        axios.get(url, searchParams)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getSuppliersById = async (supplierId) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchAllSupplierDetails?code=mSfRW3J2OBbphILFrhemd5ZOpP53SgZExmuCWbKidxHKDhqS0P8QoQ=="
    return new Promise((resolve, reject) => {
        axios.get(url,{ params : { supplierId }})
        .then((response) => {
            console.log("Responsessadasdsdsad", response.data)
            resolve(response.data.data[0]);
        })
        .catch((err) => reject(err))
    })
}

export const createNewSupplier = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateSupplier?code=PJa4QPa1oAZTySW3gvz992r/U5xcMy1gdChCKhxk5m7M1FiVrIh7MA=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}


export const updateSupplier = async (data) => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/CreateUpdateSupplier?code=PJa4QPa1oAZTySW3gvz992r/U5xcMy1gdChCKhxk5m7M1FiVrIh7MA=="
    return new Promise((resolve, reject) => {
        axios.post(url,data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}
