import { Router } from 'express';
import Table from '../table';

let router = Router();
let classTable = new Table('type');

router.get('/', (req, res) => {
    console.log(req.user);
    classTable.getAll()
    .then((results) => {
        res.json(results);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;