import React, {useState} from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/searchresults";
import Playlist from "../Playlist/playlist";
import SearchBar from "../SearchBar/searchbar";
import {Spotify} from "../util/spotify";


function App () {

  const [searchResults, setSearchResults] = useState([
    {
      name: "Example track name 1",
      artist: "Example track artist 1",
      album: "Example track album 1",
      id: 1,
    },
    {
      name: "Example track name 2",
      artist: "Example track artist 2",
      album: "Example track album 2",
      id: 2,
    }]
  );

  const [playlistName, setPlaylistName] = useState("Example playlist Name");

  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: "Example playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 1,
    },
    {
      name: "Example playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 2,
    },
    {
      name: "Example playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 3,
    }
  ]);

  function addTrack (track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track already exists")
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  function removeTrack(track) {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
      alert(`${playlistName} was added to your spotify account.`)
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        updatePlaylistName("New Playlist");
        setPlaylistTracks([]);
      });
    
     
  }

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  }

    return (
        <div>
        <h1>
          Riddi<span className={styles.highlight}>mmm</span>Selecta
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search}/>
          
          <div className={styles['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults userSearchResults={searchResults} onAdd={addTrack}/>
            {/* <!-- Add a Playlist component --> */}
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist}/>
          </div>
        </div>
      </div>
        );
}

export default App;