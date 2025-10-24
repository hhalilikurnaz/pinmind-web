import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1C1C1C 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#EDEDED'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉 Çalışıyor!</h1>
        <p style={{ fontSize: '1.5rem' }}>Vite + React başarıyla yüklendi</p>
      </div>
    </div>
  );
};

export default TestPage;
