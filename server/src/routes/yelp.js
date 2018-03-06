import { Router } from 'express';
import Table from '../table';

//Yelp Fusion API
'use strict';
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_KEY);

let router = Router();
let itemTable = new Table('food_item');

//GET route for latest 3 items added into food_items table by their _created date
router.get('/search', (req, res) => {

    let text = req.query;

    client.autocomplete({
        text: 'pizza'
      }).then(response => {
        res.json(response.jsonBody.terms[0].text);
      }).catch(error => {
        console.log(error);
        res.sendStatus(500);
      });

});