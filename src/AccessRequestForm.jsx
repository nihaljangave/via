import React, { useState, useEffect } from 'react';
import './AccessRequestForm.css';

const AccessRequestForm = ({ onBack }) => {
    const [cdasEnv, setCdasEnv] = useState('');
    const [accessFor, setAccessFor] = useState('');
    const [allStudies, setAllStudies] = useState(false);
    const [requestType, setRequestType] = useState('');

    // SA User specific
    const [saUser, setSaUser] = useState('');
    const [createNewSa, setCreateNewSa] = useState(false);
    const [saAppName, setSaAppName] = useState('');
    const [saOwner, setSaOwner] = useState('');
    const [saUseCase, setSaUseCase] = useState('');
    const [rsaVersion, setRsaVersion] = useState('');

    const [protocolOrSystem, setProtocolOrSystem] = useState('');
    const [externalData, setExternalData] = useState('');

    // System specific
    const [systemNumber, setSystemNumber] = useState(''); // Keep for dropdown value
    const [selectedSystems, setSelectedSystems] = useState([]);
    const [createNewSystem, setCreateNewSystem] = useState(false);
    const [newSystemName, setNewSystemName] = useState('');

    // Protocol specific
    const [protocolNumber, setProtocolNumber] = useState(''); // Keep for dropdown value
    const [selectedProtocols, setSelectedProtocols] = useState([]);
    const [createNewProtocol, setCreateNewProtocol] = useState(false);
    const [newProtocolName, setNewProtocolName] = useState('');
    const [sponsorName, setSponsorName] = useState('');
    const [createNewSponsor, setCreateNewSponsor] = useState(false);
    const [newSponsorName, setNewSponsorName] = useState('');

    const [role, setRole] = useState('');
    const [hasDtlCpm, setHasDtlCpm] = useState('');
    const [dtlCpmEmail, setDtlCpmEmail] = useState('');
    const [revokeExternalData, setRevokeExternalData] = useState(false);
    const [saUserRole, setSaUserRole] = useState('');

    // All Studies specific
    const [studyAccessType, setStudyAccessType] = useState('');
    const [allStudyRole, setAllStudyRole] = useState('');
    const [otherRoleName, setOtherRoleName] = useState('');
    const [accessBrief, setAccessBrief] = useState('');
    const [revokeUserId, setRevokeUserId] = useState('');

    // L2 Data Access specific
    const [l2DataAccess, setL2DataAccess] = useState(false);
    const [riskRitm, setRiskRitm] = useState('');
    const [accessEndDate, setAccessEndDate] = useState('');

    // Reset dependent fields when parents change
    useEffect(() => {
        if (accessFor === 'User') {
            setSaUser('');
            setCreateNewSa(false);
            setSaUserRole('');
        }
    }, [accessFor]);

    useEffect(() => {
        if (requestType === 'Revoke Access') {
            setCreateNewSa(false);
            setCreateNewSystem(false);
            setCreateNewProtocol(false);
            setExternalData(''); // Hidden for revoke? Prompt says "Select Access Request Type = Grant Access (should not show on selection of Revoke)" for External Data Access
        }
    }, [requestType]);

    // Enforce "all study access" for SA User + Grant Access + All Studies
    useEffect(() => {
        if (accessFor === 'SA User' && requestType === 'Grant Access' && allStudies) {
            setStudyAccessType('all study access');
        }
    }, [accessFor, requestType, allStudies]);

    const getGeneratedSaName = () => {
        if (!saAppName) return '';
        return `CDAS_${saAppName.toUpperCase()}_SA`;
    };

    const handleReset = () => {
        setCdasEnv('');
        setAccessFor('');
        setAllStudies(false);
        setRequestType('');
        setSaUser('');
        setCreateNewSa(false);
        setSaAppName('');
        setSaOwner('');
        setSaUseCase('');
        setRsaVersion('');
        setProtocolOrSystem('');
        setExternalData('');
        setSystemNumber('');
        setSelectedSystems([]);
        setCreateNewSystem(false);
        setNewSystemName('');
        setProtocolNumber('');
        setSelectedProtocols([]);
        setCreateNewProtocol(false);
        setNewProtocolName('');
        setSponsorName('');
        setCreateNewSponsor(false);
        setNewSponsorName('');
        setRole('');
        setHasDtlCpm('');
        setDtlCpmEmail('');
        setRevokeExternalData(false);
        setSaUserRole('');
        setStudyAccessType('');
        setAllStudyRole('');
        setOtherRoleName('');
        setAccessBrief('');
        setRevokeUserId('');
        setL2DataAccess(false);
        setRiskRitm('');
        setAccessEndDate('');
    };

    const handleSystemChange = (e) => {
        const value = e.target.value;
        if (value && !selectedSystems.includes(value)) {
            setSelectedSystems([...selectedSystems, value]);
        }
        setSystemNumber(''); // Reset dropdown
        if (value) setCreateNewSystem(false);
    };

    const removeSystem = (sys) => {
        setSelectedSystems(selectedSystems.filter(s => s !== sys));
    };

    const handleProtocolChange = (e) => {
        const value = e.target.value;
        if (value && !selectedProtocols.includes(value)) {
            setSelectedProtocols([...selectedProtocols, value]);
        }
        setProtocolNumber(''); // Reset dropdown
        if (value) setCreateNewProtocol(false);
    };

    const removeProtocol = (proto) => {
        setSelectedProtocols(selectedProtocols.filter(p => p !== proto));
    };

    const handleSubmit = () => {
        const missingFields = [];
        if (!cdasEnv) missingFields.push('CDAS Environment');
        if (!accessFor) missingFields.push('Requesting Access for');
        if (!requestType) missingFields.push('Access Request Type');

        // Conditional Validation
        if (accessFor === 'SA User' && !saUser && !createNewSa) missingFields.push('Select the SA user');
        if (accessFor === 'SA User' && requestType === 'Grant Access' && !rsaVersion) missingFields.push('Required RSA Version');

        if (!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access')) {
            if (!protocolOrSystem) missingFields.push('Requesting for Protocol/System ?');
        }

        if (allStudies && (requestType === 'Grant Access' || (requestType === 'Revoke Access' && accessFor !== 'SA User'))) {
            if (!studyAccessType) missingFields.push('Select study access type');
        }

        if (allStudies && requestType === 'Grant Access' && studyAccessType === 'all study access') {
            if (!allStudyRole) missingFields.push('Select Role for all study');
            if (allStudyRole === 'Other' && !otherRoleName) missingFields.push('Provide Role for ALL Study');
            if ((allStudyRole === 'Other' || allStudyRole === 'One Data Store Read Only Users (All Study)') && !accessBrief) missingFields.push('Brief on the requested access');
        }

        if ((!allStudies && accessFor === 'User' && requestType === 'Grant Access') || (allStudies && requestType === 'Grant Access' && studyAccessType === 'no study access')) {
            if (!role) missingFields.push('Provide Role');
        }

        if (!allStudies && accessFor !== 'SA User' && requestType === 'Grant Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System')) {
            if (!externalData) missingFields.push('External Data Access');
        }

        if (!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access') && protocolOrSystem === 'System') {
            if (!createNewSystem && selectedSystems.length === 0) missingFields.push('Provide System Number');
        }

        if (!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access') && protocolOrSystem === 'Protocol') {
            if (!createNewProtocol && selectedProtocols.length === 0) missingFields.push('Provide Protocol Number');
        }

        if (!allStudies && accessFor === 'User' && requestType === 'Grant Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System')) {
            if (!hasDtlCpm) missingFields.push('Do you have a DTL/CPM for approval ?');
        }

        if (!allStudies && accessFor === 'SA User' && requestType === 'Grant Access' && protocolOrSystem === 'System') {
            if (!saUserRole) missingFields.push('Provide SA User Role');
        }

        if (missingFields.length > 0) {
            alert(`Please fill in the following mandatory fields:\n- ${missingFields.join('\n- ')}`);
            return;
        }

        // Proceed with submission logic (placeholder)
        console.log('Form submitted successfully');
        alert('Request Submitted Successfully!');
    };

    return (
        <div className="form-container">
            <h1>CDAS Access Request Form</h1>
            {onBack && (
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
            )}

            {/* 1. Select CDAS Environment */}
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

            {/* 2. Requesting Access for */}
            <div className="form-group">
                <label>Requesting Access for <span style={{ color: 'red' }}>*</span></label>
                <select value={accessFor} onChange={(e) => setAccessFor(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="User">User</option>
                    <option value="SA User">SA User (Service Account)</option>
                </select>


            </div>



            {/* 3. Select Access Request Type */}
            <div className="form-group">
                <label>Select Access Request Type <span style={{ color: 'red' }}>*</span></label>
                <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="Grant Access">Grant Access</option>
                    <option value="Revoke Access">Revoke Access</option>
                </select>
            </div>

            {cdasEnv && accessFor && requestType && (
                <>
                    {/* 3. Select the SA user (Only for SA User) - Reordered as per instruction */}
                    {accessFor === 'SA User' && (
                        <div className="form-group">
                            <label>Select the SA user <span style={{ color: 'red' }}>*</span></label>
                            {!createNewSa && (
                                <select value={saUser} onChange={(e) => {
                                    setSaUser(e.target.value);
                                    if (e.target.value) setCreateNewSa(false);
                                }}>
                                    <option value="">-- Select --</option>
                                    <option value="CDAS_DRM_SA">CDAS_DRM_SA</option>
                                    <option value="CDAS_ODM_SA">CDAS_ODM_SA</option>
                                </select>
                            )}

                            {requestType !== 'Revoke Access' && !saUser && (
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={createNewSa}
                                            onChange={(e) => {
                                                setCreateNewSa(e.target.checked);
                                                if (e.target.checked) setSaUser('');
                                            }}
                                        />
                                        User not in list, Create New SA User
                                    </label>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Required RSA Version (SA User + Grant Access) */}
                    {accessFor === 'SA User' && requestType === 'Grant Access' && (
                        <div className="form-group">
                            <label>Required RSA Version <span style={{ color: 'red' }}>*</span></label>
                            <select value={rsaVersion} onChange={(e) => setRsaVersion(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="V1">V1</option>
                                <option value="V2">V2</option>
                            </select>
                        </div>
                    )}

                    {/* New SA User Details */}
                    {createNewSa && requestType !== 'Revoke Access' && accessFor === 'SA User' && (
                        <div className="nested-section">
                            <div className="form-group">
                                <label>Application name (user used to pull L3 data)</label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    value={saAppName}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                                        setSaAppName(val);
                                    }}
                                    placeholder="Max 10 chars, no special chars"
                                />
                                {saAppName && <small>Generated User: {getGeneratedSaName()}</small>}
                            </div>
                            <div className="form-group">
                                <label>Service Account Owner</label>
                                <input type="text" value={saOwner} onChange={(e) => setSaOwner(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Brief usecase of this user in application</label>
                                <textarea value={saUseCase} onChange={(e) => setSaUseCase(e.target.value)} />
                            </div>
                        </div>
                    )}

                    {accessFor && (
                        <div className="checkbox-group" style={{ marginBottom: '1.5rem' }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allStudies}
                                    onChange={(e) => setAllStudies(e.target.checked)}
                                />
                                All (all study access) & None (no study access)
                            </label>
                        </div>
                    )}

                    {/* 4. Requesting for Protocol/System ? - Hidden if All Studies is checked */}
                    {!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access') && (
                        <div className="form-group">
                            <label>Requesting for Protocol/System ? <span style={{ color: 'red' }}>*</span></label>
                            <select value={protocolOrSystem} onChange={(e) => setProtocolOrSystem(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Protocol">Protocol</option>
                                <option value="System">System</option>
                            </select>
                        </div>
                    )}

                    {/* All Studies Logic */}
                    {allStudies && (requestType === 'Grant Access' || (requestType === 'Revoke Access' && accessFor !== 'SA User')) && (
                        <div className="form-group">
                            <label>Select study access type <span style={{ color: 'red' }}>*</span></label>
                            <select
                                value={studyAccessType}
                                onChange={(e) => setStudyAccessType(e.target.value)}
                                disabled={accessFor === 'SA User' && requestType === 'Grant Access' && allStudies}
                            >
                                <option value="">-- Select --</option>
                                <option value="all study access">all study access</option>
                                <option value="no study access">no study access</option>
                            </select>
                        </div>
                    )}

                    {/* Grant Access + All Studies + All Study Access */}
                    {allStudies && requestType === 'Grant Access' && studyAccessType === 'all study access' && (
                        <div className="nested-section">
                            <div className="form-group">
                                <label>Select Role for all study <span style={{ color: 'red' }}>*</span></label>
                                <select value={allStudyRole} onChange={(e) => setAllStudyRole(e.target.value)}>
                                    <option value="">-- Select --</option>
                                    <option value="One Data Store Read Only Users (All Study)">One Data Store Read Only Users (All Study)</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {allStudyRole === 'Other' && (
                                <div className="form-group">
                                    <label>Provide Role for ALL Study (Note : role doesn't exist, ticket will be marked cancelled) <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" value={otherRoleName} onChange={(e) => setOtherRoleName(e.target.value)} />
                                </div>
                            )}

                            {(allStudyRole === 'Other' || allStudyRole === 'One Data Store Read Only Users (All Study)') && (
                                <div className="form-group">
                                    <label>Brief on the requested access (Note : It will be reviewed by Architects) <span style={{ color: 'red' }}>*</span></label>
                                    <textarea value={accessBrief} onChange={(e) => setAccessBrief(e.target.value)} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Grant Access + All Studies + No Study Access -> Reuse Provide Role */}
                    {allStudies && requestType === 'Grant Access' && studyAccessType === 'no study access' && (
                        <div className="form-group">
                            <label>Provide Role <span style={{ color: 'red' }}>*</span></label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="CDAS Business Admin">CDAS Business Admin</option>
                                <option value="CDAS One Data Store API Access">CDAS One Data Store API Access</option>
                                <option value="CDAS Super Admin">CDAS Super Admin</option>
                                <option value="CDAT Admin">CDAT Admin</option>
                                <option value="CDAT Programmer">CDAT Programmer</option>
                                <option value="CDAT QC-Review/Comments">CDAT QC-Review/Comments</option>
                            </select>
                        </div>
                    )}

                    {/* Revoke Access + All Studies + Any Study Access Type */}
                    {allStudies && requestType === 'Revoke Access' && studyAccessType && accessFor !== 'SA User' && (
                        <div className="form-group">
                            <label>Provide userid</label>
                            <input type="text" value={revokeUserId} onChange={(e) => setRevokeUserId(e.target.value)} />
                        </div>
                    )}

                    {/* 5. External Data Access - Only for User (not SA) and Grant Access - Not for All Studies */}
                    {!allStudies && accessFor !== 'SA User' && requestType === 'Grant Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System') && (
                        <div className="form-group">
                            <label>External Data Access <span style={{ color: 'red' }}>*</span></label>
                            <select value={externalData} onChange={(e) => setExternalData(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="yes">yes</option>
                                <option value="no">no</option>
                            </select>

                            {externalData === 'yes' && (
                                <div className="nested-section">
                                    <div className="checkbox-group">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={l2DataAccess}
                                                onChange={(e) => setL2DataAccess(e.target.checked)}
                                            />
                                            Requires L2 data access (i.e, direct data access from machine) (Note : if already have L2 access, leave it uncheck)
                                        </label>
                                    </div>

                                    {l2DataAccess && (
                                        <>
                                            <div className="form-group">
                                                <label>Provide Risk RITM (Note : Risk RITM should be marked closed or ticket will be marked cancelled)</label>
                                                <input type="text" value={riskRitm} onChange={(e) => setRiskRitm(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <label>Requesting Access till (Note : Approval end date)</label>
                                                <input type="date" value={accessEndDate} onChange={(e) => setAccessEndDate(e.target.value)} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* 6. Provide System Number */}
                    {!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access') && protocolOrSystem === 'System' && (
                        <div className="form-group">
                            <label>Provide System Number <span style={{ color: 'red' }}>*</span></label>
                            {!createNewSystem && (
                                <>
                                    <select value={systemNumber} onChange={handleSystemChange}>
                                        <option value="">-- Select --</option>
                                        <option value="IQBBDWRPT">IQBBDWRPT</option>
                                        <option value="TMDHRPT">TMDHRPT</option>
                                        <option value="CDAS_DEW">CDAS_DEW</option>
                                        <option value="MDMFEEDS">MDMFEEDS</option>
                                        <option value="CISYS_CDI">CISYS_CDI</option>
                                    </select>
                                    <div className="chip-container">
                                        {selectedSystems.map(sys => (
                                            <div key={sys} className="chip">
                                                {sys}
                                                <span className="chip-remove" onClick={() => removeSystem(sys)}>×</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {requestType !== 'Revoke Access' && selectedSystems.length === 0 && (
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={createNewSystem}
                                            onChange={(e) => {
                                                setCreateNewSystem(e.target.checked);
                                                if (e.target.checked) {
                                                    setSystemNumber('');
                                                    setSelectedSystems([]);
                                                }
                                            }}
                                        />
                                        Create New - System
                                    </label>
                                </div>
                            )}

                            {createNewSystem && (
                                <input
                                    type="text"
                                    value={newSystemName}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (!val.startsWith('S_')) {
                                            setNewSystemName(val);
                                        }
                                    }}
                                    placeholder="Enter System Name (Cannot start with 'S_')"
                                />
                            )}
                        </div>
                    )}

                    {/* 6. Provide Protocol Number */}
                    {!allStudies && (requestType === 'Grant Access' || requestType === 'Revoke Access') && protocolOrSystem === 'Protocol' && (
                        <div className="form-group">
                            <label>Provide Protocol Number <span style={{ color: 'red' }}>*</span></label>
                            {!createNewProtocol && (
                                <>
                                    <select value={protocolNumber} onChange={handleProtocolChange}>
                                        <option value="">-- Select --</option>
                                        <option value="01-02-TL-013-002">01-02-TL-013-002</option>
                                        <option value="01-02-TL-013-003">01-02-TL-013-003</option>
                                        <option value="01-02-TL-070-002">01-02-TL-070-002</option>
                                        <option value="01-02-TL-242-002">01-02-TL-242-002</option>
                                        <option value="01-02-TL-370-007">01-02-TL-370-007</option>
                                        <option value="01-02-TL-559-013">01-02-TL-559-013</option>
                                    </select>
                                    <div className="chip-container">
                                        {selectedProtocols.map(proto => (
                                            <div key={proto} className="chip">
                                                {proto}
                                                <span className="chip-remove" onClick={() => removeProtocol(proto)}>×</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {requestType !== 'Revoke Access' && selectedProtocols.length === 0 && (
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={createNewProtocol}
                                            onChange={(e) => {
                                                setCreateNewProtocol(e.target.checked);
                                                if (e.target.checked) {
                                                    setProtocolNumber('');
                                                    setSelectedProtocols([]);
                                                }
                                            }}
                                        />
                                        Create New - NON MDM Study
                                    </label>
                                </div>
                            )}

                            {createNewProtocol && (
                                <div className="nested-section">
                                    <input
                                        type="text"
                                        value={newProtocolName}
                                        onChange={(e) => setNewProtocolName(e.target.value)}
                                        placeholder="New Protocol name to onboard on CDAS Platform"
                                    />

                                    <div className="form-group">
                                        <label>Sponsor name</label>
                                        {!createNewSponsor && (
                                            <select value={sponsorName} onChange={(e) => {
                                                setSponsorName(e.target.value);
                                                if (e.target.value) setCreateNewSponsor(false);
                                            }}>
                                                <option value="">-- Select --</option>
                                                <option value="MARINUS  [US]">MARINUS  [US]</option>
                                                <option value="TENACIA  [CN]">TENACIA  [CN]</option>
                                                <option value="LUNDBECK  [ES]">LUNDBECK  [ES]</option>
                                                <option value="GLAXOSMITHKLINE  [BE]">GLAXOSMITHKLINE  [BE]</option>
                                                <option value="Shire Pharmaceuticals">Shire Pharmaceuticals</option>
                                                <option value="Biogen-US">Biogen-US</option>
                                                <option value="Biogen Idec">Biogen Idec</option>
                                                <option value="BIOGEN HQ  [US]">BIOGEN HQ  [US]</option>
                                                <option value="GlaxoSmithKline Research and Development">GlaxoSmithKline Research and Development</option>
                                                <option value="MERCK & CO  [US]">MERCK & CO  [US]</option>
                                                <option value="BOEHRINGER INGELHEIM">BOEHRINGER INGELHEIM</option>
                                                <option value="Abbott Vascular">Abbott Vascular</option>
                                            </select>
                                        )}

                                        {!sponsorName && (
                                            <div className="checkbox-group">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={createNewSponsor}
                                                        onChange={(e) => {
                                                            setCreateNewSponsor(e.target.checked);
                                                            if (e.target.checked) setSponsorName('');
                                                        }}
                                                    />
                                                    Create New - Sponsor for NON MDM Study Only.
                                                </label>
                                            </div>
                                        )}

                                        {createNewSponsor && (
                                            <input
                                                type="text"
                                                value={newSponsorName}
                                                onChange={(e) => setNewSponsorName(e.target.value)}
                                                placeholder="Enter Sponsor Name"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 7. Provide Role (For User only) - Not for All Studies (handled separately) */}
                    {!allStudies && accessFor === 'User' && requestType === 'Grant Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System') && (
                        <div className="form-group">
                            <label>Provide Role <span style={{ color: 'red' }}>*</span></label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="CDAS Business Admin">CDAS Business Admin</option>
                                <option value="CDAS One Data Store API Access">CDAS One Data Store API Access</option>
                                <option value="CDAS Super Admin">CDAS Super Admin</option>
                                <option value="CDAT Admin">CDAT Admin</option>
                                <option value="CDAT Programmer">CDAT Programmer</option>
                                <option value="CDAT QC-Review/Comments">CDAT QC-Review/Comments</option>
                            </select>
                        </div>
                    )}

                    {/* DTL/CPM Approval - For User, Grant Access, Protocol/System */}
                    {!allStudies && accessFor === 'User' && requestType === 'Grant Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System') && (
                        <div className="form-group">
                            <label>Do you have a DTL/CPM for approval ? <span style={{ color: 'red' }}>*</span></label>
                            <select value={hasDtlCpm} onChange={(e) => setHasDtlCpm(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>

                            {hasDtlCpm === 'Yes' && (
                                <div className="nested-section">
                                    <div className="form-group">
                                        <label>Select study DTL/CPM for approval.</label>
                                        <input type="text" value={dtlCpmEmail} onChange={(e) => setDtlCpmEmail(e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 7. Provide SA User Role (For SA User, Grant Access, System) */}
                    {!allStudies && accessFor === 'SA User' && requestType === 'Grant Access' && protocolOrSystem === 'System' && (
                        <div className="form-group">
                            <label>Provide SA User Role <span style={{ color: 'red' }}>*</span></label>
                            <select value={saUserRole} onChange={(e) => setSaUserRole(e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Read-Only Access Role">Read-Only Access Role</option>
                                <option value="Read-Write Access Role">Read-Write Access Role</option>
                            </select>
                        </div>
                    )}

                    {/* 7. Revoke only "External Data access" ? */}
                    {!allStudies && requestType === 'Revoke Access' && (protocolOrSystem === 'Protocol' || protocolOrSystem === 'System') && (
                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={revokeExternalData}
                                    onChange={(e) => setRevokeExternalData(e.target.checked)}
                                />
                                Revoke only "External Data access" ?
                            </label>
                        </div>
                    )}

                    <div className="form-actions">
                        <button className="reset-btn" onClick={handleReset}>Reset</button>
                        <button className="submit-btn" onClick={handleSubmit}>Submit Request</button>
                    </div>
                </>
            )
            }
        </div >
    );
};

export default AccessRequestForm;
