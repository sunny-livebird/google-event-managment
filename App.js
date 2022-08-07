import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigator} from './src/navigation/app.navigator';
import {AuthNavigation} from './src/navigation/auth.navigator';
import {Provider} from 'react-redux';

import AppStore from './src/redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {UserContextProvider} from './src/context/user.context';

const App = () => {
  return (
    <UserContextProvider>
      <Provider store={AppStore}>
        <PaperProvider>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </UserContextProvider>
  );
};
export default App;
