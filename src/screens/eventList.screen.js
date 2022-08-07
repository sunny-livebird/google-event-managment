import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  TimelineList,
  CalendarProvider,
  CalendarUtils,
  WeekCalendar,
} from 'react-native-calendars';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {Button, Text} from 'react-native-paper';
import dateUtility from '../utilities/dateUtility';
import screens from '../navigation/screens';

const EventListScreen = () => {
  const navigation = useNavigation();

  const INITIAL_TIME = {hour: 9, minutes: 0};
  const today = new Date();

  const eventsList = useSelector(state => state.events);

  const [currentDate, setCurrentDate] = useState(today);
  const [eventsByDate, setEventsByDate] = useState([]);

  const formatEventInToday = eventInfo => {
    let date = dateUtility.getDayInStringFormat(currentDate);

    const startTime = eventInfo['start'].split(' ')[1];
    const endTime = eventInfo['end'].split(' ')[1];
    eventInfo['start'] = `${date} ${startTime}`;
    eventInfo['end'] = `${date} ${endTime}`;
    return eventInfo;
  };

  useEffect(() => {
    let date = dateUtility.getDayInStringFormat(currentDate);
    var dateCurrent = date;
    if (typeof dateCurrent === 'string') {
      dateCurrent = new Date(dateCurrent);
    }
    var weekDay = dateUtility.getDayName(dateCurrent);
    var arrTodaysEvent = [];
    var newArray = [...eventsList];
    newArray.forEach(eventInfo => {
      if (eventInfo.eventDate == date) {
        arrTodaysEvent.push(eventInfo);
      } else if (eventInfo['repeatType'] == 'daily') {
        arrTodaysEvent.push(formatEventInToday(eventInfo));
      } else if (
        eventInfo['repeatType'] == 'weekly' &&
        weekDay == eventInfo['weekday']
      ) {
        arrTodaysEvent.push(formatEventInToday(eventInfo));
      } else if (
        eventInfo['repeatType'] == 'monthly' &&
        dateUtility.getMonthDay(eventInfo.eventDate) ==
          dateUtility.getMonthDay(date)
      ) {
        arrTodaysEvent.push(formatEventInToday(eventInfo));
      }
    });
    let todayEvents = _.groupBy(arrTodaysEvent, e =>
      CalendarUtils.getCalendarDateString(date),
    );

    setEventsByDate(todayEvents);
  }, [eventsList, currentDate]);

  const timelineProps = {
    format24h: false,

    onEventPress: event => {
      navigation.navigate(screens.createEvent.name, {eventInfo: event});
    },

    scrollToFirst: true,
    unavailableHours: [
      {start: 0, end: 6},
      {start: 22, end: 24},
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };
  const onDateChanged = date => {
    setCurrentDate(date);
  };

  const CreateWeekCalendar = props => {
    return (
      <WeekCalendar
        firstDay={1}
        markedDates={props.marked}
        allowShadow={true}
        leftArrowImageSource={{uri: require('../assets/previous.png')}}
        rightArrowImageSource={{uri: require('../assets/next.png')}}
        theme={{
          weekVerticalMargin: 0,
          'stylesheet.calendar.header': {
            week: {marginVertical: 0, marginTop: 0},
          },
        }}
      />
    );
  };
  const createNewEvent = () => {
    navigation.navigate(screens.createEvent.name);
  };
  return (
    <>
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        showTodayButton
        disabledOpacity={0.6}>
        <CreateWeekCalendar />

        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          showNowIndicator
          // scrollToNow
          scrollToFirst={true}
          initialTime={INITIAL_TIME}
          theme={{
            backgroundColor: '#333',
            calendarBackground: '#333',
          }}
        />
        <Button
          style={{
            borderRadius: 30,
            position: 'absolute',
            right: 25,
            bottom: 30,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ee6e73',
          }}
          uppercase={false}
          labelStyle={{fontWeight: 'bold', fontSize: 11, color: 'white'}}
          onPress={createNewEvent}>
          Add
        </Button>
      </CalendarProvider>
    </>
  );
};

export default EventListScreen;
