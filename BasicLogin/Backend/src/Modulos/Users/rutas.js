import express from "express";
import userController from "./index.js";
import {success} from "../../Utils/response.js";
import verifyGoogleToken from "../../Utils/googleVerify.js";
import jwt from "jsonwebtoken";
import config  from '../../config.js'

const router = express.Router();

//rutas

router.post("/",addUser)
router.post("/login",verifyUser)
router.post("/login/google",loginWithGoogle)
router.get("/check-auth",checkAuth)
//rutas dinamicas, siempre de ultimas porque si no podria tomar otra ruta como parametro
router.get("/:id",getOneUser)

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

async function loginWithGoogle(req, res, next) {
    try {
        //este se lo pasaron desde el front
        const { token } = req.body;

       //este es lo que devuelve google con los datos de la persona
        const payload = await verifyGoogleToken(token); // verifica con Google

        //tomamos solo el email y el nombre de lo que devuelve google
        const { email, name } = payload;

        //le paso los datos a la funcion userLoginGoogle para que si existe el usuario me devuelva el objeto con el token creado
        const data = await userController.userLoginGoogle(name, email);

        if (data.success) {
            res.cookie("token", data.token, {
                httpOnly: true, //solo se puede acceder en el servidor
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // Cambiar a lax en desarrollo
                secure: process.env.NODE_ENV === "production", //solo accede con htttps
                maxAge: 1000 * 60 * 60, //solo valida por 1 hora
            })
        }

        success(req, res, data, 200);
    } catch (err) {
        next(err);
    }
}

async function checkAuth(req, res, next) {

    try {
        const token = req.cookies.token;
        const secret = config.jwt.secret;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const decoded = jwt.verify(token, secret);

        // Usar la función success como las otras rutas
        const data = {
            success: true,
            user: decoded,
            message: "Token válido"
        };

        success(req, res, data, 200);

    } catch (err) {
        // Si hay error en jwt.verify, manejarlo aquí
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        // Para otros errores, pasarlo al middleware de manejo de errores
        next(err);
    }
}

export default router;

//las rutas solo se encargan de recibir los datos y darselos al controlador para que los maneje
