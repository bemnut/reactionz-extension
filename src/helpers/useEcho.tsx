import { useEffect, useState } from "react";
import Echo from "laravel-echo";
//import Pusher from "pusher-js";
import Pusher from "../web/pusher.js";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { reverbConf } from "../config";
import { getLoggedinUser } from "./api_helper";

const useEcho = () => {
    const selectChatState = (state) => state;
    const chatProperties = createSelector(selectChatState, (state) => ({
        user: state.Login.user,
    }));
    // Inside your component
    const { user } = useSelector(chatProperties);
    const [echoInstance, setEchoInstance] = useState(null);

    useEffect(() => {
        const auth_user = user || getLoggedinUser();
        if (auth_user) {
            //  Setup Pusher client
            const PusherClient = new Pusher(reverbConf.APP_KEY, {
                /**
                 * I think the "authorize" is just for SPA Authentication: 
                 * https://laravel.com/docs/11.x/sanctum#authorizing-private-broadcast-channels
                 * 
                  authorizer: (channel) => {
                  return {
                    authorize: (socketId, callback) => {
                      axios
                        .post("/api/broadcasting/auth", {
                          socket_id: socketId,
                          channel_name: channel.name,
                        })
                        .then((response) => {
                          callback(false, response.data);
                        })
                        .catch((error) => {
                          callback(true, error);
                        });
                    },
                  };
                }, */
                wsHost: reverbConf.HOST,
                wsPort: reverbConf.PORT ?? 80,
                wssPort: reverbConf.PORT ?? 443,
                forceTLS: (reverbConf.SCHEME ?? "https") === "https",
                enabledTransports: ["ws", "wss"],
                disableStats: true,
                cluster: "mt1",
                authEndpoint: `https://${reverbConf.HOST}/api/broadcasting/auth`,
                // userAuthentication: {
                //     endpoint: "/api/broadcasting/auth",
                //     transport: "ajax",
                //     params: {},
                //     headers: {
                //         Authorization: `Bearer ${user?.token}`,
                //     },
                //     paramsProvider: null,
                //     headersProvider: null,
                //     customHandler: null,
                // },
                auth: {
                    headers: {
                        Authorization: `Bearer ${auth_user?.token}`,
                        Accept: "application/json",
                    },
                },
            });

            // Create Echo instance
            const echo = new Echo({
                broadcaster: "reverb",
                client: PusherClient,
            });

            setEchoInstance(echo);

            // Cleanup on unmount
            return () => {
                if (echo) {
                    echo.disconnect();
                }
            };
        }
    }, [user]);

    // const getLoggedinUser = () => {
    //     const user = localStorage.getItem("authUser");
    //     if (!user) {
    //         return null;
    //     } else {
    //         return JSON.parse(user);
    //     }
    // };

    return echoInstance;
};

export default useEcho;
