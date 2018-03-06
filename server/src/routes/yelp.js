import { Router } from 'express';

'use strict';
const yelp = require('yelp-fusion');
const apiKey = process.env.YELP_KEY;

const searchRequest = {
  term:'urban standard',
  location: 'birmingham, al'
};

const client = yelp.client(apiKey);

let router = Router();
let itemTable = new Table('food_item');

//GET route for latest 3 items added into food_items table by their _created date
router.get('/search', (req, res) => {
  
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });

});

export default router;