import React from 'react';
import { render } from 'react-dom';
import App from './App';


render(
  <App />,
  document.getElementById("root")
);

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = 'Hello';
  
    return element;
  }
  
  document.body.appendChild(component());

  