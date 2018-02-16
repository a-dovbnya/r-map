import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import {getItems} from '../../reducers';

export let mapContext = null;

const mapState = { center: [55.75, 37.62], zoom: 12 };


class MapContainer extends Component {

  currentRoute = null;

  onAPIAvailable = (map) => {
    mapContext = map;
    //this.map = map;
    //const ref = this.mapRef;
    //let suggestView = new this.map.SuggestView('suggest');
    //console.log("arguments = ", this.ref);
    //console.log('ref = ', this.map);
    //console.log('map', map);
    //console.log('api = ', ymapAPI);
    
  }
  componentDidUpdate(){
    console.log("Map update");
    let _this = this;

    const routes = this.props.items.map( el => el.name );

    if(this.currentRoute){
      _this.mapRef.geoObjects.remove(this.currentRoute);
    }
    mapContext.route(routes, {
      mapStateAutoApply: true

    }).then(function (route) {
      _this.currentRoute = route;
      _this.mapRef.geoObjects.add(route);
    });

  }

  /* shouldComponentUpdate(){
    return false;
  } */

  addRoute = () => {
    console.log("add routes", this.state.routes);
    let _this = this;
    this.map.route(this.state.routes, {
        mapStateAutoApply: true
    }).then(function (route) {
        console.log("routes add");
        console.log('route', route);
        route.getPaths().options.set({
            // в балуне выводим только информацию о времени движения с учетом пробок
            // можно выставить настройки графики маршруту
            //strokeColor: '0000ffff',
            //opacity: 0.9,
            //draggable: true
        });
        
        // draggable route parts
        route.editor.start({ addWayPoints: false, removeWayPoints: true, editWayPoints: true });
        route.getWayPoints().options.set({
            draggable: true
        });
        
        // bad example
        route.getWayPoints().each(function(wayPoint){
          wayPoint.events.add("dragend", function(e){
              var coords = e.get('target').geometry.getCoordinates()
              _this.map.geocode(coords).then(function (res) {
                  var firstGeoObject = res.geoObjects.get(0);
                  e.get('target').properties.set("balloonContent", firstGeoObject.properties.get('text'));
              });
          })
        });
    
        // добавляем маршрут на карту
        console.log("geo objects = ", _this.mapRef);
        _this.mapRef.geoObjects.add(route);
    });
  }

  render() {
    console.log('=== RENDER ===');
    return (
        <YMaps onApiAvaliable={(map) => this.onAPIAvailable(map)}>
          <Map state={mapState} instanceRef = {ref => {this.mapRef = ref}} width="60%" height="500"/>
        </YMaps>
    );
  }
}

const mapStateToProps = state => ({
  items: getItems(state)
});

export default connect(mapStateToProps, null)(MapContainer);