import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

let usersItemsTable = new Table('users_items');
let itemTable = new Table('food_items');

router.put('/:id/:userid', tokenMiddleware, isLoggedIn, (res, req) => {

    let userId = req.params.userid;
    let itemId = req.params.id;

    res.status(200).send(req.params);

});