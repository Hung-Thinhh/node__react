import express  from "express";
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
const router = express.Router();

const initApiRouter = (app) => {
    
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    // CRUD
    router.get("/user/read",userController.readFunc)
    router.post("/user/create",userController.createFunc)
    router.put("/user/update",userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)
    
    router.get("/group/read",groupController.readFunc)

    return app.use("/api", router);
}

export default initApiRouter;