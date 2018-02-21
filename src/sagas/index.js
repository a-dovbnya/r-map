import { fork } from "redux-saga/effects";
import { setItemWatch } from "./setItem";

export default function*() {
  yield fork(setItemWatch);
}
