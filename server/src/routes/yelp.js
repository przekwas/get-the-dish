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


// // info = object from the form on front end
// async addNewFoodItem(info) {

//   //Step1 is to check if the Restaurant the user has selected is in our database or not
//   let restaurantCheck = async await restaurantTable.checkRestaurant(info.restaurant.yelp_id);

//   //If the restaurant IS NOT in our DB, add it and return the newly created Restaurant ID
//   if (!restaurantCheck) {
//     let newlyCreatedRestaurantId = async await restaurantTable.addRestaurant(getInfoWeNeed(info.restaurant));
//     return newlyCreatedRestaurantId;
//   //If then restaurant IS in our DB, get its Restaurant ID
//   } else {
//     let existingRestaurantId = async await restaurantTable.getExistingRestaurantId(info.restaurant.name);
//     return existingRestaurantId;
//   }

//   //Step 2 is to add the new food item to our DB with the proper (new or existing) restaurant ID attached
//   let results = async await insertFoodItem(info, restaurantId);

//   //Step 3 is to return a 200 ok if the insert is successful
//   let response => async await res.sendStatus(200);
//   catch(error) //blahblah

// }



export default router;