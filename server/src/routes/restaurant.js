import { Router } from 'express';
import Table from '../table';

let router = Router();

let restuaurantTable = new Table('restaurants');

router.get('/check', (req, res) => {

    

});

export default router;