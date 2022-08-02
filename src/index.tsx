import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './app/store';
// todo: come back here! import from ./App suddenly stopped working :O and ./App.tsx does not make TS happy
// @ts-ignor_
import App from './App.tsx';
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
