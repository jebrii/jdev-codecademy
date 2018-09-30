import { creds } from './creds';

const redirectURI = 'http://localhost:3000/';
// TODO: add state generator here and recognizer in getAccessToken()
//const state = '';

// const params = ['client_id=' + creds.clientId, '&response_type=token', '&redirect_uri=' + redirectURI, '&state=' + state, '&show_dialog=false'];

let accessToken = '';
let expiresIn = 0;

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=[^&]*/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${creds.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  async search(term, cb) {
    if (!accessToken) {
      alert(`Access token: ${accessToken} is invalid!`);
    }
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed!');
      }
    }, networkError => {
      console.log(networkError.message);
    }).then(newTracks => newTracks.tracks.items.map((track) => {
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }
    })).then(data => cb(data));
  }
};
