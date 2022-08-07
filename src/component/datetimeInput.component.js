import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import moment from 'moment';
import {UIDatepickerInput} from './datepicker.component';

export const DateTimeInput = ({onDate, onTime, date, time, startDate}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const [newDate, setNewDate] = useState(date);
  const [newTime, setNewTime] = useState(time);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 60,
        marginRight: 20,
        marginVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
          setMode('date');
        }}>
        <Text style={{fontSize: 15}}>
          {moment(newDate).format('dddd, D MMM')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
          setMode('time');
        }}>
        <Text style={{fontSize: 15}}>{moment(newTime).format('hh:mm A')}</Text>
      </TouchableOpacity>
      {show ? (
        <UIDatepickerInput
          datepickerValue={mode === 'date' ? newDate : newTime}
          minimumDate={startDate != null ? startDate : new Date()}
          mode={mode}
          onDateChange={date => {
            if (date) {
              if (mode === 'date') {
                setNewDate(date);
                onDate(date);
              } else {
                setNewTime(date);
                onTime(date);
              }
            }

            setShow(false);
          }}
        />
      ) : null}
    </View>
  );
};
