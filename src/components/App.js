import React, { useState } from 'react';
import ImageCanvas from './ImageCanvas';

const App = () => {
  const [filter, setFilter] = useState('default');

  return (
    <div className="container" style={{ padding: '1.2rem' }}>
      <h2 align="center">show all 15bit RGB colours!</h2>

      <div align="center">
        <button className="button" onClick={() => setFilter('default')}>
          Default
        </button>
        <button className="button" onClick={() => setFilter('shuffle1')}>
          Shuffle1
        </button>
        <button className="button" onClick={() => setFilter('shuffle2')}>
          Shuffle2
        </button>
        <button className="button" onClick={() => setFilter('shuffle3')}>
          Shuffle3
        </button>
      </div>

      <p align="center">
        <ImageCanvas width={256} height={128} filter={filter} />
      </p>
    </div>
  );
};

export default App;
