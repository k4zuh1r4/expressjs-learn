import app from './src/app.js';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5100;
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (err) {
    console.log(err);
    process.exit(1);
}
