import React, { useState } from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/searchresults";
import Playlist from "../Playlist/playlist";
import SearchBar from "../SearchBar/searchbar";
import UserPlaylist from "../UserPlaylist/userplaylist";
import {Spotify} from "../util/spotify";

function App() {
  // State for storing the results from a search query
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
    },
  ]);

  // State for the name of the playlist being created or modified
  const [playlistName, setPlaylistName] = useState("Example playlist Name");

  // State for storing the filtered search results
  const [userSearchResults, setUserSearchResults] = useState([]);

  // State for storing the tracks currently in the playlist
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
  ]);

  // Function to add a track to the playlist
  function addTrack(track) {
    // Check if the track already exists in the playlist
    const existingTrack = playlistTracks.find((t) => t.id === track.id);

    if (existingTrack) {
      console.log("Track already exists");
    } else {
      // Add the track to the playlist using the spread operator
      const newTrackList = [...playlistTracks, track];
      setPlaylistTracks(newTrackList);

      // Filter out the added track from the search results
      const updatedSearchResults = userSearchResults.filter(
        (searchTrack) => searchTrack.id !== track.id
      );

      // Update the search results state
      setUserSearchResults(updatedSearchResults);
    }
  }

  // Function to remove a track from the playlist
  function removeTrack(track) {
    // Filter the playlist to exclude the track to be removed
    const updatedTrackList = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatedTrackList);
  }

  // Function to update the playlist name
  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  // Function to save the playlist to Spotify
  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri); // Map tracks to their URIs

  
    // Notify the user that the playlist has been saved (this line is for demonstration)
    alert(`${playlistName} was added to your Spotify account.`);

    // Call the Spotify API to save the playlist
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      // Reset playlist name and tracks after saving
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
      window.location.reload(); // Reload the page to show the updated user playlists
    });
  }

  // Function to search for tracks using the Spotify API
  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term); // Log the search term (for debugging)
  }



  // Call the renderUserPlaylists function inside the return statement
  return (
    <div>
      {/* Existing code */}
      <h1>
        Riddi<span className={styles.highlight}>mmm</span>Selecta
      </h1>
      <div className={styles.App}>
        {/* Existing code */}
        <SearchBar onSearch={search} />

        <div className={styles["App-playlist"]}>
          {/* Existing code */}
          <SearchResults userSearchResults={searchResults} onAdd={addTrack} />

          {/* Existing code */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
         
          <UserPlaylist className={styles["App-playlist"]}/>
         
          

        </div>
      </div>
    </div>
  );
}

export default App;
