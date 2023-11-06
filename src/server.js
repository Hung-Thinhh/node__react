import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./routes/web";
require("dotenv").config();
const app = express();
// config view engine
configViewEngine(app);
// init web router
initWebRouter(app); 

const PORT = process.env.PORT || 8080;
console.log("PORT: " + PORT);
app.listen(PORT, () => {
    console.log(" Running on port " + PORT +":  http://localhost:" +PORT);
})