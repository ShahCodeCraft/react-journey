import React, { DragEvent, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

import HandlesPort from '../NodeHandles/HandlesPort';
import SmsHandlePort from '../NodeHandles/SmsHandlePort';
import WhatsappHandlePort from '../NodeHandles/WhatsappHandlePort';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faComments, faBell, faClock, } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faArrowRightToBracket, faArrowsSplitUpAndLeft, faBoltLightning, faGear } from '@fortawesome/free-solid-svg-icons';
import StartHandlesPort from '../NodeHandles/StartHandlePort';
import EndHandlesPort from '../NodeHandles/EndHandlePort';
import WebPushHandlePort from '../NodeHandles/WebPushHandlePort';
import DelayHandlePort from '../NodeHandles/DelayHandlePort';
import TriggerHandlePort from '../NodeHandles/TriggerHandlePort';
import { useSelector } from 'react-redux';
// import { faMicrophone } from '@fortawesome/free-soild-svg-icons'



// accordion mui imports
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
// import Sidebar0 from './Sidebar0';



// arrow mui close sidebar
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const nodeTypes: { [key: string]: React.FC } = { port: HandlesPort, sms: SmsHandlePort, whatsapp: WhatsappHandlePort };
const nodeTypes: { [key: string]: React.FC<any> } = {
  port: HandlesPort,
  sms: SmsHandlePort,
  whatsapp: WhatsappHandlePort,
  start: StartHandlesPort,
  end: EndHandlesPort,
  webPush: WebPushHandlePort,
  delay: DelayHandlePort,
  trigger: TriggerHandlePort,

};
interface SidebarProps {
  nodeName: string;
  setNodeName: (nodeName: string) => void;
  selectedNode: any; // Change 'any' to the correct type if possible
  setSelectedElements: (selectedElements: any[]) => void; // Change 'any' to the correct type if possible
  handleChange: (value: boolean) => void;

}

