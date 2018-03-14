import { Router } from 'express';
import typeRouter from './type';
import itemRouter from './items';
import ratingRouter from './rating';
import homescreenRouter from './homescreen';
import yelpRouter from './yelp';
import authRouter from './auth';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/auth', authRouter);
router.use('/type', typeRouter);
router.use('/items', itemRouter);
router.use('/rating', ratingRouter);
router.use('/homescreen', homescreenRouter);
router.use('/yelp', yelpRouter);



export default router;