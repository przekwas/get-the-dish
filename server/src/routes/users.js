import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import { generateHash } from '../utils/security';

let router = Router();

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});

router.post('/newuser', (req, res) => {

    generateHash(req.body.password)
        .then((hash) => {
            req.body.password = hash;
            res.json(req.body);
        }).catch((error) => {
            next(error);
        })

});

export default router;