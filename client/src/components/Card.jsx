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
            className="car-card h-100"
            onClick={onClick}
        >
            {/* IMAGE SECTION */}
            <div className="car-image-wrapper">
                <img
                    src={car?.imageUrl}
                    alt={`${car?.brand} ${car?.model}`}
                    className="car-image"
                />

                <span className={`status-badge ${car?.status}`}>
                    {car?.status}
                </span>
            </div>

            {/* BODY */}
            <div className="car-body">
                <span className="brand-badge">
                    {car?.brand}
                </span>

                <h5 className="car-title">
                    {car?.brand} {car?.model}
                    <span className="car-year">({car?.year})</span>
                </h5>

                <div className="car-info">
                    <p>
                        <strong>Warna:</strong> {car?.color}
                    </p>
                    <p>
                        <strong>Plat Nomor:</strong> {car?.plateNumber}
                    </p>
                </div>

                <button
                    className="insight-btn"
                    onClick={handleGetInsights}
                    disabled={loadingInsights}
                >
                    {loadingInsights ? "Loading..." : showInsights ? "Hide AI Insights" : "Get AI Insights"}
                </button>

                {showInsights && insights && (
                    <div className="insight-box">
                        {insights}
                    </div>
                )}
            </div>
        </div>
    );
}
