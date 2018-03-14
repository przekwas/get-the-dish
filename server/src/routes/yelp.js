import { Router } from 'express';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

//Route to get Birmingham, AL business to populate dropdown on front end
router.get('/search', (req, res) => {

  //Search request to get 50 restaurants in a 25mile radius of user
  let searchRequest = {
    term: 'food',
    latitude: '33.543682',
    longitude: '-86.779633',
    radius: '40000',
    limit: '50',
    offset: '0'
  };

  //Search request to get results 51-100 based on same radius of user
  let searchRequest2 = {
    term: 'food',
    latitude: '33.543682',
    longitude: '-86.779633',
    radius: '40000',
    limit: '50',
    offset: '51'
  };

  //Yelp business search API endpoint that responds with list of businesses
  client.search(searchRequest)
    .then(response => {
      const firstResult = response.jsonBody.businesses;
      res.json(firstResult)
    }).catch(e => {
      console.log(e);
      res.sendStatus(500);
    });

});

//Experimenting with Yelps autocomplete API endpoint
// router.get('/auto', (req, res) => {

//   client.autocomplete(autoRequest)
//     .then(response => {
//       const firstResult = response.jsonBody.businesses;
//       res.json(firstResult);
//     }).catch(e => {
//       console.log(e);
//       res.sendStatus(500);
//     });

// });

export default router;