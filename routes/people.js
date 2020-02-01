const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');
  //res.setHeader("Content-Type", "application/json");

  let peopleInfo = {
    name,
    species
  };

  fetch(`https://swapi.co/api/people/${req.params.id}`)
    .then(response => response.json())
    .then(responseJson => {
      peopleInfo = {
        name: responseJson.name,
        species: responseJson.species
      };
      return peopleInfo;
    })
    .then(peopleInfo => fetchSpeciesInfo(peopleInfo))
    .catch(error => {
      return res.status(500).send(error);
    });

  function fetchSpeciesInfo(peopleInfo) {
    console.log(peopleInfo);
    res.send(peopleInfo);
  }
});

module.exports = router;
