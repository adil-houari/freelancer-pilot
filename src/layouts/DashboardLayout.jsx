// src/layouts/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/Dashboard.css'; // ou général

function DashboardLayout({ children }) {
    return (
        <div className="dashboard-wrapper">
            <Header userName="Adil" />
            <div className="dashboard-container">
                <Sidebar />
                <div className="main-content">{children}</div>
            </div>
        </div>
    );
}

export default DashboardLayout;
