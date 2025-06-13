import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/Pricing.css';

function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: 'Starter',
            monthly: 'Free',
            yearly: 'Free',
            description: 'For individuals just starting out.',
            features: ['1 client', 'Basic support', 'Simple scheduling', 'Community access'],
            highlight: false,
        },
        {
            name: 'Pro',
            monthly: '$12/mo',
            yearly: '$120/yr',
            description: 'For active freelancers with multiple clients.',
            features: ['Unlimited clients', 'Priority support', 'Advanced scheduling', 'Task tracking'],
            highlight: true,
            badge: 'Most Popular',
        },
        {
            name: 'Enterprise',
            monthly: 'Contact us',
            yearly: 'Contact us',
            description: 'For agencies and full teams.',
            features: ['Team collaboration', 'Dedicated support', 'Custom tools', 'Analytics dashboard'],
            highlight: false,
            badge: 'Trial Included',
        },
    ];

    return (
        <DashboardLayout>
            <div className="pricing-page">
                <div className="pricing-intro">
                    <h1>Choose the plan that fits your workflow</h1>
                    <p>Flexible pricing for solo developers and teams.</p>

                    <div className="toggle">
                        <span className={!isYearly ? 'active' : ''} onClick={() => setIsYearly(false)}>Monthly</span>
                        <div className="toggle-switch" onClick={() => setIsYearly(!isYearly)}>
                            <div className={`switch-dot ${isYearly ? 'right' : ''}`}></div>
                        </div>
                        <span className={isYearly ? 'active' : ''} onClick={() => setIsYearly(true)}>Yearly</span>
                    </div>
                </div>

                <div className="pricing-grid">
                    {plans.map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}>
                            {plan.badge && <div className="badge">{plan.badge}</div>}
                            <h2>{plan.name}</h2>
                            <p className="price">{isYearly ? plan.yearly : plan.monthly}</p>
                            <p className="description">{plan.description}</p>
                            <ul className="features">
                                {plan.features.map((f, i) => (
                                    <li key={i}>✅ {f}</li>
                                ))}
                            </ul>
                            <button className="choose-btn">
                                {plan.monthly === 'Contact us' ? 'Contact' : 'Start Now'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Pricing;
