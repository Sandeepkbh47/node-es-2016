import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
// import formidableMiddleware from 'express-formidable';
import { router as testRouter } from './routers/testRouter.js';
import { router as authRouter } from './routers/authRouter.js';

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep

const app = express();
const corsConfig = {
    origin: "*",
    optionSuccessStatus: 200
}
app.set('__dirname', __dirname)
app.disable('x-powered-by')
app.use(compression())

app.use(cors(corsConfig))
app.use(express.json())
// const events = [
//     {
//         event: 'fileBegin',
//         action: function (req, res, next, name, file) { file.path = './uploads/' + file.name; }
//     },
//     // {
//     //   event: 'field',
//     //   action: function (req, res, next, name, value) { /* your callback */ }
//     // }
// ];
// app.use(formidableMiddleware({ uploadDir: './uploads', multiples: true }, events))
app.use(helmet());
app.use('/api/v1/test', testRouter)
app.use('/api/v1/auth', authRouter)
app.use((err, req, res, next) => [
    res.status(500).json({
        status: "error",
        message: "Something went wrong try again later"
    })
])


export { app }