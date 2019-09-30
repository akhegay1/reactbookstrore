import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./js/components/App";


import storeFactory from './store'
//import { addColor, removeColor, rateColor, editSelected, sortColors, editColor } from './actions'

export const store = storeFactory()


function render() {
  ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
  );
}
store.subscribe(render);
render();