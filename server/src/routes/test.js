import { Router } from 'express';
import Table, { hesSoHotRightNow } from '../table';

let router = Router();
let itemTable = new Table('food_item');

//Testing out custom methods on a test route
router.get('/', (req, res) => {

    hesSoHotRightNow()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

router.get('/search', (req, res) => {

    let query = req.query;

    itemTable.find(query)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;