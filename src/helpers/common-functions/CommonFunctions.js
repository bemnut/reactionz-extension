export const getTheContactsList = async () => {
    let loop = true;
    let collectedItems = [];
    var theResponse = [];
    //var path = `${url.LIST_CONTACTS}?limit=10&cursorId=-1`;
    var path = `${url.LIST_CONTACTS}`;

    while (loop) {
        const response = await api.create(path, {
            filter: { $and: [] },
            search: "",
            timezone: "Asia/Kuala_Lumpur",
        });
        if (
            response &&
            response.items &&
            response.items.length &&
            response.items.length > 0
        ) {
            collectedItems = [...collectedItems, ...response.items];

            if (response.pagination.next != null) {
                path = response.pagination.next;
                path = path.substring(path.indexOf("/contact"));
                loop = true;
            } else {
                loop = false;
            }
            response.items = collectedItems;
            theResponse = response;
        }
    }

    return theResponse;
};

export const getTheUsersList = async () => {
    let loop = true;
    let collectedItems = [];
    var theResponse = [];
    var path = `${url.LIST_USERS}`;

    //api.get(url.LIST_USERS);

    while (loop) {
        const response = await api.get(path);
        if (
            response &&
            response.items &&
            response.items.length &&
            response.items.length > 0
        ) {
            collectedItems = [...collectedItems, ...response.items];

            if (response.pagination.next != null) {
                path = response.pagination.next;
                path = path.substring(path.indexOf("/space/user"));
                loop = true;
            } else {
                loop = false;
            }
            response.items = collectedItems;
            theResponse = response;
        }
    }

    return theResponse;
};

export const getTheContactChannelsList = async (identifier) => {
    let loop = true;
    let collectedItems = [];
    var theResponse = [];
    var path = `${url.LIST_CONTACT_CHANNELS}/id:${identifier}/channels`;

    //api.get(url.LIST_USERS);

    while (loop) {
        const response = await api.get(path);
        if (
            response &&
            response.items &&
            response.items.length &&
            response.items.length > 0
        ) {
            collectedItems = [...collectedItems, ...response.items];

            if (response.pagination.next != null) {
                path = response.pagination.next;
                path = path.substring(path.indexOf("/contact"));
                loop = true;
            } else {
                loop = false;
            }
            response.items = collectedItems;
            theResponse = response;
        }
    }

    return theResponse;
};
