import React from 'react';

const Tamagotchi = (props) => {
    const { _id, name, birthday, hunger, lastFed, humor, lastSong, wisdom, lifeStage, onReqUpdate } = props

    const fontSizes = ['10em', '13em', '16em'];
    const fontWeights = ['Thin', 'ExtraLight', 'Light', 'Regular', 'Medium', 'SemiBold', 'Bold'];

    let fontSize;
    let fontWeight;

    //calculate Tamagotchi age
    const age = Date.now() - birthday;
    //console.log(age);

    if (hunger < 20) {fontWeight = fontWeights[0]}
    else if (hunger < 40) {fontWeight = fontWeights[1]}
    else if (hunger < 60) {fontWeight = fontWeights[2]}
    else if (hunger < 80) {fontWeight = fontWeights[3]}
    else if (hunger < 100) {fontWeight = fontWeights[4]}
    else if (hunger < 120) {fontWeight = fontWeights[5]}
    else {fontWeight = fontWeights[6]};

    if (humor < 50) {fontSize = fontSizes[0]} 
    else if (humor < 100) {fontSize = fontSizes[1]} 
    else {fontSize = fontSizes[2]}; 

    //Function to execute when user clicks feed button
    const feed = () => {
        fetch('http://localhost:3000/tamagotchi/feed', {
            method: 'PATCH',
            body: JSON.stringify({_id: _id}),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        }) //ask server to serve up all tamas from db
          .then((data) => data.json())
          .then((data) => {
            //console.log("data: ", data);
            //figure out how to update only the one tama in TamaList without deleting the others
            //invoke callback to update state of TamaList. TamaList needs to call setState. Call onReqUpdate
            //console.log('fed Tama: ', data);
            onReqUpdate();
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    }

    const sing = () => {
        fetch('http://localhost:3000/tamagotchi/sing', {
            method: 'PATCH',
            body: JSON.stringify({_id: _id}),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        }) //ask server to serve up all tamas from db
          .then((data) => data.json())
          .then((data) => {
            //console.log("data: ", data);
            //figure out how to update only the one tama in TamaList without deleting the others
            //invoke callback to update state of TamaList. TamaList needs to call setState. Call onReqUpdate
            //console.log('happy Tama: ', data);
            onReqUpdate();
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    }
    
    
    return <div style={styles.container} className="nest">
            <h2 style={styles.h2}>Ü</h2>
            <h3 style={styles.h3}> {name} </h3>
            <p> Wisdom: {wisdom} </p>
            <p> Hunger: {hunger} </p>
            <p> Humor: {humor} </p>
            <p> Life Stage: {lifeStage} </p>

            <button onClick={() => feed()}>Feed</button>
            <button onClick={() => sing()}>Sing A Lullaby</button>
          </div>
} 

const styles = {
    container: {
      border: '1px black solid',
      minWidth: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    },
    h2: {
        fontFamily: 'Arial',
        fontSize: '10em',
    },
    h3: {
        fontFamily: 'Arial',
        fontSize: '2em',
    },
  };


export default Tamagotchi;