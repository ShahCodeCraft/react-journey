// import React from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   BaseEdge,
//   EdgeLabelRenderer,
//   EdgeProps,
//   getBezierPath,
//   getSmoothStepPath,
//   useReactFlow,
// } from 'reactflow';

// import {deleteId} from "../reducer/slice";

// import './buttonedge.css';

// // const onEdgeClick = (evt:any, id:any) => {
// //   evt.stopPropagation();
// //   alert(`remove ${id}`);
// // };

// export default function CustomEdge({
//   id,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
//   style = {},
//   markerEnd,
// }: EdgeProps) {
//   const { setEdges } = useReactFlow();
//   const [edgePath, labelX, labelY] = getSmoothStepPath({
//     sourceX,
//     sourceY,
//     sourcePosition,
//     targetX,
//     targetY,
//     targetPosition,
//   });
//   const dispatch = useDispatch();


// // Define a counter outside the function component to maintain the state across function calls
// let counter = 0;

// const onEdgeClick = () => {
//     setEdges((edges) => edges.filter((edge) => edge.id !== id));

//    deleteCall(id)
// };

// const deleteCall= (id:string)=>{
//   const regex = /\d+/g;

//   const numbers = id.match(regex);

//   const numbersObject = {
//       firstNum: numbers ? numbers[0] : undefined,
//       secondNum: numbers && numbers.length > 1 ? numbers[1]: undefined,
//       additionalKey: counter % 2 === 0 ? 0 : 1 // Alternates between 0 and 1

//   };
//   counter++;

//   console.log(counter);
//   dispatch(deleteId(numbersObject));
//   // Convert object to string for alert
//   // const alertMessage = `First Number: ${numbersObject.firstNum}\nSecond Number: ${numbersObject.secondNum}\nAdditional Key: ${numbersObject.additionalKey}`;

//   // // Show alert
//   // alert(alertMessage);
// }


//   return (
//     <>
//       <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
//       <EdgeLabelRenderer>
//         <div
//           style={{
//             position: 'absolute',
//             transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
//             fontSize: 12,
//             // everything inside EdgeLabelRenderer has no pointer events by default
//             // if you have an interactive element, set pointer-events: all
//             pointerEvents: 'all',
//           }}
//           className="nodrag nopan"
//         >
//         <button className="flex items-center justify-center w-3 h-3 bg-gray-200 border border-white rounded-full text-xs leading-none cursor-pointer hover:bg-gray-300" onClick={onEdgeClick}>
//   ×
// </button>


//         </div>
//       </EdgeLabelRenderer>
//     </>
//   );
// }

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  EdgeText,
  getBezierPath,
  getSmoothStepPath,
  useReactFlow,
} from 'reactflow';

import { delayCounterHold, delayNodeReducer, deleteId } from "../../reducer/slice";
import { v4 as uuidv4 } from 'uuid';

import './buttonedge.css';
// import DelayHandlePort from './DelayHandlePort';

// const onEdgeClick = (evt:any, id:any) => {
//   evt.stopPropagation();
//   alert(`remove ${id}`);
// };





