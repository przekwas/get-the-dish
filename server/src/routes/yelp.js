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

//Route to get Birmingham, AL business to populate dropdown on front end
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

//Route to get the user's chosen business from Yelp when selected on our add item screen
router.get('/business/:id', (req, res) => {

  let id = req.params.id;

  client.business(id)
    .then(response => {
      const firstResult = response.jsonBody;
      res.json(getInfoWeNeed(firstResult));
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

const getInfoWeNeed = (result) => {

  let restaurantArray = [];

  let restaurantData = {
    name: result.name,
    address: result.location.address1,
    city: result.location.city,
    state: result.location.state,
    postal_code: result.location.zip_code,
    longitude: result.coordinates.longitude,
    latitude: result.coordinates.latitude,
    phone: result.phone,
    display_phone: result.display_phone
  };

  restaurantArray.push(restaurantData);

  return restaurantArray;

};

export default router;