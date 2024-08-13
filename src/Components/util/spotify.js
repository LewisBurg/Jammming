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
            accessToken = tokenInURL;
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
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: {Authorization: `bearer ${accessToken}`},
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if (!jsonResponse) {
                console.error("Response error");
            }
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,

            }));
        });
    },
};

export {Spotify};