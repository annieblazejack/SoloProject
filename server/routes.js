const express = require('express');

const controller = require('./controller');

const router = express.Router();

//ADD ROUTES FOR DIFFERENT ACTIONS

//GET ALL TAMAGOTCHIS
router.get('/', 
    controller.getTamagotchis,
    (req, res) => {
        return res.status(200).json(res.locals.tamagotchis)
    }
);

//CREATE TAMAGOTCHI
router.post('/', 
    controller.createTamagotchi,
    (req, res) => {
        return res.status(200).json(res.locals.newTamagotchi)
    }
);

//FEED TAMAGOTCHI
router.patch('/feed', 
    controller.feedTamagotchi,
    (req, res) => {
        return res.status(200).json(res.locals.fedTamagotchi)
    }
);

//SING LULLABY TO TAMAGOTCHI
router.patch('/sing', 
    controller.singToTamagotchi,
    (req, res) => {
        return res.status(200).json(res.locals.happyTamagotchi)
    }
);

//DELETE TAMAGOTCHI
router.delete('/', 
  controller.deleteTamagotchi,
  (req, res) => {
    return res.status(200).json(res.locals.deletedTamagotchi);
  });

//PATCH to update Tamagotchi stats
//FEED TAMAGOTCHI

//SING TO TAMAGOTCHI

//ETC




//Export Router
module.exports = router;