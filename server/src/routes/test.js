import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

let usersItemsTable = new Table('users_items');
let itemTable = new Table('food_items');

router.put('/item/:itemId/user/:userId', tokenMiddleware, isLoggedIn, (res, req) => {

    let itemId = req.params.itemId;
    let userId = req.params.userId;

    res.send('ok');

});

export default router;