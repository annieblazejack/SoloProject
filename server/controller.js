const express = require("express");
const Tamagotchi = require("./model");

//const bcrypt = require('bcrypt');

const controller = {};

controller.createTamagotchi = async (req, res, next) => {
  //get name from req.body somewhere
  console.log("inside createTama controller: ", req.body);
  const { name } = req.body;
  console.log(name);
  const newTamagotchi = await Tamagotchi.create({ name: name });
  console.log("new Tama: ", newTamagotchi);
  //store something in res.locals
  res.locals.newTamagotchi = newTamagotchi;
  //console.log('stored res.locals');
  return next();
};

controller.getTamagotchis = async (req, res, next) => {
  //console.log('inside get Tamas controller')
  const tamagotchis = await Tamagotchi.find({});
  console.log(tamagotchis);
  const now = Date.now();
  res.locals.tamagotchis = tamagotchis;
  //console.log('updated res.locals')
  return next();
};

controller.feedTamagotchi = async (req, res, next) => {
  try {
    //console.log('inside feed controller', req.body)
    const { _id } = req.body;
    const tamagotchi = await Tamagotchi.findOneAndUpdate(
      { _id },
      { hunger: 0, lastFed: Date.now() },
      { useFindAndModify: false, new: true }
    );
    //console.log("updated Tamagotchi: ", tamagotchi);
    res.locals.fedTamagotchi = tamagotchi;
    //console.log('updated res.locals')
    return next();
  } catch (err) {
    return next({
      log: `Error: controller.feedTamagotchi ${err}`,
      message: { err: "An error occurred in controller.feedTamagotchi" },
    });
  }
};

controller.singToTamagotchi = async (req, res, next) => {
  try {
    console.log("inside sing controller");
    const { _id } = req.body;
    const tamagotchi = await Tamagotchi.findOneAndUpdate(
      { _id },
      { humor: 150, lastSong: Date.now() },
      { useFindAndModify: false, new: true }
    );
    console.log("updated Tamagotchi: ", tamagotchi);
    res.locals.happyTamagotchi = tamagotchi;
    console.log("updated res.locals");
    return next();
  } catch (err) {
    return next({
      log: `Error: controller.singToTamagotchi ${err}`,
      message: { err: "An error occurred in controller.singToTamagotchi" },
    });
  }
};

controller.deleteTamagotchi = async (req, res, next) => {
  try {
    console.log("inside delete controller");
    const { _id } = req.body;
    const tamagotchi = await Tamagotchi.findOneAndDelete({ _id });
    console.log("deleted Tamagotchi: ", tamagotchi);
    res.locals.deletedTamagotchi = tamagotchi;
    console.log("updated res.locals");
    return next();
  } catch (err) {
    return next({
      log: `Error: controller.deleteTamagotchi ${err}`,
      message: { err: "An error occurred in controller.deleteTamagotchi" },
    });
  }
};

controller.updateTamagotchiStats = (req, res, next) => {};

//export controller
module.exports = controller;
