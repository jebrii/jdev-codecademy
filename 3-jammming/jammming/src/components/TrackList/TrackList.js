import React from 'react';

import './TrackList.css';

import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render() {
    if (this.props.tracks && this.props.isRemoval !== undefined) {
      return (
        <div className="TrackList">
          {this.props.tracks.map(track => (<Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />) )}
        </div>
      );
    } else if (this.props.tracks === undefined && this.props.isRemoval !== undefined) {
      return <h1>No tracks!</h1>;
    } else {
      return <h1>No isRemoval!</h1>;
    }
  }
}
