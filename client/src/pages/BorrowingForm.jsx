import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import showError from "../helpers/error"
import http from "../helpers/http"

// Membuat borrowing form di sini
export default function BorrowingForm() {
    const navigate = useNavigate()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        carId: '',
        borrowDate: '',
        returnDate: '',
        purpose: '',
        destination: ''
    })

    // Ambil data mobil yang tersedia
    const fetchAvailableCars = async () => {
        try {
            setLoading(true)
            const response = await http({
                method: 'GET',
                url: '/cars'
            })
            // Memfilter mobil yang available
            const availableCars = response.data.filter(car => car.status === 'Available')
            setCars(availableCars)
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await http({
                method: 'POST',
                url: '/forms/create',
                data: form
            })

            alert('Peminjaman berhasil diajukan!')
            navigate('/submitted')
        } catch (error) {
            showError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAvailableCars()
    }, [])

    return (
        <div className="min-vh-100" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            paddingTop: '80px',
            paddingBottom: '60px'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-8">
                        <div className="card shadow-lg border-0" style={{
                            borderRadius: '20px',
                            overflow: 'hidden'
                        }}>
                            <div className="card-header text-white py-4" style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderBottom: 'none'
                            }}>
                                <h3 className="mb-0 text-center fw-bold">
                                    <i className="bi bi-car-front me-2"></i>
                                    Form Peminjaman Mobil
                                </h3>
                            </div>
                            <div className="card-body p-5" style={{ backgroundColor: '#f8f9fa' }}>
                                {loading && cars.length === 0 ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border" style={{ color: '#667eea' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted">Memuat data mobil...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        {/* Pilih Mobil */}
                                        <div className="mb-4">
                                            <label htmlFor="carId" className="form-label fw-bold" style={{ color: '#2d3748' }}>
                                                <i className="bi bi-car-front-fill me-2" style={{ color: '#667eea' }}></i>
                                                Pilih Mobil
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                id="carId"
                                                name="carId"
                                                value={form.carId}
                                                onChange={handleChange}
                                                style={{
                                                    borderRadius: '10px',
                                                    border: '2px solid #e2e8f0',
                                                    transition: 'all 0.3s',
                                                    backgroundColor: 'white'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            >
                                                <option value="">-- Pilih Mobil --</option>
                                                {cars.map((car) => (
                                                    <option key={car.id} value={car.id}>
                                                        {car.brand} {car.model} - {car.plateNumber} ({car.color})
                                                    </option>
                                                ))}
                                            </select>
                                            {cars.length === 0 && !loading && (
                                                <small className="text-danger mt-1 d-block">
                                                    <i className="bi bi-exclamation-circle me-1"></i>
                                                    Tidak ada mobil yang tersedia saat ini
                                                </small>
                                            )}
                                        </div>

                                        {/* Tanggal Peminjaman */}
                                        <div className="mb-4">
                                            <label htmlFor="borrowDate" className="form-label fw-bold" style={{ color: '#2d3748' }}>
                                                <i className="bi bi-calendar-check me-2" style={{ color: '#667eea' }}></i>
                                                Tanggal Peminjaman
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control form-control-lg"
                                                id="borrowDate"
                                                name="borrowDate"
                                                value={form.borrowDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                style={{
                                                    borderRadius: '10px',
                                                    border: '2px solid #e2e8f0',
                                                    transition: 'all 0.3s',
                                                    backgroundColor: 'white'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>

                                        {/* Tanggal Pengembalian */}
                                        <div className="mb-4">
                                            <label htmlFor="returnDate" className="form-label fw-bold" style={{ color: '#2d3748' }}>
                                                <i className="bi bi-calendar-x me-2" style={{ color: '#667eea' }}></i>
                                                Tanggal Pengembalian
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control form-control-lg"
                                                id="returnDate"
                                                name="returnDate"
                                                value={form.returnDate}
                                                onChange={handleChange}
                                                min={form.borrowDate || new Date().toISOString().split('T')[0]}
                                                style={{
                                                    borderRadius: '10px',
                                                    border: '2px solid #e2e8f0',
                                                    transition: 'all 0.3s',
                                                    backgroundColor: 'white'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            />
                                        </div>

                                        {/* Tujuan Peminjaman */}
                                        <div className="mb-4">
                                            <label htmlFor="purpose" className="form-label fw-bold" style={{ color: '#2d3748' }}>
                                                <i className="bi bi-clipboard-check me-2" style={{ color: '#667eea' }}></i>
                                                Tujuan Peminjaman
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                id="purpose"
                                                name="purpose"
                                                value={form.purpose}
                                                onChange={handleChange}
                                                style={{
                                                    borderRadius: '10px',
                                                    border: '2px solid #e2e8f0',
                                                    transition: 'all 0.3s',
                                                    backgroundColor: 'white'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            >
                                                <option value="">-- Pilih Tujuan --</option>
                                                <option value="Dinas">Dinas</option>
                                                <option value="Meeting">Meeting</option>
                                                <option value="Antar Jemput">Antar Jemput</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>

                                        {/* Destinasi */}
                                        <div className="mb-4">
                                            <label htmlFor="destination" className="form-label fw-bold" style={{ color: '#2d3748' }}>
                                                <i className="bi bi-geo-alt-fill me-2" style={{ color: '#667eea' }}></i>
                                                Destinasi
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="destination"
                                                name="destination"
                                                rows="4"
                                                value={form.destination}
                                                onChange={handleChange}
                                                placeholder="Masukkan alamat tujuan..."
                                                style={{
                                                    borderRadius: '10px',
                                                    border: '2px solid #e2e8f0',
                                                    transition: 'all 0.3s',
                                                    backgroundColor: 'white'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                                                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                            ></textarea>
                                        </div>

                                        {/* Buttons */}
                                        <div className="d-grid gap-3 mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-lg fw-bold"
                                                disabled={loading || cars.length === 0}
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: 'white',
                                                    padding: '15px',
                                                    transition: 'transform 0.2s',
                                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Memproses...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-send-fill me-2"></i>
                                                        Ajukan Peminjaman
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-lg fw-bold"
                                                onClick={() => navigate('/')}
                                                style={{
                                                    background: 'white',
                                                    border: '2px solid #667eea',
                                                    borderRadius: '10px',
                                                    color: '#667eea',
                                                    padding: '15px',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = '#667eea'
                                                    e.target.style.color = 'white'
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'white'
                                                    e.target.style.color = '#667eea'
                                                }}
                                            >
                                                <i className="bi bi-x-circle me-2"></i>
                                                Batal
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="alert mt-4" role="alert" style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '15px',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                            borderLeft: '5px solid #667eea'
                        }}>
                            <i className="bi bi-info-circle-fill me-2" style={{ color: '#667eea' }}></i>
                            <strong>Catatan:</strong> Pastikan semua data yang Anda masukkan sudah benar.
                            Peminjaman akan diproses oleh admin.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}