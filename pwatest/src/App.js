import './App.css';
import { useState } from 'react';

function App() {
  let [name, setName] = useState('');

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
}

export default App;
