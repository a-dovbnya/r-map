import React, { Component } from 'react';
import styled from 'styled-components';

import { YMaps, Map, Placemark } from 'react-yandex-maps';
 
const mapState = { center: [55.76, 37.64], zoom: 12 };
 
const MyPlacemark = () => (
  <YMaps>
    <Map state={mapState}/> 
  </YMaps>
); 

class MapContainer extends Component {

  state = {routes: []}

  onAPIAvailable = (map) => {
    
    this.map = map;
    //const ref = this.mapRef;
    //let suggestView = new this.map.SuggestView('suggest');
    console.log("arguments = ", this.ref);
    console.log('ref = ', this.map);
    console.log('map', map);
    //console.log('api = ', ymapAPI);
    
  }

  componentDidMount(){
    //var suggestView = new this.map.SuggestView('suggest'),
    //console.log('didMount = ',this.mapRef);
  }

  inputKeyDownHandler = (e) => {
    let val = e.target.value;

    if(e.keyCode === 13){
      var myGeocoder = this.map.geocode(val);
      const _this = this;
      e.target.value = '';

      myGeocoder.then(
        (res) => {
   
          let firstGeoObject = res.geoObjects.get(0);
  
          if(firstGeoObject){
            let coords = firstGeoObject.geometry.getCoordinates();
            //let bounds = firstGeoObject.properties.get('boundedBy');

            _this.state.routes.push(coords);
            _this.addRoute();
            //console.log('Координаты геообъекта = ', coords);
            //console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());
            //console.log('Метаданные ответа геокодера: ', res.metaData);
            //console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));
          }else{
            console.log("Объект не найден");
          }
          
        },
        (err) => {
          // обработка ошибки
          console.log(err);
          console.log("Ошибка");
        }
    );
      
    }
  }

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
        <div>
        <YMaps onApiAvaliable={(map) => this.onAPIAvailable(map)}>
          <Map state={mapState} instanceRef = {ref => {this.mapRef = ref}}/>
        </YMaps>
        
        <input type="text" id="suggest" onKeyDown={this.inputKeyDownHandler}/>

        </div>

    );
  }
}

export default MapContainer;