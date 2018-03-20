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
                //Prevent user from revoting for same item -> toggle the vote on front, subtract 1 from food rating and remove row from this table
                return itemTable.removeOneToSpecificItemRating(itemId)
                    .then((ratingResults) => {
                        usersItemsTable.xrefDelete(userId, itemId)
                            .then((xrefResults) => {
                                res.status(202).send('Removed and Subtracted')
                            })
                    }).catch((error) => {
                        res.status(500).send(error)
                    });



            } else {

                //Logic if it does NOT exist
                //Toggle the vote on front, add 1 rating to item, and add to this xref table

                return itemTable.addOneToSpecificItemRating(itemId)
                    .then((ratingResults) => {
                        usersItemsTable.insert(bodyObject)
                            .then((xrefResults) => {
                                res.status(201).send('Added and Added')
                            })
                    }).catch((error) => {
                        res.status(500).send(error)
                    });

            }

            //     res.send(results)
            // }).catch((error) => {
            //     res.status(500).send(error)
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