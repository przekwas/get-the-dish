import { Router } from 'express';
import Table from '../table';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();
let itemTable = new Table('food_item');
let usersItemsTable = new Table('users_items');

//GET route for specifically pulling the rating of a specific item
router.get('/:id', (req, res) => {

    let id = req.params.id;

    itemTable.getSpecificItemRating(id)
        .then((results) => {
            res.json(results);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });

});

//GET route for true/false on if a specific user has voted on a specific item
router.get('/user/:userId/item/:itemId', tokenMiddleware, isLoggedIn, (req, res) => {

    let userId = req.params.userId;
    let itemId = req.params.itemId;

    usersItemsTable.checkXrefTableHasMatch(userId, itemId)
    .then((results) => {

        if (results.does_exist === 1) {

            res.status(200).send(true)

        } else {

            res.status(200).send(false)

        }

    }).catch((error) => {
        res.status(500).send(error)
    })

});

//PUT route to add one to a specific item's rating
router.put('/user/:userId/item/:itemId', tokenMiddleware, isLoggedIn, (req, res) => {

    let userId = req.params.userId;
    let itemId = req.params.itemId;
    let bodyObject = { 'userid': userId, 'itemid': itemId };

    //Check if it exists in XREF table
    usersItemsTable.checkXrefTableHasMatch(userId, itemId)
        .then((results) => {

            if (results.does_exist === 1) {

                /*Logic if it does exist
                Prevent user from revoting for same item -> 
                toggle the vote on front, 
                subtract 1 from food rating
                and remove row from this table*/

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

                /*Logic if it does NOT exist
                Toggle the vote on front, add 1 rating to item, 
                and add to this xref table*/

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
        })
});

export default router;