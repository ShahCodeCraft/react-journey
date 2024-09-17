import { useState } from 'react'

import './App.css'
import BannerPage from './journeyModule/Pages/BannerPage'
import JourneyRouting from './journeyRouting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <JourneyRouting />
    </>
  )
}

export default App
