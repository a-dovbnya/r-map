import React from "react";
import { shallow } from "enzyme";
import { YMaps, Map } from "react-yandex-maps";
import { MapContainer } from "../Map/Map";

describe("Component MapContainer -> ", () => {
  const wrapper = shallow(<MapContainer items={jest.fn()} />);

  describe("Main layout contains", () => {
    it("YMaps", () => {
      expect(wrapper.find(YMaps)).toHaveLength(1);
    });

    it("Map", () => {
      expect(wrapper.find(Map)).toHaveLength(1);
    });
  });

  describe("contains method", () => {
    it("componentDidUpdate", () => {
      expect(wrapper.instance().componentDidUpdate).toBeDefined();
    });

    it("onAPIAvailable", () => {
      expect(wrapper.instance().onAPIAvailable).toBeDefined();
    });

    it("setCenter", () => {
      expect(wrapper.instance().setCenter).toBeDefined();
    });

    it("addPlacemark", () => {
      expect(wrapper.instance().addPlacemark).toBeDefined();
    });

    /* it("addRoute", () => {
      expect(wrapper.instance().addRoute).toBeDefined();
    }); */

    /* it("wayPointProcessing", () => {
      expect(wrapper.instance().wayPointProcessing).toBeDefined();
    }); */

    it("addDragendListener", () => {
      expect(wrapper.instance().addDragendListener).toBeDefined();
    });
  });
});
