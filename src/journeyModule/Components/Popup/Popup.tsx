import { faArrowRight, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmailEditorTemplate from '../EmailEditor/EmailEditorTemplate';
import { useDispatch, useSelector } from "react-redux";
import { campaignReducer, templateEmailReducer } from '../../../reducer/slice';
import Template from './Template';
interface Button {
    id: number;
    text: string;
}


interface EmailData {
    [key: string]: {
        subject: string;
        content: string;
    };
}




const Popup = ({ onClose, nodeId, nodeName }: any) => {
    console.log(nodeId)
    const [value, setValue] = useState('');

    const [showAudienceForm, setShowAudienceForm] = useState(true);
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
    const [customInputValue, setCustomInputValue] = useState('');
    const [currentForm, setCurrentForm] = useState<'audience' | 'message'>('audience');
    // const [emailData, setEmailData] = useState<{ [key: number]: { subject: string; content: string } }>({});
    const [emailData, setEmailData] = useState<EmailData>({});
    const [audienceData, setAudienceData] = useState({});

    // templatePopup
    // const [templatePopup, setTemplatePopup] = useState(false)
    const templatePop = useSelector((state: any) => state.data.templatePopData.value)
    const [toggle, setToggle] = useState(templatePop)
    console.log(toggle)
    const [submitCheck, setSubmitCheck] = useState(true)
    const [submitCheck2, setSubmitCheck2] = useState(true);
    const { template, id } = useSelector((state: any) => state.data.emailEditor.value);
    console.log(template)

    const toggleMessageForm = () => {
        setShowMessageForm(!showMessageForm);
        setShowAudienceForm(false);
        setCurrentForm('message');

    };

    const toggleAudienceForm = () => {
        setShowAudienceForm(!showAudienceForm);
        setShowMessageForm(false);
        setCurrentForm('audience');

    };

    const toggleForm = () => {
        if (currentForm === 'audience') {
            toggleMessageForm();
        } else {
            toggleAudienceForm();
        }
    };

    // State to manage the visibility of the dropdown menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // State to store the selected dropdown value
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemMessage, setSelectedItemMessage] = useState('');


    // Function to toggle the visibility of the dropdown menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to handle selection of a dropdown item
    const handleSelect = (item: any) => {
        setSelectedItem(item);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };

    const handleSelectMessage = (item: any) => {
        setSelectedItemMessage(item);
        setIsDropdownOpen(false); // Close the dropdown after selection
    };




    // Add useEffect to handle checkbox state initialization
    useEffect(() => {
        if (isOpen) {
            const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
            const selectedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
            setSelectedCheckboxes(selectedValues);
        }
    }, [isOpen]);





    const toggleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value;
        if (event.target.checked) {
            setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter((item) => item !== checkboxValue));
        }
    };

    const handleCustomInputAdd = () => {
        if (customInputValue.trim() !== '') {
            setSelectedCheckboxes([...selectedCheckboxes, customInputValue]);
            setCustomInputValue('');
        }
    };

    const [campaignName, setCampaignName] = useState('');
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isSegment, setIsSegment] = useState(true)
    const [isProvider, setIsProvider] = useState(true)

    const handleInputChange = (event: any) => {
        setCampaignName(event.target.value);
    };

    const handleInputBlur = () => {
        if (!campaignName.trim()) {
            setIsNameFilled(false);
        }
        setIsInputFocused(false);
    };

    const handleButtonBlur = () => {
        if (isDropdownOpen === true) {

            setTimeout(() => {
                if (!selectedItem.trim()) {
                    setIsSegment(false)
                }
            }, 1000)
        }

        if (submitCheck2 === false) {

            console.log("dfssssssssssssssssssss")
            if (!selectedItem.trim()) {
                setIsSegment(false)
            }
            setSubmitCheck2(true)
        }

    }

    const emailProvider = () => {
        if (isDropdownOpen === true) {

            setTimeout(() => {
                if (!selectedItemMessage.trim()) {
                    setIsProvider(false)
                }
            }, 1000)
        }

        if (submitCheck === true) {
            setTimeout(() => {
                if (!selectedItemMessage.trim()) {
                    setIsProvider(false)
                }
            }, 1000)
            setSubmitCheck(false)
        }


    }

    const [subject, setSubject] = useState(true)
    const handleSubject = () => {
        if (!emailData[selectedButtonId!]?.subject.trim()) {
            setSubject(false)
        }

    }



    const handleSubmitCheck = () => {
        setSubject(false)

    }

    const [content, setContent] = useState(true);

    const handleContent = () => {
        if (!emailData[selectedButtonId!]?.content.trim()) {
            setContent(false);
        }
    }


    const handleContentCheck = () => {
        setContent(false);

    }


    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    // buttos code
    const [buttons, setButtons] = useState<Button[]>([{ id: 1, text: 'Variation 1' }]);
    const [hoveredButton, setHoveredButton] = useState<number | null>(null);
    const [selectedButtonId, setSelectedButtonId] = useState<number | null>(buttons.length === 1 ? buttons[0].id : null);

    const handleButtonClick = (buttonId: number) => {
        setSelectedButtonId(buttonId);
    };




    // Function to add a new variation
    const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent form submission

        setSubject(true)
        setContent(true);

        if (buttons.length < 5) {
            // Generate a unique ID for the new button
            const newButtonId = buttons.length > 0 ? buttons[buttons.length - 1].id + 1 : 1;
            const newButtonText = `Variation ${newButtonId}`;

            // Check if a variation with the same text already exists
            const isDuplicate = buttons.some(button => button.text === newButtonText);

            if (!isDuplicate) {
                const newButton = { id: newButtonId, text: newButtonText };
                const newButtons = [...buttons, newButton];
                setButtons(newButtons);

                // Update emailOptions state to include the new variation with 'custom' option
                setEmailOptions(prevState => ({
                    ...prevState,
                    [newButtonId]: 'custom'
                }));
            } else {
                console.log('Variation with the same text already exists.');
                // Handle duplicate variation error (e.g., display an error message)
            }
        }
    };



    const handleDeleteButtonClick = (id: number) => {
        const updatedButtons = buttons.filter(button => button.id !== id);
        // Update button text after deletion
        const updatedButtonsWithNewText = updatedButtons.map((button, index) => ({
            ...button,
            text: `Variation ${index + 1}`,
        }));
        setButtons(updatedButtonsWithNewText);
    };


    const stickyBarStyle: React.CSSProperties = {
        position: "sticky",
        bottom: 0,
        width: "100%"
    };


    const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmailData(prevState => ({
            ...prevState,
            [selectedButtonId!]: {
                ...prevState[selectedButtonId!],
                subject: value,
            },
        }));
    };

    const handleEmailContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setEmailData(prevState => ({
            ...prevState,
            [selectedButtonId!]: {
                ...prevState[selectedButtonId!],
                content: content,
            },
        }));
    };




    // Initialize emailOptions state with 'custom' as default for all variations
    const [emailOptions, setEmailOptions] = useState<{ [key: number]: string }>(
        buttons.reduce<{ [key: number]: string }>((acc, curr) => {
            acc[curr.id] = 'custom';
            return acc;
        }, {})
    );

    // Function to handle changes in the email option selection for a specific variation
    const handleOptionChange = (buttonId: number, option: string) => {
        setEmailOptions(prevState => ({
            ...prevState,
            [buttonId]: option
        }));
    };





    // Function to get the selected option for a specific variation
    const getSelectedOption = (buttonId: number) => {
        return emailOptions[buttonId] || 'custom'; // Default to 'custom' if no option is selected
    };
    // Function to handle changes in the custom email content textarea
    const handleEmailContentChangeRadio = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        // Handle the state update for custom email content here
    };



    useEffect(() => {
        // Define a function to store the data in an object
        const storeDataToObject = () => {
            // Create an object to store the data
            const dataObject = {
                campaignName: campaignName,
                campaignTag:
                    selectedCheckboxes,
                sendToUserSegment: selectedItem
            };
            console.log('Data Object:', dataObject);
            setAudienceData(dataObject)
        };
        storeDataToObject();
    }, [campaignName, selectedCheckboxes, selectedItem]);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const adienceForm = (e: any) => {
        e.preventDefault();



        setSubmitCheck2(false)
        console.log(selectedItem)
        console.log(isSegment)

        if (!selectedItem && !campaignName) {
            // console.log("fdsfaadfdsfdsf")
            // handleInputBlur()
            // handleButtonBlur();
            setIsSegment(false)
            setIsNameFilled(false);
            return

        }
        if (isSegment) {
            setIsSegment(false)
            return
        }

        if (!campaignName) {

            setIsNameFilled(false);
            return
        }

        setFormSubmitted(true); // Set formSubmitted to true upon successful submission

        if (selectedItem && campaignName) {
            toggleForm();
        }

    }


    const dispatch = useDispatch();
    const dispatchCampaign = useDispatch();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (Object.values(emailData).some((variationData) => variationData.content === undefined && variationData.subject !== undefined && !selectedItemMessage)) {
            console.log("517s")
            handleContentCheck();

            // down for selectedItemMessage
            setSubmitCheck(true)
            console.log(submitCheck)
            emailProvider()
            return
        }


        if (Object.values(emailData).some((variationData) => variationData.content === undefined && template === null)) {
            // handleContent()
            alert("Please write your Own Email Content or create Email Template.");
            dispatch(templateEmailReducer({ generatedTemplates: null, variationId: -22 }));

            return; // Prevent further execution of the function
        }


        if (Object.values(emailData).some((variationData) => variationData.content !== undefined && variationData.subject !== undefined)) {

            if (!selectedItemMessage) {
                // alert("Please select an email service provider.");
                setSubmitCheck(true)
                console.log(submitCheck)
                emailProvider()
                return; // Prevent further execution if provider is not selected
            }
        }

        if (selectedItemMessage) {
            if (Object.values(emailData).some((variationData) => variationData.content === undefined && variationData.subject === undefined)) {
                handleSubmitCheck();
                handleContentCheck();

                return; // Prevent further execution if provider is not selected
            }
        }





        if (Object.keys(emailData).length === 0 && !selectedItemMessage) {
            // alert("Email data is empty. Please provide some data.");
            handleSubject();
            handleContent();
            // down for selectedItemMessage
            setSubmitCheck(true)
            console.log(submitCheck)
            emailProvider()
            return; // Prevent further execution of the function
        }

        if (Object.keys(emailData).length === 0) {
            // alert("Email data is empty. Please provide some data.");
            handleSubject();
            handleContent();
            return; // Prevent further execution of the function
        }

        if (Object.values(emailData).some((variationData) => variationData.content !== undefined && variationData.subject === undefined && !selectedItemMessage)) {

            handleSubmitCheck();

            // down for selectedItemMessage
            setSubmitCheck(true)
            console.log(submitCheck)
            emailProvider()
            return
        }





        // Create an object to store the collected data
        const formData: { [key: string]: { subject: string; content: string | null } } = {};

        // Iterate over the emailData object and construct the formData object
        Object.keys(emailData).forEach((key) => {
            const variationId = parseInt(key); // Convert the key to a number if needed
            const variationData = emailData[key]; // Get the data for the current variation
            console.log(variationData)
            console.log(variationData.subject)


            if (variationData.content !== undefined && template !== null) {
                console.log(template)
                const data = emailOptions[variationId]; // Get the email option for the current variation
                const emailOption = data.toString()
                if (emailOption === "custom") {
                    formData[variationId] = {
                        subject: variationData.subject || '',
                        content: variationData.content || null,
                    };
                } else if (emailOption === "template") {
                    formData[variationId] = {
                        subject: variationData.subject || '',
                        content: template,
                    };
                }
            }

            // Check if only variation content is available
            else if (variationData.content !== undefined && variationData.subject !== undefined) {
                console.log(variationData.subject)
                formData[variationId] = {
                    subject: variationData.subject || '',
                    content: variationData.content || null,
                };
            }
            // Check if only template is available
            else if (template !== null && variationData.subject !== undefined) {
                formData[variationId] = {
                    subject: variationData.subject || '',
                    content: template,
                };
            }

            onClose()

        });

        // Construct the compData object
        const compData = {
            id: nodeId,
            nodeName: nodeName,
            campaignData: {
                audience: { ...audienceData },
                message: {
                    emailServiceProvider: selectedItemMessage,
                    ...formData,
                }
            },
        };

        // alert("Form has been submitted!!")

        console.log(formData);
        console.log(compData);

        dispatchCampaign(campaignReducer(compData))
    };






    useEffect(() => {
        // Get data from localStorage
        const userAndBrandId = localStorage.getItem('userAndBrandId');

        // Post data to the iframe if it exists
        const iframe = document.querySelector('iframe');
        if (iframe) {
            const contentWindow = iframe.contentWindow;
            if (contentWindow) {
                contentWindow.postMessage({ userAndBrandId }, '*');
            }
        }
    }, []);


    return (


        <div className="fixed inset-0 z-30 flex justify-center items-center rounded-3xl ">

            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative z-50  h-[700px] pb-10 w-full max-w-screen-lg lg:max-w-screen-2xl overflow-y-auto rounded-sm bg-white py-10 px-10 md:px-14 scale-90 transition-all">
                <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer">
                    <svg className="h-4 w-auto text-gray-700 hover:opacity-50 transition-all" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 45L45 3" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M45 45L3 3" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className=' '>
                    <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse bg-white">
                        <li className={`flex items-center cursor-pointer ${showAudienceForm ? 'text-blue-600' : 'text-gray-500'}`} onClick={toggleAudienceForm}>
                            <span className="flex items-center justify-center w-7 h-7 me-2 text-xs border  rounded-full shrink-0 border-2 ">
                                1
                            </span>
                            AUDIENCE
                            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                            </svg>
                        </li>
                        <li className={`flex items-center cursor-pointer ${showMessageForm ? 'text-blue-600' : 'text-gray-500'}`} onClick={toggleMessageForm}>
                            <span className="flex items-center justify-center w-7 h-7 me-2 text-xs border rounded-full shrink-0 ">
                                2
                            </span>
                            MESSAGE
                            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                            </svg>
                        </li>
                    </ol>


                    {/* Audience form content */}
                    <form onSubmit={adienceForm} className={` mt-14 ml-7 max-w-3xl ${showAudienceForm ? '' : 'hidden'}`}>

                        <div className={`my-5 flex flex-row gap-16 max-lg:flex-col max-lg:gap-3 lg:w-2xl `}>
                            <label className="block mb-2 ml-2 text-sm font-medium text-gray-500 w-[430px] text-[18px] flex justify-start items-center">CAMPAIGN NAME:</label>



                            <input
                                type="text"
                                id="campaignName"
                                // ${!isNameFilled && !isInputFocused ? 'placeholder-red-500' : ''} ${!isNameFilled ? 'border border-red-500' : ''}`}
                                placeholder={isNameFilled || isInputFocused ? 'Campaign Name' : 'Campaign Name (required)'}
                                className={` text-gray-900 rounded-lg block lg:w-[1250px] max-sm:w-[260px] max-md:w-[400px] h-14 p-2.5 text-lg ${!isNameFilled && !campaignName ? 'placeholder-red-500  border border-red-500' : ''}  border border-gray-300 focus:border-blue-500 focus:ring-blue-500 `}
                                value={campaignName}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                            // required
                            />
                            {/* <p className="${!isNameFilled && !isInputFocused ? 'placeholder-red-500' : ''} ${!isNameFilled ? 'border border-red-500' : ''}`}">  Please enter a valid campaign title.</p>
                        </div> */}
                        </div>



                        {/* ss */}
                        <div className="my-5  lg:ml-2 flex flex-row gap-10 max-lg:flex-col max-lg:gap-5 lg:w-2xl  ">
                            <label className="block mb-2 text-sm font-medium  text-gray-500  w-[200px] text-[18px] flex justify-start items-center">CAMPAIGN TAGS:</label>
                            <div className='relative inline-block'>

                                <button
                                    id="dropdownCheckboxButton"
                                    data-dropdown-toggle="dropdownDefaultCheckbox"
                                    className=" font-light lg:w-[450px]  w-[260px]  border border-gray-200 border-2 focus:border-blue-300 focus:ring-blue-300 rounded-lg text-lg px-10 py-2.5 text-center inline-flex items-center  relative"
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {selectedCheckboxes.length > 0 ? selectedCheckboxes.slice(0, 3).join(', ') + (selectedCheckboxes.length > 2 ? '...' : '') : 'Dropdown Tag'}
                                    <svg className="w-2.5 h-2.5 absolute right-4 top-1/2 transform -translate-y-1/2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>



                                {/* Dropdown menu */}
                                {isOpen && (
                                    <div id="dropdownDefaultCheckbox" className="z-10 w-[450px] absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow">

                                        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                                            <li>
                                                <label className="flex items-center hover:bg-gray-100 h-12">
                                                    <input id="checkbox-item-1" type="checkbox" value="Automation" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={toggleCheckbox} />
                                                    <span className="ml-2 text-base text-black">Automation</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center hover:bg-gray-100 h-12">
                                                    <input id="checkbox-item-2" type="checkbox" value="Campaign" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={toggleCheckbox} />
                                                    <span className="ml-2 text-base text-black">Campaign</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label className="flex items-center hover:bg-gray-100 h-12">
                                                    <input id="checkbox-item-3" type="checkbox" value="Welcome" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" onChange={toggleCheckbox} />
                                                    <span className="ml-2 text-base text-black">Welcome</span>
                                                </label>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <input type="text" value={customInputValue} onChange={(e) => setCustomInputValue(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                                                    <button type="button" onClick={handleCustomInputAdd} className="ml-2 px-3 py-2 bg-blue-500 text-black rounded-md">Add</button>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* 3rd row */}

                        <div className="my-5 lg:ml-2 flex flex-row gap-10 max-lg:flex-col max-lg:gap-5 lg:w-2xl">
                            <label className="block mb-2 text-sm font-medium  text-gray-500  lg:w-[200px] text-[18px] flex justify-start items-center">SENT TO USERS/SEGMENT:</label>
                            <div>
                                <div className="relative inline-block text-left">
                                    {/* Dropdown button */}
                                    <button
                                        onClick={toggleDropdown}
                                        onBlur={handleButtonBlur}
                                        type="button"
                                        className={`border border-gray-200 focus:border-blue-300 focus:ring-blue-300  w-[260px]  lg:w-[450px] rounded-lg text-lg px-10 py-2.5 font-light text-center inline-flex items-center border-2 relative
                                        ${(!selectedItem && !isSegment) && "border-red-300"}
                                        `}
                                    >
                                        {/* Display selected item or "SEGMENT" if no item is selected */}
                                        {selectedItem ? selectedItem : 'SEGMENT'}
                                        <svg
                                            className="w-2.5 h-2.5 absolute right-4 top-1/2 transform -translate-y-1/2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {(!selectedItem && !isSegment) && <p className={`${!selectedItem ? "text-red-500" : ""}`}>
                                        Segment is required.</p>}

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="z-10 w-[450px] absolute right-0 mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow ">
                                            <ul
                                                className="py-2 text-sm text-black"
                                                aria-labelledby="dropdownDividerButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black"
                                                        onClick={(e) => {
                                                            e.preventDefault(); // Prevent default anchor behavior
                                                            handleSelect('New Segment : Gender - Female');
                                                        }}
                                                    >
                                                        New Segment : Gender - Female
                                                    </a>
                                                </li>

                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSelect(' New Segment : Gender - male | city')
                                                        }}
                                                    >
                                                        New Segment : Gender - male | city
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black "
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSelect(' New Segment : Gender - Female | city')
                                                        }}
                                                    >
                                                        New Segment : Gender - Female | city
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>

                        <div className="buttons-section">

                            {/* Your existing buttons */}
                            <div className=" fixed -bottom-0 left-0 w-full">
                                <div className="w-full h-20 bg-blue-100 relative">
                                    <div className="absolute right-8 top-3">
                                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md px-7 py-3 text-center me-2 mb-2">
                                            <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-md " />
                                            {currentForm === 'audience' ? 'Next' : 'Back'}
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                    {/* Message form content */}
                    <form className={`mt-14 mb-10 ml-7 max-w-7xl ${showMessageForm ? '' : 'hidden'}`} onSubmit={handleSubmit}>


                        <div className="my-5  flex flex-row gap-10 max-lg:flex-col max-lg:gap-5 lg:w-2xl">
                            <label className="block mb-2 text-sm font-medium  text-gray-500  lg:w-[240px] text-[18px] flex justify-start items-center">EMAIL SERVICE PROVIDER:</label>
                            <div>
                                <div className="relative inline-block text-left">
                                    {/* Dropdown button */}
                                    <button
                                        onClick={toggleDropdown}
                                        type="button"
                                        onBlur={emailProvider}
                                        className={`border border-gray-200 focus:border-blue-500 focus:ring-blue-500  w-[260px]  lg:w-[450px] rounded-lg text-lg px-10 py-2.5 font-light text-center inline-flex items-center border-2 relative
                                                ${(!isProvider && !selectedItemMessage) && "border-red-300"}
            `}
                                    >
                                        {/* Display selected item or "SEGMENT" if no item is selected */}
                                        {selectedItemMessage ? selectedItemMessage : 'PROVIDER'}
                                        <svg
                                            className="w-2.5 h-2.5 absolute right-4 top-1/2 transform -translate-y-1/2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 10 6"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 4 4 4-4"
                                            />
                                        </svg>
                                    </button>
                                    {(!selectedItemMessage && !isProvider) && <p className='text-red-500'>
                                        Email Provider is required.</p>}
                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="z-10 w-[450px] absolute right-0 mt-2  bg-white divide-y divide-gray-100 rounded-lg shadow ">
                                            <ul
                                                className="py-2 text-sm text-black"
                                                aria-labelledby="dropdownDividerButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black "
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSelectMessage('EMAIL SERVICE PROVIDER 1 ')
                                                        }}
                                                    >
                                                        EMAIL SERVICE PROVIDER 1                                     </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSelectMessage(' EMAIL SERVICE PROVIDER 2')
                                                        }}
                                                    >
                                                        EMAIL SERVICE PROVIDER 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-base hover:bg-gray-100 text-black "
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSelectMessage(' EMAIL SERVICE PROVIDER 3')
                                                        }}
                                                    >
                                                        EMAIL SERVICE PROVIDER 3
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>
                                    )}


                                </div>
                            </div>
                        </div>

                        {/* buttons */}


                        <label className="block mb-2 text-sm font-medium  text-gray-500  lg:w-[240px] text-[18px] flex justify-start items-center">   CAMPAIGN MESSAGE:</label>
                        <div className="flex flex-wrap shadow-lg ">

                            {buttons.map((button) => (
                                <div
                                    key={button.id}
                                    className={`relative mr-2 mb-2 flex justify-center items-center ${selectedButtonId === button.id ? 'border border-purple-800 rounded-lg' : ''}`}
                                >
                                    <button
                                        className="pl-4 pr-4 py-2 rounded-lg text-black mr-2 relative"
                                        onClick={() => handleButtonClick(button.id)}
                                        type="button"
                                    >
                                        {button.text}
                                    </button>
                                    {buttons.length > 1 && (
                                        <button
                                            className=" mt-1 mr-2 ml-2 text-white"
                                            onClick={() => handleDeleteButtonClick(button.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-red-500 " />
                                        </button>
                                    )}
                                </div>
                            ))}


                            {buttons.length < 5 && ( // Conditionally render Add Button if less than 5 buttons
                                <button

                                    onClick={handleAddButtonClick}
                                >
                                    <span><FontAwesomeIcon icon={faCirclePlus} className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 text-[#1e3a8a]  ' /></span>

                                </button>
                            )}
                        </div>

                        {/* simpleInput */}
                        <div className="my-5 mt-7 flex gap-3 flex-col lg:w-2xl">
                            <label className="block mb-2 ml-2 text-sm font-medium text-gray-500 w-[430px] text-[18px] flex justify-start items-center">Email Subject:</label>
                            <input
                                type="text"
                                id="campaignName"
                                className={`border border-gray-400 focus:border-blue-500 focus:ring-blue-500 text-gray-900 rounded-lg block w-[800px] h-14 p-2.5 text-lg
                                ${(!emailData[selectedButtonId!]?.subject && !subject) && "border-red-500"}
                                `}
                                placeholder="Title"
                                value={emailData[selectedButtonId!]?.subject || ''}
                                onChange={handleInputChange1}
                                onBlur={handleSubject}
                            // required
                            />
                            {(!emailData[selectedButtonId!]?.subject && !subject) && <p className='text-red-500'> Subject is required.</p>}

                        </div>

                        {/* Render the variation buttons */}
                        {buttons.map((button) => (
                            <div key={button.id}>

                                {/* Conditionally render the email content options */}
                                {selectedButtonId === button.id && (
                                    <div>
                                        <input
                                            type="radio"
                                            id={`customOption${button.id}`}
                                            name={`emailOption${button.id}`}
                                            value="custom"
                                            checked={getSelectedOption(button.id) === 'custom'}
                                            onChange={() => handleOptionChange(button.id, 'custom')}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`customOption${button.id}`} className="mr-2">Write Your Own Email Content</label>

                                        <input
                                            type="radio"
                                            id={`templateOption${button.id}`}
                                            name={`emailOption${button.id}`}
                                            value="template"
                                            checked={getSelectedOption(button.id) === 'template'}
                                            onChange={() => handleOptionChange(button.id, 'template')}

                                            className="mr-2"
                                        />
                                        <label htmlFor={`templateOption${button.id}`} className="mr-2" >Create Email Template</label>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Render the variation buttons */}
                        {buttons.map((button) => (
                            <div key={button.id}>


                                {/* Conditionally render the email content options */}
                                {selectedButtonId === button.id && (
                                    <div>
                                        {emailOptions[selectedButtonId] === 'custom' && (
                                            <div>
                                                <textarea
                                                    id="emailContent"
                                                    className={`border border-gray-400 focus:border-blue-500 focus:ring-blue-500 text-gray-900 rounded-lg block w-[900px] h-72 p-2.5 text-lg
                                                    ${(!emailData[selectedButtonId!]?.content && !content) && "border-red-500"}
                                                    `}
                                                    placeholder="Email Content"
                                                    value={emailData[selectedButtonId]?.content || ''}
                                                    onChange={handleEmailContentChange}
                                                    onBlur={handleContent}
                                                />
                                                {(!emailData[selectedButtonId!]?.content && !content) && <p className='text-red-500'>  Body content is required.</p>}

                                            </div>


                                        )}

                                        {emailOptions[selectedButtonId] === 'template' && (
                                            <div className="email-template">

                                                {/* <EmailEditorTemplate variationId={selectedButtonId} /> */}
                                                <EmailEditorTemplate />




                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button type="submit" className="float-right mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2">
                            <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-md " />
                            Submit
                        </button>
                    </form>

                </div>

            </div>
        </div>

    );
}

export default Popup;


// <div className="fixed inset-0 z-30 flex justify-center items-center rounded-3xl">
//       <div className="absolute inset-0 bg-black" onClick={onClose}>
//         <div className="relative z-50 h-[700px] pb-10 w-full max-w-screen-lg lg:max-w-screen-2xl overflow-y-auto rounded-sm bg-white py-10 px-10 md:px-14 scale-90 transition-all">
//           <iframe
//             title="Email Campaign"
//             src="http://localhost:4200/dash/65f930a4f0dd63fb7b13b8b8/email/campaign/list"
//             className="w-full h-screen"
//           />
//         </div>
//       </div>
//     </div>

//     );
// }

// export default Popup;
