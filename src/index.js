import "babel-polyfill";
import "markup/myUglyStyleSheets.css";

import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import appReducer from "reducer.js";
import App from "app.js";

////////////////////////////////////////////////////////////////////////////////////////////////////

const store = createStore(appReducer, applyMiddleware(thunk));

const RenderMe = (
    <Provider store={store}>
        <App/>
    </Provider>
);


ReactDOM.render(RenderMe, document.getElementById("root"));
