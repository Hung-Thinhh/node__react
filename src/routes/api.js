import express  from "express";
import apiController from "../controller/apiController"
import userController from "../controller/userController"
import groupController from "../controller/groupController"
import roleController from "../controller/roleController"
import evaluateController from "../controller/evaluateController"
import {checkUserJWT,checkUserPermission} from '../middleware/jwt'
const router = express.Router();



const initApiRouter = (app) => {
    
router.all('*',checkUserJWT)

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
    
    //evaluate
    router.get("/evaluate/getEvaluate/:id", evaluateController.getEvaluate)
    router.get("/evaluate/get1Eval/:id", evaluateController.get1Eval)
    router.post("/evaluate/del1tieuchuan", evaluateController.delTieuchuan)
    router.post("/evaluate/del1Eval", evaluateController.del1Eval)
    router.post("/evaluate/editTieuchi", evaluateController.editTieuchi)
    router.post("/evaluate/editTieuchuan", evaluateController.editTieuchuan)
    router.post("/evaluate/createTieuchi", evaluateController.createTieuchi)
    router.post("/evaluate/createTieuchuan", evaluateController.createTieuchuan)
    router.post("/evaluate/createVersion", evaluateController.createVersion)
    router.get("/evaluate/getDanhgia", evaluateController.getDanhgia)
    router.post("/evaluate/sendDanhgia", evaluateController.sendDanhgia)
    router.post("/evaluate/sendDanhgiaforUser", evaluateController.sendDanhgiaforUser)
    router.get("/evaluate/getDanhgiaUser/:id", evaluateController.getDanhgiaUser)
    router.get("/evaluate/Allversion", evaluateController.getAllVersion)
    router.post("/evaluate/sendReDanhgia", evaluateController.sendReDanhgia)
    router.get("/evaluate/activeVersion/:id", evaluateController.activeVersion)
    router.get("/evaluate/unactiveVersion/:id", evaluateController.unactiveVersion)
    router.get("/evaluate/chart", evaluateController.getChart)


    //group router
    router.get("/group/read",groupController.readFunc)

    return app.use("/api", router);
}

export default initApiRouter;