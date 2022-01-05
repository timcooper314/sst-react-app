import React from "react";
import ListGroup from "react-bootstrap/ListGroup";


const TracksList = ({ tracks }) => {
    return (
        <>
            {tracks.map((track, index) => (
                <ListGroup.Item action>
                    <span className="font-weight-bold">
                        {index + 1 + ". " + track.track}
                    </span>
                    <br />
                    <span className="text-muted">
                        {track.artist}
                    </span>
                </ListGroup.Item>
            ))}
        </>
    )
}


export default TracksList
