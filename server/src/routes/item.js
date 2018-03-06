import { Router } from 'express';
import Table, { threeMostRecentItems, threeHighestRatedItems } from '../table';

let router = Router();
let itemTable = new Table('food_item');

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

//GET route for latest 3 items added into food_items table by their _created date
router.get('/latest', (req, res) => {

    itemTable.threeMostRecentItems()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

//GET route for hottest 3 items in food_items table by their rating
router.get('/hottest', (req, res) => {

    itemTable.threeHighestRatedItems()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;