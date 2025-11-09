import { combineReducers } from "redux";

import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ChatsReducer from "./chat/reducer";
import ContactsReducer from "./contact/reducer";
import MessagesReducer from "./message/reducer";
import TemplatesReducer from "./template/reducer";
import CampaginsReducer from "./campaign/reducer";
import LayoutReducer from "./layout/reducer";
import ChannelReducer from "./channel/reducer";
import UsersReducer from "./users/reducer";
import TagReducer from "./tag/reducer";
import LifeCycleReducer from "./lifeCycle/reducer";
import FileReducer from "./file/reducer";
import NotificationReducer from "./notification/reducer";

//Ecommerce

const rootReducer = combineReducers({
    Login: LoginReducer,
    Account: AccountReducer,
    Chat: ChatsReducer,
    Contact: ContactsReducer,
    Message: MessagesReducer,
    Template: TemplatesReducer,
    Campaign: CampaginsReducer,
    Layout: LayoutReducer,
    Channel: ChannelReducer,
    User: UsersReducer,
    Tag: TagReducer,
    LifeCycle: LifeCycleReducer,
    File: FileReducer,
    Notification: NotificationReducer,
});

export default rootReducer;
