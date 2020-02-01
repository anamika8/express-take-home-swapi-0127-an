const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');

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
      first_name: getFirstName(peopleName),
      last_name: getLastName(peopleName),
      species: species.join()
    };
    return result;
  };

  function getFirstName(name) {
    let fullName = name.split(" ");
    let firstName = "";
    if (fullName.length == 2 || fullName.length == 1) {
      firstName = fullName[0];
    }
    return firstName;
  }

  function getLastName(name) {
    let fullName = name.split(" ");
    let lastName = undefined;
    if (fullName.length == 2) {
      lastName = fullName[1];
    }
    return lastName;
  }

  fetchPeopleData(peopleApiUrl)
    .then(result => res.send(result))
    .catch(error => {
      return res.status(500).send(error);
    });
});

module.exports = router;
