import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export const UIDatepickerInput = ({
  mode,
  datepickerValue,
  onDateChange,
  minimumDate,
}) => {
  const onChange = date => {};
  const onConfirm = date => {
    if (onDateChange) {
      onDateChange(date);
    }
  };
  return (
    <>
      <DateTimePicker
        isVisible={true}
        value={datepickerValue}
        date={datepickerValue}
        minuteInterval={5}
        mode={mode}
        minimumDate={minimumDate}
        is24Hour={true}
        onChange={onChange}
        onConfirm={onConfirm}
        onCancel={() => {
          onDateChange(null);
        }}
      />
    </>
  );
};
