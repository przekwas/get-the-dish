import { Router } from 'express';
import typeRouter from './type';
import itemRouter from './items';
import ratingRouter from './rating';
import homescreenRouter from './homescreen';
import yelpRouter from './yelp';
import restaurantRouter from './restaurant';
// import authRouter from './auth';
// import stripeDonationsRouter from './stripeDonations';
// import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

// router.use('/auth', authRouter);
// router.use('/donate', stripeDonationsRouter);

// router.route('*')
//     .post(tokenMiddleware, isLoggedIn)
//     .put(tokenMiddleware, isLoggedIn)
//     .delete(tokenMiddleware, isLoggedIn);

router.use('/type', typeRouter);
router.use('/items', itemRouter);
router.use('/rating', ratingRouter);
router.use('/homescreen', homescreenRouter);
router.use('/yelp', yelpRouter);
router.use('/restaurant', restaurantRouter);

export default router;