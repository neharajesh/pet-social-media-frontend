import axios from "axios"
import ROOT_URL from "./config"

export const loginUser = async(userDetails) => {
    try {
        const response = await axios.post(`${ROOT_URL}/auth/signin`, userDetails, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log("Error occurred logging in user", err.message)
    }
}

export const registerUser = async(userDetails) => {
    try {
        const response = await axios.post(`${ROOT_URL}/auth/signup`, userDetails, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
        console.log(response.data)
        return response.data
    } catch (err) {
        console.log("Error occurred signing up user", err.message)
    }
}