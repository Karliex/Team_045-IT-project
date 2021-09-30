import _axios from "axios";

// get the back end url 
const axios = (baseURL) =>{
    const instance = _axios.create({
        baseURL: 'https://it-project-team045.herokuapp.com/' || 'http://localhost:4000'
    })
    return instance
}

export {axios}

export default axios();