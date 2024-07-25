const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pool = require(`../modules/pool.js`)

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = `
            SELECT * FROM "koalas"
                ORDER BY "id";
    `;
    
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
koalaRouter.post(`/`, (req, res) => {
    // console.log(`Request in koala /POST made! `, req.body)
    let koalaTransfer
    if(req.body.koalaTransfer === `false`){
        koalaTransfer = false}
    if(req.body.koalaTransfer === `true`){
        koalaTransfer = true}
    let koalaName = req.body.koalaName
    let koalaColor = req.body.koalaColor
    let koalaAge = req.body.koalaAge
    let koalaNote = req.body.koalaNote
    // console.log(`koalaTransfer before SQL Query is:`, koalaTransfer)
    let sqlText = `INSERT INTO "koalas"
	("name", "age", "favorite_color", "ready_to_transfer", "notes")
	VALUES
	($1, $2, $3, $4, $5);`
    let sqlValues = [koalaName, koalaAge, koalaColor, koalaTransfer, koalaNote]
    pool.query(sqlText, sqlValues)
        .then((dbResponse) =>{
            res.sendStatus(201)
        }).catch((dbErr) => {
            console.log(`SQL Query error in koalas/POST: `, dbErr)
            res.sendStatus(500)
        })
})

// PUT
koalaRouter.put('/:koala_id', (req, res) => {
    console.log(`PUT /koalas/:koala_id received a request!`);
  
    const koalaIdToUpdate = req.params.koala_id;
    const transferStatus = req.body.transfer;
    
    let sqlText = `
      UPDATE "koalas"
        SET "ready_to_transfer" = 'true'
        WHERE "id" = $1;
    `
  
    const sqlValues = [koalaIdToUpdate];
  
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        res.sendStatus(200);
      })
      .catch((dbError) => {
        console.log('SQL query error in PUT /koalas/:koala_id', dbError);
        res.sendStatus(500);
      })
  })

// DELETE
koalaRouter.delete('/:koalaId', (req, res) => {
    //
    const sqlQuery = `
    DELETE FROM "koalas"
	WHERE "id" = $1;`
    //Magic Spell to get paramater
    const sqlValues = [req.params.koalaId]
    pool.query(sqlQuery, sqlValues)
        .then((dbResponse) => {
            res.sendStatus(200)
        }).catch((dbErr) =>{
            console.log(`SQL Query error in koalas/DELETE: `, dbErr)
            res.sendStatus(500)
        })
    
})

// PATCH
koalaRouter.patch(`/:koalaId`, (req, res) =>{
    const sqlText = `
    UPDATE "koalas"
	    SET "name" = $1, "age" = $2, "favorite_color" = $3, "notes" = $4
	    WHERE "id" = $5;`
    const sqlValues = [req.body.newKoalaName, req.body.newKoalaAge, req.body.newKoalaColor, req.body.newKoalaNote, req.params.koalaId]
    pool.query(sqlText, sqlValues)
    .then((response) =>{
        res.sendStatus(200)
    }).catch((dbErr) =>{
        console.log(`SQL Query error in koalas/PATCH: `, dbErr)
        res.sendStatus(500)
    })
})
module.exports = koalaRouter;