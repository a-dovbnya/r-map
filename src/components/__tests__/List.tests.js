import React from "react";
import { shallow } from "enzyme";

import { List } from "../List/List";

describe("Component List -> ", () => {
  const wrapper = shallow(<List items={jest.fn()} />);

  describe("contains method", () => {
    it("onSortEnd", () => {
      expect(wrapper.instance().onSortEnd).toBeDefined();
    });

    it("shouldCancelStart", () => {
      expect(wrapper.instance().shouldCancelStart).toBeDefined();
    });

    it("isEqualShallow", () => {
      expect(wrapper.instance().isEqualShallow).toBeDefined();
    });
  });
});
