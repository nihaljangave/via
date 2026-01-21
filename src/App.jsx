import React, { useState } from 'react';
import AccessRequestForm from './AccessRequestForm';
import RdsCdasRequestForm from './RdsCdasRequestForm';
import RdsCdasIncidentForm from './RdsCdasIncidentForm';
import LandingPage from './LandingPage';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="App">
      {currentView === 'landing' && <LandingPage onNavigate={setCurrentView} />}
      {currentView === 'cdas-form' && <AccessRequestForm onBack={() => setCurrentView('landing')} />}
      {currentView === 'rds-cdas-form' && <RdsCdasRequestForm onBack={() => setCurrentView('landing')} />}
      {currentView === 'rds-cdas-incident' && <RdsCdasIncidentForm onBack={() => setCurrentView('landing')} />}
    </div>
  );
}

export default App;
