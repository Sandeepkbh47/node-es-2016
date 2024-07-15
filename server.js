import dotenv from 'dotenv';
dotenv.config()
import { createServer } from 'https'
import { readFileSync } from 'fs';

import { app } from './app.js';



const PORT = process.env.PORT

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at https://0.0.0.0:${PORT}`)
})

// createServer({
//     key: readFileSync('./privatekey.pem'),
//     cert: readFileSync('./publiccert.pem'),
// }, app).listen(PORT, '0.0.0.0', () => {
//     console.log(`Server running at https://0.0.0.0:${PORT}`)
// })