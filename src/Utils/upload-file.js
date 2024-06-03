import axios from 'axios'
import api from '../constants'

const uploadFileAndGetURL = async (file, name) => {
    try {
        var options = { headers: { 'Content-Type': file.type } };
        const response = await axios.get(api + "resources/s3?name=" + name)
        await axios.put(response?.data?.preSignedURL, file, options)
        return response?.data?.preSignedURL.split('?')[0]
    } catch (error) {
        return "ERROR"
    }
}

export default uploadFileAndGetURL