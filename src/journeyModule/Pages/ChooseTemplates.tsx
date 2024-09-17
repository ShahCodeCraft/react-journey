

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JourneyPopup from '../Components/Popup/JourneyPopup';
// import welcome from "./welcomeJourneyTemplate.png"

interface Journey {
    id: Number,
    title: string;
    description: string;
    category: string;
    image: string;
    triggerInfo?: string;
}

const ChooseTemplates: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("All");
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleClick = (option: string) => {
        setSelectedOption(option);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Optional: You can add further logic here, such as sending the search term to an API
    };





    const prebuiltJourneysDataSaas: Journey[] = [
        // Your Saas data array
        {
            id: 1,
            title: "Welcome Email Series",
            description: "An email flow sent to new subscribers or customers to introduce them to your brand, products, and services, and establish a positive first impression",
            category: "SaaS",
            image: "../../../assets/welcomeTemplateJ.png",
            triggerInfo: `<div class="mt-4">
                        <p class="font-semibold">Select any of these triggers to use in this journey:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Contact Added to a List</li>
                            <li>Contact Enters or Leaves a Segment</li>
                            <li>Occurrence of an Event</li>
                        </ul>
                        <p class="font-semibold mt-2">Prerequisites:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Make sure you select the lists or segments where new subscribers are added.</li>
                            <li>You can also capture an event when a new subscriber signs up for your brand or service.</li>
                            <li>Customize your trigger point.</li>
                        </ul>
                        <p class="mt-2">You can't change the trigger once it is set up. <a href="#" class="text-blue-500">Learn More</a></p>
                    </div>`

        },
        {
            id: 2,
            title: "Lead Nurture Sequence",
            description: "A series of emails sent to cold leads who have shown initial interest in your offerings, aiming to warm them up and convert them into engaged prospects.",
            category: "SaaS",
            image: "../../../assets/welcomeTemplateJ.png",
        },

    ];

    const prebuiltJourneysDataEcommerce: Journey[] = [
        // Your Ecommerce data array
        // {               
        //                 id:1,
        //                 title: "template1",
        //                 description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
        //                 category: "Ecommerce",
        //                 image:"../../../assets/welcomeJourneyTemplate.png"
        //             },
        //             {
        //                 id:2,
        //                 title: " Milestones",
        //                 description: "Automated emails sent to customers on their  offering personalized offers or greetings",
        //                 category: "Ecommerce",
        //                 image:"../../../assets/welcomeJourneyTemplate.png",
        //             },
        //             {
        //                 id:3,
        //                 title: "Birthday / Milestones",
        //                 description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
        //                 category: "Ecommerce",
        //                 image:"../../../assets/welcomeJourneyTemplate.png",
        //             },
        //             {
        //                 id:4,
        //                 title: "Birthday / Milestones",
        //                 description: "Automated emails sent to customers on their birthdays or other significant milestones, offering personalized offers or greetings",
        //                 category: "Ecommerce",
        //                 image:"../../../assets/welcomeJourneyTemplate.png",
        //             }
    ];

    const filteredData: Journey[] = selectedOption === 'SaaS' ? prebuiltJourneysDataSaas :
        selectedOption === 'Ecommerce' ? prebuiltJourneysDataEcommerce :
            [...prebuiltJourneysDataSaas, ...prebuiltJourneysDataEcommerce];

    const filteredResults: Journey[] = filteredData.filter((journey) => {
        return journey.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const scrollToTop = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    const [JourneyPopupState, setJourneyPopupState] = useState(false)
    const handleJourneyPopup = (bool: boolean) => {
        setJourneyPopupState(bool)
    }
    const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

    const sendDataToPopup = (journey: any) => {
        handleJourneyPopup(true)
        setSelectedJourney(journey)
    }

    return (
        <div className='m-20'>
            <div className='flex justify-start items-center gap-1 text-2xl font-semibold  mb-5 '>
                <a href="/" >
                    <FontAwesomeIcon icon={faArrowRight} className="rotate-180 w-16 " />
                </a><h1>Choose Pre-Built Journeys</h1>
            </div>
            <div className="mx-auto sm:px-6 lg:px-[68px] shadow-lg rounded-lg border border-blue-200 min-h-screen ">
                <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
                    {/* search form */}
                    <form className="flex items-center  mx-auto mb-10" onSubmit={handleSubmit}>
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <input
                            type="text"
                            id="simple-search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-14 p-2.5"
                            placeholder="Search template..."
                            value={searchTerm}
                            onChange={handleChange}
                            required
                        />
                        {/* <button
                            type="submit"
                            className="p-2.5 h-14 w-9 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ml-2"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button> */}
                    </form>
                    {/* ends */}
                    <div className='flex gap-4 '>
                        {/* selects  */}
                        <div className="flex justify-center">
                            <div className="relative rounded-lg border-2 border-opacity-25 text-card-foreground shadow-sm w-60 h-40 p-4 flex items-center">
                                <div className="p-3 flex flex-col gap-2 w-full">
                                    <div onClick={() => handleClick('All')}>
                                        <h2 className={`p-2 text-sm text-wrap hover:bg-blue-50 leading-snug whitespace-normal break-words transition-colors duration-300 ease-in-out ${selectedOption === 'All' ? 'text-blue-500' : ''}`}>All</h2>
                                    </div>
                                    <div onClick={() => handleClick('SaaS')}>
                                        <h2 className={`p-2 text-sm text-wrap  hover:bg-blue-50 leading-snug whitespace-normal break-words transition-colors duration-300 ease-in-out ${selectedOption === 'SaaS' ? 'text-blue-500' : ''}`}>SaaS</h2>
                                    </div>
                                    <div onClick={() => handleClick('Ecommerce')}>
                                        <h2 className={`p-2 text-sm text-wrap  hover:bg-blue-50 leading-snug whitespace-normal break-words transition-colors duration-300 ease-in-out ${selectedOption === 'Ecommerce' ? 'text-blue-500' : ''}`}>Ecommerce</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
                            {selectedOption === "All" && <div className="relative rounded-lg border border-dashed border-black border-opacity-25 bg-card text-card-foreground shadow-sm w-full p-4" data-v0-t="card">
                                <Link to={"/chooseTemplate/journeyFlow/triggerSetup"} onClick={scrollToTop} >
                                    <div className="absolute inset-0  flex justify-center items-center">
                                        <div className="rounded-full border border-dashed border-black border-opacity-25 bg-card text-card-foreground shadow-sm w-16 h-16 flex items-center justify-center">
                                            <svg className="h-8 w-8 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>

                                        </div>

                                    </div>

                                </Link>
                                <div className="p-3 relative top-20 left-[70px] mt-3">
                                    <h2 className="text-sm mt-2 text-wrap leading-snug whitespace-normal break-words"> Start From Scratch</h2>
                                </div>
                            </div>}
                            {filteredResults.map((journey, index) => (
                                <div key={index} className="relative rounded-lg border hover:border-blue-300 bg-card text-card-foreground shadow-sm w-full" data-v0-t="card">
                                    {/* <Link to={"/journey/" + index} onClick={scrollToTop}> */}

                                    <div onClick={() => sendDataToPopup(journey)} className="absolute inset-0 bg-black bg-opacity-5 opacity-0 hover:opacity-100 flex justify-center items-center">
                                        <button className="bg-white text-gray-800 px-2 py-2 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-300 ease-in-out">
                                            Preview
                                        </button>
                                    </div>
                                    {/* </Link> */}
                                    <div className='hover:opacity-25'>
                                        <div className="flex flex-col space-y-1.5 p-3">
                                            <h3 className="text-lg font-medium leading-none mb-2 tracking-tight">{journey.title}</h3>
                                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/20 bg-[#f3f4f6] text-[#1f2937]">
                                                {journey.category}
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-sm text-wrap leading-snug whitespace-normal break-words">{journey.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {JourneyPopupState && <JourneyPopup journey={selectedJourney} handleJourneyPopup={handleJourneyPopup} />}
                    </div>
                    <div className='m-20'>
                        {/* Your existing JSX structure here */}
                        {filteredResults.length === 0 && (
                            <div className="text-gray-500 text-lg w-full text-center mt-8">
                                Templates are coming soon.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChooseTemplates;

