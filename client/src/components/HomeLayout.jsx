import NavbarHome from "./NavbarHome";
import { Navigate, Outlet } from "react-router";

export default function HomeLayout() {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/login" />
    }

    return(
        <div>
            <NavbarHome />
            <Outlet />
        </div>
    )
}