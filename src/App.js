import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { YMaps, Map, Placemark } from 'react-yandex-maps';
 
const mapState = { center: [55.76, 37.64], zoom: 10 };
 
const MyPlacemark = () => (
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
);

class App extends Component {
  render() {
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
          <MyPlacemark />
        </div>
      </div>
    );
  }
}

export default App;
