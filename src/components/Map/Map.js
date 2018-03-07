import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { YMaps, Map, Polyline, GeoObject } from "react-yandex-maps";

import { getItems } from "../../reducers";
import { sortData, mapLoaded, getRoute } from "../../actions";

export let mapContext = null;

const mapState = {
  center: [55.75, 37.62],
  zoom: 12,
  controls: ["zoomControl"]
};

export class MapContainer extends PureComponent {
  currentRoute = null;

  onAPIAvailable = map => {
    /*** Map is loaded ***/
    mapContext = map;
    this.props.mapLoaded();
  };

  setCenter = coords => {
    this.mapRef.setCenter(coords);
  };

  addPlacemark = obj => {
    const placemark = new mapContext.Placemark(
      obj.coords,
      { balloonContent: obj.name },
      { draggable: true }
    );

    this.addDragendListener(placemark);
    this.mapRef.geoObjects.add(placemark);
  };

  addRoute = routes => {
    const _this = this;

    /*** Show loader ***/
    _this.props.getRoute(true);

    /*** Get route ***/
    mapContext
      .route(routes, {
        mapStateAutoApply: true,
        reverseGeocoding: true
      })
      .then(route => {
        _this.currentRoute = route;
        _this.wayPointProcessing(route);
        _this.mapRef.geoObjects.add(route);
        _this.props.getRoute(false);
      });
  };

  wayPointProcessing = route => {
    const points = route.getWayPoints();

    /*** Way points is draggable ***/
    points.options.set({
      draggable: true
    });

    points.each((point, i) => {
      this.addDragendListener(point, i);
    });
  };

  addDragendListener = (geoObj, index = 0) => {
    /*** Add events listener for the dragged point ***/
    const _this = this;

    geoObj.events.add("dragend", e => {
      const coords = e.get("target").geometry.getCoordinates();

      mapContext.geocode(coords).then(res => {
        const txt = res.geoObjects.get(0).properties.get("text");
        const newItems = _this.props.items.map(
          (el, i) => (i === index ? { name: txt, coords: coords } : el)
        );

        /*** Dispatch sorted data ***/
        _this.props.sortData(newItems);
      });
    });
  };

  componentDidUpdate() {
    /*** Remove current geoObjects and route ***/
    //this.mapRef.geoObjects.removeAll();
    this.currentRoute = null;

    /*** Get new geoobjects ***/
    switch (this.props.items.length) {
      case 0: {
        break;
      }
      case 1: {
        this.addPlacemark(this.props.items[0]);
        break;
      }
      default: {
        //this.addRoute(this.props.items.map(el => el.coords));
        this.props.items.forEach(el => {
          this.addPlacemark(el);
        });
      }
    }
    /* for (var i = 0; i < this.props.items.length; i++) {
      this.addPlacemark(this.props.items[i]);
    } */

    return false;
  }

  render() {
    if (this.props.items.length === 1) {
      this.setCenter(this.props.items[0].coords);
    }
    if (this.props.items.length === 2) {
      console.log("coords = ", [
        [...this.props.items[0].coords],
        [...this.props.items[1].coords]
      ]);
    }

    let Lines = [];

    for (let i = 0; i < this.props.items.length; i = i + 1) {
      if (this.props.items[i + 1]) {
        Lines.push(
          <GeoObject
            key={i}
            geometry={{
              type: "LineString",
              coordinates: [
                [...this.props.items[i].coords],
                [...this.props.items[i + 1].coords]
              ]
            }}
            // Setting the geo object options.
            options={{
              // The line color.
              strokeColor: "#000000",
              // Line width.
              strokeWidth: 4
            }}
          />
        );
      } else break;
    }

    console.log(Lines);

    return (
      <YMaps onApiAvaliable={this.onAPIAvailable}>
        <Map
          state={mapState}
          instanceRef={ref => {
            this.mapRef = ref;
          }}
          width="100%"
          height="100%"
        >
          {Lines}
        </Map>
      </YMaps>
    );
  }
}

const mapStateToProps = state => ({
  items: getItems(state)
});

const mapDispatchToProps = {
  sortData,
  mapLoaded,
  getRoute
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
