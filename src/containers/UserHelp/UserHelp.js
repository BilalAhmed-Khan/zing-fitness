import React from 'react';
import { ScrollView, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch } from 'react-redux';

import {
  Button,
  Container,
  Loader,
  Text,
  TextInputNative,
} from '../../components';
import { contactSupport } from '../../ducks/auth';
import { Colors } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';

import { Styles } from './Styles';

const UserHelp = ({ route }) => {
  const helpdata = route?.params?.data ?? {};
  const dispatch = useDispatch();

  // init form inputs
  const [formObj, subjectProps, descriptionProps] = useHookForm(
    ['subject', 'description'],
    {},
    ValidationSchema.support,
  );

  // submit
  const submit = formObj.handleSubmit(values => {
    // NavigationService.navigate("Home");
    // values.device_token = Util.makeRandomString();
    console.log('values', values);
    dispatch(
      contactSupport.request({
        payloadApi: values,
        cb: data => {
          NavigationService.goBack();
          Util.showMessage(
            'Your request has been submitted successfully.',
            'sucess',
          );
        },
      }),
    );
  });

  return (
    <Container headerTitle="Help" notificationCount="2" chat>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        {/* <Text style={Styles.textStyle}>
          {
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.'
          }
        </Text> */}
        <View style={Styles.webViewStyle}>
          <WebView
            style={{ backgroundColor: Colors.transparent }}
            source={{ html: helpdata?.html }}
            contentMode={'mobile'}
          />
        </View>
        <TextInputNative
          placeholder="Subject"
          placeholderTextColor={Colors.placeholderText}
          {...subjectProps}
        />
        <TextInputNative
          multiline
          inputViewStyle={Styles.multilineTextInputView}
          inputContainerStyle={Styles.multilineTextInput}
          placeholder="Write Here..."
          placeholderTextColor={Colors.placeholderText}
          {...descriptionProps}
        />
      </ScrollView>
      <Button
        title="Help"
        largeButton
        onPress={submit}
        style={Styles.buttonStyle}
      />
      <Loader type={'CONTACT_SUPPORT'} />
    </Container>
  );
};

export default UserHelp;
