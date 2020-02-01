const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');
  //res.setHeader("Content-Type", "application/json");
  const peopleApiUrl = `https://swapi.co/api/people/${req.params.id}`;

  let fetchPeopleData = async function(url) {
    let response = await fetch(url);
    let peopleResults = await response.json();
    let peopleName = peopleResults.name;
    let speciesArray = peopleResults.species;
    let species = [];
    for (let i = 0; i < speciesArray.length; i++) {
      const speciesApiUrl = speciesArray[i];
      console.log(`The species url: ${speciesApiUrl}`);
      let speciesResponse = await fetch(speciesApiUrl);
      let speciesResult = await speciesResponse.json();
      species.push(speciesResult.name);
    }
    let result = {
      name: peopleName,
      species: species.join()
    };
    return result;
  };

  fetchPeopleData(peopleApiUrl).then(result => res.send(result));

  /*
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
  */
});

module.exports = router;
