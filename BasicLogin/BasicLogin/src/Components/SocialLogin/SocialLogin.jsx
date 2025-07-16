import './socialLogin.css'
import {GoogleLogin} from "@react-oauth/google";
import axios from "axios";
import {useNavigate} from "react-router-dom";

async function sendIdTokenToBackend(idToken) {

    try {
        //llamada al backend que devuelve un objeto con el token de sesion propio
        const response = await axios.post('http://localhost:4000/api/users/login/google', {
           token: idToken,
        },{
            withCredentials: true, //como ahora manejo el token en cookie le agrego esto a las peticiones que quiera que lleven esa cookie al backend
        });

        //sacamos la data principal
        const result = response.data;

        //si existio la respuesta muestra la info
        if (result.body.success) {
           // console.log('Login exitoso:', result);
            //devuelve si fue exitoso o no
            return result.body.success;
            //localStorage.setItem('token', result.body.token); innecesario porque tengo el token en una cookie
        } else {
            console.error('Error desde el backend:', result.error);
        }

    } catch (err) {
        console.error('Error al conectar con el backend:', err);
    }
}

export default function SocialLogin() {

    const navigate = useNavigate();

    async function handleSuccess(googleResponse){
        const idToken = googleResponse.credential;
        const isLogged = await sendIdTokenToBackend(idToken);

        isLogged? navigate("/index"): navigate("/");

        setTimeout(() => {
            console.log('URL actual:', window.location.pathname);
        }, 1000);
    }


    function handleError(err){
        console.error(err.message)
    }

    return (
        <div className={"social"}>
            <h2 className="title">INICIA SESION CON</h2>
            <div className="icons">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        theme="filled_blue"
                        size="large"
                        shape="pill"
                        text="continue_with"
                    />
                {/*<button className={"mail"} onClick={handleClick}><i className="fab fa-google"/>GOOGLE</button>*/}
                <button  className={"fb"}><i className="fab fa-facebook"/>FACEBOOK</button>
                <button  className={"tw"}><i className="fab fa-twitter"></i>TWITTER</button>
                <button  className={"ig"}><i className="fab fa-instagram"></i>INSTAGRAM</button>
            </div>

        </div>
    )
}