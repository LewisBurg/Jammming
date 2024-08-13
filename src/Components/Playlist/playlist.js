import React from "react";
import styles from "./playlist.module.css"
import Tracklist from "../Tracklist/tracklist";

function Playlist(props) {
  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} />

      {/* <!-- Add a TrackList component --> */}
      <Tracklist userSearchResults={props.playlistTracks} 
      onRemove={props.onRemove}
      isRemoval={true}/>

      <button className={styles["Playlist-save"]}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;