import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

//esta es la ruta que se carga apenas se loguee para comprobar que esta logueado y cada vez que salte a otra pagina darle acceso a todas las otras
export default function ProtectedRoute() {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        async function verifyToken() {
            try {
                const res = await axios.get("http://localhost:4000/api/users/check-auth", {
                    withCredentials: true,
                });

                if (res.data.body.success) {
                    console.log('Token válido, setAuth(true)');
                    setAuth(true);
                } else {
                    setAuth(false);
                }

            } catch (error) {
                console.log('Error:', error);
                setAuth(false);
            }
        }

        verifyToken();
    }, []);

    if (auth === null) {
        return <div>Cargando...</div>;
    }

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
