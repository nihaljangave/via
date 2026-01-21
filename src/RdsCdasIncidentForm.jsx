import React, { useState } from 'react';
import './AccessRequestForm.css'; // Reusing the same CSS for consistency

const RdsCdasIncidentForm = ({ onBack }) => {
    const [cdasEnv, setCdasEnv] = useState('');
    const [projectType, setProjectType] = useState('');
    const [protocolNumber, setProtocolNumber] = useState('');
    const [datasetEnv, setDatasetEnv] = useState('');
    const [studyEnvName, setStudyEnvName] = useState('');
    const [dataflowName, setDataflowName] = useState('');
    const [issueDetails, setIssueDetails] = useState('');

    const handleSubmit = () => {
        const missingFields = [];
        if (!cdasEnv) missingFields.push('Select CDAS Environment');
        if (!projectType) missingFields.push('Please select the project type');
        if (!protocolNumber) missingFields.push('Provide Protocol Number');
        if (!datasetEnv) missingFields.push('Study environment name');
        if (datasetEnv === 'Other' && !studyEnvName) missingFields.push('Study environment name');
        if (!dataflowName) missingFields.push('Dataflow name');
        if (!issueDetails) missingFields.push('Issue Details');

        if (missingFields.length > 0) {
            alert(`Please fill in the following mandatory fields:\n- ${missingFields.join('\n- ')}`);
            return;
        }

        alert('Incident Reported Successfully!');
    };

    const handleReset = () => {
        setCdasEnv('');
        setProjectType('');
        setProtocolNumber('');
        setDatasetEnv('');
        setStudyEnvName('');
        setDataflowName('');
        setIssueDetails('');
    };

    const projectTypeOptions = [
        "RDS CDAS CDI", "RDS CDAS CORE", "RDS CDAS DRM", "RDS CDAS CDM", "RDS CDAS ORCH",
        "RDS CDAS IC", "RDS CDAS FSR", "RDS CDAS DEW", "RDS CDAS SSI", "RDS ODS",
        "RDS IMDM (Reltio)", "RDS CDAS ODM", "RDS CDAS Medical Coding", "RDS CDAS CTA LLM",
        "RDS CDAS ADLS Browser", "RDS CDAS Wingspan"
    ];

    return (
        <div className="form-container">
            <h1>RDS Clinical Data Analytics Suite(CDAS) Incident</h1>
            {onBack && (
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
            )}

            <div className="form-group">
                <label>Select CDAS Environment <span style={{ color: 'red' }}>*</span></label>
                <select value={cdasEnv} onChange={(e) => setCdasEnv(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="RDS CDAS PRODAZ2">RDS CDAS PRODAZ2</option>
                    <option value="RDS CDAS PRE-PRODAZ2">RDS CDAS PRE-PRODAZ2</option>
                    <option value="RDS CDAS SVT2-AZ2">RDS CDAS SVT2-AZ2</option>
                    <option value="RDS CDAS SVTAZ2">RDS CDAS SVTAZ2</option>
                </select>
            </div>

            <div className="form-group">
                <label>Please select the project type <span style={{ color: 'red' }}>*</span></label>
                <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                    <option value="">-- Select --</option>
                    {projectTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Provide Protocol Number <span style={{ color: 'red' }}>*</span></label>
                <select value={protocolNumber} onChange={(e) => setProtocolNumber(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="01-02-TL-013-002">01-02-TL-013-002</option>
                    <option value="01-02-TL-013-003">01-02-TL-013-003</option>
                    <option value="01-02-TL-070-002">01-02-TL-070-002</option>
                    <option value="01-02-TL-242-002">01-02-TL-242-002</option>
                    <option value="01-02-TL-370-007">01-02-TL-370-007</option>
                    <option value="01-02-TL-559-013">01-02-TL-559-013</option>
                </select>
            </div>

            <div className="form-group">
                <label>Study environment name <span style={{ color: 'red' }}>*</span></label>
                <select value={datasetEnv} onChange={(e) => setDatasetEnv(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="PROD">PROD</option>
                    <option value="UAT">UAT</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {datasetEnv === 'Other' && (
                <div className="form-group">
                    <label>Study environment name <span style={{ color: 'red' }}>*</span></label>
                    <input type="text" value={studyEnvName} onChange={(e) => setStudyEnvName(e.target.value)} />
                </div>
            )}

            <div className="form-group">
                <label>Dataflow name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" value={dataflowName} onChange={(e) => setDataflowName(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Issue Details <span style={{ color: 'red' }}>*</span></label>
                <textarea value={issueDetails} onChange={(e) => setIssueDetails(e.target.value)} />
            </div>

            <div className="form-actions">
                <button className="reset-btn" onClick={handleReset}>Reset</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit Incident</button>
            </div>
        </div>
    );
};

export default RdsCdasIncidentForm;
