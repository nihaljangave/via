import React, { useState } from 'react';
import './AccessRequestForm.css'; // Reusing the same CSS for consistency

const RdsCdasRequestForm = ({ onBack }) => {
    const [cdasEnv, setCdasEnv] = useState('');
    const [requestType, setRequestType] = useState('');

    // CDAS Tools Access Specific
    const [accessFor, setAccessFor] = useState('');
    const [accessAction, setAccessAction] = useState('');
    const [saUserName, setSaUserName] = useState('');
    const [saJustification, setSaJustification] = useState('');
    const [selectedTool, setSelectedTool] = useState('');
    const [airflowRole, setAirflowRole] = useState('');
    const [adlsPath, setAdlsPath] = useState('');
    const [otherToolDetails, setOtherToolDetails] = useState('');

    // General/AdHoc & Data Cleansing Specific
    const [projectType, setProjectType] = useState('');
    const [requestDetails, setRequestDetails] = useState('');
    const [cleanupDetails, setCleanupDetails] = useState('');

    const handleSubmit = () => {
        const missingFields = [];
        if (!cdasEnv) missingFields.push('Select CDAS Environment');
        if (!requestType) missingFields.push('Please choose the type of request');

        if (requestType === 'CDAS Tools Access') {
            if (!accessFor) missingFields.push('Requesting Access for');
            if (!accessAction) missingFields.push('Select Grant/Revoke Access');
            if (accessFor === 'SA User (Service Account)') {
                if (!saUserName) missingFields.push('Provide the user name');
                if (!saJustification) missingFields.push('Give a brief justification');
            }
            if (!selectedTool) missingFields.push('Select the Tools');
            if (selectedTool === 'Airflow' && !airflowRole && accessAction !== 'Revoke Access') missingFields.push('Select Role for Airflow Access');
            if (selectedTool === 'ADLS Browser' && !adlsPath && accessAction !== 'Revoke Access') missingFields.push('Provide the ADLS Path');
            if (selectedTool === 'Other Tools' && !otherToolDetails) missingFields.push('Provide the Tool name and justification');
        }

        if (requestType === 'General/AdHoc Request') {
            if (!projectType) missingFields.push('Please select the project type');
            if (!requestDetails) missingFields.push('Request Details');
        }

        if (requestType === 'CDAS Data Cleansing/Cleanup') {
            if (!projectType) missingFields.push('Please select the project type');
            if (!cleanupDetails) missingFields.push('Data Cleansing/Cleanup Details');
        }

        if (missingFields.length > 0) {
            alert(`Please fill in the following mandatory fields:\n- ${missingFields.join('\n- ')}`);
            return;
        }

        alert('Request Submitted Successfully!');
    };

    const handleReset = () => {
        setCdasEnv('');
        setRequestType('');
        setAccessFor('');
        setAccessAction('');
        setSaUserName('');
        setSaJustification('');
        setSelectedTool('');
        setAirflowRole('');
        setAdlsPath('');
        setOtherToolDetails('');
        setProjectType('');
        setRequestDetails('');
        setCleanupDetails('');
    };

    const projectTypeOptions = [
        "RDS CDAS CDI", "RDS CDAS CORE", "RDS CDAS DRM", "RDS CDAS CDM", "RDS CDAS ORCH",
        "RDS CDAS IC", "RDS CDAS FSR", "RDS CDAS DEW", "RDS CDAS SSI", "RDS ODS",
        "RDS IMDM (Reltio)", "RDS CDAS ODM", "RDS CDAS Medical Coding", "RDS CDAS CTA LLM",
        "RDS CDAS ADLS Browser", "RDS CDAS Wingspan"
    ];

    return (
        <div className="form-container">
            <h1>RDS Clinical Data Analytics Suite(CDAS) Requests</h1>
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
                <label>Please choose the type of request <span style={{ color: 'red' }}>*</span></label>
                <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="CDAS Tools Access">CDAS Tools Access</option>
                    <option value="General/AdHoc Request">General/AdHoc Request</option>
                    <option value="CDAS Data Cleansing/Cleanup">CDAS Data Cleansing/Cleanup</option>
                </select>
            </div>

            {/* CDAS Tools Access Flow */}
            {requestType === 'CDAS Tools Access' && (
                <div className="nested-section">
                    <div className="form-group">
                        <label>Requesting Access for <span style={{ color: 'red' }}>*</span></label>
                        <select value={accessFor} onChange={(e) => setAccessFor(e.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="User">User</option>
                            <option value="SA User (Service Account)">SA User (Service Account)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Grant/Revoke Access <span style={{ color: 'red' }}>*</span></label>
                        <select value={accessAction} onChange={(e) => setAccessAction(e.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="Grant Access">Grant Access</option>
                            <option value="Revoke Access">Revoke Access</option>
                        </select>
                    </div>

                    {accessFor === 'SA User (Service Account)' && (
                        <>
                            <div className="form-group">
                                <label>Provide the user name <span style={{ color: 'red' }}>*</span></label>
                                <input type="text" value={saUserName} onChange={(e) => setSaUserName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Give a brief justification (Will be reviewed by Architects) <span style={{ color: 'red' }}>*</span></label>
                                <textarea value={saJustification} onChange={(e) => setSaJustification(e.target.value)} />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>Select the Tools <span style={{ color: 'red' }}>*</span></label>
                        <select value={selectedTool} onChange={(e) => setSelectedTool(e.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="Airflow">Airflow</option>
                            <option value="Trifacta">Trifacta</option>
                            <option value="ADLS Browser">ADLS Browser</option>
                            <option value="Alteryx">Alteryx</option>
                            <option value="Other Tools">Other Tools</option>
                        </select>
                    </div>

                    {selectedTool === 'Airflow' && accessAction !== 'Revoke Access' && (
                        <div className="form-group">
                            <label>Select Role for Airflow Access <span style={{ color: 'red' }}>*</span></label>
                            <select value={airflowRole} onChange={(e) => setAirflowRole(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Op">Op</option>
                                <option value="Viewer">Viewer</option>
                                <option value="Public">Public</option>
                            </select>
                        </div>
                    )}

                    {selectedTool === 'ADLS Browser' && accessAction !== 'Revoke Access' && (
                        <div className="form-group">
                            <label>Provide the ADLS Path (If path doesn't exist, ticket will be cancelled) <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={adlsPath} onChange={(e) => setAdlsPath(e.target.value)} />
                        </div>
                    )}

                    {selectedTool === 'Other Tools' && (
                        <div className="form-group">
                            <label>Provide the Tool name and justification (Will be reviewed by Architects) <span style={{ color: 'red' }}>*</span></label>
                            <textarea value={otherToolDetails} onChange={(e) => setOtherToolDetails(e.target.value)} />
                        </div>
                    )}
                </div>
            )}

            {/* General/AdHoc Request Flow */}
            {requestType === 'General/AdHoc Request' && (
                <div className="nested-section">
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
                        <label>Request Details <span style={{ color: 'red' }}>*</span></label>
                        <textarea value={requestDetails} onChange={(e) => setRequestDetails(e.target.value)} />
                    </div>
                </div>
            )}

            {/* CDAS Data Cleansing/Cleanup Flow */}
            {requestType === 'CDAS Data Cleansing/Cleanup' && (
                <div className="nested-section">
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
                        <label>Data Cleansing/Cleanup Details <span style={{ color: 'red' }}>*</span></label>
                        <textarea value={cleanupDetails} onChange={(e) => setCleanupDetails(e.target.value)} />
                    </div>
                </div>
            )}

            <div className="form-actions">
                <button className="reset-btn" onClick={handleReset}>Reset</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit Request</button>
            </div>
        </div>
    );
};

export default RdsCdasRequestForm;
