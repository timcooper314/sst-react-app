import React from 'react'

const Track = ({ track }) => {
    return (
        <div className='track' key={track.id}>
            <h3>{track.track}</h3>
            <p>{track.artist}</p>
        </div>
    )
}

export default Track
