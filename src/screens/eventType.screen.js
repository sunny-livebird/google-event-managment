import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {List} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const EventTypeScreen = () => {
  const route = useRoute();
  return (
    <SafeAreaView>
      {route.params.arrType.map(item => {
        return (
          <List.Item
            title={item.title}
            onPress={() => {
              route.params.callBack(item);
            }}
          />
        );
      })}
    </SafeAreaView>
  );
};
export default EventTypeScreen;
