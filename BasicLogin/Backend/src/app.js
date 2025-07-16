import express from 'express';
import config from './config.js';
import morgan from 'morgan';
import routerUsers from './Modulos/Users/rutas.js';
import error from "./Utils/errors.js";
import cors  from 'cors';
import cookieParser from "cookie-parser";



const app = express();

//se configura asi cuando se usan las cookies
app.use(cors({
    origin: "http://localhost:5173", // tu frontend
    credentials: true, // ¡esto es obligatorio para enviar cookies!
}));

//app.use(cors());//para que permita hacer solicitudes desde cualquier lado
app.use(cookieParser())

/*morgan("dev")	Muestra en consola todas las peticiones HTTP
express.json()	Permite recibir y usar datos en formato JSON
express.urlencoded()	Permite leer datos de formularios*/

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuracion del puerto
app.set("port",config.app.port)

//rutas
app.use("/api/users",routerUsers)

//ruta basica para saber que all chido
app.get("/",(req,res)=>{
    res.send("Hola mundo")
})

app.use(error)

export default app;