let accessToken;
const redirectUrl = "http://localhost:3000/";
const clientID = "5f82ee64102a46cc97a5a58eb698b777";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            //setting access token and expiry time variables
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            //setting the function which will reet the access token when it expires
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            //clearing the URL when the access token expires
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        //third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;

        window.location = redirect;

    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
            if (!response.ok) {
                console.error(`Request failed with status ${response.status}`);
                return [];
            }
            return response.json();
        })
        .then((jsonResponse) => {
            if (!jsonResponse.tracks || !jsonResponse.tracks.items) {
                console.error("No tracks found or tracks are undefined");
                return [];
            }
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,
            }));
        })
        .catch((error) => {
            console.error("Network or other error occurred:", error);
            return [];
        });
        
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris || trackUris === 0) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        return fetch('https://api.spotify.com/v1/me', {headers: header})
        .then((response) => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: 'post',
                body: JSON.stringify({name: name}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: header,
                    method: 'post',
                    body: JSON.stringify({uris: trackUris})
                })
            });

        });

},

};

export {Spotify};