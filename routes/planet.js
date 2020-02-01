var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

/* GET /planets/:id */
router.get("/:id", function(req, res, next) {
  //res.send("enter resource here");
  const planetApiUrl = `https://swapi.co/api/planets/${req.params.id}`;

  let fetchPlanetData = async function(url) {
    let response = await fetch(url);
    let planetResults = await response.json();
    let planetResidents = planetResults.residents;
    let residents = [];
    for (let i = 0; i < planetResidents.length; i++) {
      const residentsApiUrl = planetResidents[i];
      console.log(`The residents url: ${residentsApiUrl}`);
      let residentsResponse = await fetch(residentsApiUrl);
      let residentsResult = await residentsResponse.json();
      residents.push(residentsResult.species);
    }

    let result = {
      residents: residents
    };
    return result;
  };

  fetchPlanetData(planetApiUrl).then(result => res.send(result));
  /*.catch(error => {
      return res.status(500).send(error);
    });*/
});

module.exports = router;
