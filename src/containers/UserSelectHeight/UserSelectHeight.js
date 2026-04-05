import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  Container,
  UnitInput,
  Button,
  RadioButton,
  TextInputNative,
  Text,
  TextInput,
} from '../../components';
import { HEIGHT } from '../../config/Constants';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Styles } from './Styles';

const UserSelectHeight = () => {
  const [unit, setUnit] = useState(true);
  const [feet, setfeet] = useState('0');
  const [inches, setinches] = useState('0');
  // init form inputs
  const [formObj, heightProps] = useHookForm(
    ['height'],
    {},
    ValidationSchema.selectHeight,
  );

  const onPressContinue = () => {
    if (feet === '0') {
      Util.showMessage('please fill input correctly');
      return;
    }
    const payloadData = {
      height: feet + '.' + inches,
      heightUnit: 'ft',
    };
    console.log(payloadData);
    NavigationService.navigate('UserSelectWeight', { payload: payloadData });
    // NavigationService.navigate('UserSelectWeight');
  };

  const submit = formObj.handleSubmit(values => {
    values.heightUnit = unit ? 'ft' : 'inch';

    console.log('values', values);

    NavigationService.navigate('UserSelectWeight', { payload: values });
  });

  const onButtonPress = (flag, sucess) => {
    console.log('onButtonPress', unit);
    setUnit(!unit);
  };

  return (
    <Container headerTitle="User Registration">
      <ScrollView
        contentContainerStyle={Styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <Text style={Styles.title}>{'Select Height'}</Text>
        <RadioButton
          buttons={HEIGHT}
          isOnline={unit}
          onButtonPress={onButtonPress}
        />
        <View style={Styles.inputContainer}>
          {/* <View style={Styles.inputView}> */}
          <TextInput
            inputStyle={Styles.inputView}
            styleTextInput={Styles.input}
            textAlign={'center'}
            keyboardType="numeric"
            maxLength={2}
            value={unit ? feet : inches}
            onChangeText={val => {
              if (unit) {
                setfeet(val);
              } else {
                setinches(val);
              }
            }}
          />
          {/* </View> */}
          <Text style={Styles.unit}>{unit ? 'feet' : 'inches'}</Text>
        </View>
        {/* </View> */}
      </ScrollView>
      <Button onPress={onPressContinue} title="Save & Continue" largeButton />
    </Container>
  );
};

export default UserSelectHeight;
