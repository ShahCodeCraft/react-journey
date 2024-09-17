// import React, { useCallback, useEffect, useState } from 'react';
// import { Handle, Position,useReactFlow,NodeProps } from 'reactflow';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope,  } from '@fortawesome/free-regular-svg-icons'
// import { faDatabase, faXmark } from '@fortawesome/free-solid-svg-icons'
// import { deleteNode, updatedData } from "../reducer/slice"
// import { useDispatch } from 'react-redux';

// interface HandlesPortProps {
//     id:any,
//     data: any;
//     isConnectable: boolean;
// }

// const handleStyle: React.CSSProperties = {
//     left: 15,
//     right: 10,

// };

// const handlesemiLeft: React.CSSProperties = {
//     left: 45,
// };

// const handlesemiRight: React.CSSProperties = {
//     right: -5,
// };

// const HandlesPort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
//     console.log(JSON.stringify(data));

//     const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
//         console.log(evt.target.value);
//     }, []);

//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const { deleteElements } = useReactFlow();
//     const dispatch = useDispatch();

//     const onClick = useCallback(() => {
//       deleteElements({ nodes: [{ id }] });
//       dispatch(deleteNode(id))
//     }, [id, deleteElements]);


//     const openPopup = () => {
//         setIsPopupOpen(true);
//       };
    
//       const closePopup = () => {
//         setIsPopupOpen(false);
//       };
    
//       const dispatchData = useDispatch()
//       console.log(data.fetchedData)
    
//       useEffect(() => {
//         dispatchData(updatedData({
//           id: id,
//           data: data.fetchedData
//         }))
//       }, [data.fetchedData])

    

//     return (

//         <div>

// {isPopupOpen && (
//         <div className="inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//           <div className="relative w-60 h-52 overflow-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700 bg-white rounded-lg shadow-lg p-4">
//             <div className='fixed top-2 right-7'>
//               <FontAwesomeIcon
//                 icon={faXmark}
//                 onClick={closePopup}
//                 className=" w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500  "
//               />
//             </div>
//             <h2 className="text-xs mb-2">  {JSON.stringify(data.fetchedData.campaignName)}</h2>
//             <div className="text-xs text-gray-500">
//               {Object.entries(data).map(([key, value]) => (
//                 <p key={key}>
//                   <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//         {!isPopupOpen && (
//         <div className="bg-white py-6 px-20 border border-red-300 rounded-sm  shadow-md" >
//               {data.fetchedData !== null && <FontAwesomeIcon icon={faDatabase} onClick={openPopup} className='absolute right-4 top-1 w-2 h-2 hover:cursor-pointer hover:shadow-sm' />}
//             <FontAwesomeIcon icon={faXmark} onClick={onClick} className='absolute right-1 top-1 w-2 h-2 hover:cursor-pointer hover:bg-red-500 rounded-sm  ' />
//                 <div>
//                 <div className="mb-2 absolute left-3 top-1  "><FontAwesomeIcon icon={faEnvelope} style={{ color: "#858d93" }} /></div>
//                 {/* <FontAwesomeIcon icon="fa-regular fa-envelope"  /> */}
//                 <h5 className="mb-2 text-[7px] font-bold tracking-tight absolute left-8 top-2 text-gray-700">{data.label}</h5>
//                 <p className="mb-2 text-[6px] font-light  tracking-tight absolute left-8 top-4 text-gray-700">{data.description}</p>

