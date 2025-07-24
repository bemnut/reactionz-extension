import React, { useEffect, useState, useCallback } from "react";
import { ChannelsProvider, usePrivateChannels } from "./channels";

// FIRST: we will wrap our application with the `ChannelsProvider`

function App() {
    // get the user and the access token SOMEHOW!
    const user = null; // via context or any other way
    const token = null; // via local storage or any other ways
    return (
        <ChannelsProvider authUser={user} authToken={token}>
            <Notifications authUserId={user.id} />
        </ChannelsProvider>
    );
}

// Next, we will listen to a private channel for an event
// and update the data on events

// A channel listens to a particular event
// Here is an example event from Laravel when sending notifications
const NOTIFICATION_EVENT =
    ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated";

interface INotification {
    id: number;
    content: string;
}

/**
 * Our notification channel which notif
 */
function useNotificationChannel(
    authUserId: number,
    onChange: (notification: INotification) => void
) {
    const channels = usePrivateChannels(authUserId);
    useEffect(() => {
        if (channels) {
            channels.listen(NOTIFICATION_EVENT, onChange);
            // same as channels.notification(onChange)
            return () => {
                channels.stopListening(NOTIFICATION_EVENT);
            };
        }
    }, [channels, onChange]);
}

export function Notifications({ authUserId }: { authUserId: number }) {
    const [notifications, setNotifications] = useState<Array<INotification>>(
        []
    );
    const handleNotificationsEvent = useCallback(
        (notification: INotification) => {
            setNotifications((existingNotifications) =>
                [notification].concat(existingNotifications)
            );
        },
        []
    );

    useNotificationChannel(authUserId, handleNotificationsEvent);
    return (
        <ol>
            {notifications.map((n) => (
                <li key={n.id}>{n.content}</li>
            ))}
        </ol>
    );
}
