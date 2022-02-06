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
        return API.get("topmusic", "/topmusic/dates/tracks");
    }
    // Refetch tracks when selectedDate changes
    useEffect(() => {
        setSelectedDate(selectedDate)
        console.log("Selected date: " + selectedDate)
        const getTracks = async (date) => {
            const tracksFromCloud = await fetchTracks(date)
            setTracks(tracksFromCloud)
            setIsLoading(false);
        }
        getTracks(selectedDate)
    }, [selectedDate]);

    const fetchTracks = async (date) => {
        console.log("Fetching data for date " + date + "...")
        setIsLoading(true);
        return API.get("topmusic", "/topmusic/tracks/" + date);
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
