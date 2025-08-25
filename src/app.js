import express from 'express';
import errorHandlerMidddleware from './middlewares/errors.middleware.js';
import router from './routers/index.js';
const app = express();
app.use(express.json());
app.use('', router)
app.get('/', (req, res) => {
    console.log(req);
    res.json({
        message: 'Data received',
        data: req.body
    });
});
app.use((req, res) => {
    res.status(404).json({
        msg: 'Not Found'
    });
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        msg: "something dumb happened."
    });
});
app.use(errorHandlerMidddleware);
export default app;
