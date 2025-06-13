import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { FaUserFriends, FaDollarSign, FaTasks, FaCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import '../styles/AnalyticsPage.css';


function Analytics() {
    const revenueData = [
        { month: 'Jan', revenue: 1200 },
        { month: 'Feb', revenue: 1500 },
        { month: 'Mar', revenue: 1700 },
        { month: 'Apr', revenue: 1900 },
        { month: 'May', revenue: 2100 },
        { month: 'Jun', revenue: 2400 },
    ];

    const clientData = [
        { type: 'Personal', value: 12 },
        { type: 'Corporate', value: 8 },
        { type: 'Agency', value: 5 },
    ];

    const COLORS = ['#6c63ff', '#34d399', '#fbbf24'];

    return (
        <DashboardLayout>
            <div className="analytics-container">

                <h2 className="fade-in">Analytics Overview</h2>

                {/* KPI Cards */}
                <div className="kpi-cards fade-in">
                    <div className="card">
                        <FaDollarSign className="icon" />
                        <div>
                            <h3>Total Revenue</h3>
                            <p>$12,400</p>
                        </div>
                    </div>
                    <div className="card">
                        <FaUserFriends className="icon" />
                        <div>
                            <h3>Active Clients</h3>
                            <p>18</p>
                        </div>
                    </div>
                    <div className="card">
                        <FaTasks className="icon" />
                        <div>
                            <h3>Completed Tasks</h3>
                            <p>45</p>
                        </div>
                    </div>
                    <div className="card">
                        <FaCalendarAlt className="icon" />
                        <div>
                            <h3>Upcoming Meetings</h3>
                            <p>6</p>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="charts-section fade-in">
                    <div className="chart-box">
                        <h3>Revenue Over Time</h3>
                        <LineChart width={500} height={300} data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#6c63ff" strokeWidth={3} />
                        </LineChart>
                    </div>

                    <div className="chart-box">
                        <h3>Clients by Type</h3>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={clientData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {clientData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    );
}

export default Analytics;
