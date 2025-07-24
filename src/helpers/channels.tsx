import React, { useEffect, useState, useMemo } from "react";
import Echo from "laravel-echo";
import Pusher from "../web/pusher.js";

/**
 * Pusher configuration
 */
const pusherConfig = {
    key: "<your_pusher_key_here>",
    cluster: "<pusher_cluster>",
    // auth endpoint for private channels
    // e.g. for Laravel https://example.com/api/broadcasting/auth
    authEndpoint: "<auth_endpoint_for_private_channels>",
};

/**
 * Context for Channels
 */
type TChannels = Echo<any> | undefined;

const ChannelContext = React.createContext<TChannels>(undefined);

/**
 * Channel Context Provider
 */
export function ChannelsProvider({
    children,
    authUser,
    authToken,
}: {
    children: React.ReactNode;
    authUser?: any;
    authToken?: string;
}) {
    const [channels, setChannels] = useState<TChannels>(undefined);
    useEffect(() => {
        const channels = getChannels(pusherConfig, authToken);
        setChannels(channels);
        return () => {
            // disconnect from server and reset the channels
            channels.disconnect();
            setChannels(undefined);
        };
    }, [authUser, authToken]);
    return (
        <ChannelContext.Provider value={channels}>
            {children}
        </ChannelContext.Provider>
    );
}

/**
 * Hook to use the channels provided via context
 */
export function useChannels() {
    const channels = React.useContext(ChannelContext);
    return channels;
}

/**
 * Use private channels
 * It simple return the useChannels with authenticated user bindings
 */
export function usePrivateChannels(authUserId: any) {
    const channels = useChannels();
    return useMemo(() => {
        return channels && channels.private("users." + authUserId);
    }, [channels, authUserId]);
}

/**
 * Get the channels
 */
function getChannels(pusherConfig: any, authToken?: string) {
    const client = new Pusher(pusherConfig?.key, {
        cluster: pusherConfig?.cluster,
        forceTLS: true,
        authEndpoint: pusherConfig?.authEndpoint,
        auth: authToken
            ? {
                  headers: {
                      // pass the authorization token when using private channels
                      Authorization: `Bearer ${authToken}`,
                  },
              }
            : undefined,
    });

    const channels = new Echo({
        broadcaster: "pusher",
        client: client,
    });
    return channels;
}
