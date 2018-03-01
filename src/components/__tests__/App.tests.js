import React from "react";
import { shallow } from "enzyme";

import { App } from "../App/App";
import Area from "../Area/Area";
import List from "../List/List";
import MapContainer from "../Map/Map";

describe("Component App -> Main layout contains", () => {
  const wrapper = shallow(<App error={0} />);

  it("component List", () => {
    expect(wrapper.find(List)).toHaveLength(1);
  });
  it("component Area", () => {
    expect(wrapper.find(Area)).toHaveLength(1);
  });
  it("component MapContainer", () => {
    expect(wrapper.find(MapContainer)).toHaveLength(1);
  });
});
