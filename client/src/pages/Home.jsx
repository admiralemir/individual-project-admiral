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
            <div 
                className="position-relative text-white d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '500px',
                    backgroundImage: 'url(https://images.unsplash.com/photo--McLaren-720S-blue-supercar-2023/free-photo-of-mclaren-720s-blue-supercar.jpeg?w=1200)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div 
                    className="position-absolute w-100 h-100" 
                    style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        top: 0,
                        left: 0
                    }}
                ></div>

                <div className="container position-relative text-center" style={{ zIndex: 10 }}>
                    <div className="mb-3">
                    </div>
                    <h1 className="display-3 fw-bold mb-3">WELCOME!</h1>
                    <p className="fs-4 mb-4">You signed in as {userName}</p>
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="me-2">Scroll for more</span>
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
            </div>

            <div className="container my-5 py-5">
                <div className="row g-4">
                    
                    <div className="col-md-6">
                        <div 
                            className="card border-0 shadow-lg overflow-hidden h-100 hover-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/form-create')}
                        >
                            <div className="position-relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600"
                                    className="card-img-top"
                                    alt="Borrowing Form"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div 
                                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{ 
                                        top: 0,
                                        background: 'rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <h3 className="text-white fw-bold">Borrowing Form</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div 
                            className="card border-0 shadow-lg overflow-hidden h-100 hover-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/submitted')}
                        >
                            <div className="position-relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600"
                                    className="card-img-top"
                                    alt="Approval"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div 
                                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{ 
                                        top: 0,
                                        background: 'rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <h3 className="text-white fw-bold">Approval</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div 
                            className="card border-0 shadow-lg overflow-hidden h-100 hover-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/cars')}
                        >
                            <div className="position-relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600"
                                    className="card-img-top"
                                    alt="Car Availability"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div 
                                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{ 
                                        top: 0,
                                        background: 'rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <h3 className="text-white fw-bold">Car Availability</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div 
                            className="card border-0 shadow-lg overflow-hidden h-100 hover-card"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/submitted')}
                        >
                            <div className="position-relative">
                                <img 
                                    src="https://i5.walmartimages.com/asr/beb06ffe-a978-4758-a79c-e6424f4576ec.52b47244a8b65ed7b1eb9fe6ae08138d.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
                                    className="card-img-top"
                                    alt="Loan List"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div 
                                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                                    style={{ 
                                        top: 0,
                                        background: 'rgba(0, 0, 0, 0.4)'
                                    }}
                                >
                                    <h3 className="text-white fw-bold">Loan List</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer 
                className="text-white text-center py-4 mt-5"
                style={{ backgroundColor: '#198754' }}
            >
                <div className="container">
                    <p className="mb-0">All Rights Reserved © HackEmployee</p>
                </div>
            </footer>

            <style>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
                }
            `}</style>
        </>
    )
}