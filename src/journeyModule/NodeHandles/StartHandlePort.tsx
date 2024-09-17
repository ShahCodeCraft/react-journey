import React, { useCallback } from 'react';
import { Handle, Position, useReactFlow, NodeProps } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, } from '@fortawesome/free-regular-svg-icons'
import { faArrowsSplitUpAndLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

import {deleteNode} from '../../reducer/slice';
import { useDispatch } from 'react-redux';


interface HandlesPortProps {
    id: any,
    data: any;
    isConnectable: boolean;
}

const handleStyle: React.CSSProperties = {
    // left: 15,


};

const handlesemiLeft: React.CSSProperties = {
    left: 45,
};

const handlesemiRight: React.CSSProperties = {
    right: -5,
};

const StartHandlesPort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
    console.log(JSON.stringify(data));

    const onChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        console.log(evt.target.value);
    }, []);

    const { deleteElements } = useReactFlow();

    const dispatch = useDispatch();

    const onClick = useCallback(() => {
      deleteElements({ nodes: [{ id }] });
      dispatch(deleteNode(id))
    }, [id, deleteElements]);
    return (

        <div className="flex items-center justify-center h-5 w-5 bg-blue-300 rounded-full  hover:shadow-nodes "

        >
            <FontAwesomeIcon icon={faXmark} onClick={onClick} className='absolute left-5 bottom-4 w-2 h-2 hover:cursor-pointer hover:bg-red-500 rounded-sm  ' />

            <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} className="h-3 w-3 text-black transform rotate-180" />
            <div className=' '>
                <p className=' text-black absolute bottom-5 right-[5px] text-[5px] font-bold tracking-tight'>Start</p>
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="EntryFlow"
                    className="border border-gray-400 w-2 h-2 rounded-full"
                    isConnectable={isConnectable}

                />
            </div>
        </div>
    );
}

export default StartHandlesPort;
