import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import '../styles/Analytics.css';

const data = [
    { month: 'Jan', revenue: 4000, clients: 24 },
    { month: 'Feb', revenue: 3000, clients: 13 },
    { month: 'Mar', revenue: 5000, clients: 20 },
    { month: 'Apr', revenue: 7000, clients: 32 },
    { month: 'May', revenue: 6000, clients: 28 },
    { month: 'Jun', revenue: 8000, clients: 40 },
];

function Analytics() {
    return (
        <div className="analytics-dashboard">
            <div className="cards-overview">
                <div className="stat-card">
                    <h4>Total Revenue</h4>
                    <p>$32,000</p>
                    <span className="green">+12% this month</span>
                </div>
                <div className="stat-card">
                    <h4>Active Clients</h4>
                    <p>42</p>
                    <span className="blue">+5 new</span>
                </div>
                <div className="stat-card">
                    <h4>Appointments</h4>
                    <p>87</p>
                    <span className="purple">+10%</span>
                </div>
            </div>

            <div className="charts">
                <div className="chart-box">
                    <h3>Revenue Forecast</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#6c63ff" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-box">
                    <h3>Client Growth</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00c9a7" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00c9a7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="clients" stroke="#00c9a7" fillOpacity={1} fill="url(#colorClients)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
