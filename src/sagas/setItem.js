import { takeLatest, put, call } from "redux-saga/effects";
import { setPlace, receivedData, receivedError } from "../actions";

import { getGeoCode } from "../api";

function* setItemFlow(action) {
  try {
    // Запрос на получение координат геообъекта
    const response = yield call(getGeoCode, action.payload);

    if (response === null) {
      // Диспатичим экшн с ошибкой "Объект не найден"
      yield put(receivedError("Объект не найден"));
    } else {
      // Посылаем Экшн с данными
      yield put(receivedData({ name: action.payload, coords: response }));
    }
  } catch (error) {
    // Диспатичим экшн с ошибкой "Ошибка при выполнении запроса"
    console.log("Ошибка в саге = ", error);
    yield put(receivedError("Ошибка при выполнении запроса"));
  }
}

export function* setItemWatch() {
  yield takeLatest(setPlace, setItemFlow);
}
