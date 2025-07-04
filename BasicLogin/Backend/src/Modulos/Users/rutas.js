import express from "express";
import userController from "./index.js";
import {success} from "../../Utils/response.js";

const router = express.Router();

//rutas
router.get("/:id",getOneUser)

async function getOneUser(req,res,next){
    try{
        const data = await userController.getUserById(req.params.id);
        success(req,res,data,200)
    }catch(err){
        next(err)
    }
}

export default router;

//las rutas solo se encargan de recibir los datos y darselos al controlador para que los maneje
