import React, { Suspense } from 'react';
import Scene from './components/Scene/Scene';
import HUD from './components/HUD/HUD';

function App() {
  return (
    <main style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Suspense fallback={
        <div style={{
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: '#02040F'
        }}>
          LOADING SYSTEM...
        </div>
      }>
        <Scene />
      </Suspense>

      <HUD />
    </main>
  );
}

export default App;
