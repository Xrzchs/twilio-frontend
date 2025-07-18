import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const getToken = async () => {
    try {
      const response = await fetch('https://twilio-backend-production-9bb5.up.railway.app/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'user' })
      });

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        setError('');
      } else {
        setError('No token received');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch token');
    }
  };

  return (
    <div>
      <h1>Twilio Web Calling App</h1>
      <button onClick={getToken}>Get Access Token</button>
      {token && <p>Token received! Ready to call.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
