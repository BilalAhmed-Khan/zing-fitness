import { Colors, Images } from '../theme';

export const GENDER = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
];

export const SESSION_DURATION = [
  { label: '30 minutes', value: '30' },
  { label: '60 minutes', value: '60' },
  { label: '90 minutes', value: '90' },
];

export const BREAK_TIME = [
  { label: '30 minutes', value: '30' },
  { label: '60 minutes', value: '60' },
];

export const HEIGHT = [
  { id: 1, label: 'Feet', value: 'feet', unit: 'ft' },
  { id: 2, label: 'inches', value: 'inch', unit: 'inch' },
];

export const STATUS = [
  { id: 1, label: 'ONLINE', value: 'online', unit: 'ft' },
  { id: 2, label: 'OFFLINE', value: 'offline', unit: 'cm' },
];

export const WEIGHT = [
  { id: 1, label: 'Pound', value: 'pound', unit: 'lb' },
  { id: 2, label: 'Kilogram', value: 'kilogram', unit: 'kg' },
];

export const PAYMENT_METHODS = [
  {
    id: 1,
    name: 'Credit/Debit Card',
    image: Images.creditCard,
    type: 'STRIPE',
  },
  { id: 3, name: 'Apple Pay', image: Images.applePay, type: 'APPLE' },
];

export const PAYMENT_METHODS_ANDROID = [
  {
    id: 1,
    name: 'Credit/Debit Card',
    image: Images.creditCard,
    type: 'STRIPE',
  },
  { id: 2, name: 'Google Pay', image: Images.googlePay, type: 'GOOGLE' },
];

export const USER_SETTINGS = [
  {
    title: 'Profile',
    data: [
      {
        icon: Images.editprofileicon,
        title: 'Edit Profile',
        navigationScreen: 'UserEditProfile',
      },
      {
        icon: Images.resetpassword,
        title: 'Reset Password',
        navigationScreen: 'UserResetPassword',
      },
      {
        icon: Images.locationSetting,
        title: 'Location Settings',
        navigationScreen: 'TrainerServiceAreas',
      },
      {
        icon: Images.notificationsetting,
        title: 'Notification Settings',
        navigationScreen: 'NotificationSetting',
      },
    ],
  },
  {
    title: 'Support',
    data: [
      {
        icon: Images.termpolicies,
        title: 'Terms & Policies',
        // navigationScreen: 'UserTermsAndPolicies',
      },
      {
        icon: Images.resetpassword,
        title: 'Help',
        navigationScreen: 'UserHelp',
      },
      {
        icon: Images.trash,
        title: 'Delete Account',
        color: Colors.primary,
      },
      {
        icon: Images.logout,
        title: 'Logout',
        color: Colors.primary,
      },
    ],
  },
];

export const notificationSettingData = [
  {
    title: 'Show Notifications',
    identifier: 'showNotification',
  },
  {
    title: 'Show App Icon Badge',
    identifier: 'showAppIconBadge',
  },
  {
    title: 'Floating Notifications',
    identifier: 'floatingNotification',
  },
  {
    title: 'Lock Screen Notifications',
    identifier: 'lockScreenNotification',
  },
  {
    title: 'Allow Sound',
    identifier: 'allowSound',
  },
  {
    title: 'Allow Vibration',
    identifier: 'allowVibration',
  },
];

export const TRAINING_CATEGORIES = [
  { id: 1, title: 'Cardio', image: Images.cardio },
  { id: 2, title: 'Yoga', image: Images.yoga },
  { id: 3, title: 'Stretch', image: Images.stretch },
  { id: 4, title: 'Zumba', image: Images.zumba },
  { id: 5, title: 'Crossfit', image: Images.crossfit },
  { id: 6, title: 'Pilates', image: Images.pilates },
];

export const SESSION_TYPE = [
  { id: 1, title: 'Single Sessions', image: Images.singleSession },
  { id: 2, title: 'Group Sessions', image: Images.groupSession },
  { id: 3, title: 'Training Classes', image: Images.trainingSession },
];

