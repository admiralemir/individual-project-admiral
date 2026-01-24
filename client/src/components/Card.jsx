import { useState } from 'react';
import http from '../helpers/http';
import showError from '../helpers/error';

export default function Card({ car, onClick }) {
    const [showInsights, setShowInsights] = useState(false);
    const [insights, setInsights] = useState('');
    const [loadingInsights, setLoadingInsights] = useState(false);

    const getStatusBadge = (status) => {
        const badges = {
            'Available': 'bg-success',
            'Borrowed': 'bg-warning text-dark',
            'Maintenance': 'bg-danger'
        };
        return badges[status] || 'bg-secondary';
    };

    const handleGetInsights = async (e) => {
        e.stopPropagation();
        
        console.log('BEFORE IF showInsight');
        
        if (showInsights) {
            setShowInsights(false);
            return;
        }

        console.log('AFTER IF showInsight');

        console.log('BEFORE LOADING INSIGHT');
        
        try {
            setLoadingInsights(true);

            console.log('BEFORE RESPONSE');
            
            const response = await http({
                method: 'GET',
                url: `/cars/${car.id}/insights`
            });
            console.log('AFTER RESPONSE', response);
            
            setInsights(response.data.insights);
            setShowInsights(true);
        } catch (error) {
            console.log(error);
            showError(error);
        } finally {
            setLoadingInsights(false);
        }
        
        console.log('AFTER LOADING INSIGHT');
        
    };

    return (
        <div 
            className="card h-100 shadow-sm hover-shadow" 
            style={{ 
                cursor: onClick ? 'pointer' : 'default', 
                transition: 'all 0.3s ease' 
            }}
            onClick={onClick}
        >
            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img 
                    src={car?.imageUrl} 
                    className="card-img-top" 
                    alt={`${car?.brand} ${car?.model}`}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                <span 
                    className={`badge ${getStatusBadge(car?.status)} position-absolute`}
                    style={{ top: '10px', right: '10px', fontSize: '0.85rem' }}
                >
                    {car?.status}
                </span>
            </div>


            <div className="card-body d-flex flex-column">
                
                <span className="badge bg-primary mb-2 align-self-start">
                    {car?.brand}
                </span>

                <h5 className="card-title mb-2">
                    {car?.brand} {car?.model}
                    <span className="text-muted fs-6 ms-2">({car?.year})</span>
                </h5>

                <div className="mb-3 flex-grow-1">
                    <p className="card-text mb-1">
                        <i className="bi bi-palette me-2"></i>
                        <strong>Warna:</strong> {car?.color}
                    </p>
                    <p className="card-text mb-1">
                        <i className="bi bi-credit-card me-2"></i>
                        <strong>Plat Nomor:</strong> {car?.plateNumber}
                    </p>
                </div>

                <div className="mt-auto">
                    <button
                        className="btn btn-outline-primary btn-sm w-100 mb-2"
                        onClick={handleGetInsights}
                        disabled={loadingInsights}
                    >
                        {loadingInsights ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </>
                        ) : (
                            <>
                                <i className="bi bi-stars me-2"></i>
                                {showInsights ? 'Hide AI Insights' : 'Get AI Insights'}
                            </>
                        )}
                    </button>

                    {showInsights && insights && (
                        <div className="alert alert-info p-2 mb-0" style={{ fontSize: '0.85rem' }}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-lightbulb-fill me-2 mt-1" style={{ fontSize: '1rem' }}></i>
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    {insights}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
