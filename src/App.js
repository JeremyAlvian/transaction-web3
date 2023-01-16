import { useState } from 'react';
import './App.css';
import Main from './Main/main';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Main accounts={accounts} setAccounts={setAccounts}/>
      </header>
    </div>
  );
}

export default App;
