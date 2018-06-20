import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { YMaps, Map, GeoObject } from "react-yandex-maps";

import { getItems } from "../../reducers";
import { sortData, mapLoaded, getRoute } from "../../actions";

export let mapContext = null;

const mapState = {
  center: [55.75, 37.62],
  zoom: 12,
  controls: ["zoomControl"]
};

export class MapContainer extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  pmCollection = null;

  onAPIAvailable = map => {
    /*** Map is loaded ***/
    mapContext = map;
    this.pmCollection = new mapContext.GeoObjectCollection();
    this.props.mapLoaded();
  };

  setCenter = coords => {
    this.mapRef.setCenter(coords);
  };

  addPlacemark = obj => {
    const placemark = new mapContext.Placemark(
      obj.coords,
      { balloonContent: obj.name },
      {
        draggable: true,
        preset: "islands#blueIcon",
        iconColor: "#171de6"
      }
    );

    this.pmCollection.add(placemark);
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

  getLines = () => {
    const { items } = this.props;
    let lines = [];

    for (let i = 0; i < items.length; i = i + 1) {
      if (items[i + 1]) {
        lines = [
          ...lines,
          <GeoObject
            key={`go-${i}`}
            geometry={{
              type: "LineString",
              coordinates: [[...items[i].coords], [...items[i + 1].coords]]
            }}
            options={{
              strokeColor: "#171de6",
              opacity: 0.6,
              strokeWidth: 4
            }}
          />
        ];
      } else break;
    }

    return lines;
  };

  componentDidUpdate() {
    /*** Remove current geoObjects ***/
    this.pmCollection.removeAll();

    /*** Get new geoObjects ***/
    this.props.items.forEach(el => {
      this.addPlacemark(el);
    });

    /*** add dragend Event Listener to each placemark ***/
    let cnt = 0;
    this.pmCollection.each(el => {
      this.addDragendListener(el, cnt);
      cnt++;
    });

    /*** add pmCollection to Map ***/
    this.mapRef.geoObjects.add(this.pmCollection);

    /*** set Bounds ***/
    if (this.pmCollection.getLength() > 1) {
      this.mapRef.setBounds(this.pmCollection.getBounds());
    }
  }

  render() {
    const Lines = this.getLines();

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);
