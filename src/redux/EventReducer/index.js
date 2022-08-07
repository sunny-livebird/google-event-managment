import EventActionConstants from './type';

const initialState = [];

export default function EventReducer(state = initialState, action) {
  switch (action.type) {
    case EventActionConstants.ADD_NEW_EVENT: {
      const newState = [...state, action.payload];
      return newState;
    }

    case EventActionConstants.UPDATE_EVENT: {
      const index = state.findIndex(
        emp => emp.eventId === action.payload.eventId,
      );
      const newArray = [...state];
      newArray[index] = action.payload;
      return newArray;
    }

    case EventActionConstants.REMOVE_EVENT: {
      var eventId = action.payload;
      const newState = state.filter(item => item.eventId !== eventId);
      return newState;
    }

    default:
      return state;
  }
}
