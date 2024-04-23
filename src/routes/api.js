import express  from "express";
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import roleController from "../controller/roleController"
import {checkUserJWT,checkUserPermission} from '../middleware/jwt'
const router = express.Router();



const initApiRouter = (app) => {
    
router.all('*',checkUserJWT,checkUserPermission)

    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    // CRUD
    router.get("/account",userController.accountUser)
    router.get("/profile",userController.profileUser)
    router.post("/editprofile",userController.editprofileUser)
    router.post("/changepass",userController.changePassUser)
//user router
    router.get("/user/read",userController.readFunc)
    router.post("/user/create",userController.createFunc)
    router.put("/user/update",userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)
    //roles router
    router.get("/role/read",roleController.readFunc)
    router.post("/role/create",roleController.createFunc)
    router.put("/role/update",roleController.updateFunc)
    router.delete("/role/delete", roleController.deleteFunc)
    router.get("/role/by-group/:id", roleController.readRolebyGroup)
    router.post("/role/assign-to-group",roleController.assignRoleToGroup)
    

    //group router
    router.get("/group/read",groupController.readFunc)

    return app.use("/api", router);
}

export default initApiRouter;