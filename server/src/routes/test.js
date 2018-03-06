import { Router } from 'express';
import Table from '../table';

let router = Router();
let typeTable = new Table('type');
let itemTable = new Table('food_item');

router.get('/search', (req, res) => {

    let query = req.query;

    typeTable.find(query)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;