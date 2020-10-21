import React, { useState } from 'react';
import ImageCanvas from './ImageCanvas';

const App = () => {
  const [filter, setFilter] = useState('');

  return (
    <div className="container" style={{ padding: '1.2rem' }}>
      <h2 align="center">Image showing all 15bit RGB colours!</h2>
      <div align="center">
        <button className="button" onClick={() => setFilter('default')}>
          Default
        </button>
        <button className="button" onClick={() => setFilter('barShuffle')}>
          Bar Shuffle
        </button>
        <button className="button" onClick={() => setFilter('redShuffle')}>
          Red Shuffle
        </button>
        <button className="button" onClick={() => setFilter('randomShuffle')}>
          Random Shuffle
        </button>
      </div>

      <p align="center">
        <ImageCanvas width={512} height={256} pixel={4} filter={filter} />
      </p>
    </div>
  );
};

export default App;
