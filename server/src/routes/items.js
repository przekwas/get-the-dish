import { Router } from 'express';
import Table from '../table';

let router = Router();
let itemTable = new Table('food_item');
let restuaurantTable = new Table('restaurants');

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


router.post('/newitem', (req, res) => {

    let stuff = req.body.yelp_id;
    let newStuff = stuff.jsonBody;
    res.send(newStuff);

});

export default router;