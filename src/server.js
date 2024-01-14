import express from "express";
import cookieParser from 'cookie-parser'
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import initApiRouter from "./routes/api";
import connection from "./config/connectDB";
require("dotenv").config();



const app = express();

// parse application/json
app.use(express.json())
// cookie parser
app.use(cookieParser())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// config view engine
configViewEngine(app);

connection()


// init web router
initWebRouter(app); 
initApiRouter(app); 



const PORT = process.env.PORT || 8888;
console.log("PORT: " + PORT);
app.listen(PORT, () => {
    console.log(" Running on port " + PORT +":  http://localhost:" +PORT);
})