import axios from "axios"
import api from "../../constants";
const url = `${api}resources`;
//books ==================================================================
export const sendBook = async (data) => {
    try {
        axios.post(`${url}/books`, data)
    }
    catch (err) {
        console.log("error is " + err)
    }
}
export const getAllBooks = async () => {
    try {
        return await axios.get(`${url}/books`)
    }
    catch (err) {
        console.log("error is " + err)
    }
}
//materail ================================================================
export const sendMaterial = async (data) => {
    try {
        axios.post(`${url}/material`, data)
    }
    catch (err) {
        console.log("error is " + err)
    }
}
export const getAllmaterial = async () => {
    try {
        return await axios.get(`${url}/material`)
    }
    catch (err) {
        console.log("error is " + err)
    }
}
//paper ================================================================
export const sendPaper = async (data) => {
    try {
        axios.post(`${url}/paper`, data)
    }
    catch (err) {
        console.log("error is " + err)
    }
}
export const getAllpaper = async (verified = true) => {
    try {
        return await axios.get(`${url}/paper/${verified}`)
    }
    catch (err) {
        console.log("error is " + err)
    }
}