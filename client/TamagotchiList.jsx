import React, { Component } from 'react';
import Tamagotchi from './Tamagotchi';

class TamagotchiList extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tamagotchis: []
        };
    }

    createTamagotchi() {
        fetch('http://localhost:3000/tamagotchi', {
            method: 'POST',
            body: JSON.stringify({name: document.getElementById('newPet')}),
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        }) //ask server to serve up all tamas from db
          .then((data) => data.json())
          .then((data) => {
            //console.log("data: ", data);
            //figure out how to update only the one tama in TamaList without deleting the others
            //invoke callback to update state of TamaList. TamaList needs to call setState. Call onReqUpdate
            console.log('new Tama data: ', data);
            this.updateTamagotchis();
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    }

    updateTamagotchis() {
        fetch('http://localhost:3000/tamagotchi') //ask server to serve up all tamas from db
          .then((data) => data.json())
          .then((data) => {
            //console.log("data: ", data);
            this.setState({tamagotchis: data});
          })
          .catch((error) => {
            console.log('Error:', error);
          });
    }

    componentDidMount() {
        this.updateTamagotchis();
    }



    render() {
        console.log("state: ", this.state.tamagotchis);
        return (
            <div>
                <form style={styles.container} onSubmit={this.createTamagotchi}>
                    <input type='text' id='newPet' placeholder='Name Your New Pet' />
                    <button type='submit'> Create My Baby Tamagotchi! </button>
                </form>
                <div style={styles.container}>
                    
                    {this.state.tamagotchis.map((tamagotchi, index) =>
                        <Tamagotchi 
                            _id={tamagotchi._id}
                            name={tamagotchi.name}
                            birthday={tamagotchi.birthday}
                            hunger={tamagotchi.hunger}
                            lastFed={tamagotchi.lastFed}
                            humor={tamagotchi.humor}
                            lastSong={tamagotchi.lastSong}
                            wisdom={tamagotchi.wisdom}
                            lifeStage={tamagotchi.wisdom} 
                            key={tamagotchi.name + index}
                            onReqUpdate={() => {
                                this.updateTamagotchis()
                            }} 
                        />
                        // React.createElement(Tamagotchi, { name: tamagotchi.name, ... })
                    )}
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
      border: '1px black solid',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
  };
  
  export default TamagotchiList;