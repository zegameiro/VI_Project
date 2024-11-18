import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as d3 from "d3";
import MapChart from './components/MapChart';
import './App.css'


function App() {

  const [count, setCount] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    d3.csv("../public/data/universal_top_spotify_songs.csv").then(data => {
      setData(data)
    })
  }, [])


  return (
    <>
      {data.length > 0 && (
        <div>
          <MapChart data={data} />
        </div>
      )}
    </>
  )
}

export default App
