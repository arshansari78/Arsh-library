import axios from "axios"

const createAxios = () => axios.create({
    baseURL: "https://arsh-library-api.onrender.com/api"
})

const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://arsh-library-api.onrender.com/api",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export { createAxios, createAxiosWithToken }