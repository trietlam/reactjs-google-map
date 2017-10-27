import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TCMapContainer} from './screens/TCMapContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to MyApp</h1>
        </header>        
        <TCMapContainer/>
      </div>
    );
  }
}

export default App;
