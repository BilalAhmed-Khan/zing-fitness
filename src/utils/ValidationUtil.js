/** @format */

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import * as yup from 'yup';

/*********************************************************
 *
 *  Custom hooks hook forms
 *
 ********************************************************/
// hook for single field
const ValidationType = {
  required: 'required',
  minLength: 'min_length',
  character: 'character',
  confirmPassword: 'confirm_password',
  equalLength: 'equal_length',
  greaterTime: 'greater_time',
  email: 'email',
  url: 'url',
  alphabetic: 'alphabetic',
  alphanumeric: 'alphanumeric',
  space: 'space',
  phone: 'phone',
  cnic: 'cnic',
  ghinNumber: 'ghinNumber',
  number: 'Number',
};
const Regex = {
  alphabets: /^[a-zA-Z ]+$/,
  alphanumeric: /^[a-zA-Z0-9 ]+$/,
  phoneRegExp: /^[0-9]{10}$/,
  ghinNumberRegExp: /^[0-9]{7}$/,
  cnic: /^[0-9]{13}$/,
  // phoneRegExp:
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  space: /^\S*$/,
  lowerCase: /^(?=.*[a-z])/,
  upperCase: /^(?=.*[A-Z])/,
  numeric: /^(?=.*[0-9])/,
  special: /^(?=.*[!@#$%^&*])/,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
};

const strings = (_type, label) => {
  const validation = {
    space: `Enter a valid ${label}`,
    enter: 'Please enter',
    cnic: `Enter a valid ${label}`,
    select: 'Select',
    max_characters: 'Max characters',
    required: `Please enter ${label}`,
    min_length: `Must have ${label} characters or longer`,
    greater_time: `End time must be greater than Start time`,
    equal_length: `Must be ${label} characters`,
    required_select: `Please select ${label}`,
    email: `Please enter valid email address`,
    number: `Enter a valid ${label}`,
    userName: `Enter a valid ${label}`,
    alreadyInUse: `${label} already in use`,
    url: `Enter a valid url`,
    password: `Enter ${label} of 8-16 characters with at least 1 uppercase and 1 special character`,
    alphanumeric: `Enter a valid ${label}`,
    alphabetic: `Enter a valid ${label}`,
    confirm_password_match: `Password and confirm password should be same`,
    new_old_password_match: 'Old and new password should not be same',
    otp: 'Enter the 4 digit code',
    phone: 'Enter a valid mobile number',
    emailMobile: 'Enter a valid email address or mobile number',
    character: `Must have 1 ${label} character`,
    confirm_password: 'Passwords must match',
    ghinNumber: 'Please enter GHIN Number of 7-digits',
  };

  return `${validation[_type]}`;
};

const displayMsg = (label, type) => {
  const _type = type ?? ValidationType.required;
  return strings(_type, label);
};

export const Validation = {
  required: (title, type = ValidationType.required, valueType = 'string') => {
    if (valueType === 'object') {
      return yup[valueType]().nullable(true).required(displayMsg(title, type));
    } else if (valueType === 'array') {
      return yup.array().min(1, displayMsg(title, type));
    }

    return yup[valueType]()
      .nullable(true)
      .trim?.()
      .required(displayMsg(title, type));
  },

  requiredWithoutTrim: (
    title,
    type = ValidationType.required,
    valueType = 'string',
  ) => {
    if (valueType === 'object') {
      return yup[valueType]().nullable(true).required(displayMsg(title, type));
    } else if (valueType === 'array') {
      return yup.array().min(1, displayMsg(title, type));
    }

    return (
      yup[valueType]()
        .nullable(true)
        // .trim?.()
        .required(displayMsg(title, type))
    );
  },

  notRequired: () => yup.string().notRequired(),

  email: title =>
    yup
      .string()
      .required(displayMsg(title))
      .email(displayMsg(title, ValidationType.email)),

  alphanumeric: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.alphanumeric,
        displayMsg('Fullname', ValidationType.alphanumeric),
      ),

  phone: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.phoneRegExp,
        displayMsg('lowerCase', ValidationType.phone),
      ),
  ghinNumber: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.numeric, displayMsg('lowerCase', ValidationType.number)),

  number: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(
        Regex.ghinNumberRegExp,
        displayMsg('lowerCase', ValidationType.ghinNumber),
      ),
  cnic: title =>
    yup
      .string()
      .required(displayMsg(title))

      .matches(Regex.cnic, displayMsg(title, ValidationType.cnic)),

  // password should not be same as old password
  notSamePassword: (title, password) =>
    yup
      .string()
      .required(displayMsg(title))
      .notOneOf([password], displayMsg(title, ValidationType.confirmPassword)),

  password: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.space, displayMsg('password', ValidationType.space))
      .matches(/^(?=.{6,})/, displayMsg('6', ValidationType.minLength))
      .matches(
        Regex.lowerCase,
        displayMsg('lower case', ValidationType.character),
      )
      .matches(
        Regex.upperCase,
        displayMsg('upper case', ValidationType.character),
      )
      .matches(Regex.numeric, displayMsg('numeric', ValidationType.character))
      .matches(Regex.special, displayMsg('special', ValidationType.character)),

  passwordMatch: (matchFieldName, label) =>
    yup
      .string()
      .required(displayMsg(label))
      .test(
        'match',
        displayMsg('', ValidationType.confirmPassword),
        function (val) {
          return val === this.parent?.[matchFieldName] ?? '';
        },
      ),

  // greaterTime: (startTime, label) =>
  //   yup
  //     .string()
  //     .required(displayMsg(label))
  //     .test('greater', displayMsg('', ValidationType.greaterTime), val => {
  //       const isGreater = val > startTime;
  //       console.log('VAL, START TIME, VAL', val, startTime, isGreater);
  //       return isGreater ?? false;
  //     }),

  greaterTime: (start_time, checkFieldName, label) =>
    yup
      .string()
      // .required(displayMsg(label))
      .nullable()
      .test('isNull', displayMsg('End Time'), function (val) {
        //const checkFieldValue = this.parent?.[checkFieldName] ?? '';
        // console.log('val==>', val);
        // console.log('checkFieldName==>', this.parent?.[checkFieldName]);
        // console.log('const checkFieldName==>', checkFieldValue);
        const checkFieldValue = Util.isEmpty(this.parent?.[checkFieldName]);

        if (checkFieldValue && val === '') {
          return false;
        }

        //return true;
        return true;
      })
      .test(
        'greater',
        displayMsg('', ValidationType.greaterTime),
        function (val) {
          console.log('val==>', val);
          console.log('startTime==>', start_time);
          console.log(
            'startTthis.parent?.[checkFieldName]ime==>',
            this.parent?.[checkFieldName],
          );

          const checkFieldValue = Util.isEmpty(this.parent?.[checkFieldName]);

          if (checkFieldValue) {
            const isGreater = val > this.parent?.[start_time];
            return isGreater;
          }
          // console.log(
          //   'VAL, START TIME, VAL',
          //   val,
          //   start_time,
          //   this.parent?.[start_time],
          //   isGreater,
          // );
          return true;
        },
      ),

  checkFieldEmpty: (checkFieldName, label) =>
    yup
      .string()
      .nullable()
      .test('checkField', displayMsg(label), function (val) {
        const checkFieldValue = this.parent?.[checkFieldName] ?? '';
        console.log('condition', checkFieldValue !== '' || val !== '');
        //return true;
        return checkFieldValue !== '' || val !== '';
      }),

  length: (title, _length) =>
    yup
      .string()
      .required(displayMsg(title))
      .test('len', displayMsg(_length, ValidationType.equalLength), val => {
        const valueLength = val?.length ?? 0;
        return valueLength === _length;
      }),

  webUrl: (title, req) =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(Regex.url, displayMsg(title, ValidationType.url)),

  webUrlNotRequired: (title, req) =>
    yup
      .string()
      .notRequired()
      .matches(Regex.url, displayMsg(title, ValidationType.url)),

  optionalwebUrl: (title, req) =>
    yup
      .string()
      .nullable()
      .notRequired()
      .when('website_url', {
        is: website_url => website_url !== '',
        then: Validation.webUrl('Website Url'),
      }),
};

