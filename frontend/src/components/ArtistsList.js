import React from "react";
import ListGroup from "react-bootstrap/ListGroup";


const ArtistsList = ({ artists }) => {
    return (
        <>
            {artists.map((artist, index) => (
                <ListGroup.Item action>
                    <span className="font-weight-bold">
                        {index + 1 + ". " + artist.artist}
                    </span>
                </ListGroup.Item>
            ))}
        </>
    )
}


export default ArtistsList
