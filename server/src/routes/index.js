import { Router } from 'express';
import typeRouter from './type';
import itemRouter from './item';
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

export default router;