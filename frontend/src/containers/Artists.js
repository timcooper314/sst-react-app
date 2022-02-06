import React from "react";
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ArtistsList from '../components/ArtistsList';
import { API } from "aws-amplify";

export default function Artists() {
    const [artistDates, setArtistDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(artistDates[0]);
    const [showArtists, setShowArtists] = useState(false);
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get the dates only once:
    useEffect(() => {
        const getArtistDates = async () => {
            const artistDatesFromCloud = await fetchArtistDates()
            setArtistDates(artistDatesFromCloud)
            console.log("Setting default date: " + artistDatesFromCloud[0])
            setSelectedDate(artistDatesFromCloud[0])
        }
        getArtistDates()
    }, []);

    const fetchArtistDates = async () => {
        console.log("Fetching artist dates data...")
        setIsLoading(true);
        return API.get("topmusic", "/topmusic/dates/artists");
    }

    // Refetch artists when selectedDate changes
    useEffect(() => {
        console.log("Selected date: " + selectedDate)
        const getArtists = async (date) => {
            const artistsFromCloud = await fetchArtists(date)
            setArtists(artistsFromCloud)
            setIsLoading(false);
        }
        getArtists(selectedDate)
    }, [selectedDate]);

    const fetchArtists = async (date) => {
        console.log("Fetching data for date " + date + "...")
        setIsLoading(true);
        return API.get("topmusic", "/topmusic/artists/" + date);
    }

    return (
        <div className="container">
            <Header
                endpointText="Artists"
                onAdd={() => setShowArtists(!showArtists)}
                showAdd={showArtists}
                isLoading={isLoading}
                datesList={artistDates}
                onDateSelect={(date) => setSelectedDate(date)}
                selectedDate={selectedDate}
            />
            {showArtists && <ArtistsList artists={artists} />}
        </div>
    );
}
