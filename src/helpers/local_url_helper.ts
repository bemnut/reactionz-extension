//REGISTER
export const UPLOAD_PROFILE_PICTURE = "/api/upload-profile-picture";
export const STORE_MESSAGE = "/api/message";
export const GET_MESSAGES = "/api/message";
//api/user
export const GET_USERS_EMAILS = "/api/user";
export const GET_USERS_COMPANY_REGISTRAION_IDS = "/api/user";

export const LIST_ACCOUNTS = "/api/account";
export const CREATE_ACCOUNT = "/api/account";
export const LIST_MODEL_ITEMS = "/api/model";
export const CREATE_MODEL_ITEM = "/api/model";
export const COUNT_ACTIVE_MAIN_MENU_ITEMS = "/api/counter";
export const LOAD_USER_MENUS = "/api/user";
export const LOAD_USER_ACTIVE_MENUS = "/api/user-menus";
export const UPDATE_USER_ACTIVE_MENUS = "/api/user-menus";
export const GET_USER_MAIN_ACTIVE_MENU_COLUMNS = "/api/user";
export const GET_USER_MAIN_ACTIVE_MENU_ACTIVE_COLUMNS = "/api/user";
export const UPDATE_USER_MAIN_ACTIVE_MENU_ACTIVE_COLUMNS = "/api/user";
export const LOAD_USER_MAIN_ACTIVE_MENU_VIEWS = "/api/user-view";
export const ADD_MAIN_ACTIVE_MENU_VIEW = "/api/user-view";
export const DUPLICATE_MAIN_ACTIVE_MENU_ACTIVE_VIEW = "/api/user-view";
export const DELETE_MAIN_ACTIVE_MENU_ACTIVE_VIEW = "/api/user-view";
export const CHANGE_MAIN_ACTIVE_MENU_VIEW_NAME = "/api/user-view";
export const LOAD_MAIN_ACTIVE_MENU_SCHEMA = "/api/user-menus";
export const ADD_ACTIVE_VIEW_FILTER = "/api/user-view";
export const LOAD_ACTIVE_VIEW_FILTERS = "/api/user-view";
export const GET_RECORD = "/api/record";

//////////////////////////////////////////////////////////////////
export const ACCEPT_INVITE = "/invitations/accept";
export const RESET_PASSWORD = "/reset-password";

/**
 * Company backend routes
 */
export const COMPANY_GET = "/companies";
export const COMPANY_UPDATE = "/companies";

/**
 * Entity backend routes
 */
export const ENTITY_GET = "/entities";
export const ENTITY_GET_ONE = "/entities";
export const ENTITY_ADD = "/entities";
export const ENTITY_UPDATE = "/entities";

/**
 * Entity Fields backend routes
 */
export const ENTITY_FIELDS_GET = "/entities";
export const ENTITY_FIELDS_ADD = "/entity-fields"; // entities/fields
export const ENTITY_FIELDS_UPDATE = "/entity-fields";
export const FIELD_TYPES_GET = "field-types";

/**
 * Entity Items backend routes
 */
export const ENTITY_ITEMS_GET = "/entity-items";
export const ENTITY_ITEMS_ADD = "/entity-items";
export const ENTITY_ITEM_GET = "/entity-items";
export const ENTITY_ITEMS_UPDATE = "entity-items";
export const ENTITY_ITEMS_DELETE = "/entity-items";

/**
 * Entity Views backend routes
 */
export const ENTITY_VIEWS_GET = "/entities";
export const ENTITY_VIEW_GET = "/entity-views";
export const ENTITY_VIEW_UPDATE = "/entity-views";
export const ENTITY_VIEW_COLUMNS_UPDATE = "/entity-views";
export const ENTITY_VIEWS_ADD = "/entity-views";
export const ENTITY_VIEWS_DELETE = "/entity-views";

export const ENTITY_VIEW_ITEMS_GET = "/entity-views";

//////////////////////////////////////////////////////////////////////

/**
 * User backend routes
 */
export const USER_REGISTER = "/auth/register";
export const USER_LOGIN = "/login";
export const USER_LOGOUT = "/logout";
export const USER_FORGOT_PASSWORD = "/auth/forgot-password";

/**
 *  CONTACTS END POINT
 */
export const CONTACTS_GET = "/contacts";
export const GROUPS_GET = "/api/wpbox/getGroups";
export const COUNTRIES_GET = "/api/wpbox/getCountries";
export const CONTACTS_ADD = "/contacts";
export const CONTACTS_AGENT_ASSIGN = "/contacts";
export const CONTACTS_DELETE = "/contacts";
export const CONTACTS_BLOCK = "/contacts";
export const CONTACTS_UNBLOCK = "/contacts";
export const CONTACTS_UPDATE = "/contacts";
export const CONTACTS_UPDATE_TAGS = "/contacts";
export const CONTACTS_UPDATE_LIFECYCLE = "/contacts";

/**
 *  CHANNELS END POINT
 */
export const CHANNELS_GET = "/channels";

/**
 *  USERS END POINT
 */
export const USERS_GET = "/users";

/**
 *  TAGS END POINT
 */
export const TAGS_GET = "/tags";

/**
 *  LIFECYCLES END POINT
 */
export const LIFECYCLES_GET = "/life-cycles";

/**
 *  MESSAGES END POINT
 */
export const CONVERSATIONS_GET = "/conversations";
export const CONVERSATION_STATUS_UPDATE = "/contact";

export const MESSAGES_GET = "/conversations";
export const CONVERSATIONS_MARK_AS_READ = "/conversations";
export const MESSAGES_TEXT_SEND = "/contact";
export const MESSAGES_ATTACHMENT_SEND = "/contact";

export const MESSAGES_TEMPLATE_SEND = "/contact";
export const MESSAGES_CAMPAIGN_SEND = "/api/wpbox/sendcampaigns";

/**
 *  TEMPLATES END POINT
 */
export const TEMPLATES_GET = "/templates";

/**
 *  CAMPAIGNS END POINT
 */
export const CAMPAIGNS_GET = "/api/wpbox/getCampaigns";

/**
 *  FILES END POINT
 */
export const UPLOAD_FILE = "/file/upload";
export const GET_FILE_UPLOAD_STATUS = "/file/status";


/**
 *  SNIPPETS END POINT
 */
export const MESSAGE_SNIPPETS_GET = "/snippets";
