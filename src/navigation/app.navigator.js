import React, {useContext} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import EventListScreen from '../screens/eventList.screen';
import screens from './screens';
import CreateEventScreen from '../screens/createEvent.screen';
import EventTypeScreen from '../screens/eventType.screen';
import Auth0 from 'react-native-auth0';
import {Button} from 'react-native';

const credentials = require('../../auth0-configuration');
const auth0 = new Auth0(credentials);

const Stack = createStackNavigator();
import UserContext from '../context/user.context';

export const MainNavigator = () => {
  const {token, userID, setToken} = useContext(UserContext);

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        setToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled', error);
      });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.event.name}
        component={EventListScreen}
        options={{
          headerRight: () => <Button onPress={onLogout} title="Logout" />,
        }}
      />
      <Stack.Screen
        name={screens.eventType.name}
        component={EventTypeScreen}
        options={{...screens.eventType.options}}
      />

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
        <Stack.Screen
          name={screens.createEvent.name}
          component={CreateEventScreen}
          options={{...screens.createEvent.options}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
