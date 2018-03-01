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

describe("Action mapLoaded", () => {
  it("changes mapLoading flag to false", () => {
    const nextState = mainReducer(
      { mapLoading: true },
      { type: mapLoaded.toString() }
    );
    expect(nextState.mapLoading).toEqual(false);
  });
});

describe("Action getRoute", () => {
  it("changes getRoute to value action.payload", () => {
    const nextState = mainReducer(
      { getRoute: false },
      { type: getRoute.toString(), payload: true }
    );
    expect(nextState.getRoute).toEqual(true);
  });
});

describe("Action setPlace", () => {
  it("changes fetchItem to true", () => {
    const nextState = mainReducer(
      { fetchItem: false },
      { type: setPlace.toString() }
    );
    expect(nextState.fetchItem).toEqual(true);
  });

  it("changes error to true", () => {
    const nextState = mainReducer(
      { error: "some error" },
      { type: setPlace.toString() }
    );
    expect(nextState.error).toEqual("");
  });

  it("changes getRoute to false", () => {
    const nextState = mainReducer(
      { getRoute: true },
      { type: setPlace.toString() }
    );
    expect(nextState.getRoute).toEqual(false);
  });
});

describe("Action receivedData", () => {
  it("changes fetchItem to false", () => {
    const nextState = mainReducer(
      { fetchItem: true, mapItems: [{}] },
      { type: receivedData.toString(), payload: [{}] }
    );
    expect(nextState.fetchItem).toEqual(false);
  });

  it("changes error to '' ", () => {
    const nextState = mainReducer(
      { error: "some error", mapItems: [{}] },
      { type: receivedData.toString(), payload: {} }
    );
    expect(nextState.error).toEqual("");
  });

  it("add action.payload to mapItems", () => {
    const nextState = mainReducer(
      { mapItems: [] },
      { type: receivedData.toString(), payload: {} }
    );
    expect(nextState.mapItems).toEqual([{}]);
  });

  it("changes getRoute to false ", () => {
    const nextState = mainReducer(
      { getRoute: true, mapItems: [] },
      { type: receivedData.toString(), payload: {} }
    );
    expect(nextState.getRoute).toEqual(false);
  });
});

describe("Action receivedError", () => {
  it("changes fetchItem to false", () => {
    const nextState = mainReducer(
      { fetchItem: true },
      { type: receivedError.toString(), payload: "some error" }
    );
    expect(nextState.fetchItem).toEqual(false);
  });

  it("changes getRoute to false ", () => {
    const nextState = mainReducer(
      { getRoute: true, mapItems: [] },
      { type: receivedError.toString(), payload: "some error" }
    );
    expect(nextState.getRoute).toEqual(false);
  });

  it("changes error to value action.payload", () => {
    const nextState = mainReducer(
      { error: "" },
      { type: receivedError.toString(), payload: "some error" }
    );
    expect(nextState.error).toEqual("some error");
  });
});

describe("Action sortData", () => {
  it("changes sortData to false ", () => {
    const nextState = mainReducer(
      { getRoute: true },
      { type: sortData.toString() }
    );
    expect(nextState.getRoute).toEqual(false);
  });

  it("changes error to '' ", () => {
    const nextState = mainReducer(
      { error: "some error" },
      { type: sortData.toString(), payload: {} }
    );
    expect(nextState.error).toEqual("");
  });

  it("changes mapItems to action.payload", () => {
    const nextState = mainReducer(
      { mapItems: null },
      { type: sortData, payload: [{}, {}] }
    );
    expect(nextState.mapItems).toEqual([{}, {}]);
  });
});
