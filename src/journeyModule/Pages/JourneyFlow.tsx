// import React from 'react'
// import Navbar from '../Navbar'

// const JourneyFlow = () => {
//   return (
//     <div>
//     {/* <Navbar /> */}

//     </div>
//   )
// }

// export default JourneyFlow



import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import TriggerSetup from '../Components/TriggerSetup'
import Navbar from '../Components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DnDFlow from '../DragAndDrop'

const JourneyFlow = () => {
  const location = useLocation();

  // Check if the current path matches '/chooseTemplate/journeyFlow/triggerSetup'
  const isTriggerSetupPath = location.pathname === '/chooseTemplate/journeyFlow/triggerSetup';

  // Check if the current path matches '/chooseTemplate/journeyFlow/triggerSetup/journey'
  const isDnDFlowPath = location.pathname === '/chooseTemplate/journeyFlow/triggerSetup/journey';
  const [dnd, setDnD] = useState();
  const handleComponent = (triggerDnd: any) => {
    setDnD(triggerDnd)
    // alert(dnd)
  }


  const [journeyName, setJourneyName] = useState();
  const updateJourneyName = (journeyName: any) => {
    setJourneyName(journeyName)
    // alert(journeyName)
    console.log(journeyName)
  }
  const [segmentName, setSegmentName] = useState();
  const segmentNameHandle = (segmentName: any) => {
    setSegmentName(segmentName)
  }

  const checkFields = (checkField: any) => {
    // alert(JSON.stringify(checkField))
  }
  return (
    <div>
      <Navbar handleComponent={handleComponent} journeyName={journeyName} segmentName={segmentName} checkFields={checkFields} />
      {/* {isTriggerSetupPath && <TriggerSetup  />} */}
      {/* <DnDFlow  /> */}
      {dnd ? <DnDFlow /> : <TriggerSetup updateJourneyName={updateJourneyName} segmentNameProps={segmentNameHandle} />}
    </div>
  )
}

export default JourneyFlow
