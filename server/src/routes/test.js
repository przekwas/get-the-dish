import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

let usersItemsTable = new Table('users_items');
let itemTable = new Table('food_items');

router.put('/user/:userId/item/:itemId', tokenMiddleware, isLoggedIn, (req, res) => {

    let userId = req.params.userId;
    let itemId = req.params.itemId;
    let bodyObject = { 'userid': userId, 'itemid': itemId };

    usersItemsTable.insert(bodyObject)
    .then((results) => {
        res.status(201).send(results)
    }).catch((error) => {
        res.status(500).send(error)
    })

});

export default router;