import {createBrowserRouter,Navigate} from "react-router-dom";
import autoCreateRoute from "./autoCreateRoute.tsx";

const index = createBrowserRouter([
    {
        path:'/',
        element:<Navigate to="/index" />
    },
    ...autoCreateRoute('../pages/'),
    {
        path:'*',
        element:<div>404</div>
    }
],{
    basename:import.meta.env.VITE_BASE_URL
});

export default index;
