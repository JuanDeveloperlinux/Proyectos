import './login.css'

export default function Login() {
    return (
        <div className={"login"}>
            <h2 className="title">
                INGRESA TU USUARIO Y CONTRASEÑA
            </h2>
            <form action="">
                <label htmlFor="">Ingresa tu usuario:</label>
                <input type="text" placeholder={"usuario"}/>
                <label htmlFor="">Ingresa tu contraseña:</label>
                <input type="password" placeholder={"contraseña"}/>
                <button className={"access"}><a href={"#"}>Acceder</a></button>
                <a href="#">¿Olvidaste tu contraseña?</a>
                <a href="#">Registrarme</a>
            </form>
        </div>
    )
}