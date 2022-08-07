import {configureStore} from '@reduxjs/toolkit';
import EventReducer from './EventReducer';

const AppStore = configureStore({
  reducer: {
    events: EventReducer,
  },
});

export default AppStore;
