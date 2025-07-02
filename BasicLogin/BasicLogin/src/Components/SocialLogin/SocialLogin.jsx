import './socialLogin.css'

export default function SocialLogin() {
    return (
        <div className={"social"}>
            <h2 className="title">INICIA SESION CON</h2>
            <div className="icons">
                <button className={"mail"}><i className="fab fa-google"/>GOOGLE</button>
                <button  className={"fb"}><i className="fab fa-facebook"/>FACEBOOK</button>
                <button  className={"tw"}><i className="fab fa-twitter"></i>TWITTER</button>
                <button  className={"ig"}><i className="fab fa-instagram"></i>INSTAGRAM</button>
            </div>

        </div>
    )
}