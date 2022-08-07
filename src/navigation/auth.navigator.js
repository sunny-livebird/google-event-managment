import React, {useContext, useState, useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login.screen';
import {MainNavigator} from './app.navigator';
import UserContext from '../context/user.context';
import screens from './screens';
import EventListScreen from '../screens/eventList.screen';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
const Stack = createStackNavigator();

export const AuthNavigation = () => {
  const {token, isLoading} = useContext(UserContext);
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [token]);

  if (isLoading)
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {token == null ? (
        <Stack.Screen
          options={{header: () => null}}
          name={screens.login.name}
          component={LoginScreen}
        />
      ) : (
        <Stack.Screen name={screens.event.name} component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
