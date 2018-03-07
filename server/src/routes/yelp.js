import { Router } from 'express';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

const searchRequest = {
  term:'birmingham, al'
};


router.get('/search', (req, res) => {
  
  client.search(searchRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses[0];
    res.json(firstResult);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });

});

export default router;