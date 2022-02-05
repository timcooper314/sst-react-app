import React from "react";
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TracksList from '../components/TracksList';
import { API } from "aws-amplify";

export default function Tracks() {
    const [trackDates, setTrackDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(trackDates[0]);
    const [showTracks, setShowTracks] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get the dates only once:
    useEffect(() => {
        const getTrackDates = async () => {
            const trackDatesFromCloud = await fetchTrackDates()
            setTrackDates(trackDatesFromCloud)
            console.log("Setting default date: " + trackDatesFromCloud[0])
            setSelectedDate(trackDatesFromCloud[0])
        }
        getTrackDates()
    }, []);

    const fetchTrackDates = async () => {
        console.log("Fetching track dates data...")
        setIsLoading(true);
        return API.get("topmusic", "/topmusic/tracks/dates");
    }

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
        return API.get("topmusic", "/topmusic/tracks");
    }

    return (
        <div className="container">
            <Header
                endpointText={"Tracks"}
                onAdd={() => setShowTracks(!showTracks)}
                showAdd={showTracks}
                isLoading={isLoading}
                datesList={trackDates}
                onDateSelect={(date) => setSelectedDate(date)}
                selectedDate={selectedDate}
            />
            {showTracks && <TracksList tracks={tracks} />}
        </div>
    );
}
