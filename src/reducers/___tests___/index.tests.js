import {
  setPlace,
  receivedData,
  receivedError,
  sortData,
  removeItem,
  mapLoaded,
  getRoute
} from "../../actions";

import mainReducer from "../";

describe("Action getRoute", () => {
  it("Изменяет флаг getRoute", () => {
    const nextState = mainReducer({ getRoute: false }, getRoute());
    expect(nextState.getRoute).toEqual(true);
  });
});
