import express  from "express";
import apiController from "../controller/apiController"
const router = express.Router();

const initApiRouter = (app) => {
    
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    return app.use("/api", router);
}

export default initApiRouter;