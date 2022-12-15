import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root"));


function component() {
    const element = document.createElement('div');
  
    element.innerHTML = 'Hello';
  
    return element;
  }
  
  document.body.appendChild(component());