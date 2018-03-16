import { Router } from 'express';
import passport from 'passport';
import { encode } from '../utils/tokens';
import { generateHash } from '../utils/security';

let router = Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })
    (req, res, next);
});

router.get('/generate/:pw', (req, res, next) => {
    generateHash(req.params.pw)
    .then((hash) => {
        res.send(hash);
    }).catch((error) => {
        next(error);
    })
});

export default router;