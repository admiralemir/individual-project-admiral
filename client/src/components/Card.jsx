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
        <>
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
                            <div className="insight-icon mb-2">
                                <i className="bi bi-lightbulb-fill"></i>
                            </div>
                            <div className="insight-content">
                                {insights}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .car-card {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.4s ease;
                    cursor: pointer;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                .car-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                    border-color: rgba(0, 210, 255, 0.3);
                }

                .car-image-wrapper {
                    position: relative;
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                    background: linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(58, 123, 213, 0.1));
                }

                .car-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .car-card:hover .car-image {
                    transform: scale(1.1);
                }

                .status-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    padding: 6px 16px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                }

                .status-badge.Available {
                    background: rgba(74, 222, 128, 0.9);
                    color: #fff;
                    border: 1px solid rgba(74, 222, 128, 0.5);
                }

                .status-badge.Borrowed {
                    background: rgba(251, 191, 36, 0.9);
                    color: #1f2937;
                    border: 1px solid rgba(251, 191, 36, 0.5);
                }

                .status-badge.Maintenance {
                    background: rgba(248, 113, 113, 0.9);
                    color: #fff;
                    border: 1px solid rgba(248, 113, 113, 0.5);
                }

                .car-body {
                    padding: 20px;
                    color: #fff;
                }

                .brand-badge {
                    display: inline-block;
                    padding: 4px 12px;
                    background: linear-gradient(135deg, #00d2ff, #3a7bd5);
                    color: white;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 10px;
                }

                .car-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 8px;
                    letter-spacing: 0.5px;
                }

                .car-year {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 400;
                }

                .car-info {
                    margin: 15px 0;
                    padding: 12px 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .car-info p {
                    margin-bottom: 8px;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                }

                .car-info strong {
                    color: rgba(0, 210, 255, 0.9);
                    font-weight: 600;
                }

                .insight-btn {
                    width: 100%;
                    padding: 12px;
                    margin-top: 15px;
                    background: linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(58, 123, 213, 0.2));
                    border: 1px solid rgba(0, 210, 255, 0.4);
                    border-radius: 12px;
                    color: #00d2ff;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(5px);
                }

                .insight-btn:hover:not(:disabled) {
                    background: linear-gradient(135deg, rgba(0, 210, 255, 0.3), rgba(58, 123, 213, 0.3));
                    border-color: rgba(0, 210, 255, 0.6);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(0, 210, 255, 0.3);
                }

                .insight-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .insight-box {
                    margin-top: 15px;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(0, 210, 255, 0.1), rgba(58, 123, 213, 0.1));
                    border: 1px solid rgba(0, 210, 255, 0.3);
                    border-radius: 15px;
                    animation: slideDown 0.4s ease;
                    backdrop-filter: blur(10px);
                }

                .insight-icon {
                    text-align: center;
                    color: #fbbf24;
                    font-size: 1.5rem;
                }

                .insight-content {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    text-align: justify;
                    white-space: pre-wrap;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
