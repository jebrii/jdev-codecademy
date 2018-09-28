import React from 'react';

import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackAction: '+',
      trackName: this.props.track.name,
      trackArtist: this.props.track.artist,
      trackAlbum: this.props.track.album
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack() {
    if (this.props.onAdd) {
      this.props.onAdd(this.props.track);
    } else {
      console.log('whoops (from Track.js)');
    }
  }

  renderAction() {
    let newTrackAction = this.props.isRemoval ? '-' : '+';
    this.setState({ trackAction: newTrackAction });
  }


  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.state.trackName}</h3>
          <p>{this.state.trackArtist} | {this.state.trackAlbum}</p>
        </div>
        <a className="Track-action" onClick={this.addTrack}>{this.state.trackAction}</a>
      </div>
    );
  }
}
