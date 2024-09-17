import { Chip, InputLabel, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { journeyNameReducer, segmentSelect } from '../../reducer/slice';
import Navbar from './Navbar'

interface Segment {
    _id: string;
    name: string;
}

interface JourneyName {
    updateJourneyName: (value: any) => void;
    segmentNameProps: (value: any) => void;
}

const TriggerSetup: React.FC<JourneyName> = ({ updateJourneyName, segmentNameProps }) => {
    const [selectedSegment, setSelectedSegment] = useState(localStorage.getItem('selectedSegment') || '');
    const [segmentData, setSegmentData] = useState<any[]>([]);
    const [selectedObject, setSelectedObject] = useState<{ [name: string]: string } | null>(null);
    const [journeyName, setJourneyName] = useState("");

    // const [journeyName, setJourneyName] = useState(localStorage.getItem('journeyName') || "");
    const segmentObjects: { [name: string]: string } = {};

    // useEffect(() => {
    //     fetch('https://api.capengage.com/65f930a4f0dd63fb7b13b8b8/segment')
    //         .then(response => response.json())
    //         .then((data: Segment[]) => setSegmentData(data))
    //         .catch(error => console.error('Error fetching segment data:', error));
    // }, []);

    segmentData.forEach(segment => {
        segmentObjects[segment.name] = segment._id;
    });

    const dispatch = useDispatch()
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedName = event.target.value;
        // segmentNameProps(selectedName)
        setSelectedSegment(selectedName);
        setSelectedObject(segmentObjects[selectedName] ? { [selectedName]: segmentObjects[selectedName] } : null);
        dispatch(segmentSelect(segmentObjects[selectedName] ? { [selectedName]: segmentObjects[selectedName] } : null));
        localStorage.setItem('selectedSegment', selectedName);
    };

    const dispatchJourneyName = useDispatch()
    const handleChangeJourneyName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const name = e.target.value;
        setJourneyName(name);
        updateJourneyName(name);
        dispatchJourneyName(journeyNameReducer(name));
        // localStorage.setItem('journeyName', name);
    }

    return (
        <div>
            <div className="xl:container xl:mx-auto px-4 py-10 h-screen w-full bg-slate-50">
                <div className='flex flex-row  gap-12 w-full'>
                    <div className=' w-1/2  border-2 h-[480px] rounded-lg shadow-lg'>
                        <div className=' h-16 border-b-2 border-gray-400 flex justify-between items-center '>
                            <h2 className='ml-3 text-lg'>Setting Trigger</h2>
                            <h2 className='mr-3'>
                                <Chip label="Trigger" />
                            </h2>
                        </div>
                        <div className='border-2 bg-slate-100 mt-10 mx-10 mb-5 h-[250px] rounded-lg '>
                            <div className='mt-5 mx-5 '>
                                {/* <div className="my-5 flex flex-row gap-3 max-lg:flex-col max-lg:gap-3 ">
                                    <div className={`mb-2 ml-2 text-sm font-medium ${journeyName ? 'text-gray-500' : 'text-red-500'} flex justify-center items-center`}>Journey's Name:</div>
                                    <input
                                        type="text"
                                        id="campaignName"
                                        placeholder="Write journey's Name"
                                        className={`text-gray-900 rounded-lg block h-9 p-2.5 text-sm border ${journeyName ? 'border-gray-300' : 'border-red-500'} focus:border-blue-500 focus:ring-blue-500 `}
                                        value={journeyName}
                                        onChange={handleChangeJourneyName}
                                    />
                                </div> */}





                                <div className='flex justify-start mt-10 items-center gap-5'>
                                    <InputLabel htmlFor="my-input" className='text-md  ' style={{ fontWeight: 'bold' }}>
                                        <b>Journey Name:</b> </InputLabel>

                                    <TextField
                                        style={{ width: '55%', height: "30%" }}
                                        required
                                        type="text"
                                        id="campaignName"
                                        placeholder="Write journey's Name"
                                        label="Required"
                                        value={journeyName}
                                        onChange={handleChangeJourneyName}
                                    // error={campaignNameError}
                                    // helperText={
                                    //     campaignNameError ? "Please write campaign Name (letters and spaces only)" : ""
                                    // }
                                    // inputProps={{
                                    //     pattern: "[A-Za-z ]+",
                                    // }}
                                    // defaultValue="Hello World"
                                    />
                                </div>











                                {/* <div>
                                    <h2 className='font-bold '>
                                        Select a dynamic segment
                                    </h2>
                                    <select
                                        className="flex-1 h-10 w-52 mt-3 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        value={selectedSegment}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Segment</option>
                                        <option value="testing">Testing</option>

                                        {Object.keys(segmentObjects).map((key, index) => (
                                            <option key={index} value={key} className="text-base h-10">
                                                
                                                {key}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}
                            </div>
                        </div>
                        <p className='mx-5 pb-5'>
                            You can't change the trigger once it is setup. This is why. If you need a different trigger with the current configuration, you can achieve it by duplicating it.
                        </p>
                    </div>


                    <div className=' w-1/2 flex justify-center items-center   rounded-lg'>                                    <img src='https://eu1.dashboard.clevertap.com/images/integration/journeys.png?v=1bb009975e6c5efee2047fd2b74679c9' className='' alt='' />
                    </div>
                    {/* Advanced Settings */}
                    {/* <div className=' w-1/3 h-[400px] rounded-lg'>
                        <div className='container'>
                            <div className='w-full bg-white h-[70px] my-5 border-e-2 rounded-lg shadow-lg hover:scale-105'>
                                <div className='m-5 p-3'>
                                    <h3>Set Journey Goal</h3>
                                    <p>Measure conversion and ROI for your campaigns</p>
                                </div>
                            </div>
                        </div>

                        <div className='container'>
                            <div className='w-full my-5 bg-white h-[70px] border-e-2 rounded-lg shadow-lg hover:scale-105'>
                                <div className='m-5 p-3'>
                                    <h3>Edit Enrollment Frequency</h3>
                                    <p>Contacts can enter the journey only once.</p>
                                </div>
                            </div>
                            <div className='w-full bg-white my-5 h-[70px] border-e-2 rounded-lg shadow-lg hover:scale-105'>
                                <div className='m-5 p-3'>
                                    <h3>Set Exit Criteria</h3>
                                    <p>Define when the contacts will exit the journey</p>
                                </div>
                            </div>
                        </div>

                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default TriggerSetup;