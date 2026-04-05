import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  Container,
  UnitInput,
  Button,
  RadioButton,
  TextInputNative,
  Text,
} from '../../components';
import { WEIGHT } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Styles } from './Styles';

const UserSelectWeight = ({ route }) => {
  const payload = route.params?.payload ?? {};
  const [unit, setUnit] = useState(true);

  // init form inputs
  const [formObj, weightProps] = useHookForm(
    ['weight'],
    {},
    ValidationSchema.selectWeight,
  );

  const submit = formObj.handleSubmit(values => {
    values.weightUnit = unit ? 'lb' : 'kg';
    console.log('values', values);
    const newPayload = {
      ...payload,
      ...values,
    };
    NavigationService.navigate('UserHealthProblems', { payload: newPayload });
  });

  const onButtonPress = (flag, sucess) => {
    console.log('onButtonPress', unit);
    setUnit(!unit);
  };

  return (
    <Container headerTitle="User Registration">
      <ScrollView contentContainerStyle={Styles.container}>
        <Text style={Styles.title}>{'Select Weight'}</Text>
        <RadioButton
          buttons={WEIGHT}
          isOnline={unit}
          onButtonPress={onButtonPress}
        />
        <View style={Styles.inputContainer}>
          <TextInputNative
            inputViewStyle={Styles.inputView}
            inputContainerStyle={Styles.input}
            textAlign={'center'}
            keyboardType="numeric"
            maxLength={3}
            {...weightProps}
          />
          <Text style={Styles.unit}>{unit ? 'lb' : 'kg'}</Text>
        </View>
      </ScrollView>
      <Button onPress={submit} title="Save & Continue" largeButton />
    </Container>
  );
};

export default UserSelectWeight;
