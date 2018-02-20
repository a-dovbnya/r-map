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
