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
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-2">
                        <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                        Form Peminjaman Saya
                    </h2>
                    <p className="text-muted">Daftar pengajuan peminjaman mobil yang telah Anda ajukan</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/form-create')}
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Ajukan Peminjaman Baru
                </button>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Memuat data...</p>
                </div>
            ) : forms.length === 0 ? (
                
                <div className="text-center py-5">
                    <div className="mb-4">
                        <i className="bi bi-inbox" style={{ fontSize: '5rem', color: '#dee2e6' }}></i>
                    </div>
                    <h4 className="text-muted mb-3">Belum Ada Pengajuan</h4>
                    <p className="text-muted mb-4">Anda belum pernah mengajukan peminjaman mobil</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/form-create')}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Ajukan Peminjaman Sekarang
                    </button>
                </div>
            ) : (
                
                <div className="row g-4">
                    {forms.map((form) => (
                        <div className="col-md-6 col-lg-4" key={form.id}>
                            <div className="card h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s ease' }}>
                                
                                <div className="card-header bg-white border-bottom">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">
                                            <i className="bi bi-hash"></i>
                                            Form #{form.id}
                                        </h6>
                                        <span className={`badge ${getStatusBadge(form.status)}`}>
                                            {form.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    
                                    <div className="mb-3 pb-3 border-bottom">
                                        <h5 className="card-title mb-2">
                                            <i className="bi bi-car-front-fill me-2 text-primary"></i>
                                            {form.Car?.brand} {form.Car?.model}
                                        </h5>
                                        <p className="text-muted small mb-0">
                                            <i className="bi bi-credit-card me-2"></i>
                                            {form.Car?.plateNumber}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <div className="d-flex align-items-start mb-2">
                                            <i className="bi bi-calendar-check text-success me-2 mt-1"></i>
                                            <div>
                                                <small className="text-muted d-block">Tanggal Pinjam</small>
                                                <strong>{formatDate(form.borrowDate)}</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start mb-2">
                                            <i className="bi bi-calendar-x text-danger me-2 mt-1"></i>
                                            <div>
                                                <small className="text-muted d-block">Tanggal Kembali</small>
                                                <strong>{formatDate(form.returnDate)}</strong>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <i className="bi bi-clock text-info me-2 mt-1"></i>
                                            <div>
                                                <small className="text-muted d-block">Durasi</small>
                                                <strong>{calculateDuration(form.borrowDate, form.returnDate)} Hari</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {form.purpose && (
                                        <div className="mb-2">
                                            <small className="text-muted">
                                                <i className="bi bi-clipboard-check me-2"></i>
                                                Tujuan:
                                            </small>
                                            <p className="mb-0">{form.purpose}</p>
                                        </div>
                                    )}
                                    {form.destination && (
                                        <div className="mb-2">
                                            <small className="text-muted">
                                                <i className="bi bi-geo-alt-fill me-2"></i>
                                                Destinasi:
                                            </small>
                                            <p className="mb-0">{form.destination}</p>
                                        </div>
                                    )}
                                </div>

  
                                <div className="card-footer bg-light">
                                    <small className="text-muted">
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
                <div className="row mt-5">
                    <div className="col-md-3">
                        <div className="card text-center border-warning">
                            <div className="card-body">
                                <h3 className="text-warning">
                                    {forms.filter(f => f.status === 'Pending').length}
                                </h3>
                                <p className="text-muted mb-0">Pending</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-success">
                            <div className="card-body">
                                <h3 className="text-success">
                                    {forms.filter(f => f.status === 'Approved').length}
                                </h3>
                                <p className="text-muted mb-0">Approved</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-danger">
                            <div className="card-body">
                                <h3 className="text-danger">
                                    {forms.filter(f => f.status === 'Rejected').length}
                                </h3>
                                <p className="text-muted mb-0">Rejected</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center border-info">
                            <div className="card-body">
                                <h3 className="text-info">
                                    {forms.filter(f => f.status === 'Completed').length}
                                </h3>
                                <p className="text-muted mb-0">Completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}