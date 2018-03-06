import { Router } from 'express';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

const searchRequest = {
  term:'urban standard',
  location: 'birmingham, al'
};

//GET route for latest 3 items added into food_items table by their _created date
router.get('/search', (req, res) => {
  
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    // const prettyJson = JSON.stringify(firstResult, null, 4);
    res.json(firstResult);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });

});

export default router;