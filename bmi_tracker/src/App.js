import React from 'react';
import './App.css';
import BMITracker from './BMITracker';

// Main App wraps the BMITracker container in the overall app shell
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" tabIndex={-1} style={{ pointerEvents: "none", opacity: 0.62 }}>Template Button</button>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BMITracker />
        </div>
      </main>
    </div>
  );
}

export default App;