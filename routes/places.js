var express = require("express");
const router = express.Router();
const Place = require("../models/places");
router.post("/", (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;

  const newPlace = new Place({
    nickname,
    name,
    latitude,
    longitude,
  });
  newPlace.save().then((data) => {
    res.status(200).json({ result: true });
  });
});

router.get("/:nickname", (req, res) => {
  const { nickname } = req.params;
  Place.find({ nickname }).then((data) => {
    if (data) {
      res.status(200).json({ result: true, places: data });
    } else {
      res.json({ result: false });
    }
  });
});

router.delete("/", (req, res) => {
  const { nickname, name } = req.body;

  console.log(req.body);
  Place.deleteOne({ nickname, name }).then((data) => {
    if (data) {
      res.status(200).json({ result: true });
    } else {
      res.json({ result: false });
    }
  });
});

module.exports = router;
