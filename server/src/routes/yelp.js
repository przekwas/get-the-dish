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

const getInfoWeNeed = (result) => {

  let restaurantArray = [];

  let nameObject = { name: result.name };
  restaurantArray.push(nameObject);

  let streetAddressObject = { address: result.location.address1 };
  restaurantArray.push(streetAddressObject);

  let cityObject = { city: result.location.city };
  restaurantArray.push(cityObject);

  let stateObject = { state: result.location.state };
  restaurantArray.push(stateObject);
  
  let postalObject = { postal_code: result.location.zip_code };
  restaurantArray.push(postalObject);
  
  let longitudeObject = { longitude: result.coordinates.longitude };
  restaurantArray.push(longitudeObject);
  
  let latitudeObject = { latitude: result.coordinates.latitude };
  restaurantArray.push(latitudeObject);
  
  let phoneObject = { phone: result.phone };
  restaurantArray.push(phoneObject);
  
  let displayPhoneObject = { display_phone: result.display_phone };
  restaurantArray.push(displayPhoneObject);
  

  return restaurantArray;

};

export default router;