import { Router } from 'express';
import Table from '../table';
'use strict';
import yelp from 'yelp-fusion';
const apiKey = process.env.YELP_KEY;

let router = Router();
const client = yelp.client(apiKey);

let itemTable = new Table('food_item');
let restaurantTable = new Table('restaurants');

//GET route for all food items
router.get('/', (req, res) => {

    itemTable.getAllItems()
        .then((results) => {
            res.json(results);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });

});

//GET route for a single food item type
router.get('/:id', (req, res) => {

    let id = req.params.id;

    itemTable.getRankedItemsOfType(id)
        .then((results) => {
            res.json(results);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });

});

//POST route for adding a new food item.  If/Else to determine restaurants existence in our database.
//If restaurant exists - pull its id.  Else, look it up on Yelp's API, pull its info, insert it into ours, and return new ID
router.post('/checkrest', (req, res) => {

    let yelp_id = req.body.restaurant_id;

    restaurantTable.checkRestaurantExists(yelp_id)
        .then((results) => {

            if (results.does_exist === 1) {

                return restaurantTable.getIdOfRestaurant(yelp_id)
                    .then((resultId) => {
                        req.body.restaurant_id = resultId.id;
                        itemTable.insert(req.body)
                            .then((resultInsert) => {
                                res.status(201).send('Coolio!');
                            })
                    });

            } else {

                return client.business(yelp_id)
                    .then((response) => {
                        const firstResult = response.jsonBody;
                        let neededInfo = getInfoWeNeed(firstResult);
                        restaurantTable.insert(neededInfo[0])
                            .then((resultId) => {
                                req.body.restaurant_id = resultId.id;
                                itemTable.insert(req.body)
                                .then((resultInsert) => {
                                    res.status(201).send('Siiiiiiiiiiiiiiiiiiiiick!');
                                })
                            })
                    });

            }

        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });

});

//Method to strip the Yelp API response of the properties and values we need for our table
const getInfoWeNeed = (result) => {

    let restaurantArray = [];

    let restaurantData = {
        name: result.name,
        yelp_id: result.id,
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