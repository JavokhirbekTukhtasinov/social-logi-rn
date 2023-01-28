import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRecoilState} from 'recoil';
import {AccountAtom, User} from '../atom/user';

const HomeScreen = () => {
  const [account, setAccount] = useRecoilState<User>(AccountAtom);

  return (
    <View style={styles.container}>
      {account.imageURL && (
        <Image style={styles.image} source={{uri: account.imageURL}} />
      )}
      <View>
        <View style={styles.textCover}>
          <Text style={styles.textInfo}>Login Type: </Text>
          <Text>{account?.loginType}</Text>
        </View>
        <View style={styles.textCover}>
          <Text style={styles.textInfo}>Name: </Text>
          <Text>{account?.name}</Text>
        </View>
        <View style={styles.textCover}>
          <Text style={styles.textInfo}>Email</Text>
          <Text>{account?.email}</Text>
        </View>
        <View style={styles.textCover}>
          <Text style={styles.textInfo}>Last Name: </Text>
          <Text>{account?.lastName}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
    flex: 1,
    marginTop: 100,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textCover: {
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 10,
  },
  textInfo: {
    minWidth: 100,
  },
});
