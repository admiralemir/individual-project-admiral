import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export default function Home() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('User')

    useEffect(() => {
        const user = localStorage.getItem('userName')
        if (user) {
            setUserName(user)
        }
    }, [])

    return (
        <>
            <div style={{ backgroundColor: "#0f2027" }}>

                {/* ================= HERO ================= */}
                <div
                    className="position-relative text-white d-flex align-items-center justify-content-center"
                    style={{
                        minHeight: '100vh',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1600)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div
                        className="position-absolute w-100 h-100"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(15,32,39,0.95))'
                        }}
                    ></div>

                    <div className="container position-relative text-center fade-up" style={{ zIndex: 2 }}>
                        <h1
                            className="fw-bold mb-3"
                            style={{ fontSize: "4rem", letterSpacing: "4px" }}
                        >
                            WELCOME
                        </h1>
                        <p className="fs-4 opacity-75">
                            You signed in as {userName}
                        </p>

                        <div className="mt-5 opacity-75 scroll-indicator">
                            <span>Scroll for more</span>
                            <div className="chevron"></div>
                        </div>
                    </div>
                </div>


                {/* ================= MENU SECTION ================= */}
                <div
                    className="py-5"
                    style={{
                        background: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
                    }}
                >
                    <div className="container py-5">
                        <div className="row g-5">

                            {/* Borrowing */}
                            <div className="col-md-6 fade-up">
                                <div
                                    className="card custom-card"
                                    onClick={() => navigate('/form-create')}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
                                        className="card-img"
                                        alt="Borrowing Form"
                                    />
                                    <div className="card-overlay">
                                        <h3>Borrowing Form</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Approval */}
                            <div className="col-md-6 fade-up">
                                <div
                                    className="card custom-card"
                                    onClick={() => navigate('/submitted')}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800"
                                        className="card-img"
                                        alt="Approval"
                                    />
                                    <div className="card-overlay">
                                        <h3>Approval</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Cars */}
                            <div className="col-md-6 fade-up">
                                <div
                                    className="card custom-card"
                                    onClick={() => navigate('/cars')}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"
                                        className="card-img"
                                        alt="Car Availability"
                                    />
                                    <div className="card-overlay">
                                        <h3>Car Availability</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Loan List */}
                            <div className="col-md-6 fade-up">
                                <div
                                    className="card custom-card"
                                    onClick={() => navigate('/submitted')}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800"
                                        className="card-img"
                                        alt="Loan List"
                                    />
                                    <div className="card-overlay">
                                        <h3>Loan List</h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <footer
                    className="text-white text-center py-4"
                    style={{
                        background: "#0f2027",
                        borderTop: "1px solid rgba(255,255,255,0.1)"
                    }}
                >
                    <div className="container">
                        <p className="mb-0 opacity-75">
                            All Rights Reserved © HackEmployee
                        </p>
                    </div>
                </footer>

                <style>{`

        .custom-card {
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            background: rgba(255,255,255,0.05);
            backdrop-filter: blur(8px);
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .custom-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 25px 50px rgba(0,0,0,0.6);
        }

        .card-img {
            height: 260px;
            object-fit: cover;
            transition: transform 0.6s ease;
        }

        .custom-card:hover .card-img {
            transform: scale(1.1);
        }

        .card-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(15,32,39,0.95), rgba(0,0,0,0.3));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 1.5rem;
            letter-spacing: 1px;
        }

        .fade-up {
            animation: fadeUp 1s ease forwards;
            opacity: 0;
        }

        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .scroll-indicator {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .chevron {
            margin-top: 10px;
            width: 20px;
            height: 20px;
            border-bottom: 2px solid white;
            border-right: 2px solid white;
            transform: rotate(45deg);
            animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(45deg); }
            50% { transform: translateY(10px) rotate(45deg); }
        }

    `}</style>

            </div>
        </>
    )
}