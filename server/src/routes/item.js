import { Router } from 'express';
import Table from '../table';

let router = Router();
let itemTable = new Table('food_item');

//GET route for all items
router.get('/', (req, res) => {

    itemTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});


//GET route for single item
router.get('/:id', (req, res) => {

    let id = req.params.id;

     itemTable.getOne(id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;