
import React, { useCallback, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBoltLightning, faDatabase, faXmark, faAngleRight, faDoorOpen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteNode, segmentnodeTypeReducer, updatedData } from '../../reducer/slice';
import { useDispatch } from 'react-redux';

interface HandlesPortProps {
  id: any;
  data: any;
  isConnectable: boolean;
  type: string;
}

const handleStyle: React.CSSProperties = {
  left: 15,
  right: 10,
};

const TriggerHandlePort: React.FC<HandlesPortProps> = ({ id, data, isConnectable, type }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { deleteElements, getNodes, addEdges } = useReactFlow();
  const dispatch = useDispatch();
  const dispatchSegmentNode = useDispatch();


  // alert(JSON.stringify(type)) // trigger

  const onClick = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
    dispatch(deleteNode(id));
    dispatchSegmentNode(segmentnodeTypeReducer(false));

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

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="border-black"
    >
      <div className="py-3 px-10 w-32 border border-white rounded-lg hover:shadow-nodes" style={{ background: 'linear-gradient(to bottom, #95D2B3 50%, #55AD9B 50%)' }}>
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
            <Handle
              type="source"
              position={Position.Right}
              id="Trigger"
              // className=" text-red-700 border border-red-200 rounded-full relative left-20 -z-20"
              isConnectable={isConnectable}
            />
            {/* <FontAwesomeIcon icon={faDatabase} onClick={openPopup} className='absolute right-4 top-1 w-2 h-2 cursor-pointer hover:shadow-sm' /> */}
            {isHovered && (<FontAwesomeIcon icon={faTrashCan} onClick={onClick} className=' text-white z-50 absolute left-2 -top-[12px] w-[6px] h-[7px] px-[2px] py-[2px]  cursor-pointer bg-red-400 hover:bg-red-500 rounded-t-[3px] shadow-custom border border-white ' />)}
            <div  >
              <div className="mb-2 absolute left-3 top-1"><FontAwesomeIcon icon={faBoltLightning} style={{ color: "white" }} /></div>
              <h5 className="mb-2 text-[8px] text-white font-bold tracking-tight absolute left-8 top-2 ">{data.label}</h5>
              <p className="mb-2 text-[6px] text-white  font-light tracking-tight absolute left-5 top-8 ">{data.description}</p>


            </div>

            <div className="flex items-center relative ">
              <div
                className={`bg-[#95D2B3]  border border-white rounded-sm shadow-md relative left-[76px]   mr-2 flex justify-center items-center ${isHovered ? 'transform rotate-45' : ''
                  } transition-transform duration-300`}
              >

                <div className="text-white w-5 h-5  flex justify-center items-center " >
                  <FontAwesomeIcon icon={faDoorOpen} className="text-white w-3 h-3" />
                </div>
              </div>
              {/* <Handle
                type="source"
                position={Position.Right}
                id="Trigger"
                // className=" text-red-700 border border-red-200 rounded-full relative left-20 -z-20"
                isConnectable={isConnectable}
              /> */}
              {isHovered && (
                <div className="absolute left-[80px] w-20 h-20 flex items-center">
                  <div className="flex items-center ml-1">
                    <div className="border-t ml-3 border-gray-300 border-dotted w-4 h-0"></div>
                    <div className="relative ml-2">
                      <Handle
                        type="source"
                        position={Position.Right}
                        id="Trigger"
                        isConnectable={isConnectable}
                        style={{
                          backgroundColor: '#d3d3d3',
                          borderRadius: '50%',
                          color: 'white',
                          width: '14px',
                          height: '14px',
                          fontSize: '10px',
                          display: 'flex',
                          marginBottom: "1px",
                          alignItems: 'center',
                          justifyContent: 'center',

                        }}
                      >
                        &gt;
                        {/*  <FontAwesomeIcon className='w-2 h-2' icon={faAngleRight} />
         yes */}
                      </Handle>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TriggerHandlePort;
