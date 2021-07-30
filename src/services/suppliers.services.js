import axios from 'axios';

export const getAllSuppliers = async () => {
    const url = "https://dev-vcata-webapi-eus.azurewebsites.net/api/FetchSupplier?code=Bug0hejd/AOcM13Acf4yDGTzTz7bta5MODauXZO3ggK9aG1JUyN3qA=="
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}