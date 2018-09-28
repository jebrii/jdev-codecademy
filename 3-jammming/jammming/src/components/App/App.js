import React, { Component } from 'react';
// import logo from '../../assets/logo.svg';
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
          id: 0,
          name: 'song 1',
          artist: 'artist 1',
          album: 'album 1',
          uri: null
        },
        {
          id: 1,
          name: 'song 2',
          artist: 'artist 2',
          album: 'album 2',
          uri: null
        },
        {
          id: 2,
          name: 'song 3',
          artist: 'artist 3',
          album: 'album 3',
          uri: null
        },
        {
          id: 3,
          name: 'song 4',
          artist: 'artist 4',
          album: 'album 4',
          uri: null
        }
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        {
          id: 10,
          name: 'p song 1',
          artist: 'p artist 1',
          album: 'p album 1',
          uri: null
        },
        {
          id: 11,
          name: 'p song 2',
          artist: 'p artist 2',
          album: 'p album 2',
          uri: null
        },
        {
          id: 12,
          name: 'p song 3',
          artist: 'p artist 3',
          album: 'p album 3',
          uri: null
        },
        {
          id: 13,
          name: 'p song 4',
          artist: 'p artist 4',
          album: 'p album 4',
          uri: null
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (! this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      // Track id not already in playlist... add to end of state object
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      // Track id was found in list of tracks already in playlist... remove it
      this.setState({
        playlistTracks: this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
      });
    }
  }

  updatePlaylistName(name) {
    this.setState( { playlistName: name });
  }

  savePlaylist() {
    const trackURIs = [];
    this.state.playlistTracks.map(track => trackURIs.push(track.uri));
    // More stuff
    console.log('Playlist saved');
  }

  search(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} tracks={this.state.playlistTracks} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
