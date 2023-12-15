import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./routes/web";
import connection from "./config/connectDB";

require("dotenv").config();



const app = express();

// parse application/json
app.use(express.json())

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
// config view engine
configViewEngine(app);

connection()
// init web router
initWebRouter(app); 



const PORT = process.env.PORT || 8888;
console.log("PORT: " + PORT);
app.listen(PORT, () => {
    console.log(" Running on port " + PORT +":  http://localhost:" +PORT);
})