import { Router } from 'express';
import Table from '../table';

let router = Router();
let typeTable = new Table('type');
let itemTable = new Table('food_item');

//GET route for all food types
router.get('/', (req, res) => {
    console.log(req.user);
    typeTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

//GET route for food items of a single food type
router.get('/:id', (req, res) => {

    let id = req.params.id;

     itemTable.getItemsOfType(id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;