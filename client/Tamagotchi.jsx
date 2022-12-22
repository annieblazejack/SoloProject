import React, { useState, useEffect } from "react";

const Tamagotchi = (props) => {
  const {
    _id,
    name,
    birthday,
    hunger,
    lastFed,
    humor,
    lastSong,
    wisdom,
    onReqUpdate,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    if (isHovered) {
      let localIsItalic = isItalic;
      const interval = setInterval(() => {
        localIsItalic = !localIsItalic;
        setIsItalic(localIsItalic);
      }, 500);
      return () => {
        setIsItalic(false);
        clearInterval(interval);
      };
    }
  }, [isHovered]);

  let hunger1 = hunger;
  let humor1 = humor;
  let lifeStage;

  const fontSizes = ["9em", "13em", "17em"];
  
  const colors = [
    "rgb(36, 36, 36)",
    "rgb(73, 73, 73)",
    "rgb(109, 109, 109)",
    "rgb(145, 145, 145)",
    "rgb(181, 181, 181)",
    "rgb(220, 220, 220)",
  ];

  let fontSize;
  let fontWeight;
  let color;
  let fontStyle = "normal";

  hunger1 = Math.floor((Date.now() - lastFed) / 600000);
  //console.log(hunger1)
  humor1 = 150 - Math.floor((Date.now() - lastSong) / 600000);
  // console.log(humor1)
  const stage = Math.floor((Date.now() - birthday) / 518400000);
  const lifeStages = ["baby", "kid", "teen", "adult", "old creature"];
  lifeStage = lifeStages[stage];

  if (hunger1 < 20) {
    fontWeight = "700";
  } else if (hunger1 < 40) {
    fontWeight = "600";
  } else if (hunger1 < 60) {
    fontWeight = "500";
  } else if (hunger1 < 80) {
    fontWeight = "400";
  } else if (hunger1 < 100) {
    fontWeight = "300";
  } else if (hunger1 < 120) {
    fontWeight = "200";
  } else {
    fontWeight = "100";
  }

  if (humor1 < 50) {
    fontSize = fontSizes[0];
  } else if (humor1 < 100) {
    fontSize = fontSizes[1];
  } else {
    fontSize = fontSizes[2];
  }

  if (lifeStage === "baby") {
    color=colors[0];
  } else if (lifeStage === "kid") {
    color=colors[0];
  } else if (lifeStage === "teen") {
    color=colors[0];
  } else if (lifeStage === "adult") {
    color=colors[0];
  } else if (lifeStage === "old creature") {
    color=colors[0];
  }

  const italicShake = () => {
    setInterval(() => {
      if ((fontStyle = "italic")) {
        fontStyle = "normal";
        return fontStyle;
      } else if ((fontStyle = "normal")) {
        fontStyle = "italic";
        return fontStyle;
      }
    }, 500);
  };

  const styles = {
    container: {
      border: "1px black solid",
      minWidth: "15%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1%",
    },
    h2: {
      fontFamily: "MuseoModerno",
      fontSize: `${fontSize}`,
      fontWeight: `${fontWeight}`,
      color: `${color}`,
      fontStyle: isItalic ? "italic" : "normal",
      margin: "1%",
    },
    h3: {
      fontFamily: "Arial",
      fontSize: "2em",
      margin: "1%",
    },
    p: {
      fontSize: ".8em",
    },
  };

  //Function to execute when user clicks feed button
  const feed = () => {
    fetch("http://localhost:3000/tamagotchi/feed", {
      method: "PATCH",
      body: JSON.stringify({ _id: _id }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
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
        console.log("Error:", error);
      });
  };

  const sing = () => {
    fetch("http://localhost:3000/tamagotchi/sing", {
      method: "PATCH",
      body: JSON.stringify({ _id: _id }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
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
        console.log("Error:", error);
      });
  };

  const del = () => {
    fetch("http://localhost:3000/tamagotchi", {
      method: "DELETE",
      body: JSON.stringify({ _id: _id }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
    .then((data) => data.json())
    .then((data) => {
      onReqUpdate();
    })
    .catch((error) => {
      console.log("Error:", error);
    });
  }

  return (
    <div style={styles.container} className="nest">
      <span className="font-link">
        <h2
          style={styles.h2}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          ü
        </h2>
      </span>

      <h3 style={styles.h3}> {name} </h3>
      <p>
        {" "}
        Hunger: {hunger1} <br />
        Humor: {humor1} <br />
        Life Stage: {lifeStage}{" "}
      </p>
      <span>
        <button onClick={() => feed()}> Feed </button>
        <button onClick={() => sing()}>Sing A Lullaby</button>
        <button onClick={() => del()}>Release Into The Wild</button>
      </span>
    </div>
  );
};

export default Tamagotchi;
