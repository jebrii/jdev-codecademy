import { creds } from './creds';

const redirectURI = 'http://localhost:3000/';

let accessToken = '';
let expiresIn = 0;

export const Spotify = {
  getAccessToken(cb) {
    if (accessToken) {
      return accessToken;
    } else if (window.location.href.match(/access_token=[^&]*/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${creds.clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
    }
    this.getUser(userJson => {
      if (cb) {
        cb(userJson.display_name);
      }
    });
  },

  search(term, cb) {
    if (term) {
      if (!accessToken) {
        alert(`Access token: ${accessToken} is invalid!`);
      } else {
        try  {
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
        } catch(error) {
          alert(error);
        }
      }
    }
    return;
  },

  getUser(cb) {
    try {
      return fetch('https://api.spotify.com/v1/me', {
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
      }).then(responseJson => {
        cb(responseJson);
      });
    } catch(error) {
      alert(error);
    }
  },

  createPlaylist(userId, playlistName, cb) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const body = {
      name: playlistName,
      public: false
    };
    try {
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed!');
        }
      }, networkError => {
        console.log(networkError.message);
      }).then(responseJson => {
        cb(responseJson.id);
      });
    } catch(error) {
      alert(error);
    }
  },

  addPlaylistTracks(playlistId, tracks) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
    const body = {
      uris: tracks
    };
    try {
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed!');
        }
      }, networkError => {
        console.log(networkError.message);
      }).then(() => {
        console.log('Playlists added successfully!');
        return;
      });
    } catch(error) {
      alert(error);
    }
  },

  savePlaylist(playlistName, tracks, cb) {
    try {
      if (playlistName.length > 0 && tracks.length > 0) {
        this.getUser((userJson) => {
          this.createPlaylist(userJson.id, playlistName, (playlistId) => {
            this.addPlaylistTracks(playlistId, tracks);
          });
        }).then(cb());
      } else {
        throw new Error('Could not create playlist!');
      }
    } catch(error) {
      alert(error);
    }
  }
};
