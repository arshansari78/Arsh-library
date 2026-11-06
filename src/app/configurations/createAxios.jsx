import axios from "axios"

const createAxios = () => axios.create({
    baseURL: "https://localhost:7005/api"
})

const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://localhost:7005/api",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export { createAxios, createAxiosWithToken }