const Sidebar: React.FC<SidebarProps> = ({ nodeName, setNodeName, selectedNode, setSelectedElements, handleChange }) => {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string, title: string, description: string) => {
    // event.dataTransfer.setData('application/reactflow', nodeType);
    const data = JSON.stringify({ nodeType, title, description }); // Combine nodeType and title into a JSON string
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };
  const customColor = {
    background: "#FCFCFC"
  }


  // const nodeData = {
  //     type:"Emial",
  //     description:"this is the description"
  // }

  // State to track the increment
  const [incWhatsapp, setIncWhatsapp] = useState(0);
  const [incEmail, setIncEmail] = useState(0);
  const [incSms, setIncSms] = useState(0);
  const [incWebPush, setIncWebPush] = useState(0);
  const [incDelay, setIncDelay] = useState(0);

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    handleChange(clicked)
  };

  const setupCheck = useSelector((state: any) => state.data.setupfilledSlice.value);
  const setupId = useSelector((state: any) => state.data.setUpformDataIdSlice.value);


  const segmentNodeonPanel = useSelector((state: any) => state.data.segmentnodeTypeSlice.value)



  const segments = [
    { label: 'Action', icon: '🔧' },
    { label: 'Inaction', icon: '✈️' },
    { label: 'Past behavior', icon: '📄' },
    { label: 'Date time', icon: '📅' },
    { label: 'Journey Trigger', icon: '🔌' },
    { label: 'Custom list', icon: '📋' },
    { label: 'Page visit', icon: '🌐' },
    { label: 'Referrer entry', icon: '🔗' },
    { label: 'Page count', icon: '📄' },
  ];
  return (


    <aside className=" w-64 border-r min-h-screen overflow-y-scroll bg-white "
      style={customColor}
    >


      {/*  */}
      <div className='flex justify-between items-center '>
        <h1 className=" "></h1>
        <span className="rounded-full mt-2 w-10 h-10 mr-1 flex justify-center items-center hover:bg-gray-200" >
          <KeyboardDoubleArrowLeftIcon className=" hover:animate-bounce-right-to-left mr-1" onClick={handleClick} />
          {/* <FontAwesomeIcon icon={faArrowRight} className="transform rotate-180 mr-3 " onClick={handleClick} /> */}
        </span>
      </div>
      {/* <div className="flex flex-col p-4 space-y-4 rounded-lg mt-4  "> */}
      <div className={`flex flex-col p-1 space-y-4  min-h-screen rounded-lg mt-4 `}>

        <h1 className=" text-blue-800 text-sm font-medium me-2 px-2.5 py-1 rounded border border-blue-400 inline-flex items-center justify-center">DragNDrop</h1>


        {/* accordion */}

        <div>

          {/* <div className="grid grid-cols-2 gap-2 p-4">
      {segments.map((segment, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 bg-white shadow-nodes  rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="text-2xl mb-2">{segment.icon}</div>
          <div className="text-xs font-medium text-gray-700 text-center break-words">{segment.label}</div>
        </div>
      ))}
    </div> */}

          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Segments
            </AccordionSummary>
            <AccordionDetails>
              <div className={`${setupId.id ? "" : "pointer-events-none filter  opacity-30"}`}>
                {/* <div> */}
                <div className={`grid grid-cols-2 gap-2 p-1`}>
                  <div
                    className={`flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors    ${( setupId.id) && "pointer-events-none filter  opacity-30"}`}
                    onDragStart={(event) => onDragStart(event, "start", "Start", "")}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className="h-6 w-6 shadow-nodes  p-3 rounded-lg text-[#FF7A7A] transform rotate-180" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Start</div>
                  </div>

                  <div
                    className={`flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors  ${( setupId.id) && "pointer-events-none filter  opacity-30"}`}
                    onDragStart={(event) => onDragStart(event, "end", "End", "")}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faArrowRightToBracket} className="h-6 w-6 shadow-nodes  p-3 rounded-lg text-[#FF7A7A] transform rotate-90" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">End</div>
                  </div>

                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => onDragStart(event, "trigger", "Trigger", "Click to Setup Segment")}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faBoltLightning} className="h-6 w-6 shadow-nodes  p-3 rounded-lg text-[#FF7A7A]" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Trigger</div>
                  </div>

                  <div
                    className={`flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors  ${( setupId.id) && "pointer-events-none filter  opacity-30"}   `}
                    // ${(segmentNodeonPanel === false && setupId.id) && "pointer-events-none filter  opacity-30"}
                    onDragStart={(event) => onDragStart(event, "setup", "Setup", "Define Journey Setting")}
                    draggable
                  >
                    <div className="text-2xl mb-2">

                      <FontAwesomeIcon icon={faGear} className="h-6 w-6 shadow-nodes  p-3 rounded-lg text-[#FF7A7A]" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Setup</div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              Engagements
            </AccordionSummary>
            <AccordionDetails>
              <div className={`${segmentNodeonPanel === false && "pointer-events-none filter  opacity-30"}`}>
                <div className="grid grid-cols-2 gap-4 p-1">
                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => {
                      onDragStart(event, "port", `Email_${incEmail}`, "Click to Setup Email Campaign");
                      setIncEmail(incEmail + 1); // Increment inc after the drag starts
                    }}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 shadow-nodes  p-3 rounded-lg  text-[#1AB9C9] tracking-tight" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Email</div>
                  </div>

                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => {
                      onDragStart(event, 'sms', `SMS_${incSms}`, "Click to Setup SMS Campaign");
                      setIncSms(incSms + 1);
                    }}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faComments} className="h-6 w-6  shadow-nodes  p-3 rounded-lg  text-[#1AB9C9] tracking-tight" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">SMS</div>
                  </div>

                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => {
                      onDragStart(event, 'whatsapp', `whatsapp_${incWhatsapp}`, "Click to Setup Whatsapp Campaign");
                      setIncWhatsapp(incWhatsapp + 1); // Increment inc after the drag starts
                    }}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faWhatsapp} className="h-6 w-6  shadow-nodes  p-3 rounded-lg  text-[#1AB9C9] tracking-tight" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Whatsapp</div>
                  </div>

                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => {
                      onDragStart(event, 'webPush', `webPush_${incWebPush}`, "Click to Setup WebPush Campaign");
                      setIncWebPush(incWebPush + 1);
                    }}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faBell} className="h-6 w-6  shadow-nodes  p-3 rounded-lg  text-[#1AB9C9] tracking-tight" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">WebPush</div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              Controllers
            </AccordionSummary>
            <AccordionDetails>
              <div className={`mb-10 ${segmentNodeonPanel === false && "pointer-events-none filter  opacity-20"}`}>
                <div className="grid grid-cols-2 gap-4 p-4">
                  <div
                    className="flex flex-col items-center px-10 py-2 bg-white  rounded-lg hover:bg-gray-100 transition-colors"
                    onDragStart={(event) => {
                      onDragStart(event, 'delay', `Delay_${incDelay}`, "user Delay time");
                      setIncDelay(incDelay + 1);
                    }}
                    draggable
                  >
                    <div className="text-2xl mb-2">
                      <FontAwesomeIcon icon={faClock} className="h-6 w-6 shadow-nodes  p-3 rounded-lg  text-yellow-500 tracking-tight" />
                    </div>
                    <div className="text-xs font-medium text-gray-700 text-center break-words">Delay</div>
                  </div>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>



        {/* accordion ends */}









        <div>


          {/* <h2 className='font-medium me-2 px-2.5 py-1  border-b border-b-blue-400 '>CONDITIONS:</h2> */}




          {/* <div className="flex items-center space-x-3 text-black bg-white rounded-lg p-2 hover:bg-slate-200"
                        onDragStart={(event) => onDragStart(event, 'Voice Flow', 'Voice Flow', "user Voice Flow Address")}
                        draggable>
                        <div className="flex items-center justify-center h-10 w-10 bg-white rounded-full border-2 "

                        >

                            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-black  tracking-tight  " />
                        </div>
                        <span className=' text-black  tracking-tight font-light '> Opened</span>
                    </div>

           
                    <div className="flex items-center space-x-3 text-black bg-white rounded-lg p-2 hover:bg-slate-200"
                        onDragStart={(event) => onDragStart(event, 'Welcome', "Welcome", "user Welcome Address")}
                        draggable>
                        <div className="flex items-center justify-center h-10 w-10 bg-white rounded-full border-2 "

                        >
                            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-black  tracking-tight  " />
                        </div>
                        <span className=' text-black  tracking-tight font-light '>  Clicked</span>
                    </div>


                    <div className="flex items-center space-x-3 text-black bg-white rounded-lg p-2 hover:bg-slate-200"
                        onDragStart={(event) => onDragStart(event, 'output', "output", "Output: result")}
                        draggable>
                        <div className="flex items-center justify-center h-10 w-10 bg-white rounded-full border-2 "

                        >

                            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6 text-black  tracking-tight  " />
                        </div>
                        <span className=' text-black  tracking-tight font-light '>  List/Segment</span>
                    </div> */}
        </div>
      </div>
      {/* <div className='absolute right-0'>
           <Sidebar0  />
           </div> */}

    </aside>

  );
};

export default Sidebar;