export const DAYS_LIST = [
  { id: 1, label: 'Mon', day: 'monday' },
  { id: 2, label: 'Tue', day: 'tuesday' },
  { id: 3, label: 'Wed', day: 'wednesday' },
  { id: 4, label: 'Thurs', day: 'thursday' },
  { id: 5, label: 'Fri', day: 'friday' },
  { id: 6, label: 'Sat', day: 'saturday' },
  { id: 7, label: 'Sun', day: 'sunday' },
];

export const UPLOAD_IMAGE_LIMIT = 6;

export const COORDINATES_DELTA = {
  latitudeDelta: 0.0943,
  longitudeDelta: 0.0934,
  // latitudeDelta: 0.015,
  // longitudeDelta: 0.0121,
};

export const GOOGLE_SEARCH = {
  // key: 'AIzaSyBAakQNuAxHLhkMnPTMDPBgryzGgu7TI5I',
  key: 'AIzaSyBSiueaVXL4II2dqkqI9obmkEqFIwNlBHI',
  language: 'en',
  type: 'address',
  components: 'country:us',
};

export const WEEKS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const PAYMENT_TYPE = {
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
  STRIPE: 'STRIPE',
};

// export const GOOGLE_API_KEY = 'AIzaSyBAakQNuAxHLhkMnPTMDPBgryzGgu7TI5I';
export const GOOGLE_API_KEY = 'AIzaSyBSiueaVXL4II2dqkqI9obmkEqFIwNlBHI'

// export const CLIENT_SECRET_KEY =
  // 'pk_test_51K8AlYJxTbhFoR58UFRSnyThxQ6C7Bj1F13cIKOWLxWakGXzvQUoN4K8LLA3IP00R53rL4NTqz0e7rfUThZ4ZLYw00c5WBTc1w';

export const CLIENT_SECRET_KEY = 'pk_live_43WucXZyV4738b9EkbVrzsuw';

export const bookingTabs = [
  {
    key: 'booking',
    title: 'Booking',
  },
  {
    key: 'bookingHistory',
    title: 'Booking History',
  },
];

export const ProfileTabs = [
  {
    key: 'scheduledSession',
    title: 'Scheduled Session',
  },
  {
    key: 'myTrainers',
    title: 'My Trainer',
  },
];

export const TrainerHomeTabs = [
  {
    key: 'myAppointments',
    title: 'My Appointments',
  },
  {
    key: 'myTrainees',
    title: 'My Trainees',
  },
];

export const BOOKING_SESSION_TYPE = {
  SESSION: 'session',
  CLASS: 'class',
  REALTIME: '',
};

export const SESSION_STATUS = {
  SESSION: 'session',
  CLASS: 'class',
};

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  TRAINER_ACCEPTED: 'TRAINER_ACCEPTED',
  START: 'STARTED',
  END: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const TRAINER_STATUS = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

export const Experience = [
  { id: 1, label: '1 year', day: '1' },
  { id: 2, label: '2 year', day: '2' },
  { id: 3, label: '3 year', day: '3' },
  { id: 4, label: '4 year', day: '4' },
  { id: 5, label: '5 year', day: '5' },
  { id: 6, label: '6 year', day: '6' },
  { id: 7, label: '7 year', day: '7' },
  { id: 8, label: '8 year', day: '8' },
  { id: 9, label: '9 year', day: '9' },
  { id: 10, label: '10 year', day: '10' },
  { id: 11, label: '11 year', day: '11' },
  { id: 12, label: '12 year', day: '12' },
  { id: 13, label: '13 year', day: '13' },
  { id: 14, label: '14 year', day: '14' },
  { id: 15, label: '15 year', day: '15' },
  { id: 6, label: '16 year', day: '16' },
  { id: 7, label: '17 year', day: '17' },
  { id: 8, label: '18 year', day: '18' },
  { id: 9, label: '19 year', day: '19' },
  { id: 10, label: '20 year', day: '20' },
];
