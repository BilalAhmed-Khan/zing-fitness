import React from 'react';
import { TextInput } from 'react-native';
import { Text, Container, Button, TextInputNative } from '../../components';
import { Colors } from '../../theme';
import { NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { Styles } from './Styles';

const UserHealthProblems = ({ route }) => {
  const payload = route.params?.payload ?? {};

  const [formObj, commonHealthProblemProps] = useHookForm(
    ['commonHealthProblem'],
    {},
    ValidationSchema.commonHealthProblem,
  );
  const submit = formObj.handleSubmit(values => {
    console.log('values', values);
    const newPayload = {
      ...payload,
      ...values,
    };
    console.log('payload', newPayload);
    NavigationService.navigate('TrainerServiceAreas', { payload: newPayload });
  });

  return (
    <Container headerTitle="User Registration">
      <Text style={Styles.title}>Common Health Problems</Text>
      <TextInputNative
        multiline
        inputViewStyle={Styles.textInputView}
        inputContainerStyle={Styles.textInput}
        placeholder="Write Here..."
        placeholderTextColor={Colors.placeholderText}
        {...commonHealthProblemProps}
      />
      <Button title="Save & Continue" largeButton onPress={submit} />
    </Container>
  );
};

export default UserHealthProblems;
