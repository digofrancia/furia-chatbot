import React from 'react';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#000', background: '#fff', padding: '20px' }}>
        <img src="https://furiagg.fbitsstatic.net/sf/img/logo-furia.svg?theme=main&amp;v=202503171541" className="furia-logo" alt="Logo da Furia" fetchpriority="high">
        </img>
      </h1>
      <Chat />
    </div>
  );
}

export default App;