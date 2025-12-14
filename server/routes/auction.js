import express from 'express';
import { createAuction, showAuction, auctionById, placeBid, dashboardData, myAuction } from '../controllers/auction.controller.js';
import upload from '../middleware/multer.js';
import { secureRoute } from '../middleware/auth.js';

const auctionRouter = express.Router();

auctionRouter
    .get('/stats', secureRoute, dashboardData)

auctionRouter
    .get('/', showAuction)
    .post('/', secureRoute, upload.single('itemPhoto'), createAuction);

auctionRouter
.get("/myauction", secureRoute, myAuction)

auctionRouter
    .get('/:id', auctionById)
    .post('/:id', secureRoute, placeBid)


export default auctionRouter;