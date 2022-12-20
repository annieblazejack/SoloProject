import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import TamagotchiList from "./TamagotchiList";
import "./style.css";

//class-based component
class App extends Component{
  render() {
    return (
      <div style={styles.container}>
        <h1> Digital Pet Zoo </h1>
        <TamagotchiList />
      </div>
    );
  }
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };


// Render an <App> component to the #root div in the index.html body
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
