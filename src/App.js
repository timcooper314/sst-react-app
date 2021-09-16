import { useState } from 'react'
import Header from './components/Header'
import Tracks from './components/Tracks'

const App = () => {
  const [tracks, setTracks] = useState([
    {
        id: 1,
        artist: "artist_x",
        track: "track_x",
    },
    {
        id: 2,
        artist: "artist_y",
        track: "track_y",
    }
])
  return (
    <div className="container">
      <Header/>
      <Tracks tracks={tracks}/>
    </div>
  );
}

export default App;