//                 <hr className="absolute left-0 top-7 w-full border-b-1 border-gray-400" />
//             </div>
//             <Handle
//                 type="target"
//                 id='EntryHandle'
//                 className="border border-gray-400  bg-gray-50 w-2 h-2 rounded-full"
//                 position={Position.Top}
//                 isConnectable={isConnectable}
//                 style={handleStyle}
//             />
//             <div className=' '>
//                 <p className=' text-teal-500 absolute left-1 bottom-1 text-[5px] font-bold tracking-tight'>Submitted</p>
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     id="Submitted"
//                     className="border border-gray-400 w-2 h-2 rounded-full"
//                     isConnectable={isConnectable}
//                     style={handleStyle}
//                 />
//             </div>
//             <div>
//                 <p className=' text-red-500 absolute left-[37px] bottom-1 text-[5px] font-bold tracking-tight'>Failed</p>
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     id="Failed"
//                     className="border border-gray-400 w-2 h-2 rounded-full"
//                     isConnectable={isConnectable}
//                     style={handlesemiLeft}
//                 />
//             </div>
//             <div>
//                 <p className='absolute left-[70px] bottom-1 text-[5px] font-bold tracking-tight'>Delivered</p>
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     id="Delivered"
//                     className="border border-gray-400 w-2 h-2 rounded-full"
//                     isConnectable={isConnectable}
//                 />
//             </div>

//             <div>
//                 <p className='absolute left-[107px] bottom-1 text-[5px] font-bold tracking-tight'>Read</p>
//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     id="Read"
//                     className="border border-gray-400 w-2 h-2 ml-8 rounded-full"
//                     isConnectable={isConnectable}
//                 />
//             </div>

//             <div>
//                 <p className='absolute left-[135px] bottom-1 text-[5px] font-bold tracking-tight'>Unread</p>

//                 <Handle
//                     type="source"
//                     position={Position.Bottom}
//                     id="Unread"
//                     className="border border-gray-400 w-2 h-2 ml-16 rounded-full"
//                     isConnectable={isConnectable}
//                 />
//             </div>



//         </div>
//         )}
//         </div>
//     );
// }

// export default HandlesPort;


//////////////////////////////////////////////////////////////////////////////////////

// import React, { useCallback, useEffect, useState } from 'react';
// import { Handle, Position, useReactFlow } from 'reactflow';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch } from 'react-redux';
// import { deleteNode, updatedData } from '../reducer/slice';

// interface HandlesPortProps {
//   id: string;
//   data: {
//     fetchedData: {
//       campaignName?: string;
//     };
//     label: string;
//     description: string;
//   };


//   isConnectable: boolean;
// }

// const HandlesPort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const { deleteElements } = useReactFlow();
//   const dispatch = useDispatch();

//   const onClick = useCallback(() => {
//     deleteElements({ nodes: [{ id }] });
//     dispatch(deleteNode(id));
//   }, [id, deleteElements, dispatch]);

//   const openPopup = () => {
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//   };

//   useEffect(() => {
//     dispatch(
//       updatedData({
//         id: id,
//         data: data.fetchedData,
//       })
//     );
//   }, [data.fetchedData, dispatch, id]);

//   const handleConnect = useCallback(() => {
//     setIsConnected(true);
//   }, []);

//   return (
//     <div className="relative">
//       {isPopupOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
//           <div className="relative w-60 h-52 overflow-auto bg-white rounded-lg shadow-lg p-4">
//             <div className="fixed top-2 right-7">
//               <FontAwesomeIcon
//                 icon={faTrash}
//                 onClick={closePopup}
//                 className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500"
//               />
//             </div>
//             <h2 className="text-xs mb-2">{JSON.stringify(data.fetchedData.campaignName)}</h2>
//             <div className="text-xs text-gray-500">
//               {Object.entries(data).map(([key, value]) => (
//                 <p key={key}>
//                   <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {!isPopupOpen && (
//         <div
//           className="relative flex items-center bg-white p-4 border border-gray-300 rounded shadow-md cursor-pointer"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <FontAwesomeIcon
//             icon={faTrash}
//             onClick={onClick}
//             className="absolute left-1 top-1 w-4 h-4 text-red-500 cursor-pointer"
//           />
//        <div className="flex items-center">
//   <div className="w-4 h-4 bg-teal-500 rounded mr-2 flex justify-center items-center transform hover:rotate-90 transition-transform duration-300">
//     <FontAwesomeIcon icon={faEnvelope} className="text-white w-3 h-3" />
//   </div>
//   <span className="flex-1 text-gray-600 text-sm">Send email</span>
// </div>

//         </div>
//       )}

