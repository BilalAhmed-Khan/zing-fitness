//staging
// export const BASE_URL = 'http://66.135.2.252:8118';
// export const SOCKET_URL = 'http://66.135.2.252:8081';

//production
// export const BASE_URL = 'http://203.161.61.58:8118';
export const SOCKET_URL = 'http://203.161.61.58:8081';
export const BASE_URL = 'https://api.zingfitnessapp.com';
// export const SOCKET_URL = 'https://chat.zingfitnessapp.com';
//token type
export const X_API_TOKEN = 'X-Access-Token';

export const API = '/';
export const API_TIMEOUT = 30000;
export const API_LOG = true;
export const LIMIT = 20;

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

// API'S

//Auth
export const API_USER_SIGNUP = {
  route: `${API}auth/signup/user`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const API_TRAINER_SIGNUP = {
  route: `${API}auth/signup/trainer`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
export const API_LOGIN = {
  route: `${API}auth/login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_EXTERNAL_LOGIN = {
  route: `${API}auth/social-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_EMAIL_VERIFCATION = {
  route: `${API}auth/verify/forgot-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_EMAIL_REGISTRATION_VERIFCATION = {
  route: `${API}auth/verify-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_FORGET_PASSWORD = {
  route: `${API}auth/forgot-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_CREATE_PASSWORD = {
  route: `${API}auth/change/forgot-password`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_RESEND_OTP = {
  route: `${API}auth/otp/resend/`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_USER_PROFILESETUP = {
  route: `${API}user/user/me/`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_LOGOUT = {
  route: `${API}auth/logout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_APPLE_TOKEN = {
  route: `${API}auth/apple-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_ACCOUNT = {
  route: `${API}deactivate-account`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_GET_PROFILE = {
  route: `${API}profile`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_PROFILE = {
  route: `${API}update-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_CHANGE_PASSWORD = {
  route: `${API}auth/change-password`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_TOGGLE_NOTIFICATION = {
  route: `${API}user/user/notification_settings/`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_SUPPORT = {
  route: `${API}support`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_STATES = {
  route: `${API}states`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SETTING = {
  route: `${API}app-settings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//certificate
export const API_GET_TRAINEE_CERTIFICATE = {
  route: `${API}trainercertificate`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_TRAINEE_CERTIFICATE = {
  route: `${API}trainercertificate`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_TRAINEE_CERTIFICATE = {
  route: `${API}trainercertificate`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_DELETE_TRAINEE_CERTIFICATE = {
  route: `${API}trainercertificate`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_GET_TRAINEE_CATEGORY = {
  route: `${API}category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SELECT_TRAINEE_CATEGORY = {
  route: `${API}trainercategory`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CREATE_SESSION = {
  route: `${API}session`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_SESSION = {
  route: `${API}session`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_CLASSES = {
  route: `${API}class/coach`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_DELETE_CLASSES = {
  route: `${API}class`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const API_CREATE_CLASSES = {
  route: `${API}class`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_CLASSES = {
  route: `${API}class`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

// bank
export const API_GET_BANK_ACCOUNT = {
  route: `${API}trainerbankdetail`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_CREATE_BANK_ACCOUNT = {
  route: `${API}trainerbankdetail`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

//dashboard
export const API_GET_DASHBOARD = {
  route: `${API}dashboard/user`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_GET_TRAINER_DASHBOARD = {
  route: `${API}dashboard/trainer`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
//notification
export const API_GET_NOTIFICATION = {
  route: `${API}notifications`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_NOTIFICATION_UNREAD_COUNT = {
  route: `${API}notifications/unread/count`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_READ_ALL_NOTIFICATION = {
  route: `${API}notifications/read-all`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_CLEAR_ALL_NOTIFICATION = {
  route: `${API}notifications/clear-all`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

//booking
export const API_BOOK_A_SESSION = {
  route: `${API}bookings/session`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_BOOK_A_CLASS = {
  route: `${API}bookings/class`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_START_A_SESSION = {
  route: `${API}bookings/start/session`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_START_A_CLASS = {
  route: `${API}bookings/start/class`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_END_A_SESSION = {
  route: `${API}bookings/end/session`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_END_A_CLASS = {
  route: `${API}bookings/end/class`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_SESSION_RATING = {
  route: `${API}bookings/rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_BOOKING_LISTING = {
  route: `${API}bookings/scheduled`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_BOOKING_HISTORY = {
  route: `${API}bookings/history`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_ADD_PARTICIPANTS = {
  route: `${API}bookingparticipants`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_UPDATE_PARTICIPANTS = {
  route: `${API}bookingparticipants`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const API_DELETE_PARTICIPANTS = {
  route: `${API}bookingparticipants`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const API_BOOKING_DETAILS = {
  route: `${API}bookings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_CANCEL_BOOKING = {
  route: `${API}bookings/cancel`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_BOOKING_TRAINEES = {
  route: `${API}bookings/trainees`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_FIND_TRAINERS = {
  route: `${API}bookings/real-time`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_ACCEPT_TRAINERS = {
  route: `${API}bookings/real-time/accept`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_REJECT_TRAINERS = {
  route: `${API}bookings/real-time/reject`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};
export const API_PAYMENT_INTENT = {
  route: `${API}bookings/real-time/payment-intent`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_WITHDRAW = {
  route: `${API}withdrawtransaction`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_WITHDRAW_LISTING = {
  route: `${API}withdrawtransaction`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

//user
export const API_GET_TRAINER_LISTING = {
  route: `${API}user/trainers`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_GET_TRAINER_SESSION = {
  route: `${API}session/trainer`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_GET_MY_TRAINER = {
  route: `${API}bookings/trainees`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_GET_FAVIOURITE_TRAINER = {
  route: `${API}bookings/trainers`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_TRAINER_BREAK_TIME = {
  route: `${API}trainerbreaktime`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const API_ADD_TRAINER_BREAK_TIME = {
  route: `${API}trainerbreaktime`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const API_DELETE_TRAINER_BREAK_TIME = {
  route: `${API}trainerbreaktime`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
//cms
export const API_CMS = {
  route: `${API}cms/terms-policy`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
export const API_GET_HELP = {
  route: `${API}cms/help`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};
// upload image
export const API_UPLOAD_FILE = {
  route: `${API}file/upload`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};
