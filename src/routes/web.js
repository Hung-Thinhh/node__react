import express  from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRouter = (app) => {
    router.get("/", homeController.handleHome);
    router.get("/user", homeController.handleCreateUser);
    router.post("/user/create-user", homeController.handleCreateNewUser);
    return app.use("/", router);
}

export default initWebRouter;