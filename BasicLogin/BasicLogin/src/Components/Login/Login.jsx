import './login.css'
import {useState} from "react";
import axios from "axios";

export default function Login() {
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [message,setMessage] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:4000/api/users/login",{
                email:email,
                password:password
            })
            console.log(response.data)

            if (response.data.body.success){
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
                <label htmlFor="">Ingresa tu email:</label>
                <input
                    type="text"
                    placeholder={"usuario"}
                onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="">Ingresa tu contraseña:</label>
                <input
                    type="password"
                    placeholder={"contraseña"}
                onChange={(e) => setPassword(e.target.value)}/>
                <button className={"access"}>Acceder</button>
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Registrarme</a>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}