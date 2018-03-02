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

  describe("method isEqualShallow", () => {
    it("work test", () => {
      expect(
        wrapper
          .instance()
          .isEqualShallow([{ test: "test_1" }], [{ test: "test_1" }])
      ).toBe(true);

      expect(
        wrapper
          .instance()
          .isEqualShallow([{ test: "test_1" }], [{ test: "test_2" }])
      ).toBe(false);

      expect(
        wrapper
          .instance()
          .isEqualShallow([{ test_1: "test_1" }], [{ test_2: "test_1" }])
      ).toBe(false);
    });
  });
});
