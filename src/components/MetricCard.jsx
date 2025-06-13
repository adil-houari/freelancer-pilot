import React from 'react';
import '../styles/MetricCard.css';

function MetricCard({ title, value }) {
    return (
        <div className="metric-card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
}

export default MetricCard;
