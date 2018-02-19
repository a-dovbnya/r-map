import { mapContext } from "./components/Map/Map";

export const getGeoCode = placeName =>
  mapContext.geocode(placeName).then(
    res => {
      let firstGeoObject = res.geoObjects.get(0);

      if (firstGeoObject) {
        return firstGeoObject.geometry.getCoordinates();
      }

      return null;
    },
    err => {
      console.log("Ошибка в api", err);
    }
  );

export const yaMapsApi = {
  map: null,
  ref: null,
  routes: null,
  wayPoints: null,
  fetchData: false,
  init: (map, ref) => {
    this.map = map;
    this.ref = ref;
  },
  getRoute: routes => {
    const _this = this;
    console.log(_this);
    _this.map
      .route(routes, {
        mapStateAutoApply: true,
        reverseGeocoding: true
      })
      .then(
        route => {
          _this.routes = route;
          console.log("this.routes = ", _this.routes);
          _this.wayPoints = route.getWayPoints();
          _this.wayPointsProcessing();
        },
        e => {
          _this.route = null;
          console.log("Error: ", e.message);
        }
      );
  },
  wayPointsProcessing: () => {
    const _this = this;
    _this.wayPoints.options.set({
      draggable: true
    });
    _this.wayPoints.each((point, i) => {
      point.events.add("dragend", _this.pointDragHandler);
    });
  },
  pointDragHandler: e => {
    console.log("!!! e = ", e);
  }
};
