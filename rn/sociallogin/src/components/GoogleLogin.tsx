import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googleConfig} from '../config';
import {AccountAtom, User} from '../atom/user';
import {googleLogin} from '../../apis/login';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  iosClientId: googleConfig.clientId,
});

const GoogleLogin = () => {
  const {navigate} = useNavigation<any>();
  const [account, setAccount] = useRecoilState(AccountAtom);
  // handle google user
  const handlePressGoogleLogin = async () => {
    try {
      const playService = await GoogleSignin.hasPlayServices();
      if (playService) {
        const {user} = await GoogleSignin.signIn();
        if (user) {
          const params = {
            email: user.email,
            firstName: user.givenName || '',
            lastName: user.familyName || '',
            imageURL: user.photo || '',
            userID: user.id,
            middleName: '',
            name: user.name || '',
            loginType: 'google',
          };

          const response = await googleLogin(params);
          console.log('response: ', response);
          setAccount({...params});
          navigate('Home');
        }
      }
    } catch (error) {
      console.log('something went wrong', JSON.stringify(error));
    }
  };

  return (
    <View>
      <Button onPress={handlePressGoogleLogin} title="Google Login" />
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({});
