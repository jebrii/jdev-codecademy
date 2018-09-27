import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';

// Components
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          id: 1,
          name: 'song 1',
          artist: 'artist 1',
          album: 'album 1'
        },
        {
          id: 2,
          name: 'song 2',
          artist: 'artist 2',
          album: 'album 2'
        },
        {
          id: 3,
          name: 'song 3',
          artist: 'artist 3',
          album: 'album 3'
        },
        {
          id: 4,
          name: 'song 4',
          artist: 'artist 4',
          album: 'album 4'
        }
      ]
    };
  }
  render() {
    console.log('App state searchResults: ' + this.state.searchResults[0].name);
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
