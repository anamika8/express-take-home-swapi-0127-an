var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* GET /planets/:id */
router.get("/:id", function(req, res, next) {
  const planetApiUrl = `https://swapi.co/api/planets/${req.params.id}`;

  let fetchPlanetData = async function(url) {
    let response = await fetch(url);
    let planetResults = await response.json();
    let planetName = planetResults.name;
    let planetResidents = planetResults.residents;
    let species = [];
    for (let i = 0; i < planetResidents.length; i++) {
      const peoplesApiUrl = planetResidents[i];
      console.log(`The peoples url: ${peoplesApiUrl}`);
      let peoplesResponse = await fetch(peoplesApiUrl);
      let peoplesResult = await peoplesResponse.json();
      species.push.apply(species, peoplesResult.species);
    }

    var getSpeciesInfo = async function(urls) {
      //transform requests into Promises, await all
      try {
        var data = await Promise.all(urls.map(requestSpeciesAsync));
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    var requestSpeciesAsync = async function(url) {
      let response = await fetch(url);
      let speciesResult = await response.json();
      return speciesResult;
    };

    speciesData = await getSpeciesInfo(species);
    let speciesName = [];
    speciesData.map(speciesInfo => {
      speciesName.push(speciesInfo.name);
    });

    let speciesCountObject = {};
    for (let i = 0; i < speciesName.length; i++) {
      if (speciesName[i] in speciesCountObject) {
        speciesCountObject[speciesName[i]]++;
      } else {
        speciesCountObject[speciesName[i]] = 1;
      }
    }

    let result = {
      name: planetName,
      count: speciesCountObject
    };
    return result;
  };

  fetchPlanetData(planetApiUrl)
    .then(result => res.send(result))
    .catch(error => {
      return res.status(500).send(error);
    });
});

module.exports = router;
