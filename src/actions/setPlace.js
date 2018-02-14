import { createActions } from "redux-actions";

const   actions = createActions({
  SET: {
    PLACE: null
  }
});

export const setPlace = actions.set.place;
