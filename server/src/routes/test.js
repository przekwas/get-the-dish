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

//Voting toggle route
router.put('/user/:userId/item/:itemId', tokenMiddleware, isLoggedIn, (req, res) => {

    let userId = req.params.userId;
    let itemId = req.params.itemId;
    let bodyObject = { 'userid': userId, 'itemid': itemId };

    //Check if it exists in XREF table
    usersItemsTable.checkXrefTableHasMatch(userId, itemId)
        .then((results) => {

            if (results.does_exist === 1) {
                //Logic if it does exist




            } else {
                //Logic if it does NOT exist
            }




            res.send(results)
        }).catch((error) => {
            res.status(500).send(error)
        })

    //Inserting into XREF table with userid and itemid
    // usersItemsTable.insert(bodyObject)
    // .then((results) => {
    //     res.status(201).send('Coolio!')
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })

});

export default router;