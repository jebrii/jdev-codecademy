import React from 'react';

import './TrackList.css';

import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render() {
    if (this.props.tracks) {
      return (
        <div className="TrackList">
          {this.props.tracks.map(track => (<Track track={track} key={track.id} isRemoval={true} />) )}
        </div>
      );
    } else {
      return <h1>No tracks!</h1>;
    }
  }
}
