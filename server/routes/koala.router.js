const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas";';
    
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    })
      .catch(error => {
        console.log('error getting koalas', error);
        res.sendStatus(500);
      });
  });

// POST


// PUT


// DELETE

module.exports = koalaRouter;