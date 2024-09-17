import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faDatabase, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import {deleteNode, updatedData, updatedDelayData} from '../../reducer/slice';
import { useDispatch } from 'react-redux';

interface IDelayHandlePort {
    id: any;
    data: any;
    isConnectable: boolean;
}

const handleStyle: React.CSSProperties = {
    left: 15,
};

const handlesemiLeft: React.CSSProperties = {
    left: 98,
};

const DelayHandlePort: React.FC<IDelayHandlePort> = ({ id, data, isConnectable }) => {
   
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (data.delayTime) {
            // alert(JSON.stringify(data.delayTime))
            const firstDelayTime = data.delayTime;
            setTime({
                hours: firstDelayTime?.hours || 0,
                minutes: firstDelayTime?.minutes || 0,
                seconds: firstDelayTime?.seconds || 0
            });
        }
    }, [data.delayTime]);

    console.log(time);


    const { deleteElements } = useReactFlow();

    const dispatch = useDispatch();
    const dispatchData = useDispatch();
    const dispatchData1 = useDispatch();

    const onClick = useCallback(() => {
      deleteElements({ nodes: [{ id }] });
      dispatch(deleteNode(id))
    }, [id, deleteElements]);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    console.log(data.delayTime)

    // send delayId and delayTime
    useEffect(()=>{
        dispatchData(updatedDelayData({
          id:id,
          data:data.delayTime
        }))
      },[data.delayTime])

    // send fetched data and id

    useEffect(()=>{
        dispatchData1(updatedData({
          id:id,
          data:data.fetchedData
        }))
      },[data.fetchedData])

    return (
        <div>
            {isPopupOpen && (
                <div className="inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    <div className="relative w-60 h-52 overflow-auto scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-700 bg-white rounded-lg shadow-lg p-4">
                        <div className='fixed top-2 right-7'>
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={closePopup}
                                className=" w-4 h-4 cursor-pointer text-gray-600 hover:text-red-500  "
                            />
                        </div>
                        <h2 className="text-xs mb-2">  {JSON.stringify(data.fetchedData.campaignName)}</h2>
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
                <div className="bg-white py-4 px-10 rounded-full border border-yellow-300 rounded  hover:shadow-nodes" >
                    {data.fetchedData !== null && <FontAwesomeIcon icon={faDatabase} onClick={openPopup} className='text-gray-700 absolute right-5 top-2 w-2 h-2 hover:cursor-pointer hover:shadow-sm' />}

                    <FontAwesomeIcon icon={faXmark} onClick={onClick} className='absolute right-2 top-2 w-2 h-2 hover:cursor-pointer hover:bg-red-500 ' />
                    <div>
                        <div className="mb-2  absolute left-2 top-1  "><FontAwesomeIcon icon={faClock} style={{ color: "#858d93" }} /></div>
                        <h5 className="mb-2 text-[7px] font-bold tracking-tight absolute left-7 top-2 text-gray-700">{data.label}</h5>
                        {/* <hr className="absolute left-0 top-7 w-full border-b-1 border-gray-400" /> */}
                    </div>
                    <p className='text-gray-500 absolute left-7 bottom-2 text-[5px] font-bold tracking-tight'>
    ({time.hours} h, {time.minutes} m, {time.seconds} s)
</p>


                    <Handle
                        type="target"
                        id="delayIdSource"
                        className="border border-gray-400  bg-gray-50 w-2 h-2 rounded-full"
                        position={Position.Top}
                        isConnectable={isConnectable}
                    />
                    <div>
                       
                        <Handle
                            type="source"
                            id="delayIdTarget"
                            className="border border-gray-400  bg-gray-50 w-2 h-2 rounded-full"
                            position={Position.Bottom}
                            isConnectable={isConnectable}
                        />
                    </div>

                </div>
            )}
        </div>
    );
}

export default DelayHandlePort;
