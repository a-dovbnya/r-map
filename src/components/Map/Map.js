import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import { getItems } from "../../reducers";
import { sortData, mapLoaded, getRoute } from "../../actions/setPlace";

//import { yaMapsApi } from "../../api";

export let mapContext = null;

const mapState = { center: [55.75, 37.62], zoom: 12 };

class MapContainer extends PureComponent {
  currentRoute = null;

  onAPIAvailable = map => {
    mapContext = map;
    this.props.mapLoaded();
    //yaMapsApi.map = map;
    //yaMapsApi.ref = this.mapRef;
    //console.log("MapContainermap ref = ", MapContainer.mapRef);
    //yaMapsApi.init(map, this.mapRef);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items)
      console.log("component will receive props");
  }

  componentDidUpdate() {
    console.log("component did update");
    if (this.props.items.length < 2) return;

    const _this = this;
    const routes = this.props.items.map(el => el.coords);

    if (this.currentRoute) {
      this.mapRef.geoObjects.remove(this.currentRoute);
      _this.currentRoute = null;
    }

    // set loader
    this.props.getRoute(true);

    mapContext
      .route(routes, {
        mapStateAutoApply: true,
        reverseGeocoding: true
      })
      .then(function(route) {
        _this.currentRoute = route;

        // draggable route parts
        route.getWayPoints().options.set({
          draggable: true
        });

        route.getWayPoints().each(function(point, i) {
          point.events.add("dragend", e => {
            const coords = e.get("target").geometry.getCoordinates();
            const index = i;

            mapContext.geocode(coords).then(res => {
              const txt = res.geoObjects.get(0).properties.get("text");
              const newItems = _this.props.items.map((el, i) => {
                if (i == index) {
                  el.name = txt;
                  el.coords = coords;
                }
                return el;
              });
              console.log("newItems = ", newItems);
              _this.props.sortData(newItems);
            });
          });
        });

        // add routes
        _this.mapRef.geoObjects.add(route);
        // delete loader
        _this.props.getRoute(false);
      });
  }

  setCenter = coords => {
    this.mapRef.setCenter(coords);
  };

  render() {
    console.log("=== RENDER ===");
    let geometry = {};
    let properties = {};

    if (this.props.items.length === 1) {
      geometry = { coordinates: this.props.items[0].coords };
      properties = { balloonContent: this.props.items[0].name };

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
          height="500"
        >
          {this.props.items.length === 1 ? (
            <Placemark geometry={geometry} properties={properties} />
          ) : null}
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
