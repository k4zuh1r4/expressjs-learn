import app from './src/app.js';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
