


import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { triggerJsonReducer } from '../../reducer/slice';
// import useHistory  from 'react-router-dom';

interface NavbarProps {
    handleComponent: (clicked: boolean) => void;
    journeyName: any;
    segmentName: any;
    checkFields: (check: any) => void;
}

const Navbar: FC<NavbarProps> = ({ handleComponent, journeyName, segmentName, checkFields }) => {
    // const Navbar = (handleComponent:any) => {
    const [clicked, setClicked] = useState(true);
    const [check, setCheck] = useState({})
    const [activeStep, setActiveStep] = useState(0); // State to track active step
    const edges = useSelector((state: any) => state.data.edgesSlice.value);

    console.log(activeStep)

    let navigate = useNavigate();

    const handleNext = () => {
        // Determine if segmentName and journeyName are empty
        // alert(JSON.stringify(segmentName))
        const isSegmentNameEmpty = segmentName === undefined ? false : true;
        const isJourneyNameEmpty = journeyName === undefined ? false : true;

        // Determine the values to be sent to checkFields
        const checkValues = {
            segmentName: isSegmentNameEmpty,
            journeyName: isJourneyNameEmpty,
        };

        // Call checkFields with an object containing the check results
        checkFields(checkValues);

        // If both segmentName and journeyName are true, proceed to the next step
        if (isJourneyNameEmpty) {
            setActiveStep((prevStep) => {
                const nextStep = prevStep + 1;
                console.log("Next step:", nextStep);
                return nextStep;
            });
            handleComponent(clicked);
        }

      
    };





  



    const redirect = () => {
        if (activeStep >= 1) {
            // alert(activeStep)
            navigate("/chooseTemplate/journeyFlow/triggerSetup/journey");
        }
    }
    // const journeyName = useSelector((state: any) => state.data.journeyName.value);
    console.log(journeyName)
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1); // Decrease activeStep by 1
        handleComponent(false); // Call handleComponent with false
    };

    const dispatchTriggerJson = useDispatch();
    const handleJson = () => {
        dispatchTriggerJson(triggerJsonReducer(true))
        // alert("Journey published successfully!");
    }


    //  href="/chooseTemplate/journeyFlow/triggerSetup" 
    return (
        <div className='flex justify-between '>
            <div className='flex'>
               

                <div className='flex justify-center items-center px-3 border '>
                    <ol className="flex items-center w-full p-3 space-x-2 text-xs font-medium text-center text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 sm:text-xs sm:p-4 sm:space-x-4 rtl:space-x-reverse bg-white">
                        <li className={`flex items-center cursor-pointer ${activeStep >= 0 ? 'text-blue-500' : ''}`} >
                            <span className="flex items-center justify-center w-7 h-7 me-2 text-xxs border rounded-full shrink-0 border-2 ">
                                1
                            </span>
                            Setup trigger
                        </li>
                        <li className={`flex items-center cursor-pointer ${activeStep >= 1 ? 'text-blue-500' : ''}`}>
                            <span className="flex items-center justify-center w-7 h-7 me-2 text-xxs border rounded-full shrink-0 ">
                                2
                            </span>
                            Build your journey
                        </li>
                      
                    </ol>
                </div>
                <div className='ml-24 flex justify-center  items-center px-3 border border-slate-200 w-[500px]'>
                

                    {journeyName ? (
                        journeyName.length > 32 ?
                            <a className='text-blue-300 ' href="#your-link">Journeys / <span className='text-slate-400 ' >{journeyName.substring(0, 32)}...</span></a>
                            : <a className='text-blue-300 ' href="#your-link">Journeys / <span  className='text-slate-400 ' >{journeyName}</span></a>
                    ) : (
                        <span className="text-gray-400">JourneyName display Here</span>
                    )}
                </div>


            </div>

            <div className=" flex gap-2 p-2 flex-row-reverse  ">
             

                {activeStep >= 1 ?

                
<div>
<button
  className={`inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 h-10 bg-white text-purple-600 px-4 py-2 rounded-md border border-purple-600 ${edges[0]?.id ? 'hover:text-white hover:bg-purple-600' : 'opacity-30'}`}
  onClick={handleJson}
  disabled={!edges[0]?.id}
>
  Publish Journey
</button>
</div>
: <button onClick={handleNext} className="inline-flex items-center justify-center  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-purple-600 text-white px-4 py-2 rounded-md mr-4 hover:bg-white hover:text-purple-600 border border-purple-600 ">
                        Next
                    </button>
                }

            </div>
        </div>
    );
};

export default Navbar;
