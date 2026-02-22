import { Outlet, Navigate } from "react-router";
import NavbarHome from "./NavbarHome";

export default function CarLayout() {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to='/login' />
    }

    return(
        <div>
            <NavbarHome />
            <Outlet />
        </div>
    )
}