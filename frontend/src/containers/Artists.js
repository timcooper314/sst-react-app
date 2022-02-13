import React from "react";
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ArtistsList from '../components/ArtistsList';
import { API } from "aws-amplify";

export default function Artists() {
    const [artistDates, setArtistDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(artistDates[0]);
    const [selectedTimeRange, setSelectedTimeRange] = useState("short_term")
    const [showArtists, setShowArtists] = useState(false);
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Refetch the dates when selectedTimeRange changes:
    useEffect(() => {
        const getArtistDates = async (timeRange) => {
            const artistDatesFromCloud = await fetchArtistDates(timeRange)
            setArtistDates(artistDatesFromCloud)
            console.log("Setting default date: " + artistDatesFromCloud[0])
            setSelectedDate(artistDatesFromCloud[0])
        }
        getArtistDates(selectedTimeRange)
    }, [selectedTimeRange]);

    const fetchArtistDates = async (timeRange) => {
        console.log("Fetching artist dates data for time range " + timeRange)
        setIsLoading(true);
        const endpoint = "/topmusic/dates/artists/" + timeRange
        console.log("Hitting endpoint " + endpoint)
        return API.get("topmusic", endpoint);
    }

    // Refetch artists when selectedDate changes
    useEffect(() => {
        console.log("Selected date: " + selectedDate)
        console.log("Selected time range: " + selectedTimeRange)
        const getArtists = async (date, timeRange) => {
            const artistsFromCloud = await fetchArtists(date, timeRange)
            setArtists(artistsFromCloud)
            setIsLoading(false);
        }
        getArtists(selectedDate, selectedTimeRange)
    }, [selectedDate, selectedTimeRange]);

    const fetchArtists = async (date, timeRange) => {
        setIsLoading(true);
        const endpoint = "/topmusic/artists/"+ timeRange + "/" + date
        console.log("Hitting endpoint " + endpoint)
        return API.get("topmusic", endpoint);
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
                onTimeRangeSelect={(timeRange) => setSelectedTimeRange(timeRange)}
                selectedTimeRange={selectedTimeRange}
            />
            {showArtists && <ArtistsList artists={artists} />}
        </div>
    );
}
