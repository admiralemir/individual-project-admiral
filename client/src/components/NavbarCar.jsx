import logo from '../assets/hackemployee-removebg.png'
import { useNavigate } from 'react-router'

export default function NavbarCar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }
    
    return (
            <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#999999aa' }}>
                <div className="container-fluid">
                    
                    <a className="navbar-brand d-flex align-items-center" href="/">
                        <img src={logo} alt="Logo" style={{ height: '45px' }} className="me-2" />
                    </a>
    
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto align-items-center">
    
                            <li className="nav-item me-2">
                                <button 
                                    className="btn btn-outline-success fw-semibold"
                                    onClick={() => navigate('/form-create')}
                                >
                                    <i className="bi bi-plus-circle me-1"></i>
                                    Borrow Car
                                </button>
                            </li>
    
                            <li className="nav-item dropdown">
                                <a 
                                    className="nav-link dropdown-toggle d-flex align-items-center text-white" 
                                    href="#" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <div 
                                        className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2" 
                                        style={{ width: '35px', height: '35px' }}
                                    >
                                        <i className="bi bi-person-fill text-success" style={{ fontSize: '1.2rem' }}></i>
                                    </div>
                                    <span className="fw-semibold">Profile</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
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
            </nav>
        )
}