import { Router } from 'express';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

//Route to get Birmingham, AL business to populate dropdown on front end
router.get('/search', (req, res) => {

  let searchRequest = {
    term: 'food',
    latitude: '33.543682',
    longitude: '-86.779633',
    radius: '40000',
    limit: '50',
    offset: '0'
  };

  client.search(searchRequest)
    .then(response => {
      const firstResult = response.jsonBody.businesses
      searchRequest.offset = '51'
        .then(client.search(searchRequest)
          .then((nextResponse => {
            const secondResult = nextResponse.jsonBody.businesses
            firstResult.push(secondResult)
            res.json(firstResult);
          })))
      // res.json(firstResult)
    }).catch(e => {
      console.log(e);
      res.sendStatus(500);
    });

});

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