import { Router } from 'express';
import Table from '../table';

let router = Router();
let itemTable = new Table('food_item');

router.get('/', (req, res) => {
    console.log(req.user);
    itemTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;