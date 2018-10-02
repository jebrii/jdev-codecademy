import React from 'react';

import './Playlist.css';

import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleNameChange} />
        <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} isRemoval={true} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE</a>
      </div>
    );
  }
}
