import React from "react";
import ListGroup from "react-bootstrap/ListGroup";


const Tracks = ({ tracks }) => {
    return (
        <>
            {tracks.map((track) => (
                <ListGroup.Item action>
                    <span className="font-weight-bold">
                        {track.track}
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


export default Tracks
