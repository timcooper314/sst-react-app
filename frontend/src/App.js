import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tracks from './components/Tracks'


const App = () => {
  const [showTracks, setShowTracks] = useState(false)
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    const getTracks = async () => {
      const tracksFromCloud = await fetchTracks()
      setTracks(tracksFromCloud)
    }
    getTracks()
  }, [])

  const fetchTracks = async () => {
    console.log("Fetching data...")
    //console.log(process.env.REACT_APP_TRACKS_DATA_ENDPOINT)
    //const res = await fetch(process.env.REACT_APP_TRACKS_DATA_ENDPOINT)
    //     "https://ty7o2tnjk7.execute-api.ap-southeast-2.amazonaws.com/prod/")
    // const data = await res.json()
    // return data
    return [{
      id: 1,
      artist: "artist_x",
      track: "track_x"
    },
    {
      id: 2,
      artist: "artist_y",
      track: "track_y"
    }
    ]
  }
  return (
    <div className="container">
      <Header
        onAdd={() => setShowTracks(!showTracks)}
        showAdd={showTracks}
      />
      {showTracks && <Tracks tracks={tracks} />}
    </div>
  );
}

export default App;
