import NavbarCar from "./NavbarCar";
import { Outlet, Navigate } from "react-router";

export default function CarLayout() {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to='/login' />
    }

    return(
        <div>
            <NavbarCar />
            <Outlet />
        </div>
    )
}