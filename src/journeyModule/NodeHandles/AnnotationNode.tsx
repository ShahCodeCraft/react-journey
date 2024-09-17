import { faArrowLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



function AnnotationNode({ data }:any) {
  const setupCheck = useSelector((state: any) => state.data.setupfilledSlice.value);
  const segmentNodeonPanel = useSelector((state: any) => state.data.segmentnodeTypeSlice.value)


  const [isFirstTime, setIsFirstTime] = React.useState(true);

  useEffect(() => {
    const hasRunBefore = localStorage.getItem('hasRunBefore');
    if (hasRunBefore && segmentNodeonPanel) {
      localStorage.setItem('hasRunBefore', 'false');
      setIsFirstTime(false);
    }
  }, [setupCheck]);


  return (
    <div >
     {data.level && (
       <div  style={{ padding: 10, display: 'flex' }}>

       {data.arrowStyle && (
         <div className="mr-2" style={{ ...data.arrowStyle }}>
         
             {data.level == 2 && <FontAwesomeIcon className='text-slate-400 animate-ping '
             style={{ fontSize: '1rem' }} // Adjust the scale factor as needed
             icon={faArrowUp}
             
           />}
         </div>
       )}
 
 
 {data.arrowStyle && (
         <div className={`mr-2  ${setupCheck === 0 && "mr-2 animate-ping "} `} style={{ ...data.arrowStyle }}>
           {data.level == 1 && <FontAwesomeIcon className='text-slate-400 '
             style={{ fontSize: '1rem' }} 
             icon={faArrowUp}
           />}
      
         </div>
       )}
 
 
         <div style={{ marginRight: 4 }} className="text-slate-400">{data.level}.</div>
         <div className="w-[300px] text-xs text-slate-400 font-medium  ">{data.label}</div>
       </div>
     )}


      {/* {data.description &&(
        <div className="flex items-center border border-dashed border-gray-400 rounded-lg p-2 w-40 bg-white">
        <div className="flex-grow">
          <div className="font-bold text-[10px]">{data.label}</div>
          <div className="text-gray-500 text-[9px]">{data.description}</div>
        </div>
        <div className="w-6 h-6 border border-dashed border-gray-400 rounded-md ml-2 relative left-5 bg-white"></div>
      </div>
      )} */}
       {isFirstTime && data.description && (
        <div className="flex items-center border border-dashed border-gray-400 rounded-lg p-2 w-40 bg-white">
          <div className="flex-grow">
            <div className="font-bold text-[10px]">{data.label}</div>
            <div className="text-gray-500 text-[9px]">{data.description}</div>
          </div>
          <div className="w-6 h-6 border border-dashed border-gray-400 rounded-md ml-2 relative left-5 bg-white"></div>
        </div>
      )}

     
    </div>
  );
}

export default memo(AnnotationNode);
