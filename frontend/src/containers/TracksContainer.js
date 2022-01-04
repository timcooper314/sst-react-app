import React from "react";
import { useState, useEffect } from 'react';
import Header from './../components/Header';
import Tracks from './../components/Tracks';
import { API } from "aws-amplify";

export default function TracksContainer() {
    const [showTracks, setShowTracks] = useState(false)
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        const getTracks = async () => {
            const tracksFromCloud = await fetchTracks()
            setTracks(tracksFromCloud)
        }
        getTracks()
    }, [])

    const fetchTracks = async () => {
        console.log("Fetching data...")
        return API.get("tracks", "/tracks")
    }

    return (
        <div className="container">
            <Header
                onAdd={() => setShowTracks(!showTracks)}
                showAdd={showTracks}
            />
            {showTracks && <Tracks tracks={tracks} />}
        </div>
    );
}
