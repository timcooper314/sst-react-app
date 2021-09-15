import React from 'react'
import { useState } from 'react'
import Track from './Track'


const Tracks = () => {
    const [tracks, setTracks] = useState([
        {
            id: 1,
            artist: "x",
            track: "y",
        },
        {
            id: 2,
            artist: "a",
            track: "b",
        }
    ])
    return (
        <>
            {tracks.map((track) => (
                <h3 key={track.id}> {track.artist} </h3>
            ))}
        </>
    )
}


export default Tracks
