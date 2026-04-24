import { CLIENT_SECRET_KEY } from './Constants';

export const applePayRequestConfig = {
  cartItems: [
    {
      label: 'Example item name',
      amount: '100',
      paymentType: 'Immediate',
    },
  ],
  country: 'US',
  currency: 'USD',
  merchantName: 'merchant.app.zingfitness',
};
// google — must match Stripe key mode: live Google Pay when using pk_live; test UI when using pk_test
// (__DEV__ alone does not, and confused live Stripe with test Google Pay)
export const googlePayRequestConfig = {
  testEnv: CLIENT_SECRET_KEY.startsWith('pk_test_'),
  merchantName: 'Zing Fitness',
  countryCode: 'US',
  billingAddressConfig: {
    format: 'MIN',
    isPhoneNumberRequired: true,
    isRequired: false,
  },
};
