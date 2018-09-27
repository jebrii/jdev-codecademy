import React from 'react';

import './Playlist.css';

import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  render() {
    return(
      <div className="Playlist">
        <input defaultValue={this.props.name}/>
        <TrackList tracks={this.props.tracks} />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
