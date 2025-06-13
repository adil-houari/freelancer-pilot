import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Analytics from '../components/Analytics';
import '../styles/Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-wrapper">
            <Header userName="Adil" />

            <div className="dashboard-container">
                <Sidebar />

                <div className="main-content">
                    <Analytics />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
