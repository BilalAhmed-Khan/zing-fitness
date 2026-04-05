import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  AccessToken,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
// import DataHandler from "./DataHandler";
// import Util from "./Util";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { jwtDecode } from 'jwt-decode';
import { Alert } from 'react-native';
import DataHandler from './DataHandler';
import { appleToken } from '../ducks/auth';
// import auth from '@react-native-firebase/auth';
// import { SOCIAL_LOGIN_TYPES } from "../config/Constants";

async function googleLogin(succusCallback) {
  // Get the users ID token
  console.log(user, 'userInfo');
  const { user, idToken } = await GoogleSignin.signIn();
  console.log(user, 'userInfo');
  const payloadApi = {
    emailAddress: user?.email,
    platformId: user?.id,
    firstName: user?.givenName,
    lastName: user?.familyName,
  };
  if (user?.photo) {
    payloadApi.image = user?.photo;
  }
  console.log(payloadApi, 'payloadApi');
  succusCallback?.(payloadApi);
  // Create a Google credential with the tokens
  // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
}

async function getInfoFromToken(token, succusCallback) {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name,  first_name, last_name, email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        console.log('login info has error: ' + error);
      } else {
        const payloadApi = {
          platformId: result.id,
          emailAddress: result.email,
          firstName: result.first_name,
          lastName: result.last_name,
        };
        console.log('result:', payloadApi);
        succusCallback?.(payloadApi);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
}

async function facebookLogin(succusCallback) {
  // LoginManager.logOut();

  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    function (result) {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          const accessToken = data.accessToken.toString();
          console.log(accessToken, 'accessToken fb');
          getInfoFromToken(
            accessToken,
            succusCallback,
            // SOCIAL_LOGIN_TYPES.FACEBOOK
          );
        });
        console.log(
          'Login success with permissions: ' + JSON.stringify(result),
        );
      }
    },
    function (error) {
      console.log('Login fail with error: ' + error);
    },
  );
}
async function appleLogin(succusCallback) {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  // const credentialState = await appleAuth.getCredentialStateForUser(
  //   appleAuthRequestResponse.user
  // );
  // token here
  const { identityToken, nonce } = appleAuthRequestResponse;
  // const appleCredential = auth.AppleAuthProvider.credential(
  //   identityToken,
  //   nonce,
  // );
  // Alert.alert(identityToken);
  // const signIn = auth().signInWithCredential(appleCredential);
  // const decoded = jwtDecode(identityToken);
  console.log('decoded ==>', identityToken);
  succusCallback?.(identityToken);
  // Alert.alert(decoded);
  // const payloadApi = {
  //   platformId: decoded.nonce,
  //   emailAddress: decoded.email,
  // };

  // console.log(appleAuthRequestResponse.identityToken, "credentialState");
}

export default {
  appleLogin,
  googleLogin,
  facebookLogin,
};
