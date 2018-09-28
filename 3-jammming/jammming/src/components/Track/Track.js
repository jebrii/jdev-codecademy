import React from 'react';

import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    if (this.props.onAdd) {
      this.props.onAdd(this.props.track);
    } else {
      console.log('whoopsie onAdd (from Track.js)');
    }
  }

  removeTrack() {
    if (this.props.onRemove) {
      this.props.onRemove(this.props.track);
    } else {
      console.log('whoopsie onRemovme (from Track.js)');
    }
  }

  renderAction() {
    let newTrackAction = this.props.isRemoval ? '-' : '+';
    this.setState({ trackAction: newTrackAction });
  }


  render() {
    let trackActionIcon;
    if (this.props.isRemoval) {
      trackActionIcon = <a className="Track-action" onClick={this.removeTrack}> - </a>;
    } else if (this.props.isRemoval === false) {
      trackActionIcon = <a className="Track-action" onClick={this.addTrack}> + </a>;
    } else {
      trackActionIcon = <p>Whoops!</p>
    }
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {trackActionIcon}
      </div>
    );
  }
}
