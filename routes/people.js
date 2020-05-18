const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');

  const peopleApiUrl = `https://swapi.dev/api/people/${req.params.id}`;
  const logErrorMessage = `Encountered the below error while fetching from the url:`;

  /**
   * This method is going to call the SWAPI /people API
   * and then call the subsequent /species API to get the
   * species name of that person
   *
   * @param {*} url SWAPI /people with id as request param
   */
  let fetchPeopleData = async function(url) {
    let peopleResults = undefined;
    try {
      console.log(`Calling the /people API: ${url}`);
      let response = await fetch(url);
      peopleResults = await response.json();
    } catch (error) {
      console.error(`${logErrorMessage} ${url}`);
      console.error(`ERROR: ${error}`);
      return error;
    }

    let peopleName = peopleResults.name;
    let speciesArray = peopleResults.species;
    let species = [];
    for (let i = 0; i < speciesArray.length; i++) {
      const speciesApiUrl = speciesArray[i];
      try {
        console.log(`Calling the species url: ${speciesApiUrl}`);
        let speciesResponse = await fetch(speciesApiUrl);
        let speciesResult = await speciesResponse.json();
        species.push(speciesResult.name);
      } catch (error) {
        console.error(`${logErrorMessage} ${speciesApiUrl}`);
        console.error(`ERROR: ${error}`);
        return error;
      }
    }

    // preparing the result to return in the expected format
    let result = {
      first_name: getFirstName(peopleName),
      last_name: getLastName(peopleName),
      species: species.join()
    };
    return result;
  };

  /**
   * Utility method to extract the first name from the fullname
   * @param {*} name
   */
  function getFirstName(name) {
    let fullName = name.split(" ");
    let firstName = "";
    if (fullName.length == 2 || fullName.length == 1) {
      firstName = fullName[0];
    }
    return firstName;
  }

  /**
   * Utility method to extract the last name from the fullname.
   * If no last name, then returns undefined
   * @param {*} name
   */
  function getLastName(name) {
    let fullName = name.split(" ");
    let lastName = undefined;
    if (fullName.length >= 2) {
      lastName = fullName[fullName.length - 1];
    }
    return lastName;
  }

  /*
  Calling the 'fetchPeopleData()' method and sending the result back to the caller.
  Will be sending a 500 status code if any error is encountered.
  */
  fetchPeopleData(peopleApiUrl)
    .then(result => res.send(result))
    .catch(error => {
      return res.status(500).send(error);
    });
});

module.exports = router;
