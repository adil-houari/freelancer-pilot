import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaEnvelope } from 'react-icons/fa';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [shake, setShake] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!name) newErrors.name = 'Full name is required';
        if (!email) newErrors.email = 'Email is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        setErrors({});
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        navigate('/dashboard');
    };

    return (
        <div className="login-wrapper">
            <div className={`login-card ${shake ? 'shake' : ''}`}>
                <div className="login-left">
                    <img src="/assets/computerImage.png" alt="login visual" />
                </div>
                <div className="login-right">
                    <div className="badge-login fade-in-badge">👋 Welcome Back</div>
                    <h2>Log in to continue</h2>
                    <p>Manage your freelance workflow easily.</p>
                    <form onSubmit={handleSubmit}>
                        <div className={`input-group ${errors.name ? 'error' : ''}`}>
                            <FaUserAlt className="input-icon" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {errors.name && <span className="error-text">{errors.name}</span>}

                        <div className={`input-group ${errors.email ? 'error' : ''}`}>
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {errors.email && <span className="error-text">{errors.email}</span>}

                        <button type="submit" className={shake ? 'shake' : ''}>Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
