import axios from "axios"

export const googleApiAxios = axios.create({
    baseURL:"https://www.googleapis.com/oauth2/v2"
})
export const authServerAxios = axios.create({
    baseURL:`${process.env.REACT_APP_SERVER_BASE_URL}`,withCredentials: true,
})