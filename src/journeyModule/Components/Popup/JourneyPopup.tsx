
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import wel from "../../../assets/templatePic.png"
import {
    TransformWrapper,
    TransformComponent,
    useControls,
} from "react-zoom-pan-pinch";

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
        <div className="tools flex flex-col gap-1 relative bottom-40 left-96 w-16 ">
            <button className="w-10 h-10 border-2" onClick={() => zoomIn()}>+</button>
            <button className="w-10 h-10 border-2" onClick={() => zoomOut()}>-</button>
            <button className="w-10 h-10 border-2" onClick={() => resetTransform()}>x</button>
        </div>
    );
};


interface Journey {
    id: Number,
    title: string;
    description: string;
    category: string;
    image: string;
    triggerInfo?: string;
}

interface JourneyPopupProps {
    handleJourneyPopup: (value: boolean) => void;
    journey: Journey | null;
}

// const JourneyPopup = ({ handleJourneyPopup }: { handleJourneyPopup: (value: boolean) => void }) => {
const JourneyPopup: React.FC<JourneyPopupProps> = ({ handleJourneyPopup, journey }) => {

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-700 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-h-full border-2 h-[600px]">
                <div className=" flex justify-end">
                    <button onClick={() => handleJourneyPopup(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {journey && (
                    <div className="flex gap-4">
                        <div className="w-[450px] h-[500px]">
                            <TransformWrapper>
                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                    <>
                                        <TransformComponent>
                                            <img
                                                className="border-2 w-[800px] h-[450px]"
                                                // src="https://www.shutterstock.com/image-vector/enchanting-anime-landscape-mistcovered-mountain-600nw-2301778699.jpg"
                                                alt="test"
                                                src={journey.image}
                                            />
                                        </TransformComponent>
                                        <Controls />
                                    </>
                                )}
                            </TransformWrapper>
                        </div>
                        <div className="w-[350px] mt-2 mx-5 ">
                            <div className="inline-flex items-center rounded-full border mb-3 px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/20 bg-[#f3f4f6] text-[#1f2937]">
                                {journey.category}
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{journey.title}</h2>
                            <p className="text-sm text-gray-700 mb-4">{journey.description}</p>
                            {/* <p className="text-sm text-gray-700 mb-4">{journey.triggerInfo}</p> */}
                            {journey.triggerInfo && (
                                <div className="text-sm text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: journey.triggerInfo }} />
                            )}

                        </div>
                    </div>
                )}

                {!journey && (
                    <div className="w-[450px] h-[400px] flex justify-center items-center">
                        No journey selected.
                    </div>
                )}

                {journey && (
                    // <Link to={"/journey/" + journey.id} onClick={scrollToTop}>
                    <Link to="/chooseTemplate/journeyFlow/triggerSetup">
                        <div className="  ">
                            <div className="w-full h-14 relative bottom-8 shadow-md rounded-md">
                                <div className="absolute right-8 ">
                                    <button type="button" className="w-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md px-7 py-3 text-center me-2 mb-2">
                                        <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-md " />
                                        Use this journey
                                    </button>
                                </div>
                            </div>
                        </div>  
                        </Link>
                )}

            </div>
        </div>
    );
};

export default JourneyPopup;


//                          <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100} >