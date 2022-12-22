const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://AnnieBlazejack:Einnabl22@cluster0.tcki7ls.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: "Tamagotchi",
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

// sets a schema for the 'species' collection
const tamagotchiSchema = new Schema({
  name: { type: String, required: true },
  birthday: { type: Number, default: Date.now() },
  hunger: { type: Number, default: 100 },
  lastFed: { type: Number, default: Date.now() },
  humor: { type: Number, default: 50 },
  lastSong: { type: Number, default: Date.now() },
  wisdom: { type: Number, default: 0 },
  lifeStage: { type: String, default: "baby" },
  score: { type: Number, default: 0 },
  //password: {type: String, required: false},
  //refreshToken: String
});

// creats a model for the 'species' collection that will be part of the export
module.exports = mongoose.model("Tamagotchi", tamagotchiSchema);

// export class Tamagotchi {
//     constructor(name) {
//         this.id = 0;
//         this.name = name;
//         this.birthday = Date.now();
//         this.lifeStage = "baby";
//         this.hunger = 100;
//         this.wisdom = 0;
//         this.humor = 50;
//     }

//     //feed, sing lullaby
//     feed() {
//         this.hunger = 0;
//     }

//     singLullaby() {
//         this.humor = Math.min(150, this.humor + 25);
//     }
// }
