import Login from "./Components/Login/Login.jsx";
import SocialLogin from "./Components/SocialLogin/SocialLogin.jsx";
import './App.css';

function App() {


  return (
    <>
        <div className="container">
            <div className="container-lg">
            <Login></Login>
            <SocialLogin></SocialLogin>
            </div>
        </div>
    </>
  )
}

export default App
