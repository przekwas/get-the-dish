import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { generateHash } from '../utils/security';

let router = Router();
let usersTable = new Table('users');

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});

router.post('/newuser', (req, res) => {

    generateHash(req.body.password)
        .then((hash) => {

            req.body.password = hash;
            usersTable.insert(req.body)
            .then((resultInsert) => {
                res.status(201).send("Added ok fam!");
            })
        }).catch((error) => {
            next(error);
        })

});

export default router;