import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, Text, TextInput} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {DateTimeInput} from '../component/datetimeInput.component';
import dateUtility from '../utilities/dateUtility';
import {
  createNewEvent,
  updateEvent,
  deleteEvent,
} from '../redux/EventReducer/action';
import {useDispatch} from 'react-redux';
import UIConfirmationDialog from '../component/confirmationDialog.component';
import {TouchableOpacity} from 'react-native-gesture-handler';
import screens from '../navigation/screens';

const CreateEventScreen = () => {
  const route = useRoute();
  var eventInfo =
    route.params && route.params.eventInfo ? route.params.eventInfo : null;
  const navigation = useNavigation();
  const today = eventInfo != null ? new Date(eventInfo['start']) : new Date();
  const dispatch = useDispatch();
  const addTitleRef = useRef(null);

  const [eventTitle, setEventTitle] = useState(
    eventInfo != null ? eventInfo['title'] : '',
  );
  const [notes, setNotes] = useState(
    eventInfo != null ? eventInfo['summary'] : '',
  );
  const [startDate, setStartDate] = useState(
    eventInfo != null ? new Date(eventInfo['start']) : new Date(),
  );
  const [endDate, setEndDate] = useState(
    eventInfo != null ? new Date(eventInfo['end']) : new Date(),
  );

  const [startTime, setStartTime] = useState(
    dateUtility.convertHoursToDate(Number(today.getHours()) + 1),
  );
  const [endTime, setEndTime] = useState(
    dateUtility.convertHoursToDate(Number(today.getHours()) + 2),
  );
  useState(() => {
    setEndDate(startDate);
  }, [startDate, setStartDate]);

  const [confirmationVisible, setConfirmationVisible] = useState('');

  const arrType = [
    {
      title: 'Does not Repeat',
      type: '',
    },
    {
      title: 'Every day',
      type: 'daily',
    },
    {
      title: 'Every week',
      type: 'weekly',
    },
    {
      title: 'Every Month',
      type: 'monthly',
    },
  ];

  const [repeatType, setRepeatType] = useState({
    title: 'Does not Repeat',
    type: '',
  });

  useEffect(() => {
    if (navigation.isFocused()) {
      if (addTitleRef) {
        addTitleRef.current.focus();
      }
    }
  }, [navigation.isFocused()]);

  const saveEvent = () => {
    var createEventJSON = {
      eventId: eventInfo == null ? guidGenerator() : eventInfo.eventId,
      start: dateUtility.getFormatString(startDate, startTime),
      end: dateUtility.getFormatString(endDate, endTime),
      title: eventTitle.length == 0 ? 'No Title' : eventTitle,
      summary: notes,
      color: '#e6add8',
      eventDate: dateUtility.getEventDate(startDate),
      repeatType: repeatType.type,
      weekday: dateUtility.getDayName(startDate),
    };
    if (eventInfo == null) {
      dispatch(createNewEvent(createEventJSON));
    } else {
      dispatch(updateEvent(createEventJSON));
    }

    navigation.goBack();
  };

  const deleteEventConfirm = () => {
    setConfirmationVisible(eventInfo.eventId);
  };
  const removeEvent = () => {
    dispatch(deleteEvent(eventInfo.eventId));
    navigation.goBack();
  };

  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <ScrollView contentContainerStyle={{marginTop: 40}}>
        <TextInput
          style={{
            backgroundColor: '#FFFFFF',
            paddingLeft: 60,
            heightL: 30,
            fontSize: 28,
            marginBottom: 20,
          }}
          ref={addTitleRef}
          placeholder="Add Title"
          value={eventTitle}
          onChangeText={text => setEventTitle(text)}
        />
        <Divider />

        <DateTimeInput
          date={startDate}
          time={startTime}
          onDate={date => {
            setEndDate(date);
            setStartDate(date);
          }}
          onTime={date => {
            setStartTime(date);
          }}
        />
        <DateTimeInput
          date={endDate}
          time={endTime}
          onDate={date => {
            setEndDate(date);
          }}
          startDate={startDate}
          onTime={date => {
            setEndTime(date);
          }}
        />
        <Divider style={{marginTop: 10}} />
        <TouchableOpacity
          style={{paddingLeft: 60, marginVertical: 10}}
          onPress={() => {
            navigation.navigate(screens.eventType.name, {
              arrType: arrType,
              callBack: item => {
                setRepeatType(item);
                navigation.goBack();
              },
            });
          }}>
          <Text
            style={{
              marginVertical: 10,
            }}>
            {repeatType.title}
          </Text>
        </TouchableOpacity>
        <Divider />
        <TextInput
          multiline={true}
          style={{
            backgroundColor: '#FFFFFF',
            paddingLeft: 60,
            heightL: 30,
            fontSize: 16,
            marginVertical: 20,
          }}
          placeholder="Add description"
          value={notes}
          onChangeText={text => setNotes(text)}
        />
        <Divider style={{marginTop: 10}} />
        <Button
          style={{marginHorizontal: 20}}
          mode="contained"
          onPress={saveEvent}>
          {eventInfo == null ? 'Save' : 'Update'}
        </Button>
        {eventInfo != null ? (
          <Button
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              backgroundColor: 'red',
            }}
            mode="contained"
            onPress={deleteEventConfirm}>
            Delete
          </Button>
        ) : null}
        <UIConfirmationDialog
          visible={!!confirmationVisible}
          content="Are you sure you want to delete this event?"
          onOk={removeEvent}
          onDismiss={() => setConfirmationVisible('')}
          onCancel={() => setConfirmationVisible('')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    width: '100%',
    paddingVertical: 30,
    backgroundColor: 'yellow',
  },
});

export default CreateEventScreen;
