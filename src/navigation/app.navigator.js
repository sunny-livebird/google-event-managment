import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import EventListScreen from '../screens/eventList.screen';
import screens from './screens';
import CreateEventScreen from '../screens/createEvent.screen';
import EventTypeScreen from '../screens/eventType.screen';

const Stack = createStackNavigator();
export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.event.name}
        component={EventListScreen}
        options={{...screens.event.options}}
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
