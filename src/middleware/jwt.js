require("dotenv").config();
import jwt from "jsonwebtoken";

const createToken = (payload) => {
    let key = process.env.JWT_SECRET_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, key,)
    } catch (error) {
        console.log(error)
    }
    return token;
}
const verifyToken = (token) => { 
    let key = process.env.JWT_SECRET_KEY;
    let data = null;

    try {
        let decode = jwt.verify(token, key)
        data = decode
    } catch (error) {
        console.log(error)
    }
    return data
}

module.exports = {
    createToken,
    verifyToken
}