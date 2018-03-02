import { Router } from 'express';
import Table, { hesSoHotRightNow } from '../table';

let router = Router();
let itemTable = new Table('food_item');

//GET route for all food items
router.get('/', (req, res) => {

    itemTable.getRankedPaniniTestMethod()
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

//Testing out custom methods on a test route
router.get('/test', (req, res) => {

    hesSoHotRightNow()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;