import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/Settings.css';
import { FaCloudDownloadAlt, FaLock, FaGlobe, FaCalendarAlt, FaBuilding } from 'react-icons/fa';

function Settings() {
    const [name, setName] = useState(localStorage.getItem('userName') || '');
    const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
    const [language, setLanguage] = useState('fr');
    const [notifications, setNotifications] = useState(true);
    const [timezone, setTimezone] = useState('Europe/Paris');
    const [defaultView, setDefaultView] = useState('dashboard');
    const [businessInfo, setBusinessInfo] = useState({ company: '', siret: '', address: '' });
    const [profileImage, setProfileImage] = useState(null);

    const [showSuccess, setShowSuccess] = useState(false);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('userProfileImage', reader.result);

                // RESET le champ input pour qu'il puisse accepter la même image après suppression
                e.target.value = '';
            };
            reader.readAsDataURL(file);
        }
    };


    useEffect(() => {
        const savedImage = localStorage.getItem('userProfileImage');
        if (savedImage) {
            setProfileImage(savedImage);
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };


    return (
        <DashboardLayout>
            <div className="settings-container">
                <h2>Settings</h2>

                <div className="profile-section">
                    <img src={profileImage || "/assets/IconUserReact.png"} alt="profile" className="profile-img" />
                    <input
                        type="file"
                        id="upload-photo"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e)}
                    />
                    <button className="btn-outline" onClick={() => document.getElementById('upload-photo').click()}>
                        Change Photo
                    </button>
                    {profileImage && (
                        <button className="remove-photo-btn" onClick={() => {
                            setProfileImage(null);
                            localStorage.removeItem('userProfileImage');
                        }}>
                            Remove Photo
                        </button>
                    )}

                </div>



                {showSuccess && <div className="notification">✅ Changes saved successfully</div>}

                <form className="settings-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Language</label>
                        <select value={language} onChange={e => setLanguage(e.target.value)}>
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div className="form-group checkbox">
                        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
                        <span>Receive email notifications</span>
                    </div>

                    <div className="section">
                        <h3><FaLock /> Password Settings</h3>
                        <button className="btn-outline">Change Password</button>
                    </div>

                    <div className="section">
                        <h3><FaGlobe /> Timezone</h3>
                        <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="America/New_York">America/New York</option>
                            <option value="Asia/Tokyo">Asia/Tokyo</option>
                        </select>
                    </div>

                    <div className="section">
                        <h3><FaCalendarAlt /> Default View</h3>
                        <select value={defaultView} onChange={(e) => setDefaultView(e.target.value)}>
                            <option value="dashboard">Dashboard</option>
                            <option value="schedule">Schedule</option>
                            <option value="clients">Clients</option>
                        </select>
                    </div>

                    <div className="section">
                        <h3><FaBuilding /> Business Details</h3>
                        <input placeholder="Company Name" value={businessInfo.company} onChange={e => setBusinessInfo({ ...businessInfo, company: e.target.value })} />
                        <input placeholder="SIRET" value={businessInfo.siret} onChange={e => setBusinessInfo({ ...businessInfo, siret: e.target.value })} />
                        <input placeholder="Business Address" value={businessInfo.address} onChange={e => setBusinessInfo({ ...businessInfo, address: e.target.value })} />
                    </div>

                    <div className="section">
                        <h3><FaCloudDownloadAlt /> Data Export</h3>
                        <button className="btn-outline">Download JSON</button>
                        <button className="btn-outline">Download PDF</button>
                    </div>

                    <button type="submit" className="save-btn">Save Changes</button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default Settings;
