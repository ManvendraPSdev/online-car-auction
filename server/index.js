import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDB } from './connection.js'
import auctionRouter from './routes/auction.js';
import { secureRoute } from './middleware/auth.js';
import userAuthRouter from './routes/userAuth.js';
import userRouter from './routes/user.js';
import contactRouter from "./routes/contact.js";
import adminRouter from './routes/admin.js';

const port = process.env.PORT || 4000;

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
// CORS configuration - allow multiple origins for development and production
const allowedOrigins = process.env.ORIGIN 
    ? process.env.ORIGIN.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3000', 'https://online-car-auction.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // In production, be more strict; in development, allow localhost
            if (process.env.NODE_ENV === 'production') {
                // Allow Vercel preview deployments (they have dynamic URLs)
                if (origin.includes('vercel.app') || origin.includes('vercel.dev')) {
                    return callback(null, true);
                }
                callback(new Error('Not allowed by CORS'));
            } else {
                callback(null, true); // Allow all in development
            }
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/', async (req, res) => {
    res.json({ msg: 'Welcome to Online Auction System API' });
});
app.use('/auth', userAuthRouter)
app.use('/user', secureRoute, userRouter)
app.use('/auction', auctionRouter);
app.use('/contact', contactRouter);
app.use('/admin', secureRoute, adminRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});