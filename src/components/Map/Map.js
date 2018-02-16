import React, { Component } from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

import {getItems} from '../../reducers';
import {sortData} from '../../actions/setPlace';

export let mapContext = null;

const mapState = { center: [55.75, 37.62], zoom: 12 };


class MapContainer extends Component {

  currentRoute = null;

  onAPIAvailable = (map) => {
    mapContext = map; 
  }

  componentDidUpdate(){
    console.log("Map update");
    let _this = this;

    const routes = this.props.items.map( el => el.coords );

    if(this.currentRoute){
      this.mapRef.geoObjects.remove(this.currentRoute);
    }
    mapContext.route(routes, {
      mapStateAutoApply: true,
      reverseGeocoding: true
    }).then(function (route) {
      _this.currentRoute = route;
      //let newItems = [];

      // draggable route parts
      route.editor.start({ addWayPoints: false, removeWayPoints: true, editWayPoints: true });
      route.getWayPoints().options.set({
          draggable: true
      });

      route.getWayPoints().each(function(point, i){
        
        point.events.add('dragend', (e) => {
          const coords = e.get('target').geometry.getCoordinates();
          const index = i;
          console.log('index= ', index);

          mapContext.geocode(coords).then((res) => {
            const txt = res.geoObjects.get(0).properties.get('text');
            console.log('index2= ', index);
            const newItems = _this.props.items.map( (el, i) => {

              if(i == index){
                el.name = txt;
                el.coords = coords;
              }
              return el;
            });
            console.log('newItems = ', newItems);
            _this.props.sortData(newItems);

            //e.get('target').properties.set("balloonContent", firstGeoObject.properties.get('text'));
          });
        });

      });
      
      // remove old routes
      _this.mapRef.geoObjects.add(route);

      route.getWayPoints().each((point, i) => {
        point.properties.set({balloonContentHeader: 'Заголовок балуна'});
      });
     // _this.props.sortData(newItems);
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
          console.log('arguments = ', arguments);
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
        //_this.props.sortData( this.props.items );


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

const mapDispatchToProps = {
  sortData
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);