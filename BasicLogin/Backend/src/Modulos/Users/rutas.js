import express from "express";
import userController from "./index.js";
import {success} from "../../Utils/response.js";

const router = express.Router();

//rutas
router.get("/:id",getOneUser)
router.post("/",addUser)
router.post("/login",verifyUser)

async function getOneUser(req,res,next){
    try{
        const data = await userController.getUserById(req.params.id);
        success(req,res,data,200)
    }catch(err){
        next(err)
    }
}

async function addUser(req,res,next){
    try{
        const data = await userController.addUser(req.body)
        success(req,res,data,200)
    }catch(err){
        next(err)
    }
}

async function verifyUser(req,res,next){
    try{
        const data = await userController.userLogin(req.body.email,req.body.password)
        success(req,res,data,200)
    }catch (err){
        next(err)
    }
}

export default router;

//las rutas solo se encargan de recibir los datos y darselos al controlador para que los maneje
