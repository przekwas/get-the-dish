import { Router } from 'express';
import typeRouter from './type';
import itemRouter from './items';
import ratingRouter from './rating';
import homescreenRouter from './homescreen';
import yelpRouter from './yelp';
import authRouter from './auth';
import usersRouter from './users';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);
router.use('/type', typeRouter);
router.use('/items', itemRouter);
router.use('/rating', ratingRouter);
router.use('/homescreen', homescreenRouter);
router.use('/yelp', yelpRouter);
router.use('/users', usersRouter);



export default router;