import Track from './Track'


const Tracks = ({tracks}) => {
    return (
    <>
        {tracks.map((track) => (
            <Track key={track.id} track={track}/>
        ))}
    </>
    )
}


export default Tracks
