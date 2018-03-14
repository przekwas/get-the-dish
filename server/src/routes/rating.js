import { Router } from 'express';
import Table, { hesSoHotRightNow } from '../table';

let router = Router();
let itemTable = new Table('food_item');

//GET route for specifically pulling the rating of a specific item
router.get('/:id', (req, res) => {

    let id = req.params.id;

    itemTable.getSpecificItemRating(id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

//PUT route to add one to a specific item's rating
router.put('/:id',(req, res) => {

    let id = req.params.id;

    itemTable.addOneToSpecificItemRating(id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;