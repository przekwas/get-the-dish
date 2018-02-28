import { Router } from 'express';
import Table from '../table';

let router = Router();
let typeTable = new Table('type');

//GET route for all types
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

//GET route for single type
router.get('/:id', (req, res) => {

    let id = req.params.id;

     typeTable.getOne(id)
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });

});

export default router;