//       <Handle
//         type="target"
//         position={Position.Top}

    
//         id="EntryHandle"
//         className="border border-gray-400 bg-gray-50 w-2 h-2 rounded-full"
//         isConnectable={isConnectable}
//       />

//       {/* <div className={`absolute left-0 top-0 mt-2 w-32 `}>
//         <ul className="flex flex-col space-y-3">
//           {['Sent', 'Failed', 'Viewed', 'Clicked', 'Unreachable'].map((status) => (
//             <li key={status} className="flex items-center text-gray-600 text-sm relative">
//               <Handle
//                 type="source"
//                 position={Position.Right}
//                 id={status}
//                 className="w-2 h-2 border border-gray-400 rounded-full bg-white mr-2"
//                 isConnectable={isConnectable}
//                 onConnect={handleConnect}
//               />
//               <span className="absolute left-32">{status}</span>
//             </li>
//           ))}
//         </ul>
//       </div> */}
//       <div className={`absolute left-0 top-0 mt-2 w-32 `}>
//   <ul className="flex flex-col space-y-3">
//     {['Sent', 'Failed', 'Viewed', 'Clicked', 'Unreachable'].map((status) => (
//       <li key={status} className="flex items-center text-gray-600 text-sm relative">
//         <Handle
//           type="source"
//           position={Position.Right}
//           id={status}
//           className="w-2 h-2 border border-gray-400 rounded-full bg-white mr-2"
//           isConnectable={isConnectable}
//           onConnect={handleConnect}
//         />
//         <span className="absolute left-32" onClick={() => handleConnect()}>{status}</span>
//       </li>
//     ))}
//   </ul>
// </div>

//     </div>
//   );
// };

// export default HandlesPort;



import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBoltLightning, faDatabase, faXmark, faAngleRight, faDoorOpen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteNode, updatedData } from'../../reducer/slice';
import { useDispatch } from 'react-redux';

interface HandlesPortProps {
  id: any;
  data: any;
  isConnectable: boolean;
}

const handleStyle: React.CSSProperties = {
  left: 15,
  right: 10,
};

