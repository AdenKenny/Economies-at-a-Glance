import * as React from 'react';
import './App.css';

import DatabaseModule from './Modules/DatabaseModule';
import BarChart from './Components/BarChart';
import Home from './Pages/Home';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    
    const db = new DatabaseModule();
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Economies at a Glance</h1>
        </header>
        
        <Home db={db}> </Home>

      </div>
    );
  }
  
}

export default App;
