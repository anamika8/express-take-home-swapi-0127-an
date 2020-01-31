const express = require("express");
const router = express.Router();
const request = require("request");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');
  if (!req.params.id) {
    const message = `Please provide resource id to get specific people details`;
    console.error(message);
    return res.status(404).send(message);
  }

  request.get(
    { url: `https://swapi.co/api/people/${req.params.id}` },
    (error, response, body) => {
      if (error) {
        return res.status(500).json(error);
      }
      res.status(response.statusCode).json(body);
    }
  );
});

module.exports = router;
