import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MainNavigator} from './src/navigation/app.navigator';
import {Provider} from 'react-redux';

import AppStore from './src/redux';
import {Provider as PaperProvider} from 'react-native-paper';
const App = () => {
  return (
    <Provider store={AppStore}>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};
export default App;
