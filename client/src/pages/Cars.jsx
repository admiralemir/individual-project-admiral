import { useEffect, useState } from 'react'
import showError from '../helpers/error'
import http from '../helpers/http'
import Card from '../components/Card'

export default function Cars(props) {
    const [loading, setLoading] = useState(false)
    const [cars, setCars] = useState([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const fetchCars = async () => {
        try {
            setLoading(true)

            const params = {}
            if (search) params.search = search
            if (statusFilter) params.status = statusFilter

            const response = await http({
                method: 'GET',
                url: '/cars',
                params
            })

            setCars(response.data)

        } catch (error) {
            console.log(error)
            showError(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCars()
    }, [search, statusFilter])

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value)
    }

    const handleResetFilters = () => {
        setSearch('')
        setStatusFilter('')
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
                paddingTop: "120px",
                paddingBottom: "80px"
            }}
        >
            <div className="container text-white">

                <h1 className="mb-5 fw-bold" style={{ letterSpacing: "2px" }}>
                    Car List
                </h1>

                {/* FILTER SECTION */}
                <div className="glass-card p-4 mb-5">
                    <div className="row g-3 align-items-end">

                        <div className="col-md-6">
                            <label className="form-label text-white-50">
                                Search
                            </label>
                            <input
                                type="text"
                                className="form-control custom-input"
                                placeholder="Search by brand, model, or color..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label text-white-50">
                                Status
                            </label>
                            <select
                                className="form-select custom-input"
                                value={statusFilter}
                                onChange={handleStatusFilterChange}
                            >
                                <option value="">All Status</option>
                                <option value="Available">Available</option>
                            </select>
                        </div>

                        <div className="col-md-2">
                            <button
                                className="btn btn-outline-light w-100"
                                onClick={handleResetFilters}
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-light"></div>
                        <p className="mt-3 text-white-50">Loading cars...</p>
                    </div>
                ) : cars.length === 0 ? (
                    <div className="glass-card text-center p-5">
                        <p className="mb-0 text-white-50">
                            No cars found matching your search criteria.
                        </p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {cars.map((car, index) => (
                            <div className="col-md-4 fade-up" key={index}>
                                <div className="car-card-wrapper">
                                    <Card
                                        car={car}
                                        onClick={() => console.log('Lihat detail:', car)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* STYLING */}
            <style>{`

            .glass-card {
                background: rgba(255,255,255,0.05);
                backdrop-filter: blur(12px);
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.08);
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            }

            .custom-input {
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                color: white;
            }

            .custom-input:focus {
                background: rgba(255,255,255,0.12);
                border-color: #2c5364;
                box-shadow: none;
                color: white;
            }

            .custom-input option {
                background: #0f2027;
                color: white;
            }

            .car-card-wrapper {
                transition: 0.4s ease;
            }

            .car-card-wrapper:hover {
                transform: translateY(-10px);
            }

            .fade-up {
                animation: fadeUp 0.8s ease forwards;
                opacity: 0;
            }

            @keyframes fadeUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

        `}</style>
        </div>
    )
}