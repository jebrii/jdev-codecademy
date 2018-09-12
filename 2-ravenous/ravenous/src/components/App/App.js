import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';

// Components
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../BusinessList/BusinessList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar />
        <BusinessList />
    </div>
    );
  }
}

export default App;
