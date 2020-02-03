const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /planets/:id */
router.get("/:id", function(req, res, next) {
  const planetApiUrl = `https://swapi.co/api/planets/${req.params.id}`;
  const logErrorMessage = `Encountered the below error while fetching from the url:`;

  /**
   * This method is going to call the SWAPI /planets API
   * and then call the subsequent /people and /species API to get the
   * individual species count inside that planet
   *
   * @param {*} url SWAPI /planets with id as request param
   */
  let fetchPlanetData = async function(url) {
    let planetResults = undefined;
    try {
      console.log(`Calling the /planets API: ${url}`);
      let response = await fetch(url);
      planetResults = await response.json();
    } catch (error) {
      console.error(`${logErrorMessage} ${url}`);
      console.error(`ERROR: ${error}`);
      return error;
    }

    let planetName = planetResults.name;
    let planetResidents = planetResults.residents;
    let species = [];
    for (let i = 0; i < planetResidents.length; i++) {
      const peoplesApiUrl = planetResidents[i];
      console.log(`Calling the /people API url: ${peoplesApiUrl}`);
      try {
        let peoplesResponse = await fetch(peoplesApiUrl);
        let peoplesResult = await peoplesResponse.json();
        // storing all species url in a single array instead of an array of arrays
        species.push.apply(species, peoplesResult.species);
      } catch (error) {
        console.error(`${logErrorMessage} ${peoplesApiUrl}`);
        console.error(`ERROR: ${error}`);
        return error;
      }
    }

    const getSpeciesInfo = async function(urls) {
      //transform requests into Promises, await all
      try {
        let data = await Promise.all(urls.map(requestSpeciesAsync));
        return data;
      } catch (err) {
        console.error(
          `Encountered error fetching all /species info using Promise.all`
        );
        console.error(`ERROR: ${error}`);
        return error;
      }
    };

    const requestSpeciesAsync = async function(url) {
      try {
        console.log(`Calling the /species API: ${url}`);
        let response = await fetch(url);
        let speciesResult = await response.json();
        return speciesResult;
      } catch (error) {
        console.error(`${logErrorMessage} ${url}`);
        console.error(`ERROR: ${error}`);
        return error;
      }
    };

    // Storing all species data and counting the number of species
    speciesData = await getSpeciesInfo(species);
    let speciesName = [];
    speciesData.forEach(speciesInfo => {
      speciesName.push(speciesInfo.name);
    });

    // creating an object to store the count of each species as a key-value pair
    let speciesCountObject = {};
    for (let i = 0; i < speciesName.length; i++) {
      if (speciesName[i] in speciesCountObject) {
        speciesCountObject[speciesName[i]]++;
      } else {
        speciesCountObject[speciesName[i]] = 1;
      }
    }

    // preparing the final result to be sent as per the expected format
    console.log(`Preparing the final object to be sent as response`);
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
