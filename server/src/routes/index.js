import { Router } from 'express';
import typeRouter from './type';
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

export default router;