import * as yup from 'yup';

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const username = yup
  .string()
  .required('Username is Required')
  .min(3, 'Username should have atleast 3 characters')
  .max(20, 'Username should have not more than 20 characters')
  .matches(/^[A-Za-z]+$/, 'Username should be letters ONLY!!!');

const file = yup
  .mixed()
  .required('A file is required')
  .test(
    'fileSize',
    'File too large',
    (value) => value && value.size <= FILE_SIZE
  )
  .test(
    'fileFormat',
    'Unsupported Format',
    (value) => value && SUPPORTED_FORMATS.includes(value.type)
  );

const password = yup
  .string()
  .required('Password is Required')
  .min(5, 'Password should have atleast 5 characters')
  .max(20, 'Password should not exceed 20 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).+$/,
    'Password must have atleast one lowercase letter, one uppercase letter, one digit and one special character'
  );

const oldPassword = yup
  .string()
  .required('Password is Required')
  .min(5, 'Password should have atleast 5 characters')
  .max(20, 'Password should not exceed 20 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).+$/,
    'Password must have atleast one lowercase letter, one uppercase letter, one digit and one special character'
  );

const newPassword = yup
  .string()
  .required('Password is Required')
  .min(5, 'Password should have atleast 5 characters')
  .max(20, 'Password should not exceed 20 characters')
  .notOneOf(
    [yup.ref('password'), null],
    'You cannot reuse your old password, please enter a new password'
  )
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*.,?]).+$/,
    'Password must have atleast one lowercase letter, one uppercase letter and one digit'
  );

const confirmPassword = yup
  .string()
  .required('Confirm Password is Required')
  .oneOf(
    [yup.ref('newPassword'), null],
    'New Passwords and Confirm password must match'
  );

const firstName = yup
  .string()
  .required('firstName is Required')
  .min(3, 'First Name should have atleast 3 characters')
  .matches(/^[A-Za-z]+$/, 'First name should be one word only');

const otherNames = yup
  .string()
  .required('Other Names is Required')
  .min(3, 'First Name should have atleast 3 characters')
  .matches(
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
    'Other Names should be letters only and one space'
  );

const email = yup
  .string()
  .required('Email is Required')
  .email('Invalid email address');

const employeeID = yup
  .string()
  .required('User National ID Number is required')
  .matches(/^\d{8}$/, 'Invalid ID Number');

const role = yup
  .string()
  .required('Provide user role in the system')
  .min(3, 'Invalid Role')
  .matches(
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
    'Role should be letters only and one space'
  );

const branch = yup
  .string()
  .required('Provide user Branch')
  .min(3, 'Invalid Branch')
  .matches(
    /^[a-zA-Z]+(\s[a-zA-Z]+)?$/,
    'Branch Name should be letters only and one space'
  );

const phoneNo = yup
  .string()
  .required('User Phone Number is required')
  .matches(/^0\d{9}$/, 'Invalid Phone Number');

const pin = yup
  .string()
  .matches(/^[0-9]{4}$/, 'Pin should be 4 digits')
  .required()
  .label('Pin');

export const userRegistrationRules = yup.object().shape({
  username,
  email,
  firstName,
  otherNames,
  phoneNo,
  role,
  branch,
  employeeID,
  file
});

export const userAuthenticationRules = yup.object().shape({
  username,
  password
});

export const userPasswordChangeRules = yup.object().shape({
  username,
  password,
  newPassword,
  confirmPassword
});

export const userPasswordResetRules = yup.object().shape({
  username,
  email
});

export const userUpdateRules = yup.object().shape({
  branch,
  email,
  phoneNo,
  role
});
