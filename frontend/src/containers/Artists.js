import React from "react";
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ArtistsList from '../components/ArtistsList';
import { API } from "aws-amplify";

export default function Artists() {
    const [showArtists, setShowArtists] = useState(false);
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getArtists = async () => {
            const ArtistsFromCloud = await fetchArtists()
            setArtists(ArtistsFromCloud)
            setIsLoading(false);
        }
        getArtists()
    }, []);

    const fetchArtists = async () => {
        console.log("Fetching data...")
        setIsLoading(true);
        return API.get("topmusic", "/topmusic/artists");
    }

    return (
        <div className="container">
            <Header
                endpointText="Artists"
                onAdd={() => setShowArtists(!showArtists)}
                showAdd={showArtists}
                isLoading={isLoading}
            />
            {showArtists && <ArtistsList artists={artists} />}
        </div>
    );
}
