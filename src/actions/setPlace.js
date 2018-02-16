import { createActions } from "redux-actions";

const actions = createActions({
  SET: {
    PLACE: undefined
  },
  RECEIVED: {
    DATA: undefined,
    ERROR: undefined
  },
  SORT: {
    DATA: undefined
  },
  REMOVE: {
    ITEM: undefined
  }
});

export const setPlace = actions.set.place;
export const receivedData = actions.received.data;
export const receivedError = actions.received.error;
export const sortData = actions.sort.data;
export const removeItem = actions.remove.item;
