import './App.css';
import React, { useState, useEffect } from 'react';
import Pages from './Pages/Pages';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simulate a loading state
      const timer = setTimeout(() => {
          setLoading(false);
      }, 2000); // Change this duration as needed

      return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="center-main-loader">
          <div className="main-loader"></div>
        </div>
      )}
      <Pages />
    </div>
  );
}

export default App;
