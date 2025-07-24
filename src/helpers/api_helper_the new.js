import axios from "axios";
import { authApi, reactionzApi, localApi } from "../config";

/**
 *  SET UP THE AXIOS INSTANCES
 */
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
        post: {
            "Content-Type": "application/json",
        },
        common: {
            Authorization: "Bearer " + reactionzApi.ACCESS_TOKEN,
        },
        //Autorization: "Bearer " + reactionzApi.ACCESS_TOKEN,
    },
});

const localAxios = axios.create({
    baseURL: localApi.API_URL,
    headers: {
        // content type
        post: {
            "Content-Type": "application/json",
        },
    },
});

const token = JSON.parse(sessionStorage.getItem("authUser"))
    ? JSON.parse(sessionStorage.getItem("authUser")).token
    : null;
//  if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;
if (token) {
    //  config interceptor
    // authAxios.interceptors.request.use(
    //     (config) => {
    //         config.headers.common["Authorization"] = "Bearer " + token;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );
    authAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
} // authAxios.headers.Authorization = "Bearer " + token;

if (reactionzApi.ACCESS_TOKEN) {
    //  config interceptor
    // reactionzAxios.interceptors.request.use(
    //     (config) => {
    //         config.headers.common["Authorization"] =
    //             "Bearer " + reactionzApi.ACCESS_TOKEN;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );
}

/**
 *  SETUP THE INTERCEPTORS
 */
authAxios.interceptors.response.use(
    function (response) {
        console.log("response: ", response);
        return response.data ? response.data.data : response;
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
        return response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return Promise.reject(error);
    }
);

localAxios.interceptors.response.use(
    function (response) {
        return response.data ? response.data : response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        return Promise.reject(error);
    }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    // authAxios.headers.Authorization = "Bearer " + token;
    authAxios.interceptors.request.use(
        (config) => {
            config.headers.common["Authorization"] = "Bearer " + token;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

/**
 *  SETUP THE CLIENTS
 */
class AuthApiClient {
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
    delete = (url, config) => {
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
    get = (url, params) => {
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
    create = (url, data) => {
        return reactionzAxios.post(url, data);
    };
    /**
     * Updates data
     */
    update = (url, data) => {
        return reactionzAxios.patch(url, data);
    };

    put = (url, data) => {
        return reactionzAxios.put(url, data);
    };
    /**
     * Delete
     */
    delete = (url, config) => {
        return reactionzAxios.delete(url, { ...config });
    };
}

class localApiClient {
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
            Object.keys(params).map((key) => {
                paramKeys.push(key + "=" + params[key]);
                return paramKeys;
            });

            const queryString =
                paramKeys && paramKeys.length ? paramKeys.join("&") : "";
            response = localAxios.get(`${url}?${queryString}`, params);
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
    const user = sessionStorage.getItem("authUser");
    if (!user) {
        return null;
    } else {
        return JSON.parse(user);
    }
};

export {
    AuthApiClient,
    ReactionzAPIClient,
    localApiClient,
    setAuthorization,
    getLoggedinUser,
};
