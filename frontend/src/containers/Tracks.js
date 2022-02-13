import React from "react";
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TracksList from '../components/TracksList';
import { API } from "aws-amplify";

export default function Tracks() {
    const [trackDates, setTrackDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(trackDates[0]);
    const [selectedTimeRange, setSelectedTimeRange] = useState("short_term")
    const [showTracks, setShowTracks] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Refetch the dates when selectedTimeRange changes:
    useEffect(() => {
        const getTrackDates = async (timeRange) => {
            const trackDatesFromCloud = await fetchTrackDates(timeRange)
            setTrackDates(trackDatesFromCloud)
            console.log("Setting default date: " + trackDatesFromCloud[0])
            setSelectedDate(trackDatesFromCloud[0])
        }
        getTrackDates(selectedTimeRange)
    }, [selectedTimeRange]);

    const fetchTrackDates = async (timeRange) => {
        console.log("Fetching track dates data for time range " + timeRange)
        setIsLoading(true);
        const endpoint = "/topmusic/dates/tracks/" + timeRange
        console.log("Hitting endpoint " + endpoint)
        return API.get("topmusic", endpoint);
    }

    // Refetch tracks when selectedDate changes
    useEffect(() => {
        setSelectedDate(selectedDate)
        console.log("Selected date: " + selectedDate)
        console.log("Selected time range: " + selectedTimeRange)
        const getTracks = async (date, timeRange) => {
            const tracksFromCloud = await fetchTracks(date, timeRange)
            setTracks(tracksFromCloud)
            setIsLoading(false);
        }
        getTracks(selectedDate, selectedTimeRange)
    }, [selectedDate, selectedTimeRange]);

    const fetchTracks = async (date, timeRange) => {
        setIsLoading(true);
        const endpoint = "/topmusic/tracks/"+ timeRange + "/" + date
        console.log("Hitting endpoint " + endpoint)
        return API.get("topmusic", endpoint);
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
                onTimeRangeSelect={(timeRange) => setSelectedTimeRange(timeRange)}
                selectedTimeRange={selectedTimeRange}
            />
            {showTracks && <TracksList tracks={tracks} />}
        </div>
    );
}
