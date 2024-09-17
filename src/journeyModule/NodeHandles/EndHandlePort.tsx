
import React, { useCallback } from 'react';
import { Handle, Position, useReactFlow, NodeProps } from 'reactflow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightToBracket, faArrowsSplitUpAndLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Tooltip as ReactTooltip } from 'react-tooltip'

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

const EndHandlesPort: React.FC<HandlesPortProps> = ({ id, data, isConnectable }) => {
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
        <div className="flex items-center justify-center h-5 w-5 bg-blue-300 rounded-full relative  hover:shadow-nodes">
            {/* <ReactTooltip  id="my-tooltip" />
            <a data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!" >
            <FontAwesomeIcon icon={faXmark} data-tip="Delete" onClick={onClick} className='absolute left-5 bottom-4 w-2 h-2 hover:cursor-pointer hover:bg-red-500 rounded-sm' />
            </a> */}
            <FontAwesomeIcon icon={faXmark} data-tip="Delete" onClick={onClick} className='absolute left-5 bottom-4 w-2 h-2 hover:cursor-pointer hover:bg-red-500 rounded-sm' />


           
            <FontAwesomeIcon icon={faArrowRightToBracket} className="h-3 w-3 text-black transform rotate-90" />
            <div className=' '>
                <p className=' text-black absolute left-[6px] top-[22px] text-[5px] font-bold tracking-tight'>End</p>
                <Handle
                    type="target"
                    position={Position.Top}
                    id="ExitHandle"
                    className="border border-gray-400 w-2 h-2 rounded-full"
                    isConnectable={isConnectable}
                />
            </div>
        </div>
    );
}

export default EndHandlesPort;

