import React, { useState, useEffect } from 'react';
import { Spotify } from '../util/spotify';
import styles from './userplaylist.module.css';



const UserPlaylist = () => {
    // State for storing the user's playlists
    const [userPlaylists, setUserPlaylists] = useState([]);

    // Function to fetch the user's playlists from Spotify
    function fetchUserPlaylists() {
        Spotify.getUserPlaylists().then((playlists) => {
            setUserPlaylists(playlists);
        });
    }

    // Function to delete a playlist from the user's Spotify account
    function deletePlaylist(playlistId) {
        Spotify.deletePlaylist(playlistId).then(() => {
            // Remove the deleted playlist from the state
            setUserPlaylists((prevPlaylists) =>
                prevPlaylists.filter((playlist) => playlist.id !== playlistId)
            );
        });
    }

    // Fetch the user's playlists when the component mounts
    useEffect(() => {
        fetchUserPlaylists();
    }, []);

    // Render the user's playlists in one box
    const renderUserPlaylists = () => {
        return (
            <div className={styles.Playlist}>
                {userPlaylists.map((playlist) => (
                    <div key={playlist.id}>
                        <h3>{playlist.name} <button className={styles.deleteplaylist} onClick={() => deletePlaylist(playlist.id)}>-</button></h3>
                        <p>{playlist.description}</p>
                        
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {renderUserPlaylists()}
            {/* Add any additional components or elements here */}
        </div>
    );
};

export default UserPlaylist;