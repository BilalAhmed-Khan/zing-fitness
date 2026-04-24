import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  GraphRequest,
  AccessToken,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { Alert, Platform } from 'react-native';

/** Meta returns this when the app is restricted or Android setup (e.g. key hash) does not match. */
function facebookMetaRestrictionMessage(detail) {
  const s = String(detail || '').toLowerCase();
  if (
    s.includes('unavailable') ||
    s.includes('updating additional details') ||
    s.includes('feature unavailable')
  ) {
    const androidExtra =
      Platform.OS === 'android'
        ? ' On Android, also open Meta → Settings → Advanced → Android: add every signing key hash (debug ' +
          'keystore and Play App Signing certificate if you ship via Play). iOS working but Android failing ' +
          'usually means a missing/wrong Android key hash or incomplete Android platform fields.'
        : '';
    return (
      'Facebook blocked this login from Meta’s side.' +
      androidExtra +
      ' Check developers.facebook.com for any Android-only alerts, package com.zingFitness.app, and key hashes. ' +
      'Detail: ' +
      (detail ? String(detail) : 'none')
    );
  }
  return null;
}

async function googleLogin(succusCallback) {
  try {
    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
    }
    const signInResult = await GoogleSignin.signIn();
    const user = signInResult?.user;
    const payloadApi = {
      emailAddress: user?.email,
      platformId: user?.id,
      firstName: user?.givenName,
      lastName: user?.familyName,
    };
    if (signInResult?.idToken) {
      payloadApi.idToken = signInResult.idToken;
    }
    if (user?.photo) {
      payloadApi.image = user?.photo;
    }
    if (!payloadApi.platformId || !payloadApi.emailAddress) {
      Alert.alert(
        'Google Sign-In',
        'Could not read your Google account id or email. Check that the Google account has email permission and that Sign-In is configured with the correct Web client ID.',
      );
      return;
    }
    succusCallback?.(payloadApi);
  } catch (error) {
    if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
      return;
    }
    const message =
      error?.message === 'DEVELOPER_ERROR'
        ? 'Google Sign-In needs your app’s SHA-1 in Firebase: open Firebase Console → Project settings → your Android app → add the debug keystore SHA-1, then download the updated google-services.json.'
        : error?.message || 'Google sign-in failed.';
    console.warn('Google Sign-In', error);
    Alert.alert('Google Sign-In', message);
  }
}

async function getInfoFromToken(token, succusCallback) {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id,name,first_name,last_name,email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    {
      accessToken: token,
      parameters: PROFILE_REQUEST_PARAMS,
    },
    (error, result) => {
      if (error) {
        console.warn('Facebook Graph /me error', error);
        const raw =
          error?.errorMessage ||
          error?.message ||
          (typeof error === 'string' ? error : '') ||
          'Could not load your Facebook profile.';
        const metaMsg = facebookMetaRestrictionMessage(raw);
        Alert.alert('Facebook', metaMsg || String(raw));
        return;
      }
      const payloadApi = {
        platformId: result.id,
        emailAddress: result.email,
        firstName: result.first_name,
        lastName: result.last_name,
        accessToken: token,
      };
      if (!payloadApi.platformId) {
        Alert.alert(
          'Facebook',
          'Could not read your Facebook account id. Try again or check app permissions in Meta Developer settings.',
        );
        return;
      }
      if (!payloadApi.emailAddress) {
        Alert.alert(
          'Facebook',
          'Your Facebook account did not share an email. Use an account with email or enable email permission for this app in Meta Developer settings.',
        );
        return;
      }
      succusCallback?.(payloadApi);
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
}

async function facebookLogin(succusCallback) {
  try {
    // Native Facebook-app login can hit different validation than iOS; Custom Tabs matches web flow.
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      return;
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data?.accessToken) {
      Alert.alert(
        'Facebook',
        'Could not read an access token. Check Facebook app settings (package name com.zingFitness.app and key hashes).',
      );
      return;
    }
    getInfoFromToken(data.accessToken.toString(), succusCallback);
  } catch (error) {
    console.warn('Facebook login', error);
    const raw =
      error?.message ||
      error?.errorMessage ||
      'Facebook sign-in failed. Verify the Facebook app ID and key hashes in Meta Developer settings.';
    const metaMsg = facebookMetaRestrictionMessage(raw);
    Alert.alert('Facebook', metaMsg || String(raw));
  }
}
async function appleLogin(succusCallback) {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const { identityToken, email, fullName, user } = appleAuthRequestResponse;
    if (!identityToken) {
      Alert.alert(
        'Apple Sign-In',
        'Apple did not return a sign-in token. Please try again.',
      );
      return;
    }
    const firstName = fullName?.givenName ?? '';
    const lastName = fullName?.familyName ?? '';
    succusCallback?.({
      identityToken,
      appleUserId: user,
      email: email ?? null,
      firstName,
      lastName,
    });
  } catch (error) {
    if (error?.code === '1001' || error?.code === 1001) {
      return;
    }
    console.warn('Apple Sign-In', error);
    Alert.alert(
      'Apple Sign-In',
      error?.message || 'Apple sign-in failed. Please try again.',
    );
  }
}

export default {
  appleLogin,
  googleLogin,
  facebookLogin,
};
