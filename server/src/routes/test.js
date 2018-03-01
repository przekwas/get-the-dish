import { Router } from 'express';
import { hesSoHotRightNow } from '../table';

let router = Router();

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

export default router;