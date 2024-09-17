import React, { useCallback, useEffect, useState } from 'react';
import { Handle, useStore, useReactFlow } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBoltLightning, faDatabase, faXmark, faAngleRight, faDoorOpen, faGear } from '@fortawesome/free-solid-svg-icons';
import { deleteNode, updatedData } from '../../reducer/slice';
import { useDispatch, useSelector } from 'react-redux';



interface HandlesPortProps {
    id: any;
    data: any;
    isConnectable: boolean;
}

const handleStyle: React.CSSProperties = {
    left: 15,
    right: 10,
};

const SetupHandlePort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredBorder, setIsHoveredBorder] = useState(false)
    const [isHoveredBorderMiddle, setIsHoveredBorderMiddle] = useState(false)
    const [isHoveredBorderBottom, setIsHoveredBorderBottom] = useState(false)

    const [selectedHandle, setSelectedHandle] = useState("")


    // const setupCheck = useSelector((state: any) => state.data.setupfilledSlice.value);
    // SetUpformDataSlice
    // const setupCheck = useSelector((state: any) => state.data.setUpformDataSlice.value);
    const setupCheck = useSelector((state: any) => state.data.setUpformDataIdSlice.value);


    const zoomSelector = (s: any) => s.transform[2] >= 1.5;

    const showContent = useStore(zoomSelector);


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


    const handleSelect = () => {
        setSelectedHandle("Delivered")
    }


    const onConnectStart = (event: any, { handleId }: any) => {
        // setDraggedHandle(handleId);
        console.log(`Dragging started from handle: ${handleId}`);
    };



    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={` ${setupCheck.id ? "bg-blue-400 " : "bg-slate-300"}  py-2 px-10 w-[160px] border border-white rounded-l-lg rounded-r-full shadow-custom
                         
            `}>
                {setupCheck.id === false && <span className="absolute -left-[3px] bottom-10 flex h-3 w-3">
                    <span className="animate-ping absolute  inline-flex h-full w-full rounded-full bg-sky-400 "></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>}

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
                    <div className=''>
                        <div  >
                            <h5 className="mb-2 text-[10px] text-white  font-bold tracking-wider absolute left-6 top-4 ">{data.label}</h5>
                            <p className="mb-2 text-[8px] text-white  font-normal  tracking-widest absolute left-5 top-8 ">{data.description}</p>
                        </div>


                        <div className="relative left-[77px]  ">
                            <div className="text-white w-8 h-8  border border-white  rounded-full  flex justify-center items-center " >
                                <FontAwesomeIcon icon={faGear} className="text-white  w-4 h-4" />
                            </div>
                        </div>




                    </div>
                )}
            </div>


            {/* <div className='w-20'></div> */}
        </div>
    );
}

export default SetupHandlePort;