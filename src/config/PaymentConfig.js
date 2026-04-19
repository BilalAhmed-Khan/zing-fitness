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
// google
export const googlePayRequestConfig = {
  testEnv: __DEV__,
  merchantName: 'Zing Fitness',
  countryCode: 'US',
  billingAddressConfig: {
    format: 'MIN',
    isPhoneNumberRequired: true,
    isRequired: false,
  },
};
