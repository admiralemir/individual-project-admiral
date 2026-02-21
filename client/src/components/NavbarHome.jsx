import logo from '../assets/hackemployee-removebg.png'
import { useNavigate } from 'react-router'

export default function NavbarHome() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <nav
            className="navbar navbar-expand-lg fixed-top custom-navbar"
        >
            <div className="container-fluid px-4">

                {/* Brand */}
                <a className="navbar-brand text-white fw-bold d-flex flex-column" href="/">
                    <span style={{ letterSpacing: "2px", fontSize: "1.3rem" }}>
                        GENEVA MOTORS
                    </span>
                    <small style={{ fontSize: "0.7rem", opacity: 0.7, letterSpacing: "1px" }}>
                        FOR EMPLOYEE
                    </small>
                </a>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center text-white profile-link"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                <div className="profile-icon">
                                    <i className="bi bi-person-fill"></i>
                                </div>
                                <span className="fw-semibold">Profile</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end custom-dropdown">
                                <li>
                                    <a className="dropdown-item" href="/profile">
                                        <i className="bi bi-person-circle me-2"></i>
                                        My Profile
                                    </a>
                                </li>

                                <li><hr className="dropdown-divider" /></li>

                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>

            {/* STYLE */}
            <style>{`

        .custom-navbar {
            background: rgba(15, 32, 39, 0.75);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255,255,255,0.08);
            transition: all 0.4s ease;
        }

        .navbar-brand:hover {
            opacity: 0.85;
        }

        .profile-icon {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: linear-gradient(135deg, #203a43, #2c5364);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            color: white;
            font-size: 1.1rem;
            transition: 0.3s ease;
        }

        .profile-link:hover .profile-icon {
            transform: scale(1.1);
            background: linear-gradient(135deg, #2c5364, #203a43);
        }

        .custom-dropdown {
            background: #0f2027;
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 12px;
            padding: 8px 0;
        }

        .custom-dropdown .dropdown-item {
            color: white;
            transition: 0.2s ease;
        }

        .custom-dropdown .dropdown-item:hover {
            background: rgba(255,255,255,0.08);
        }

        .navbar-toggler-icon {
            filter: invert(1);
        }

    `}</style>
        </nav>
    )
}