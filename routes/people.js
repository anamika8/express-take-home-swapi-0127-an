const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');
  //res.setHeader("Content-Type", "application/json");

  fetch(`https://swapi.co/api/people/${req.params.id}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      return res.status(500).send(error);
    });

  function displayResults(responseJson) {
    console.log(responseJson);
    res.send(responseJson);
  }
});

module.exports = router;
