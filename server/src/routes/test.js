import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

let usersItemsTable = new Table('users_items');
let itemTable = new Table('food_items');

//Get user history route
router.get('/user/:userId/', tokenMiddleware, isLoggedIn, (req, res) => {

    let userId = req.params.userId;

    usersItemsTable.getUserHistory(userId)
        .then((results) => {
            res.json(results)
        }).catch((error) => {
            res.status(500).send(error)
        })

});

export default router;