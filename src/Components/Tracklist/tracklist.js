import React from "react";
import styles from "./tracklist.module.css";
import Track from "../Track/track";

function Tracklist (props) {
    return (
        <div className={styles.Tracklist}>
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        {props.userSearchResults.map(track => {
          return (
            <Track track={track} key={track.id}/>
          )
        })}
      </div>
    );
}

export default Tracklist;