import { Router } from 'express';
import Table from '../table';

let router = Router();
let typeTable = new Table('type');

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

export default router;