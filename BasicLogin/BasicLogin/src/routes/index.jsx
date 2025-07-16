import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "../Components/Home/Home.jsx";
import App from "../App.jsx";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute.jsx";

const router = createBrowserRouter([

    {
        path:"/",
        element:<App/>,
    },{
        path:"/index",
        element:<ProtectedRoute/>,
        children:[
            {
                path:"",
                element:<Home/>,
            }
        ]
    }
])

const Routes = ()=> <RouterProvider router={router}/>

export default Routes;