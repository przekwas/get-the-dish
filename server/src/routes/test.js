import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

let usersItemsTable = new Table('users_items');
let itemTable = new Table('food_items');

router.get('/:id/:userid', tokenMiddleware, isLoggedIn, (res, req) => {

    let id = req.params.id
    res.send(req.params);

});

export default router;