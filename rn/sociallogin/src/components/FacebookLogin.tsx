import {
  Alert,
  Pressable,
  StyleSheet,
  Platform,
  Button,
  View,
} from 'react-native';
import React from 'react';
import {
  AccessToken,
  LoginManager,
  AuthenticationToken,
  Profile,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {facebookConfig} from '../config';
import {facebookLogin} from '../../apis/login';
import {useRecoilState} from 'recoil';
import {AccountAtom, User} from '../atom/user';
import {useNavigation} from '@react-navigation/native';

const FacebookLogin = () => {
  const [account, setAccount] = useRecoilState<User>(AccountAtom);
  const navigation = useNavigation<any>();

  // Handle user information from facebook
  const handlePress = async () => {
    try {
      const loginPer = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'enabled',
        'my_nonce',
      );

      if (Platform.OS === 'ios') {
        const token = await AuthenticationToken.getAuthenticationTokenIOS();
        //@ts-ignore
        const profileData: User = await Profile.getCurrentProfile();
        if (profileData) {
          // Sending the user data to the server
          const response = await facebookLogin(profileData);
          setAccount({...profileData, loginType: 'Facebook'});
          navigation.navigate('Home');
        }

        // Create response callback.
        // const responseInfoCallback = () => (error: Object, result: any) => {
        //   console.log('result: ', result.toString());
        //   if (error) {
        //     console.log('Error fetching data: ' + error.toString());
        //   } else {
        //     // setAccount({...account, ...result});
        //   }
        // };

        // Create a graph request asking for user information with a callback to handle the response.
        // const infoRequest = new GraphRequest(
        //   '/me',
        //   {
        //     accessToken: token?.authenticationToken,
        //     parameters: {
        //       fields: {
        //         string: 'email,public_profile,name', // what you want to get
        //       },
        //     },
        //   },
        //   responseInfoCallback,
        // );
        // // Start the graph request.
        // new GraphRequestManager().addRequest(infoRequest).start();
      } else {
        const token = await AccessToken.getCurrentAccessToken();
        // const response = await facebookLogin(token?.accessToken);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View>
      <Button onPress={() => handlePress()} title="Facebook login" />
      {/* <LoginButton
        onLoginFinished={(err, res) => {
          if (err) {
            console.log('something went wrong: ', err);
          } else if (res.isCancelled) {
            console.log('login is canceled');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data?.accessToken.toString());
            });
          }
        }}
      /> */}
    </View>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({});
