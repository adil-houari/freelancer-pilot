import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaTachometerAlt, FaUserFriends, FaCalendarAlt, FaChartPie, FaCog,
    FaQuestionCircle, FaSignOutAlt, FaEuroSign, FaTasks
} from 'react-icons/fa';
import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to="/dashboard" className="nav-link">
                        <FaTachometerAlt /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clients" className="nav-link">
                        <FaUserFriends /> Clients
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/tasks" className="nav-link">
                        <FaTasks /> My Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/schedule" className="nav-link">
                        <FaCalendarAlt /> Schedule
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" className="nav-link">
                        <FaChartPie /> Analytics
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className="nav-link">
                        <FaCog /> Settings
                    </NavLink>
                </li>
            </ul>

            <div className="sidebar-footer">
                <NavLink to="/pricing" className="nav-link small">
                    <FaEuroSign /> Pricing
                </NavLink>
                <NavLink to="/help" className="nav-link small">
                    <FaQuestionCircle /> Help
                </NavLink>
                <NavLink to="/" className="nav-link small logout">
                    <FaSignOutAlt /> Logout
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;
