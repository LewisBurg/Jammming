import React, { useState, useEffect } from 'react';
import {Spotify} from '../util/spotify';
import styles from './userplaylist.module.css';
import { useAuth } from '../util/auth';



const UserPlaylist = () => {
    const { isAuthenticated } = useAuth();

    // State for storing the user's playlists
    const [userPlaylists, setUserPlaylists] = useState([]);

    // Function to fetch the user's playlists from Spotify
    function fetchUserPlaylists() {
        Spotify.getUserPlaylists().then((playlists) => {
            setUserPlaylists(playlists);
        });
    }

    // Fetch the user's playlists when the component mounts
    useEffect(() => {
        if (isAuthenticated) {
            fetchUserPlaylists();
        }
    }, [isAuthenticated]);

    // Render the user's playlists in one box
    const renderUserPlaylists = () => {
        return (
            <div className={styles.Playlist}>
                {userPlaylists.map((playlist) => (
                    <div key={playlist.id} >
                        <h3>{playlist.name}</h3>
                        <p>{playlist.description}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {isAuthenticated && renderUserPlaylists()}
            {/* Add any additional components or elements here */}
        </div>
    );
};

export default UserPlaylist;