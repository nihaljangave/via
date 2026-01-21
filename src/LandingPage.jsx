import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onNavigate }) => {
    return (
        <div className="landing-container">
            <h1>Select a Form</h1>
            <div className="cards-grid">
                <div className="card" onClick={() => onNavigate('cdas-form')}>
                    <h2>CDAS Access Request Form</h2>
                    <p>Request access to CDAS environments, protocols, and systems.</p>
                    <div className="card-arrow">→</div>
                </div>
                <div className="card" onClick={() => onNavigate('rds-cdas-form')}>
                    <h2>RDS Clinical Data Analytics Suite(CDAS) Requests</h2>
                    <p>Request access to RDS CDAS environments.</p>
                    <div className="card-arrow">→</div>
                </div>
                <div className="card" onClick={() => onNavigate('rds-cdas-incident')}>
                    <h2>RDS Clinical Data Analytics Suite(CDAS) Incident</h2>
                    <p>Report an incident for RDS CDAS environments.</p>
                    <div className="card-arrow">→</div>
                </div>
                {/* Placeholder for future forms */}
                {/* <div className="card disabled">
                    <h2>Future Form</h2>
                    <p>Coming soon...</p>
                </div> */}
            </div>
        </div>
    );
};

export default LandingPage;
