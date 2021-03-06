import React from "react";
import { shallow } from "enzyme";

import { Area, Input } from "../Area/Area";

describe("Component Area -> ", () => {
  const wrapper = shallow(<Area />);

  describe("Main layout contains", () => {
    it("input area", () => {
      expect(wrapper.find(Input)).toHaveLength(1);
    });
  });

  describe("contains method", () => {
    it("keyDownHandler", () => {
      expect(wrapper.instance().keyDownHandler).toBeDefined();
    });

    it("componentDidUpdate", () => {
      expect(wrapper.instance().componentDidUpdate).toBeDefined();
    });
  });
});
