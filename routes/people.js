const express = require("express");
const router = express.Router();
const request = require("request");

/* GET /people/:id */
router.get("/:id", function(req, res, next) {
  //res.send('enter resource here');
  res.setHeader("Content-Type", "application/json");

  request.get(
    { url: `https://swapi.co/api/people/${req.params.id}` },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(response.statusCode).send(body);
    }
  );
});

module.exports = router;
