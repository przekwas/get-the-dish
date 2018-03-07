import { Router } from 'express';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

const searchRequest = {
  location: 'birmingham, al'
  // latitude: '33.543682',
  // longitude: '-86.779633'
};

const autoRequest = {
  text: 'urb',
  latitude: '33.543682',
  longitude: '-86.779633'
};


router.get('/search', (req, res) => {
  
  client.search(searchRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses;
    res.json(firstResult);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });

});

router.get('/business/:id', (req, res) => {
  
  let id = req.params.id;
  // let businessRequest = {
  //   id: id
  //   // latitude: '33.543682',
  //   // longitude: '-86.779633'
  // };

  client.business(id)
  .then(response => {
    const firstResult = response.jsonBody;
    res.json(firstResult);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });

});



router.get('/auto', (req, res) => {
  
  client.autocomplete(autoRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses;
    res.json(firstResult);
  }).catch(e => {
    console.log(e);
    res.sendStatus(500);
  });

});



export default router;