const HandlesPort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredBorder,setIsHoveredBorder] = useState(false)
  const [isHoveredBorderMiddle,setIsHoveredBorderMiddle] = useState(false)
  const [isHoveredBorderBottom,setIsHoveredBorderBottom] = useState(false)

  const [selectedHandle,setSelectedHandle] = useState("")

  

  

  
  const { deleteElements, getNodes, addEdges } = useReactFlow();
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
    dispatch(deleteNode(id));
  }, [id, deleteElements, dispatch]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const dispatchData = useDispatch();

  useEffect(() => {
    dispatchData(updatedData({
      id: id,
      data: data.fetchedData
    }));
  }, [data.fetchedData, dispatchData]);

  const createEdge = () => {
    const nodes = getNodes();
    const targetNode = nodes.find(node => node.id !== id);

    if (targetNode) {
      const newEdge = {
        id: `edge-${id}-${targetNode.id}`,
        source: id,
        target: targetNode.id,
        type: 'smoothstep', // or any other type you prefer
      };

      addEdges(newEdge);
    }
  };


  const handleSelect =()=>{
    setSelectedHandle("Delivered")
  }


  const onConnectStart = (event:any, { handleId }:any) => {
    // setDraggedHandle(handleId);
    console.log(`Dragging started from handle: ${handleId}`);
  };


  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   <Handle
    type="source"
    position={Position.Right}
    id="Delivered"
    isConnectable={isConnectable}
    onDrag={handleSelect}
    style={{
      position: 'absolute',
      top: '5px',
      zIndex: -5,
      right:8,
    }}
  />
  <Handle
    type="source"
    position={Position.Right}
    id="Clicked"
    isConnectable={isConnectable}
    style={{ 
      position: 'absolute',
      top: '25px', // Adjust this value as needed for spacing
      zIndex: -5,
      right:8,

    }}
  />
  <Handle
    type="source"
    position={Position.Right}
    id="Unreachable"
    isConnectable={isConnectable}
    style={{
      position: 'absolute',
      top: '43px', // Adjust this value as needed for spacing
            zIndex: -5,
            right:8,

    }}
  />
      <div className="py-3 px-10 w-32 border border-white rounded-lg hover:shadow-nodes" style={{ background: 'linear-gradient(to bottom, #CD4440 50%, #AD272C 50%)' }}>
        {isPopupOpen && (
          <div className="inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className=" relative w-60 h-44 overflow-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700 bg-white rounded-lg shadow-lg p-4">
              <div className='fixed top-2 right-7'>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={closePopup}
                  className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500"
                />
              </div>
              <h2 className="text-xs mb-2">{JSON.stringify(data.fetchedData.campaignName)}</h2>
              <div className="text-xs text-gray-500">
                {Object.entries(data).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {JSON.stringify(value, null, 2)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {!isPopupOpen && (
          <div className='  '>
            {/* <FontAwesomeIcon icon={faDatabase} onClick={openPopup} className='absolute right-4 top-1 w-2 h-2 cursor-pointer hover:shadow-sm' /> */}
            {isHovered && (<FontAwesomeIcon icon={faTrashCan} onClick={onClick} className=' text-white z-50 absolute left-2 -top-[12px] w-[6px] h-[7px] px-[2px] py-[2px]  cursor-pointer bg-red-400 hover:bg-red-500 rounded-t-[3px] shadow-custom border border-white ' />)}
            <div  >
              <div className="mb-3 absolute left-3 top-1"><FontAwesomeIcon icon={faEnvelope} style={{ color: "white" }} /></div>
              <h5 className="mb-2 text-[8px] text-white font-bold tracking-tight absolute left-8 top-2 ">{data.label}</h5>
              <p className="mb-2 text-[6px] text-white  font-light tracking-tight absolute left-5 top-8 ">{data.description}</p>
            
            </div>

            <div className="flex items-center relative ">
              <div
                className={`bg-[#CD4440]  border border-white rounded-sm shadow-md relative left-[76px]   mr-2 flex justify-center items-center ${
                  isHovered ? 'transform rotate-45' : ''
                } transition-transform duration-300`}
              >
           
                {/* <FontAwesomeIcon icon={faEnvelope} className="text-white w-5 h-5" /> */}
                <div  className="text-white w-5 h-5  flex justify-center items-center " >
                <FontAwesomeIcon icon={faDoorOpen}  className="text-white w-3 h-3" />
                </div>
              </div>
              {/* <Handle
                type="source"
                position={Position.Right}
                id="Delivered"
                className=" text-red-700 border border-red-200 rounded-full relative left-[93px]  -z-50"
                isConnectable={isConnectable}
                onDrag={handleSelect}

              />
               <Handle
                type="source"
                position={Position.Right}
                id="Clicked"
                className=" text-green-700 border border-blue-200 rounded-full relative right-[93px] -z-50"
                isConnectable={isConnectable}
              />
              <Handle
                type="source"
                position={Position.Right}
                id="Unreachable"
                className=" text-green-700 border border-blue-200 rounded-full relative left-[75px]   -z-50"
                isConnectable={isConnectable}
              /> */}
{isHovered && (
  <div className="absolute left-[80px] w-20 h-20 flex items-center">
   
    <div className="flex items-center ml-1">
      <div className={`border-t ml-3 border-gray-300 border-dotted w-3 h-0 ${isHoveredBorder ? 'border-t-teal-300': ''} ${isHoveredBorderMiddle ? 'border-t-teal-300': ''} ${isHoveredBorderBottom ? 'border-t-teal-300 ' : ''}`}></div>
      <div className={` relative bottom-2 border-t  border-l rounded-sm border-gray-300 border-dotted w-3 h-5 ${isHoveredBorder ? 'border-t-teal-300 border-l-teal-300 ' : ''}`} ></div>
      <div className={`relative -left-[9px] border-t  border-gray-300 border-dotted  w-3 h-0 ${isHoveredBorderMiddle ? 'border-t-teal-300 ': ''}`}></div>
      <div className={` relative -left-[24px] top-2 border-b  border-l rounded-sm border-gray-300 border-dotted w-3 h-5 ${isHoveredBorderBottom ? 'border-b-teal-300 border-l-teal-300 ' : ''}`} ></div>

      {/* top handle */}
      <div className="relative bottom-4 -left-4 hover:bg-blue-300 "
     
      >
        <Handle
      onMouseEnter={() => setIsHoveredBorder(true)}
      onMouseLeave={() => setIsHoveredBorder(false)}
          type="source"
          position={Position.Right}
          id="Delivered"
          isConnectable={isConnectable}
          style={{
            backgroundColor: '#d3d3d3',
            borderRadius: '50%',
            color: 'white',
            width: '14px',  
            height: '14px',  
            fontSize: '10px',
            display: 'flex',
            marginBottom:"1px",
            alignItems: 'center',
            justifyContent: 'center',
            
            
            
          }}
          className={` hover:!bg-teal-500 ${selectedHandle === "Delivered" ? "!bg-blue-500" : ""} `}   onClick={handleSelect}     >
         &gt;
         {/*  <FontAwesomeIcon className='w-2 h-2' icon={faAngleRight} />
         yes */}
        </Handle>
      </div>

         {/* middle handle */}
         <div className="relative bottom-0 -left-4 hover:bg-blue-300 ">
        <Handle
      onMouseEnter={() => setIsHoveredBorderMiddle(true)}
      onMouseLeave={() => setIsHoveredBorderMiddle(false)}
          type="source"
          position={Position.Right}
          id="Clicked"
          isConnectable={isConnectable}
          style={{
            backgroundColor: '#d3d3d3',
            borderRadius: '50%',
            color: 'white',
            width: '14px',  
            height: '14px',  
            fontSize: '10px',
            display: 'flex',
            marginBottom:"1px",
            alignItems: 'center',
            justifyContent: 'center',
            
            
            
          }}
          className=" hover:!bg-teal-500"  >
         &gt;
         {/*  <FontAwesomeIcon className='w-2 h-2' icon={faAngleRight} />
         yes */}
        </Handle>
      </div>

       {/* bottom handle */}
       <div className=" relative top-4 -left-4 hover:bg-blue-300 ">
        <Handle
      onMouseEnter={() => setIsHoveredBorderBottom(true)}
      onMouseLeave={() => setIsHoveredBorderBottom(false)}
          type="source"
          position={Position.Right}
          id="Unreachable"
          isConnectable={isConnectable}
          style={{
            backgroundColor: '#d3d3d3',
            borderRadius: '50%',
            color: 'white',
            width: '14px',  
            height: '14px',  
            fontSize: '10px',
            display: 'flex',
            marginBottom:"1px",
            alignItems: 'center',
            justifyContent: 'center',
            
            
            
          }}
          className=" hover:!bg-teal-500"        >
         &gt;
         {/*  <FontAwesomeIcon className='w-2 h-2' icon={faAngleRight} />
         yes */}
        </Handle>
       
      </div>
        <div className='flex flex-col gap-2'>
        <p  className='text-[7px] relative -left-2  bg-white font-medium ' >Delivered</p>
        <p className='text-[7px] relative -left-2   bg-white font-medium ' >Clicked</p>
        <p className='text-[7px] relative -left-2  bg-white  font-medium ' >Unreachable</p>
        </div>

    </div>
  </div> 
)}





            </div>

<div className='absolute -left-[15px] bottom-6 -z-20  '>
<Handle
              type="target"
              id='EntryHandle'
              className="border border-gray-400 bg-gray-50 w-4 h-12 rounded-full  "
              position={Position.Left}
              isConnectable={isConnectable}
              style={handleStyle}
            />
</div>

            <div>
              {/* <p className='absolute left-[45px] bottom-1 text-xs font-bold tracking-tight'>Data Flow</p> */}
              {/* <Handle
                type="source"
                position={Position.Bottom}
                id="Delivered"
                className="border border-gray-400 w-2 h-2 rounded-full"
                isConnectable={isConnectable}
              /> */}
            </div>
          </div>
        )}
      </div>
      

      {/* <div className='w-20'></div> */}
    </div>
  );
}

export default HandlesPort;