export const useHookField = (formObj, name) => {
  const { control, formState } = formObj;
  const { errors } = formState;
  const inputRef = useRef(null);

  const error = errors?.[name]?.message ?? undefined;

  return {
    forwardRef: inputRef,
    control,
    name,
    error,
  };
};

// hook for form
export const useHookForm = (
  inputs,
  defaultValues = {},
  resolver = undefined,
) => {
  const formObj = useForm({
    resolver: yupResolver(resolver),
    defaultValues: defaultValues,
  });
  const hookInputs = [formObj];
  for (let i = 0; i < inputs.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    hookInputs.push(useHookField(formObj, inputs[i]));
  }
  return hookInputs;
};

/*********************************************************
 *
 *  Validation schema with respect to app
 *
 ********************************************************/
export const ValidationSchema = {
  logIn: yup.object().shape({
    emailAddress: Validation.email('Email'),
    password: Validation.requiredWithoutTrim('Password'),
  }),
  userSignUp: yup.object().shape({
    image: Validation.notRequired('image'),
    firstName: Validation.alphanumeric('First Name'),
    lastName: Validation.alphanumeric('Last Name'),
    emailAddress: Validation.email('Email'),
    gander: Validation.required('Gander'),
    phone: Validation.phone('Phone Number'),
    age: Validation.required('Date Of Birth'),
    password: Validation.password('Password'),
    confirmPassword: Validation.passwordMatch('password', 'Confirm Password'),
  }),
  trainerSignUp: yup.object().shape({
    image: Validation.notRequired('image'),
    firstName: Validation.alphanumeric('First Name'),
    lastName: Validation.alphanumeric('Last Name'),
    emailAddress: Validation.email('Email'),
    gander: Validation.required('Gander'),
    phone: Validation.phone('Phone Number'),
    yearsOfExperience: Validation.required('Years Of Experience'),
    password: Validation.password('Password'),
    confirmPassword: Validation.passwordMatch('password', 'Confirm Password'),
  }),
  traineeProfile: yup.object().shape({
    image: Validation.notRequired('image', 'required'),
    firstName: Validation.alphanumeric('First Name'),
    lastName: Validation.alphanumeric('Last Name'),
    emailAddress: Validation.email('Email'),
    gander: Validation.required('Gander', 'required_select'),
    phone: Validation.phone('Phone Number'),
    yearsOfExperience: Validation.required('Years Of Experience'),
    // timeZone: Validation.required('Time Zone', 'required_select'),
  }),
  userProfile: yup.object().shape({
    image: Validation.notRequired('image', 'required'),
    firstName: Validation.alphanumeric('First Name'),
    lastName: Validation.alphanumeric('Last Name'),
    emailAddress: Validation.email('Email'),
    gander: Validation.required('Gander', 'required_select'),
    phone: Validation.phone('Phone Number'),
    age: Validation.required('Date Of Birth'),
    weight: Validation.required('weight'),
    height: Validation.required('height'),
    commonHealthProblem: Validation.required('commonHealthProblem'),
    // timeZone: Validation.required('Time Zone', 'required_select'),
  }),
  forgetPassword: yup.object().shape({
    emailAddress: Validation.email('Email'),
  }),
  bankDetails: yup.object().shape({
    bankName: Validation.required('Bank Name'),
    accountHolderName: Validation.required('Account Holder Name'),
    accountNumber: Validation.required('Account Number'),
    routingNumber: Validation.required('Routing Number'),
    city: Validation.required('City'),
    address: Validation.required('Address'),
    postalCode: Validation.required('Postal Code'),
    idNumber: Validation.required('ID Number'),
    stateName: Validation.required('State'),
    dob: Validation.required('Date Of Birth'),
    frontOfId: Validation.required('Front Of ID'),
    backOfId: Validation.required('Back Of ID'),
  }),
  trainerCertificateForm: yup.object().shape({
    title: Validation.required('Title'),
    organization: Validation.required('Organization'),
    date: Validation.required('Date'),
    certificateFileUrl: Validation.required('Certificate'),
  }),
  resetPassword: yup.object().shape({
    newPassword: Validation.password('Password'),
    confirmPassword: Validation.passwordMatch(
      'newPassword',
      'Confirm Password',
    ),
  }),
  changePassword: yup.object().shape({
    oldPassword: Validation.required('Old Password'),
    newPassword: Validation.password('New Password'),
    confirmPassword: Validation.passwordMatch(
      'newPassword',
      'Confirm Password',
    ),
  }),

  sessionSettings: yup.object().shape({
    price: Validation.required('Session Rate'),
    duration: Validation.required('Duration', 'required_select'),
    description: Validation.required('Description'),
  }),
  sessionEdit: yup.object().shape({
    price: Validation.required('Session Rate'),
    duration: Validation.required('Duration', 'required_select'),
    description: Validation.required('Description'),
    // timeZone: Validation.required('Time Zone', 'required_select'),
    breakTime: Validation.required('Break Time', 'required_select'),
    startTime: Validation.required('Start Time'),
    endTime: Validation.required('End Time'),
  }),

  sessionSettingsStep2: yup.object().shape({
    // timeZone: Validation.required('Time Zone', 'required_select'),
    breakTime: Validation.required('Break Time', 'required_select'),
    startTime: Validation.required('Start Time'),
    endTime: Validation.required('End Time'),
    // description: Validation.required('description'),
  }),

  createClass: yup.object().shape({
    title: Validation.required('Class Title'),
    description: Validation.required('Description'),
    price: Validation.required('Session Rate'),
    duration: Validation.required('Duration', 'required_select'),
    // breakTime: Validation.required('Break Time', 'required_select'),
    maxParticipants: Validation.required('Max Participants'),
    startTime: Validation.required('Start Time'),
    endTime: Validation.required('End Time'),
    address: Validation.required('Location'),
  }),

  support: yup.object().shape({
    subject: Validation.required('Session Rate'),
    description: Validation.required('Description'),
  }),
  selectHeight: yup.object().shape({
    height: Validation.required('height'),
  }),
  selectWeight: yup.object().shape({
    weight: Validation.required('weight'),
  }),
  commonHealthProblem: yup.object().shape({
    commonHealthProblem: Validation.required('commonHealthProblem'),
  }),
  userLocation: yup.object().shape({
    timeZone: Validation.notRequired('Time Zone'),
  }),
  participants: yup.object().shape({
    image: Validation.notRequired('image'),
    firstName: Validation.alphanumeric('First Name'),
    lastName: Validation.alphanumeric('Last Name'),
    gander: Validation.required('Gander', 'required_select'),
    age: Validation.required('Date Of Birth'),
    height: Validation.required('height'),
    weight: Validation.required('weight'),
    commonHealthProblem: Validation.required('commonHealthProblem'),
  }),
  addRating: yup.object().shape({
    rating: Validation.notRequired('Rating'),
    review: Validation.required('Review'),
  }),
  cancellation: yup.object().shape({
    cancelReason: Validation.required('Cancel Reason'),
  }),
  findTrainer: yup.object().shape({
    duration: Validation.required('Duration', 'required_select'),
    categories: Validation.required('Category', 'required_select'),
    startTime: Validation.required('Start Time'),
  }),
  filter: yup.object().shape({
    experience: Validation.notRequired('Experience', 'required_select'),
  }),
  bookSession: yup.object().shape({
    categoryId: Validation.required('Category', 'required_select'),
  }),
};

export default { ValidationSchema, useHookField, useHookForm };