export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  source,
  target,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) {
  const { setEdges } = useReactFlow();

  const reactFlow = useReactFlow();

  console.log(reactFlow.getEdges())

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    // delay,
  });
  const dispatch = useDispatch();


  // Define a counter outside the function component to maintain the state across function calls
  let counter = 0;

  type Element = {
    hours: number;
    minutes: number;
    seconds: number;
    delayDate: string;
  } | string;

  type Data = Element[];

  // const [time, setTime] = useState(data[0]);
  const [time, setTime] = useState([
    { hours: 0, minutes: 0, seconds: 0 }
  ]);
  const [date, setDate] = useState();
  // const [time, setTime] = useState();
  console.log(time)
  // console.log(date)
  // console.log(data)

  console.log(data)
  const delayCounter = useSelector((state: any) => state.data.delayCounter.value)

  useEffect(() => {
    if (data && data.length > 0) {
      // alert("buttonEdge"+data)

      setTime(data);
    } else {
      // Data is empty or undefined, set default data
      setTime([
        { hours: 0, minutes: 0, seconds: 0 }
      ]);
    }
  }, [data]);
  const onEdgeClick = () => {
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));

    setEdges((edges) => {
      return edges.filter((edge) => {
        console.log(edge)
        return edge.id !== id;
      });
    });


    deleteCall(id)
  };

  const deleteCall = (id: string) => {
    const regex = /\d+/g;

    const numbers = id.match(regex);

    const numbersObject = {
      firstNum: numbers ? numbers[0] : undefined,
      secondNum: numbers && numbers.length > 1 ? numbers[1] : undefined,
      additionalKey: counter % 2 === 0 ? 0 : 1 // Alternates between 0 and 1

    };
    counter++;

    console.log(counter);
    dispatch(deleteId(numbersObject));

  }



  const dispatchDelay = useDispatch();
  const dispatchDelayCounter = useDispatch();
  const [counterD, setCounter] = useState(delayCounter)
  let counter1 = 0;
  const selectedDelay = () => {
    // alert("thisis from button edge")
    const regex = /\d+/g;

    // const numbers = id.match(regex);
    const numbers = id;
    // alert("id from ButtonEdge"+source)


    const nodeId = {
      // sourceNode: numbers ? numbers[0] : undefined,
      // targetNode: numbers && numbers.length > 1 ? numbers[1] : undefined,
      sourceNode: source,
      targetNode: target,
      additionalKey: counterD % 2 === 0 ? 0 : 1, // Alternates between 0 and 1
      label: `Delay${uuidv4()}`,

    };
    setCounter((prev: any) => {
      return prev + 1;
    })


    dispatchDelayCounter(delayCounterHold(counter))
    dispatchDelay(delayNodeReducer(nodeId))


  }

  const [popTime, setPopTime] = useState(false)


  const poptimeDisplay = () => {
    setPopTime(!popTime);
  }


  const isVertical = labelY > labelX;



  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />






      {/* <EdgeText
      className='text-[7px]'
      x={sourceX+40}
      y={sourceY+10}
      label={label}
      labelStyle={{ fill: 'black'}}
      labelShowBg
      labelBgStyle={{ fill: 'red' }}
      labelBgPadding={[2, 4]}
      labelBgBorderRadius={2}
    > */}
      {/* <FontAwesomeIcon 
          icon={faXmark} 
          onClick={onEdgeClick} 
          className='w-2 h-2 hover:cursor-pointer hover:bg-red-500' 
        /> */}
      {/* </EdgeText> */}
      <EdgeLabelRenderer>

        <div
          style={{
            position: 'absolute',
            top: "4px",
            left: "4px",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan flex flex-col justify-center items-center "
        >
          <p className='flex flex-col justify-center items-center text-[7px] bg-white' >
            {label}
          </p>

          {!popTime
            && <div className='flex gap-1 bg-slate-200 p-1 rounded-lg  '>
              <button className="flex items-center justify-center w-3 h-3 bg-gray-200 border border-white rounded-full text-xs leading-none cursor-pointer hover:bg-gray-300" onClick={poptimeDisplay}>
                <FontAwesomeIcon icon={faClock} style={{ color: "#858d93" }} />
              </button>
              <button className="flex items-center justify-center w-3 h-3  bg-gray-200 border border-white rounded-full text-xs leading-none cursor-pointer hover:bg-gray-300" onClick={onEdgeClick}>
                <FontAwesomeIcon
                  icon={faXmark}
                  // onClick={onEdgeClick} 
                  className='w-2 h-2 hover:cursor-pointer hover:bg-red-500  rounded-full flex items-center justify-center  '
                />            </button>
            </div>}




          {!popTime && (
            <div className=''>
              {(time[0].hours === 0 && time[0].minutes === 0 && time[0].seconds === 0) && (
                <p className='flex flex-col justify-center items-center text-[7px] bg-white' >
                  immediately
                </p>
              )}

              {(time[0].hours !== 0 || time[0].minutes !== 0 || time[0].seconds !== 0) && (

                <p className='flex flex-col justify-center items-center text-[7px] bg-white  text-gray-500  font-bold tracking-tight'>
                  ( {time[0].hours} h, {time[0].minutes} m, {time[0].seconds} s)
                  {/* {time[1]} -  */}
                </p>
              )}

              {/* {isVertical && ( */}

            </div>
          )}


          {/* delayNode */}
          {(popTime)
            && (
              <div onClick={selectedDelay} className="bg-white py-4 px-10 rounded-full border border-yellow-300 rounded shadow-md" >
                {/* <FontAwesomeIcon icon={faClock} style={{ color: "#858d93" }} onClick={poptimeDisplay} className='absolute top-4 right-5 w-2 h-2  hover:cursor-pointer rounded-full hover:bg-yellow-500 ' /> */}
                <FontAwesomeIcon icon={faXmark} onClick={poptimeDisplay} className='absolute top-4  right-2  w-2 h-2 hover:cursor-pointer hover:bg-red-500 ' />
                  {/* onEdgeClick */}
                <div>
                  <div className="mb-2  absolute left-3 top-4  "><FontAwesomeIcon icon={faClock} style={{ color: "#858d93" }} /></div>
                  <h5 className="mb-2 text-[7px] font-bold tracking-tight absolute top-5  left-7  text-gray-700">Delay:</h5>
                  {/* <hr className="absolute left-0 top-7 w-full border-b-1 border-gray-400" /> */}
                </div>

                <p className='text-gray-500 absolute left-7 bottom-1 text-[5px] font-bold tracking-tight'>
                  ( {time[0].hours} h, {time[0].minutes} m, {time[0].seconds} s)
                  {/* {time[1]} -  */}
                </p>


              </div>
            )
          }


        </div>




      </EdgeLabelRenderer>
    </>
  );
}



