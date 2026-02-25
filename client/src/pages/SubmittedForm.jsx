import { useNavigate } from 'react-router'
import showError from '../helpers/error'
import http from '../helpers/http'
import { useState, useEffect } from 'react'

export default function SubmittedForm() {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchUserForms = async () => {
        try {
            setLoading(true)
            const response = await http({
                method: 'GET',
                url: '/my-forms'
            })
            setForms(response.data)

        } catch (error) {
            showError(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserForms()
    }, [])

    const getStatusBadge = (status) => {
        const badge = {
            'Pending': 'badge bg-warning text-dark',
            'Approved': 'badge bg-success',
            'Rejected': 'badge bg-danger'
        }
        return badge[status] || 'badge bg-secondary';
    }

    const formatDate = (dateString) => {
        const option = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', option);
    }

    const calculateDuration = (borrowDate, returnDate) => {
        const borrow = new Date(borrowDate);
        const returnD = new Date(returnDate);
        const diffDays = Math.ceil((returnD - borrow) / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return (
        <div 
            style={{ 
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                paddingTop: '2rem',
                paddingBottom: '2rem'
            }}
        >
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-5 text-white">
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={() => navigate('/')}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back to Home
                                </button>
                            </div>
                        <h2 className="mb-2 text-white fw-bold" style={{ letterSpacing: '1px' }}>
                            <i className="bi bi-file-earmark-text me-2" style={{ color: '#00d2ff' }}></i>
                            Form Peminjaman Saya
                        </h2>
                        <p className="text-white-50">Daftar pengajuan peminjaman mobil yang telah Anda ajukan</p>
                    </div>
                    <button
                        className="btn btn-light px-4 py-2 fw-semibold"
                        onClick={() => navigate('/form-create')}
                        style={{
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0,210,255,0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)'
                            e.target.style.boxShadow = '0 6px 20px rgba(0,210,255,0.4)'
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)'
                            e.target.style.boxShadow = '0 4px 15px rgba(0,210,255,0.3)'
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Ajukan Peminjaman Baru
                    </button>
                </div>
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-white-50">Memuat data...</p>
                </div>
            ) : forms.length === 0 ? (
                
                <div className="text-center py-5">
                    <div className="mb-4">
                        <i className="bi bi-inbox" style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.3)' }}></i>
                    </div>
                    <h4 className="text-white-50 mb-3">Belum Ada Pengajuan</h4>
                    <p className="text-white-50 mb-4">Anda belum pernah mengajukan peminjaman mobil</p>
                    <button
                        className="btn btn-light px-4 py-2 fw-semibold"
                        onClick={() => navigate('/form-create')}
                        style={{
                            borderRadius: '12px',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Ajukan Peminjaman Sekarang
                    </button>
                </div>
            ) : (
                
                <div className="row g-4">
                    {forms.map((form) => (
                        <div className="col-md-6 col-lg-4" key={form.id}>
                            <div 
                                className="card h-100 form-card" 
                                style={{ 
                                    transition: 'all 0.4s ease',
                                    borderRadius: '20px',
                                    border: 'none',
                                    background: 'rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)'
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)'
                                }}
                            >
                                
                                <div 
                                    className="card-header border-bottom" 
                                    style={{ 
                                        background: 'rgba(255,255,255,0.05)',
                                        borderColor: 'rgba(255,255,255,0.1) !important',
                                        borderRadius: '20px 20px 0 0'
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0 text-white fw-semibold">
                                            <i className="bi bi-hash"></i>
                                            Form #{form.id}
                                        </h6>
                                        <span className={`badge ${getStatusBadge(form.status)}`}>
                                            {form.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    
                                    <div className="mb-3 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
                                        <h5 className="card-title mb-2 text-white">
                                            <i className="bi bi-car-front-fill me-2" style={{ color: '#00d2ff' }}></i>
                                            {form.Car?.brand} {form.Car?.model}
                                        </h5>
                                        <p className="text-white-50 small mb-0">
                                            <i className="bi bi-credit-card me-2"></i>
                                            {form.Car?.plateNumber}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-start mb-2">
                                            <i className="bi bi-calendar-check me-2 mt-1" style={{ color: '#4ade80' }}></i>
                                            <div>
                                                <small className="text-white-50 d-block">Tanggal Pinjam</small>
                                                <strong className="text-white">{formatDate(form.borrowDate)}</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start mb-2">
                                            <i className="bi bi-calendar-x me-2 mt-1" style={{ color: '#f87171' }}></i>
                                            <div>
                                                <small className="text-white-50 d-block">Tanggal Kembali</small>
                                                <strong className="text-white">{formatDate(form.returnDate)}</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-clock me-2 mt-1" style={{ color: '#60a5fa' }}></i>
                                            <div>
                                                <small className="text-white-50 d-block">Durasi</small>
                                                <strong className="text-white">{calculateDuration(form.borrowDate, form.returnDate)} Hari</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {form.purpose && (
                                        <div className="mb-2">
                                            <small className="text-white-50">
                                                <i className="bi bi-clipboard-check me-2"></i>
                                                Tujuan:
                                            </small>
                                            <p className="mb-0 text-white">{form.purpose}</p>
                                        </div>
                                    )}
                                    {form.destination && (
                                        <div className="mb-2">
                                            <small className="text-white-50">
                                                <i className="bi bi-geo-alt-fill me-2"></i>
                                                Destinasi:
                                            </small>
                                            <p className="mb-0 text-white">{form.destination}</p>
                                        </div>
                                    )}
                                </div>

  
                                <div 
                                    className="card-footer" 
                                    style={{ 
                                        background: 'rgba(0,0,0,0.2)',
                                        borderColor: 'rgba(255,255,255,0.1) !important',
                                        borderRadius: '0 0 20px 20px'
                                    }}
                                >
                                    <small className="text-white-50">
                                        <i className="bi bi-calendar-event me-1"></i>
                                        Diajukan: {formatDate(form.createdAt)}
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {forms.length > 0 && (
                <div className="row mt-5 g-4">
                    <div className="col-md-3">
                        <div 
                            className="card text-center stat-card"
                            style={{
                                borderRadius: '16px',
                                background: 'rgba(245, 158, 11, 0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(245, 158, 11, 0.3)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div className="card-body py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#fbbf24', fontSize: '2.5rem' }}>
                                    {forms.filter(f => f.status === 'Pending').length}
                                </h3>
                                <p className="text-white-50 mb-0 fw-semibold">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card text-center stat-card"
                            style={{
                                borderRadius: '16px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div className="card-body py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#4ade80', fontSize: '2.5rem' }}>
                                    {forms.filter(f => f.status === 'Approved').length}
                                </h3>
                                <p className="text-white-50 mb-0 fw-semibold">Approved</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card text-center stat-card"
                            style={{
                                borderRadius: '16px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(239, 68, 68, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div className="card-body py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#f87171', fontSize: '2.5rem' }}>
                                    {forms.filter(f => f.status === 'Rejected').length}
                                </h3>
                                <p className="text-white-50 mb-0 fw-semibold">Rejected</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div 
                            className="card text-center stat-card"
                            style={{
                                borderRadius: '16px',
                                background: 'rgba(59, 130, 246, 0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.4)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            <div className="card-body py-4">
                                <h3 className="fw-bold mb-2" style={{ color: '#60a5fa', fontSize: '2.5rem' }}>
                                    {forms.filter(f => f.status === 'Completed').length}
                                </h3>
                                <p className="text-white-50 mb-0 fw-semibold">Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}