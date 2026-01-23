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
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header text-white py-3" style={{ backgroundColor: '#198754' }}>
                            <h3 className="mb-0 text-center">
                                <i className="bi bi-car-front me-2"></i>
                                Form Peminjaman Mobil
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            {loading && cars.length === 0 ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3">Memuat data mobil...</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {/* Pilih Mobil */}
                                    <div className="mb-4">
                                        <label htmlFor="carId" className="form-label fw-bold">
                                            <i className="bi bi-car-front-fill me-2 text-success"></i>
                                            Pilih Mobil
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            id="carId"
                                            name="carId"
                                            value={form.carId}
                                            onChange={handleChange}
                                        >
                                            <option value="">-- Pilih Mobil --</option>
                                            {cars.map((car) => (
                                                <option key={car.id} value={car.id}>
                                                    {car.brand} {car.model} - {car.plateNumber} ({car.color})
                                                </option>
                                            ))}
                                        </select>
                                        {cars.length === 0 && !loading && (
                                            <small className="text-danger">
                                                Tidak ada mobil yang tersedia saat ini
                                            </small>
                                        )}
                                    </div>

                                    {/* Tanggal Peminjaman */}
                                    <div className="mb-4">
                                        <label htmlFor="borrowDate" className="form-label fw-bold">
                                            <i className="bi bi-calendar-check me-2 text-success"></i>
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
                                        />
                                    </div>

                                    {/* Tanggal Pengembalian */}
                                    <div className="mb-4">
                                        <label htmlFor="returnDate" className="form-label fw-bold">
                                            <i className="bi bi-calendar-x me-2 text-success"></i>
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

                                        />
                                    </div>

                                    {/* Tujuan Peminjaman */}
                                    <div className="mb-4">
                                        <label htmlFor="purpose" className="form-label fw-bold">
                                            <i className="bi bi-clipboard-check me-2 text-success"></i>
                                            Tujuan Peminjaman
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            id="purpose"
                                            name="purpose"
                                            value={form.purpose}
                                            onChange={handleChange}
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
                                        <label htmlFor="destination" className="form-label fw-bold">
                                            <i className="bi bi-geo-alt-fill me-2 text-success"></i>
                                            Destinasi
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="destination"
                                            name="destination"
                                            rows="3"
                                            value={form.destination}
                                            onChange={handleChange}
                                            placeholder="Masukkan alamat tujuan..."

                                        ></textarea>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg"
                                            disabled={loading || cars.length === 0}
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
                                            className="btn btn-outline-secondary"
                                            onClick={() => navigate('/')}
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
                    <div className="alert alert-success mt-4" role="alert">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        <strong>Catatan:</strong> Pastikan semua data yang Anda masukkan sudah benar.
                        Peminjaman akan diproses oleh admin.
                    </div>
                </div>
            </div>
        </div>
    )
}