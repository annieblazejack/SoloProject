import React, { Component} from "react";
import "./style.css";

//class-based component
// class App extends Component{
//   render(){
//     return(
//       <div className="App">
//         <h1> Hello, World! </h1>
//       </div>
//     );
//   }
// }

//functional component
function App() {
    return(
    <div className="App">
        <h1> Hello, World! </h1>
        <button onClick={async () => {
            const result = await fetch('http://localhost:3000');
            const text = await result.text();
            console.log(text);
        }} >Fetch Test</button>
        <button onClick={async () => {
            const result = await fetch('http://localhost:3000');
            const text = await result.text();
            console.log(text);
        }} >I want a Tamagotchi</button>
        <button onClick={async () => {
            const result = await fetch('http://localhost:3000');
            const text = await result.text();
            console.log(text);
        }} >Delete Tamagotchi</button>
        
    </div>
    );
}


export default App;