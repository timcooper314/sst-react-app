import React from "react";
import { useState, useEffect } from 'react';
import Header from './../components/Header';
import TracksList from './../components/TracksList';
import { API } from "aws-amplify";

export default function Tracks() {
    const [showTracks, setShowTracks] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTracks = async () => {
            const tracksFromCloud = await fetchTracks()
            setTracks(tracksFromCloud)
            setIsLoading(false);
        }
        getTracks()
    }, []);

    const fetchTracks = async () => {
        console.log("Fetching data...")
        setIsLoading(true);
        return API.get("tracks", "/tracks");
    }

    return (
        <div className="container">
            <Header
                onAdd={() => setShowTracks(!showTracks)}
                showAdd={showTracks}
                isLoading={isLoading}
            />
            {showTracks && <TracksList tracks={tracks} />}
        </div>
    );
}
