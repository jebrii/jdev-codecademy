import querystring from 'query-string';
import { creds } from './creds';

const redirectURI = 'http://localhost:3000/';
const url = 'https://accounts.spotify.com/authorize?';
const state = '';
const params = ['client_id=' + creds.clientId, '&response_type=token', '&redirect_uri=' + redirectURI, '&state=' + state, '&show_dialog=false'];

const accessToken;
const expiresIn;

/*
client_id	Required.
The client ID provided to you by Spotify when you register your application.

response_type	Required.
Set it to “token”.

redirect_uri	Required.
The URI to redirect to after the user grants/denies permission. This URI needs to be entered in the URI whitelist that you specify when you register your application.

state	Optional,
but strongly recommended. The state can be useful for correlating requests and responses. Because your redirect_uri can be guessed, using a state value can increase /
your assurance that an incoming connection is the result of an authentication request. If you generate a random string or encode the hash of some client state (e.g., /
a cookie) in this state variable, you can validate the response to additionally ensure that the request and response originated in the same browser. This provides /
protection against attacks such as cross-site request forgery. See RFC-6749.

scope	Optional.
A space-separated list of scopes: see Using Scopes.

show_dialog	Optional.
Whether or not to force the user to approve the app again if they’ve already done so. If false (default), a user who has already approved the application may be /
automatically redirected to the URI specified by redirect_uri. If true, the user will not be automatically redirected and will have to approve the app again.
*/

const Spotify = {
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
  }
};

export default Spotify;
