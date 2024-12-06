import axios from 'axios';

const commonapi = (reqMethod = "GET", reqData = null, reqUrl, reqHeader = {}) => {
    // Ensure the URL is provided
    if (!reqUrl) {
        console.error("Request URL is required.");
        return Promise.reject(new Error("Request URL is missing."));
    }

    const token = sessionStorage.getItem("token");
    
    const config = {
        method: reqMethod,
        url: reqUrl,
        data: reqData,
        headers: {
            ...reqHeader,
            "Authorization": token ? `Token ${token}` : "",
            "Content-Type": reqHeader?.["Content-Type"] || "application/json",
        },
    };

    try {
        return axios(config);
    } catch (error) {
        console.error("Error in API request:", error);
        return Promise.reject(error);
    }
};

export default commonapi;
