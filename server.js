import app from './src/app.js';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import helmet from "helmet";
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
dotenv.config();
app.use(helmet())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after an hour."
});
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp({
    whitelist: ['duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));
const PORT = process.env.PORT || 5100;
try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}
