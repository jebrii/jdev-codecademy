import React, { Component } from 'react';
// import logo from '../../assets/logo.svg';
import './App.css';

// Components
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      accessToken: ''
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    // this.getAccessToken = this.getAccessToken.bind(this);
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
    Spotify.search(term, newTracks => {
      this.setState({ searchResults: newTracks });
    });

  }

  render() {
    Spotify.getAccessToken();
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
