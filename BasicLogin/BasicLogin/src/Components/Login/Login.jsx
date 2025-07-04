import './login.css'
import {useState} from "react";
import axios from "axios";

export default function Login() {
    const [password,setPassword] = useState("")
    const [user,setUser] = useState("")
    const [message,setMessage] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await axios.get("http://localhost:4000/api/users/2")

            if (response.data.body[0].password === password && response.data.body[0].name === user){
                setMessage("Bienvenido")
            }else{
                setMessage("Credenciales incorrectas")
            }

        }catch(err){
            console.log(err)
            setMessage("error en el login")
        }
    }


    return (
        <div className={"login"}>
            <h2 className="title">
                INGRESA TU USUARIO Y CONTRASEÑA
            </h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Ingresa tu usuario:</label>
                <input
                    type="text"
                    placeholder={"usuario"}
                onChange={(e) => setUser(e.target.value)}/>
                <label htmlFor="">Ingresa tu contraseña:</label>
                <input
                    type="password"
                    placeholder={"contraseña"}
                onChange={(e) => setPassword(e.target.value)}/>
                <button className={"access"}><a href={"#"}>Acceder</a></button>
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Registrarme</a>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}