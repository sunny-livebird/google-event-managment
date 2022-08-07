import React, {useContext} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../context/user.context';

const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

const LoginScreen = () => {
  const {setToken} = useContext(UserContext);
  const onLogin = () => {
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
      })
      .then(resCredentials => {
        getUserInfo(resCredentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  const getUserInfo = async tokenUser => {
    if (tokenUser !== null) {
      setToken(tokenUser);
      auth0.auth
        .userInfo({token: tokenUser})
        .then(async info => {
          try {
            await AsyncStorage.setItem('@userID', info.sub);
            await AsyncStorage.setItem('userInfo', JSON.stringify(info));
          } catch (e) {
            console.log(e);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Event APP</Text>

      <View style={styles.btnLogin}>
        <Button
          color="#7f5af0"
          style={styles.btnLogin}
          onPress={onLogin}
          title={'Log In'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    textTransform: 'uppercase',
  },
  text: {
    color: '#fff',
  },
  btnLogin: {
    marginTop: 50,
  },
});

export default LoginScreen;
