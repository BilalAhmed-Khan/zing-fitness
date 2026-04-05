import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';
import PropTypes from 'prop-types';

import { Text } from '../';
import { Styles } from './Styles';
import { Colors } from '../../theme';

const PaymentMethodItem = ({
  paymentMethod,
  selectedPayment,
  onSelectedPayment,
}) => {
  // const [selected, setSelected] = useState(false);

  const _onPress = () => {
    setSelected(!selected);
  };

  return (
    <Pressable
      onPress={() => onSelectedPayment(paymentMethod)}
      style={[
        Styles.paymentMethodItem,
        selectedPayment === paymentMethod.type && {
          borderColor: Colors.primary,
        },
      ]}>
      <Image source={paymentMethod.image} />
      <Text style={Styles.name}>{paymentMethod.name}</Text>
      <View
        style={[
          Styles.button,
          selectedPayment === paymentMethod.type && {
            backgroundColor: Colors.primary,
          },
        ]}
      />
    </Pressable>
  );
};

const PaymentMethods = ({
  paymentMethods,
  selectedPayment,
  onSelectedPayment,
}) => (
  <View style={Styles.paymentMethod}>
    {paymentMethods.map(_paymentMethod => (
      <PaymentMethodItem
        paymentMethod={_paymentMethod}
        selectedPayment={selectedPayment}
        onSelectedPayment={onSelectedPayment}
      />
    ))}
  </View>
);

PaymentMethods.propTypes = {
  paymentMethods: PropTypes.array,
};

export default PaymentMethods;
