import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { FaCheckCircle } from 'react-icons/fa';
import '../styles/Help.css';

function Help() {
    const [issueType, setIssueType] = useState('Bug report');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [toast, setToast] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [attachedImage, setAttachedImage] = useState(null);

    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !subject || !description) {
            setToast('Please fill in all fields.');
            setTimeout(() => setToast(''), 3000);
            return;
        }

        setSending(true);

        // Simulation d'envoi
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setToast('Your message has been sent!');
            setSubject('');
            setDescription('');
            setAttachedImage(null);

            setTimeout(() => {
                setSent(false);
                setToast('');
            }, 2000);
        }, 2000);
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setAttachedImage(e.target.files[0]);
        }
    };

    return (
        <DashboardLayout>
            <div className="help-container">
                <h2>Need Help?</h2>
                <p>If you have any questions, feedback or issues, feel free to contact us below.</p>

                {/* Zone pour le toast */}
                <div className="toast-wrapper">
                    {toast && (
                        <div className={`help-toast ${toast.includes('fill') ? 'error-toast' : ''}`}>
                            {toast}
                        </div>
                    )}
                </div>

                <form className="help-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Type of issue</label>
                        <select value={issueType} onChange={e => setIssueType(e.target.value)}>
                            <option>Bug report</option>
                            <option>Feature request</option>
                            <option>General question</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Your email"
                            className={toast.includes('fill') && !email ? 'error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="Short subject"
                            className={toast.includes('fill') && !subject ? 'error' : ''}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Please describe your issue or question in detail..."
                            className={toast.includes('fill') && !description ? 'error' : ''}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Attach Image (optional)</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {attachedImage && <p className="attached-name">📎 {attachedImage.name}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`help-btn ${toast.includes('fill') ? 'shake' : ''}`}
                        disabled={sending}
                    >
                        {sending ? 'Sending...' : sent ? <><FaCheckCircle /> Sent!</> : 'Send Message'}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}

export default Help;
