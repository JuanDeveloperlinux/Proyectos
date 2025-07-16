import Login from "./Components/Login/Login.jsx";
import SocialLogin from "./Components/SocialLogin/SocialLogin.jsx";
import './App.css';
import {GoogleOAuthProvider} from "@react-oauth/google";

function App() {

    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID)

  return (
    <>
        <div className="container">
            <div className="container-lg">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <Login></Login>
                    <SocialLogin></SocialLogin>
            </GoogleOAuthProvider>
            </div>
        </div>
    </>
  )
}

export default App
