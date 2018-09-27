import React from 'react';

import './TrackList.css';

import { Track } from '../Track/Track';

const searchResults= [
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
