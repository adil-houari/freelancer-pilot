import React, { useState } from 'react';
import '../styles/Header.css';
import { FaUser, FaEnvelope, FaTasks } from 'react-icons/fa';

function Header() {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const userName = localStorage.getItem('userName') || 'User';

    const [status, setStatus] = useState("🟢 Available");

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    return (
        <header className="header">
            <div className="header-left">
                <img src="/assets/FreeLancerPilotLogoP.png" alt="Logo" className="logo" />
            </div>

            <div className="header-center">
            <h2>Welcome, <span className="name">{userName}</span> 👋</h2>

            </div>

            <div className="header-right">
                <span className="date">{today}</span>

                <div
                    className="status"
                    onMouseEnter={() => setShowStatusDropdown(true)}
                    onMouseLeave={() => setShowStatusDropdown(false)}
                >
                    <button className="status-btn">{status}</button>
                    {showStatusDropdown && (
                        <div className="dropdown status-dropdown">
                            <div onClick={() => handleStatusChange("🟢 Available")}>🟢 Available</div>
                            <div onClick={() => handleStatusChange("🔴 Busy")}>🔴 Busy</div>
                            <div onClick={() => handleStatusChange("🟡 Away")}>🟡 Away</div>
                        </div>
                    )}
                </div>

                <div
                    className="profile"
                    onMouseEnter={() => setShowProfileDropdown(true)}
                    onMouseLeave={() => setShowProfileDropdown(false)}
                >
                    <img src="/assets/IconUserReact.png" alt="User" className="avatar" />
                    {showProfileDropdown && (
                        <div className="dropdown profile-dropdown">
                            <div className="dropdown-item"><FaUser /> My Profile</div>
                            <div className="dropdown-item"><FaEnvelope /> My Account</div>
                            <div className="dropdown-item"><FaTasks /> My Task</div>
                            <button className="logout-btn">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
