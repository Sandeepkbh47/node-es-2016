import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const authData = require('./../dbData/authData.json')
// import authData from './../dbData/authData.json' assert { type: "json" };


export const signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userData = authData.find(item => item.email === email && item.password === password)
    if (!userData) {
        return next(new Error("Not a valid email or password"))
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN * 60 * 60 * 1000
    })
    res.cookie("SESSIONID", token, { secure: false })
        .status(200)
        .json({
            success: true,
            data: {
                token, email
            }
        });

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         token, email
    //     }
    // })

}

