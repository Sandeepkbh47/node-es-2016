import express from 'express';
import { getData, fileData, bigComputing } from '../controllers/testController.js';
const router = express.Router()




router.route('/').get(getData)

router.route('/file').post(fileData)


router.route('/bigComputing').post(bigComputing)


export { router }