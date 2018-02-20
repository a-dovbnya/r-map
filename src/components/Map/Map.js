import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import { getItems } from "../../reducers";
import { sortData, mapLoaded, getRoute } from "../../actions";

export let mapContext = null;

const mapState = {
  center: [55.75, 37.62],
  zoom: 12,
  controls: ["zoomControl"]
};

class MapContainer extends PureComponent {
  currentRoute = null;

  onAPIAvailable = map => {
    // Map is loaded
    mapContext = map;
    this.props.mapLoaded();
  };

  setCenter = coords => {
    this.mapRef.setCenter(coords);
  };

  addPlacemark = obj => {
    const _this = this;
    const placemark = new mapContext.Placemark(
      obj.coords,
      {
        balloonContent: obj.name
      },
      {
        draggable: true
      }
    );

    placemark.events.add("dragend", e => {
      const coords = e.get("target").geometry.getCoordinates();
      //_this.mapRef.geoObjects.removeAll();

      mapContext.geocode(coords).then(res => {
        const txt = res.geoObjects.get(0).properties.get("text");
        const newItems = _this.props.items.map((el, i) => {
          return {
            name: txt,
            coords: coords
          };
        });

        // Dispatch sorted data
        _this.props.sortData(newItems);
      });
    });
    _this.mapRef.geoObjects.add(placemark);
  };

  getWayPointProcessing = route => {
    const _this = this;
    const points = route.getWayPoints();

    // Way points is draggable
    route.getWayPoints().options.set({
      draggable: true
    });

    // Add events listener for the dragged point
    points.each((point, i) => {
      point.events.add("dragend", e => {
        const coords = e.get("target").geometry.getCoordinates();
        const index = i;

        mapContext.geocode(coords).then(res => {
          const txt = res.geoObjects.get(0).properties.get("text");
          const newItems = _this.props.items.map((el, i) => {
            if (i === index) {
              return {
                name: txt,
                coords: coords
              };
            }
            return el;
          });

          // Dispatch sorted data
          _this.props.sortData(newItems);
        });
      });
    });
  };

  componentDidUpdate() {
    const _this = this;
    const routes = this.props.items.map(el => el.coords);

    // Remove current route
    //if (this.currentRoute) {
    //this.mapRef.geoObjects.remove(this.currentRoute);
    _this.mapRef.geoObjects.removeAll();
    this.currentRoute = null;
    //}

    if (this.props.items.length === 1) {
      this.addPlacemark(this.props.items[0]);
      return;
    }

    if (this.props.items.length === 0) {
      return;
    }

    // Set loader
    this.props.getRoute(true);

    // Get routes
    mapContext
      .route(routes, {
        mapStateAutoApply: true,
        reverseGeocoding: true
      })
      .then(function(route) {
        _this.currentRoute = route;
        _this.getWayPointProcessing(route);

        // Sdd routes
        _this.mapRef.geoObjects.add(route);
        // Remove loader
        _this.props.getRoute(false);
      });
  }

  render() {
    console.log("=== RENDER ===");

    if (this.props.items.length === 1) {
      this.setCenter(this.props.items[0].coords);
    }

    return (
      <YMaps onApiAvaliable={this.onAPIAvailable}>
        <Map
          state={mapState}
          instanceRef={ref => {
            this.mapRef = ref;
          }}
          width="100%"
          height="100%"
        />
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
