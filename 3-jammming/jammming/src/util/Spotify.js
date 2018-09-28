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
    } else {
      window.location(`https://accounts.spotify.com/authorize?client_id=${creds.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`);
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }
  },
  search(term) {
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).map(function(track) {
      return {
        id: track.id,
        name: track.name,
        artist: track.artist[0].name,
        album: track.album.name,
        uri: track.uri
      };
    })
  }
};
