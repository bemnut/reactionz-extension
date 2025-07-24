import axios from "axios";
import { authApi, localApi, reactionzApi } from "../config";

export const authAxios = axios.create({
    baseURL: authApi.API_URL,
    headers: {
        // content type

        post: {
            "Content-Type": "application/json",
        },
    },
});
const reactionzAxios = axios.create({
    baseURL: reactionzApi.API_URL,
    headers: {
        // content type
        "Content-Type": "application/json",
        //"Content-Security-Policy:": "script-src-elem",
        // post: {
        //     "Content-Type": "application/json",
        // },
        // put: {
        //     "Content-Type": "application/json",
        // },
        // common: {
        //   Authorization: "Bearer " + reactionzApi.ACCESS_TOKEN,
        // },
        //Autorization: "Bearer " + reactionzApi.ACCESS_TOKEN,
    },
});

const localAxios = axios.create({
    baseURL: localApi.API_URL,
    headers: {
        // content type
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "content-type": "application/vnd.api+json",
        // // post: {
        // //     "Content-Type": "application/json",
        // // },
        // common: {
        //     //Authorization: "Bearer " + localApi.ACCESS_TOKEN,
        //     //"X-CSRF-TOKEN": ,
        //     "X-Requested-With": "XMLHttpRequest",
        // },
        // "X-CSRF-TOKEN": localApi.ACCESS_TOKEN,
        //"X-Requested-With": "XMLHttpRequest",
    },
});
//localAxios.defaults.headers.withCredentials = true;
//localAxios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// content type
const token = JSON.parse(localStorage.getItem("authUser"))
    ? JSON.parse(localStorage.getItem("authUser")).token
    : null;
if (token)
    reactionzAxios.defaults.headers.common["Authorization"] = "Bearer " + token;

// intercepting to capture errors
authAxios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;
        switch (error.status) {
            case 500:
                message = "Internal Server Error";
                break;
            case 401:
                message = "Invalid credentials";
                break;
            case 404:
                message =
                    "Sorry! the data you are looking for could not be found";
                break;
            default:
                message = error.message || error;
        }
        return Promise.reject(message);
    }
);
reactionzAxios.interceptors.response.use(
    function (response) {
        //console.log("response in API HELPER", response);
        return response.data ? response.data : response;
        //return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        const message = error.response.data.message || error;
        return Promise.reject(message);
    }
);

localAxios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return error.response
            ? Promise.reject(error.response.data)
            : Promise.reject(error);
    }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
const setlocalAuthorization = (token) => {
    localAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
const setReactonzAuthorization = (token) => {
    reactionzAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const setReactonzContentTypeHeader = (type = "json") => {
    if (type == "json") {
        reactionzAxios.defaults.headers["Content-Type"] = "application/json";
    } else if (type == "form") {
        reactionzAxios.defaults.headers["Content-Type"] = "multipart/form-data";
    }
};

class AuthApiClient {
    /**
     * Fetches data from given url
     */

    //  get = (url, params) => {
    //   return axios.get(url, params);
    // };
    get = (url, params?) => {
        let response;

        let paramKeys = [];

        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + "=" + params[key]);
                return paramKeys;
            });

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join("&") : "";
            response = authAxios.get(`${url}?${queryString}`, params);
        } else {
            response = authAxios.get(`${url}`, params);
        }

        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
        return authAxios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return authAxios.patch(url, data);
    };

    put = (url, data) => {
        return authAxios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url, config?) => {
        return authAxios.delete(url, { ...config });
    };
}
class ReactionzAPIClient {
    /**
     * Fetches data from given url
     */
    //  get = (url, params) => {
    //   return axios.get(url, params);
    // };
    get = (url, params?) => {
        let response;

        let paramKeys = [];

        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + "=" + params[key]);
                return paramKeys;
            });

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join("&") : "";
            response = reactionzAxios.get(`${url}?${queryString}`, params);
        } else {
            response = reactionzAxios.get(`${url}`, params);
        }

        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data?) => {
        return reactionzAxios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return reactionzAxios.put(url, data);
    };

    // put = (url, data) => {
    //     return reactionzAxios.put(url, data);
    // };
    /**
     * Delete
     */
    delete = (url, config?) => {
        return reactionzAxios.delete(url, config);
    };
}

class LocalApiClient {
    /**
     * Fetches data from given url
     */
    //  get = (url, params) => {
    //   return axios.get(url, params);
    // };
    get = (url, params) => {
        let response;

        let paramKeys = [];

        if (params) {
            params &&
                typeof params != "string" &&
                Object.keys(params).map((key) => {
                    paramKeys.push(key + "=" + params[key]);
                    return paramKeys;
                });
            params && typeof params == "string" ? paramKeys.push(params) : null;

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join("&") : "";

            response = localAxios.get(
                `${url}?${
                    queryString.indexOf("?") == 0
                        ? queryString.substring(1)
                        : queryString
                }`,
                params
            );
        } else {
            response = localAxios.get(`${url}`, params);
        }

        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
        return localAxios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return localAxios.patch(url, data);
    };

    put = (url, data) => {
        return localAxios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url, config) => {
        return localAxios.delete(url, { ...config });
    };
}

// get the loggedin user
const getLoggedinUser = () => {
    const user = localStorage.getItem("authUser");
    if (!user) {
        return null;
    } else {
        return JSON.parse(user);
    }
};

export {
    localAxios,
    AuthApiClient,
    ReactionzAPIClient,
    LocalApiClient,
    setAuthorization,
    setlocalAuthorization,
    setReactonzAuthorization,
    getLoggedinUser,
    setReactonzContentTypeHeader,
};
