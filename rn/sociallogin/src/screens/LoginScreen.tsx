import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FacebookLogin from '../components/FacebookLogin';
import GoogleLogin from '../components/GoogleLogin';
import TwitterLogin from '../components/TwitterLogin';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <FacebookLogin />
      </View>
      <View style={styles.section}>
        <GoogleLogin />
      </View>
      <View style={styles.section}>
        <TwitterLogin />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  section: {
    borderRadius: 5,
    backgroundColor: '#aaa',
    marginVertical: 10,
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
