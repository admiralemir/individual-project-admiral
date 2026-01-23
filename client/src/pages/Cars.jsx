import { useEffect, useState } from 'react'
import showError from '../helpers/error'
import http from '../helpers/http'
import Card from '../components/Card'
import Button from '../components/Button'

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
        <div className="container my-5">
            <h1 className="mb-4">Car List</h1>
 
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by brand, model, or color..."
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="col-md-4 mb-3 mb-md-0">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>
                <div className="col-md-2">
                    <button
                        className="btn btn-outline-secondary w-100"
                        onClick={handleResetFilters}
                    >
                        Reset
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Loading cars...</p>
            ) : cars.length === 0 ? (
                <div className="alert alert-info">
                    No cars found matching your search criteria.
                </div>
            ) : (
                <div className="row g-4">
                    {cars.map((car, index) => (
                        <div className="col-md-4" key={index}>
                            <Card 
                                car={car}
                                onClick={() => console.log('Lihat detail:', car)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}