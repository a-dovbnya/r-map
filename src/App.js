import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Map, Marker, MarkerLayout, Api } from 'yandex-map-react';
//import { YMaps, Map, Placemark } from 'react-yandex-maps';
 
//const mapState = { center: [55.76, 37.64], zoom: 10 };
 
/* const MyPlacemark = () => (
  <YMaps>
    <Map state={mapState}>
 
      <Placemark
        geometry={{
          coordinates: [55.751574, 37.573856]
        }}
        properties={{
          hintContent: 'Собственный значок метки',
          balloonContent: 'Это красивая метка'
        }}
        options={{
          iconLayout: 'default#image',
          iconImageHref: 'images/myIcon.gif',
          iconImageSize: [30, 42],
          iconImageOffset: [-3, -42]
        }}
      />
 
    </Map>
  </YMaps>
); */

class App extends Component {

  state = {routes: []}

  onAPIAvailable = (map) => {
    
    this.map = map;
    //let suggestView = new this.map.SuggestView('suggest');
    console.log('map', map);
    console.log('api = ', this.mapRef);
    
  }

  componentDidMount(){
    //var suggestView = new this.map.SuggestView('suggest'),
  }

  inputKeyDownHandler = (e) => {
    let val = e.target.value;

    if(e.keyCode === 13){
      console.log('start', this.map);
      var myGeocoder = this.map.geocode(val);
      const _this = this;

      myGeocoder.then(
        function (res) {
   
          let firstGeoObject = res.geoObjects.get(0);
  
          if(firstGeoObject){
            let coords = firstGeoObject.geometry.getCoordinates();
            let bounds = firstGeoObject.properties.get('boundedBy');

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
        function (err) {
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
        /* route.getPaths().options.set({
            // в балуне выводим только информацию о времени движения с учетом пробок
            balloonContentBodyLayout: this.map.templateLayoutFactory.createClass('$[properties.humanJamsTime]'),
            // можно выставить настройки графики маршруту
            strokeColor: '0000ffff',
            opacity: 0.9
        }); */
        // добавляем маршрут на карту
        console.log("geo objects = ", _this.mapRef);
        _this.mapRef.geoObjects.add(route);
    });
  }

  render() {
    console.log('state = ', this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <Map onAPIAvailable={this.onAPIAvailable} center={[55.754734, 37.583314]} zoom={10} ref = {(ref) => this.mapRef = ref}>
            <Marker lat={55.754734} lon={37.583314} />
          </Map>
        </div>
        <div>
    
            <input type="text" id="suggest" onKeyDown={this.inputKeyDownHandler}/>
      
        </div>
      </div>
    );
  }
}

export default App;
