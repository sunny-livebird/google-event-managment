import EventActionConstants from './type';

export const createNewEvent = newEvent => {
  return dispatch => {
    createNewEvent(newEvent, dispatch);
    dispatch({
      type: EventActionConstants.ADD_NEW_EVENT,
      payload: newEvent,
    });
  };
};
export const updateEvent = event => {
  return dispatch => {
    updateEvent(event, dispatch);
    dispatch({
      type: EventActionConstants.UPDATE_EVENT,
      payload: event,
    });
  };
};
export const deleteEvent = eventId => {
  return dispatch => {
    updateEvent(eventId, dispatch);
    dispatch({
      type: EventActionConstants.REMOVE_EVENT,
      payload: eventId,
    });
  };
};
