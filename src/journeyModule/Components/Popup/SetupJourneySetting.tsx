

import React, { FormEvent, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InputLabel, TextField, Button, Radio, RadioGroup, FormControlLabel, Grid, DialogContent, DialogActions } from '@mui/material';
import { faCircleXmark, faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Divider from '@mui/material/Divider';


// date and time picker
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


// date picker addtional 

import { DatePicker } from '@mui/x-date-pickers/DatePicker';



// dropdown 
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// repead on

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


// check box

import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { setupfilledReducer, setUpformDataIdReducer, setUpformDataReducer } from '../../../reducer/slice';
import axios from 'axios';
// import { environment } from '../../../../environments/environment';



interface SetupSettingsPopupProps {
    changeToFalse: (data: any) => any; // Accepts an argument of any type and returns any type
}

export default function SetupSettingsPopup({ changeToFalse }: SetupSettingsPopupProps) {


    const journeyNameSelector = useSelector((state: any) => state.data.journeyName.value);
    const [journeyName, setJourneyName] = React.useState(journeyNameSelector);
    const [entryCriteria, setEntryCriteria] = React.useState('Past behavior/Custom list');

    const [urlProduction,setUrlProduction] = useState("https://journey-api.capengage.com/");
    // const [urlDevelopment,setUrlDevelopment] = useState("http://localhost:3000/");
    // const urlDevelopment = process.env['REACT_APP_DEV_URL'] as string;

    
    // // selector
    // const setupCheckCloseOpen = useSelector((state: any) => state.data.setUpformCloseOpenSlice.value)



    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);

    // date and time picker

    const [dateAndTime, setDateAndTime] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const handleChangeDateAndTime = (newValue: any) => {
        setDateAndTime(newValue);
    };

    const [dateAndTimeEnds, setDateAndTimeEnds] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

    const handleChangeDateAndTimeEnds = (newValue: any) => {
        setDateAndTimeEnds(newValue);
    };

    // additional date picker
    const [additionalDatePicker, setAdditionalDatePicker] = React.useState<Dayjs | null>(dayjs('2024-04-17'));

    const handleAdditionalDatePicker = (newValue: any) => {
        setAdditionalDatePicker(newValue)
    }



    const [additionalDates, setAdditionalDates] = React.useState<(Date | null)[]>([]);

    const handleAddDatePicker = () => {
        setAdditionalDates([...additionalDates, null]);
    };

    const handleAdditionalDatePickerChange = (index: number, newValue: Date | null) => {
        const updatedDates = [...additionalDates];
        updatedDates[index] = newValue;
        setAdditionalDates(updatedDates);
    };

    const handleDeleteDatePicker = (index: number) => {
        const updatedDates = [...additionalDates];
        updatedDates.splice(index, 1);
        setAdditionalDates(updatedDates);
    };


    // journeyName
    const handleJourneyNameChange = (event: any) => {
        setJourneyName(event.target.value);
    };

    const handleEntryCriteriaChange = (event: any) => {
        setEntryCriteria(event.target.value);
    };



    //  dnd radio handling

    const [dndRadioHandling, setDndRadioHandling] = React.useState("Discard messages scheduled during DND. (users will progress through the unreachable path)");

    const handleChangeDndRadioHandling = (event: any) => {
        setDndRadioHandling(event.target.value);
    };

    // 

    const [Timeline, setTimeline] = React.useState('One Time Only');

    const handleTimelinesChange = (event: any) => {
        setTimeline(event.target.value);

    }

    const [oneTime, setOneTime] = React.useState('Now');

    const handleOneTimeChange = (event: any) => {
        setOneTime(event.target.value);

    }

    const [multipleTimeEnds, setMultipleTimeEnds] = React.useState('Never');

    const handleMultipleTimeEndsChange = (event: any) => {
        setMultipleTimeEnds(event.target.value);

    }


    // for then day of month and week 

    const [dayOfMonthWeek, setDayOfMonthWeek] = React.useState('Day of Month');

    const handleDayOfMonthWeekChange = (event: any) => {
        setDayOfMonthWeek(event.target.value);

    }



    // swap code based on condtions
    const [enterUser, setEnterUser] = React.useState(true)




    // 
    const [accordionExpanded, setAccordionExpanded] = React.useState(true);
    const handleAccordionChange = () => {
        setAccordionExpanded(!accordionExpanded);
    };

    const [accordionExpandedMain, setAccordionExpandedMain] = React.useState(true);
    const handleAccordionChangeMain = () => {
        setAccordionExpandedMain(!accordionExpandedMain);
    }


    const [accordionExpanded2, setAccordionExpanded2] = React.useState(true);
    const handleAccordionChange2 = () => {
        setAccordionExpanded2(!accordionExpanded2);
    };



    // number input for recurring 

    const [number, setNumber] = React.useState(1);

    const handleChangeNumber = (event: any) => {
        const newNumber = Number(event.target.value);
        if (!isNaN(newNumber) && newNumber >= 1) {
            setNumber(newNumber);
        }
    };


    // number input for Timeout

    const [numberTimeout, setNumberTimeout] = React.useState(6);

    const handleChangeNumberTimeout = (event: any) => {
        const newNumber = Number(event.target.value);
        if (!isNaN(newNumber) && newNumber >= 1) {
            setNumberTimeout(newNumber);
        }
    };

    //  dropdown day week and month recurring
    const [repeatEvery, setRepeatEvery] = React.useState('Day');
    const handleChangeRepeatEvery = (event: any) => {
        setRepeatEvery(event.target.value);
    }

    // dropdown timeout 

    const [timeout, setTimeout] = React.useState('Month');
    const handleChangeTimeout = (event: any) => {
        setTimeout(event.target.value);
    }



    type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

    const daysOfWeek: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [selectedDays, setSelectedDays] = React.useState<Record<DayOfWeek, boolean>>({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    const handleToggleDay = (day: any) => {
        setSelectedDays((prev: any) => ({
            ...prev,
            [day]: !prev[day],
        }));
    };


    // for months
    const daysInMonth = 31; // You can modify this based on the actual number of days in the month

    // Generate an array of numbers from 1 to 31
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // State to track which days are selected
    const [selectedDaysMonth, setSelectedDaysMonth] = React.useState<Record<number | string, boolean>>({});

    // Function to handle click on a day
    const handleDayClick = (day: number | string) => {
        setSelectedDaysMonth(prevState => {
            if (prevState[day]) {
                const { [day]: removedDay, ...rest } = prevState;
                return rest;
            } else {
                return { ...prevState, [day]: true };
            }
        });
    };



    // for week in month repeat


    type DayOfWeekMonthRepeat = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    const labels = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];

    const dayOfWeekMonthRepeat: DayOfWeekMonthRepeat[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [daysOfWeekInMonthsRepeat, setDaysOfWeekInMonthsRepeat] = React.useState<Array<Record<DayOfWeekMonthRepeat, boolean>>>(
        Array(6).fill({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,
        })
    );

    const handleToggleDayOfWeekMonthRepeat = (index: number, day: DayOfWeek) => {
        setDaysOfWeekInMonthsRepeat(prevSelectedDays =>
            prevSelectedDays.map((slot, i) =>
                i === index ? { ...slot, [day]: !slot[day] } : slot
            )
        );

    };


    React.useEffect(() => {
        console.log("this is the week in month repeat " + JSON.stringify(daysOfWeekInMonthsRepeat))

    }, [daysOfWeekInMonthsRepeat])





    // check box re enter journey

    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [storedText, setStoredText] = React.useState<string>('');

    const handleCheckboxChange = (event: any) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        if (checked) {
            setStoredText('Allow user to re-enter the journey');
        } else {
            setStoredText('');
        }
    };


    // check box DnD

    // check box re enter journey

    const [isCheckedDndDayAndTime, setIsCheckedDndDayTime] = React.useState<boolean>(false);
    const [storedTextDndDayAndTime, setStoredTextDndDayAndTime] = React.useState<string>('');

    const handleCheckboxChangeDndDayAndTime = (event: any) => {
        const checked = event.target.checked;
        setIsCheckedDndDayTime(checked);
        if (checked) {
            setStoredTextDndDayAndTime('Allow user to re-enter the journey');
        } else {
            setStoredTextDndDayAndTime('');
        }
    };



    //   check box time zone DnD

    const [isCheckedDndTimeZone, setIsCheckedDndTimeZone] = React.useState<boolean>(false);
    const [storedTextDndTimeZone, setStoredTextDndTimeZone] = React.useState<string>('');

    const handleCheckboxChangeDndTimeZone = (event: any) => {
        const checked = event.target.checked;
        setIsCheckedDndTimeZone(checked);
        if (checked) {
            setStoredTextDndTimeZone('Time zone');
        } else {
            setStoredTextDndTimeZone('');
        }
    };




    interface RepeatData {
        number: number;
        repeatEvery: string;
        selectedDaysMonth?: Record<string, boolean>;
        daysOfWeekInMonthsRepeat?: Array<Record<string, boolean>>;
        selectedDays?: Record<string, boolean>;
    }





    const [setupResponse, setSetupResponse] = useState("");

    const dispatchSetupnode = useDispatch();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();



        const formatDateTime = (dayjsObject: any) => {
            if (!dayjsObject) return null;
            return {
                date: dayjsObject.format('YYYY-MM-DD'),
                time: dayjsObject.format('HH:mm:ss')
            };
        };



        const setupData = {
            journeyName: journeyName,
            JourneyEntryTimelines: (() => {
                if (Timeline === "One Time Only") {
                    return oneTime === "Now"
                        ? { oneTime: "Now" }
                        : { oneTime_StartDateTime: formatDateTime(dateAndTime) };
                } else if (Timeline === "Multiple Entry") {
                    const startDateTime = oneTime === "Now" ? { oneTime: "Now" } : { oneTime_StartDateTime: formatDateTime(dateAndTime) };
                    const endDateTime = multipleTimeEnds === "End on" ? { multipleEntry_EndDateTime: formatDateTime(dateAndTimeEnds) } : { multipleEntry_EndDateTime: "Never" };
                    return {
                        multipleEntry_StartDateTime: startDateTime,
                        multipleEntry_EndDateTime: endDateTime,
                        additionalDates: additionalDates.map(date => formatDateTime(date))
                    };
                } else if (Timeline === "Recurring Entry") {
                    const startDateTime = oneTime === "Now" ? { oneTime: "Now" } : { oneTime_StartDateTime: formatDateTime(dateAndTime) };
                    const endDateTime = multipleTimeEnds === "End on" ? { recurringEntry_EndDateTime: formatDateTime(dateAndTimeEnds) } : { recurringEntry_EndDateTime: "Never" };

                    const repeatData: RepeatData = { number, repeatEvery };

                    if (repeatEvery === "Month") {
                        if (dayOfMonthWeek === "Day of Month") {
                            repeatData.selectedDaysMonth = selectedDaysMonth;
                        } else if (dayOfMonthWeek === "Day of Week") {
                            repeatData.daysOfWeekInMonthsRepeat = daysOfWeekInMonthsRepeat;
                        }
                    } else if (repeatEvery === "Week") {
                        repeatData.selectedDays = selectedDays;
                    }

                    return {
                        recurringEntry_StartDateTime: startDateTime,
                        recurringEntry_EndDateTime: endDateTime,
                        repeatData
                    };
                } else {
                    return {};
                }
            })(),
            entryCriteria: entryCriteria, // Add entryCriteria to setupData
            dndAndTimezone: { // Add DND & Timezone data to setupData
                dndEnabled: isCheckedDndDayAndTime,
                // dndHandling,
                dndDays: selectedDays,
                timezoneEnabled: isCheckedDndTimeZone
            },
            timeout: {
                value: numberTimeout,
                unit: timeout
            }
        };
            // 

        try {   
            const response = await axios.post(`http://localhost:3000/journey/setupJourneyData`, setupData);
            console.log(response.data);

            setSetupResponse(response.data)
            changeToFalse(response.data)
        } catch (error) {
            console.error('Error:', error);
            changeToFalse(false)
        }
        if(setupResponse)changeToFalse(setupResponse)
        else changeToFalse(false)

        console.log(setupData);

    };


    // useEffect(() => {
    //     if (setupResponse) {
    //         dispatchSetupnode(setUpformDataReducer(setupResponse));
    //     }
    // }, [setupResponse, dispatchSetupnode]);


    //    useEffect(() => {
    //     if (setupResponse) {
    //         dispatchSetupnode(setUpformDataIdReducer(setupResponse));
    //     }
    // }, [setupResponse, dispatchSetupnode]);

    return (
        <div>

            <DialogContent dividers>
                <div className='flex justify-start min-h-screen'>
                    <div className='w-full bg-white  rounded-md shadow-md'>

                        <div className="flex flex-col justify-start items-start gap-1 w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                            <InputLabel htmlFor="journey-name" className='text-[8px]' style={{ fontWeight: 'bold' }}>
                                Journey Name:
                            </InputLabel>
                            <TextField

                                sx={{
                                    width: '50%',
                                    '& .MuiInputBase-root': {
                                        height: '30px', // Adjust this value as needed
                                    },
                                    '& .MuiInputLabel-root': {
                                        top: '50%',
                                        left: "5px",
                                        transform: 'translateY(-50%)', // Center the label vertically
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        top: '0',
                                        left: "2",
                                        transform: 'translate(0, -2px) scale(0.75)', // Ensure the label shrinks properly
                                    },

                                }}
                                className="bg-slate-100 border-0 pb-5 "
                                required
                                disabled
                                id="journey-name"
                                // label="Required"
                                placeholder='My Journey Name'
                                value={journeyName}
                                onChange={handleJourneyNameChange}

                            />
                        </div>
                        <Accordion defaultExpanded
                            sx={{
                                borderRadius: '8px',
                            }}
                        // onClick={handleAccordionChangeMain}
                        >
                            <AccordionSummary
                                sx={{
                                    backgroundColor: "#FFD1DF",
                                    // backgroundColor: accordionExpandedMain ? "#FFD1DF" : "transparent",
                                    minHeight: '45px',
                                    height: '45px',
                                    borderRadius: '8px 8px 0 0',

                                    '&.Mui-expanded': {
                                        minHeight: '45px',
                                        height: '45px',
                                    },
                                    '& .MuiAccordionSummary-content': {
                                        margin: 0,
                                    },
                                    padding: '0 16px',
                                }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                className="flex justify-start items-center rounded-lg "
                            >
                                <div className="bg-pink-300 w-8 h-8 border rounded-full flex justify-center items-center mr-2">
                                    <FontAwesomeIcon icon={faGear} className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <Typography className='font-medium tracking-wider text-[14px]'>
                                        Setup
                                    </Typography>
                                    <p className='tracking-wider text-slate-900 text-xs '>
                                        Set Time and Limit for Journey
                                    </p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>


                                {/* first sub-accordion  */}
                                {enterUser ? (<Accordion
                                    sx={{
                                        marginBottom: "15px",
                                        marginTop: "15px",
                                        borderRadius: '8px',
                                    }}
                                    defaultExpanded
                                >
                                    <AccordionSummary
                                        onClick={handleAccordionChange}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                        sx={{
                                            backgroundColor: accordionExpanded ? "#F9F9FB" : "transparent",
                                            minHeight: '45px',
                                            height: '45px',
                                            borderRadius: '8px 8px 0 0',

                                            '&.Mui-expanded': {
                                                minHeight: '45px',
                                                height: '45px',
                                            },
                                            '& .MuiAccordionSummary-content': {
                                                margin: 0,
                                            },
                                            padding: '0 16px',
                                        }}
                                    >
                                        <Typography>Journey Entry Criteria</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <h2 className="mb-3">
                                            Enter Users
                                        </h2>

                                        <div className='h-20 m-2 w-[500px] shadow-lg rounded-lg border border-slate-200 '>
                                            <RadioGroup
                                                aria-label="entry-criteria"
                                                name="entry-criteria"
                                                // value={entryCriteria}
                                                defaultValue="Past behavior/Custom list"

                                                onChange={handleEntryCriteriaChange}
                                            >
                                                <FormControlLabel
                                                    value="Past behavior/Custom list"
                                                    sx={{ marginLeft: "10px" }}
                                                    control={<Radio />}
                                                    label="Past behavior/Custom list"
                                                />
                                                {/* <FormControlLabel value="liveBehavior" control={<Radio />} label="Live behavior" />
                                 */}

                                            </RadioGroup>
                                            <p className='text-[10px] ml-12 w-[350px] '>
                                                Qualify users based on an activity they performed or have been performing in the past, for example "check-out".

                                            </p>

                                        </div>
                                        <Button variant="outlined"
                                            sx={{
                                                fontSize: "12px",
                                                padding: "4px",
                                                marginTop: "3px",
                                            }}
                                            onClick={() => setEnterUser(false)}
                                        >Continue</Button>
                                    </AccordionDetails>
                                </Accordion>) :
                                    // first sub-accordion : condition -display users
                                    <div className="flex flex-col justify-start items-start gap-1 w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                                        <div className="flex justify-between w-full">
                                            <InputLabel htmlFor="journey-name"
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: "14px",
                                                }}>
                                                Journey entry criteria
                                            </InputLabel>
                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => setEnterUser(true)}
                                            />
                                        </div>
                                        <Divider
                                            sx={{
                                                width: "800px",
                                                marginBottom: "5px",
                                            }}
                                        />
                                        <h2 className=" text-[15px] font-bold">
                                            Enter Users
                                        </h2>
                                        <h3 className="mb-1 text-[12px]">
                                            {entryCriteria}
                                        </h3>
                                    </div>
                                }


                                {/* 2nd sub-accordion  */}
                                <Accordion
                                    sx={{
                                        marginBottom: "15px",
                                        borderRadius: '8px',

                                    }}


                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                        onClick={handleAccordionChange2}

                                        sx={{
                                            backgroundColor: accordionExpanded2 ? "transparent" : "#F9F9FB",
                                            minHeight: '45px',
                                            height: '45px',
                                            borderRadius: '8px 8px 0 0',

                                            '&.Mui-expanded': {
                                                minHeight: '45px',
                                                height: '45px',
                                            },
                                            '& .MuiAccordionSummary-content': {
                                                margin: 0,
                                            },
                                            padding: '0 16px',
                                        }}

                                    >
                                        <Typography>Journey Entry Timelines</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <div className=' w-full shadow-lg rounded-lg '>
                                            <RadioGroup
                                                aria-label="entry-criteria"
                                                name="entry-criteria"
                                                value={Timeline}
                                                sx={{
                                                    fontSize: "17px"
                                                }}
                                                defaultValue="One Time Only"


                                                onChange={handleTimelinesChange}
                                            >
                                                <FormControlLabel
                                                    value="One Time Only"
                                                    sx={{ marginLeft: "10px" }}
                                                    control={<Radio />}
                                                    label="One Time Only"
                                                />
                                                {/* for one time only */}
                                                {Timeline === "One Time Only" && (
                                                    <div className='ml-10'>
                                                        <p className="ml-10 text-[15px]">Start date & time</p>
                                                        <RadioGroup
                                                            aria-label="entry-criteria"
                                                            name="entry-criteria"
                                                            value={oneTime}
                                                            defaultValue="Now"

                                                            onChange={handleOneTimeChange}
                                                        >
                                                            <FormControlLabel
                                                                value="Now"
                                                                sx={{ marginLeft: "10px" }}
                                                                control={<Radio />}
                                                                label="Now"
                                                            />
                                                            <div className="flex gap-2">
                                                                <FormControlLabel
                                                                    value="Later"
                                                                    sx={{ marginLeft: "10px" }}
                                                                    control={<Radio />}
                                                                    label="Later"
                                                                />
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                                        <DateTimePicker
                                                                            label="select Date and Time"
                                                                            value={dateAndTime}
                                                                            onChange={handleChangeDateAndTime}
                                                                            disabled={oneTime === "Now"}

                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>

                                                    </div>
                                                )}
                                                <FormControlLabel
                                                    value="Multiple Entry"
                                                    sx={{ marginLeft: "10px" }}
                                                    control={<Radio />}
                                                    label="Multiple Entry"
                                                />

                                                {Timeline === "Multiple Entry" && (

                                                    <div className='ml-10'>
                                                        <p className="ml-10 text-[15px]">Start date & time</p>
                                                        <RadioGroup
                                                            aria-label="entry-criteria"
                                                            name="entry-criteria"
                                                            value={oneTime}
                                                            defaultValue="Now"

                                                            onChange={handleOneTimeChange}
                                                        >
                                                            <FormControlLabel
                                                                value="Now"
                                                                sx={{ marginLeft: "10px" }}
                                                                control={<Radio />}
                                                                label="Now"
                                                            />
                                                            <div className="flex gap-2">
                                                                <FormControlLabel
                                                                    value="Later"
                                                                    sx={{ marginLeft: "10px" }}
                                                                    control={<Radio />}
                                                                    label="Later"
                                                                />
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                                        <DateTimePicker
                                                                            label="select Date and Time"
                                                                            value={dateAndTime}
                                                                            onChange={handleChangeDateAndTime}
                                                                            disabled={oneTime === "Now"}

                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                            <div>


                                                                {additionalDates.map((date: any, index: any) => (
                                                                    <div key={index} className="ml-28 mt-2 flex justify-start items-center gap-1 ">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                            <DatePicker
                                                                                label="select Date"
                                                                                value={date}
                                                                                onChange={(newValue) => handleAdditionalDatePickerChange(index, newValue)}
                                                                                disabled={oneTime === "Now"}
                                                                            />
                                                                        </LocalizationProvider>

                                                                        <div
                                                                            onClick={() => handleDeleteDatePicker(index)}
                                                                        >
                                                                            <FontAwesomeIcon className="w-6 h-6 text-red-400 hover:text-red-700 " icon={faCircleXmark} />

                                                                        </div>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{
                                                                        fontSize: "12px",
                                                                        padding: "4px",
                                                                        marginTop: "6px",
                                                                        marginLeft: "112px",
                                                                    }}
                                                                    onClick={handleAddDatePicker}
                                                                >
                                                                    Add Another Date
                                                                </Button>
                                                            </div>
                                                        </RadioGroup>
                                                        {/* ends */}

                                                        <div className=''>
                                                            <p className="ml-10 text-[15px]">End date & time
                                                            </p>
                                                            <RadioGroup
                                                                aria-label="entry-criteria"
                                                                name="entry-criteria"
                                                                value={multipleTimeEnds}
                                                                defaultValue="Never"

                                                                onChange={handleMultipleTimeEndsChange}
                                                            >
                                                                <FormControlLabel
                                                                    value="Never"
                                                                    sx={{ marginLeft: "10px" }}
                                                                    control={<Radio />}
                                                                    label="Never"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <FormControlLabel
                                                                        value="End on"
                                                                        sx={{ marginLeft: "10px" }}
                                                                        control={<Radio />}
                                                                        label="End on"
                                                                    />
                                                                    <div>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                                            <DateTimePicker
                                                                                label="select Date and Time"
                                                                                value={dateAndTimeEnds}
                                                                                onChange={handleChangeDateAndTimeEnds}
                                                                                disabled={multipleTimeEnds === "Never"}

                                                                            />
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                </div>
                                                            </RadioGroup>

                                                        </div>

                                                    </div>
                                                )}
                                                <FormControlLabel
                                                    value="Recurring Entry"
                                                    sx={{ marginLeft: "10px" }}
                                                    control={<Radio />}
                                                    label="Recurring Entry"
                                                />

                                                {Timeline === "Recurring Entry" && (

                                                    <div className='ml-10'>
                                                        <p className="ml-10 text-[15px]">Start date & time</p>
                                                        <RadioGroup
                                                            aria-label="entry-criteria"
                                                            name="entry-criteria"
                                                            value={oneTime}
                                                            defaultValue="Now"

                                                            onChange={handleOneTimeChange}
                                                        >
                                                            <FormControlLabel
                                                                value="Now"
                                                                sx={{ marginLeft: "10px" }}
                                                                control={<Radio />}
                                                                label="Now"
                                                            />
                                                            <div className="flex gap-2">
                                                                <FormControlLabel
                                                                    value="Later"
                                                                    sx={{ marginLeft: "10px" }}
                                                                    control={<Radio />}
                                                                    label="Later"
                                                                />
                                                                <div>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                                        <DateTimePicker
                                                                            label="select Date and Time"
                                                                            value={dateAndTime}
                                                                            onChange={handleChangeDateAndTime}
                                                                            disabled={oneTime === "Now"}

                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                {/* number and dropdown */}
                                                                <p className="ml-10 text-[15px]">Repeat every</p>

                                                                <div className="flex items-center justify-start mt-5 ml-5 gap-1">
                                                                    <input
                                                                        type="number"
                                                                        value={number}
                                                                        onChange={handleChangeNumber}
                                                                        className="w-16 text-center p-[6px] text-md bg-gray-200 rounded"
                                                                        min="1"
                                                                    />

                                                                    <Box sx={{ minWidth: 120 }}>
                                                                        <FormControl fullWidth sx={{ height: '40px' }}>
                                                                            <InputLabel id="demo-simple-select-label" sx={{ lineHeight: '1.5' }}>select Repeat</InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={repeatEvery}
                                                                                label="select Repeat"
                                                                                onChange={handleChangeRepeatEvery}
                                                                                sx={{ height: '40px', lineHeight: '1.5' }}
                                                                            >
                                                                                <MenuItem value={"Day"}>Day</MenuItem>
                                                                                <MenuItem value={"Week"}>Week</MenuItem>
                                                                                <MenuItem value={"Month"}>Month</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>

                                                                </div>
                                                                {/* repeat on */}
                                                                {repeatEvery === "Week" &&

                                                                    <div>
                                                                        <p className="ml-10 text-[15px]"> Repeat on</p>

                                                                        <div className="mb-5 ml-10 ">
                                                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'start', mt: 2 }}>
                                                                                {daysOfWeek.map((day) => (
                                                                                    <Fab
                                                                                        key={day}
                                                                                        color={selectedDays[day] ? 'primary' : 'inherit'}

                                                                                        onClick={() => handleToggleDay(day)}
                                                                                        aria-label={day.toLowerCase()}
                                                                                        sx={{
                                                                                            width: '30px',
                                                                                            height: '25px',
                                                                                            boxShadow: 'none'
                                                                                        }}                                                                            >
                                                                                        {day.charAt(0)}
                                                                                    </Fab>
                                                                                ))}
                                                                            </Box>
                                                                        </div>
                                                                    </div>

                                                                }

                                                                {repeatEvery === "Month" &&
                                                                    <div>

                                                                        <RadioGroup
                                                                            aria-label="entry-criteria"
                                                                            name="entry-criteria"
                                                                            value={dayOfMonthWeek}
                                                                            defaultValue="Day of Month"
                                                                            sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'start', mt: 2 }}
                                                                            onChange={handleDayOfMonthWeekChange}
                                                                        >
                                                                            <FormControlLabel
                                                                                value="Day of Month"
                                                                                sx={{ marginLeft: "10px" }}
                                                                                control={<Radio />}
                                                                                label="Day of Month"
                                                                            />
                                                                            <FormControlLabel
                                                                                value="Day of Week"
                                                                                label="Day of Week"
                                                                                sx={{ marginLeft: "10px" }}
                                                                                control={<Radio />}
                                                                            />
                                                                        </RadioGroup>
                                                                    </div>
                                                                }


                                                                {(repeatEvery === "Month" && dayOfMonthWeek === "Day of Month") &&
                                                                    <Box sx={{ display: 'flex', gap: 1, width: '34%', marginLeft: "40px", flexWrap: 'wrap', justifyContent: 'start', mt: 2 }}>
                                                                        {daysArray.map((day, index) => (
                                                                            <React.Fragment key={index}>
                                                                                <Fab
                                                                                    color={selectedDaysMonth[day] ? "primary" : "default"}
                                                                                    onClick={() => handleDayClick(day)}
                                                                                    sx={{
                                                                                        width: '30px',
                                                                                        height: '25px',
                                                                                        boxShadow: 'none'
                                                                                    }}                        >
                                                                                    {day}
                                                                                </Fab>
                                                                                {(index) % 7 === 0 && <br />} {/* Add a line break after every 7th day */}
                                                                            </React.Fragment>
                                                                        ))}
                                                                        <Fab
                                                                            color={selectedDaysMonth["lastDay"] ? "primary" : "default"}
                                                                            onClick={() => handleDayClick("lastDay")}
                                                                            sx={{
                                                                                width: '200px',
                                                                                height: '25px',
                                                                                boxShadow: 'none',
                                                                                borderRadius: 0

                                                                            }}                >
                                                                            Last day of the month
                                                                        </Fab>
                                                                    </Box>
                                                                }

                                                                {(repeatEvery === "Month" && dayOfMonthWeek === "Day of Week") &&

                                                                    <div>


                                                                        {daysOfWeekInMonthsRepeat.map((slot, index) => (
                                                                            <div key={index} className="flex items-center mb-2">
                                                                                <p className="text-[15px] w-20 text-right mr-4">{labels[index]}</p>
                                                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'start' }}>
                                                                                    {dayOfWeekMonthRepeat.map((day) => (
                                                                                        <Fab
                                                                                            key={day}
                                                                                            color={slot[day] ? 'primary' : 'inherit'}
                                                                                            onClick={() => handleToggleDayOfWeekMonthRepeat(index, day)}
                                                                                            aria-label={day.toLowerCase()}
                                                                                            sx={{
                                                                                                width: '30px',
                                                                                                height: '25px',
                                                                                                boxShadow: 'none'
                                                                                            }}
                                                                                        >
                                                                                            {day.charAt(0)}
                                                                                        </Fab>
                                                                                    ))}
                                                                                </Box>
                                                                            </div>
                                                                        ))}
                                                                    </div>





                                                                }


                                                            </div>
                                                        </RadioGroup>
                                                        {/* ends */}

                                                        <div className='my-7'>
                                                            <p className="ml-10  text-[15px]">End date & time
                                                            </p>
                                                            <RadioGroup
                                                                aria-label="entry-criteria"
                                                                name="entry-criteria"
                                                                value={multipleTimeEnds}
                                                                defaultValue="Never"

                                                                onChange={handleMultipleTimeEndsChange}
                                                            >
                                                                <FormControlLabel
                                                                    value="Never"
                                                                    sx={{ marginLeft: "10px" }}
                                                                    control={<Radio />}
                                                                    label="Never"
                                                                />
                                                                <div className="flex gap-2">
                                                                    <FormControlLabel
                                                                        value="End on"
                                                                        sx={{ marginLeft: "10px" }}
                                                                        control={<Radio />}
                                                                        label="End on"
                                                                    />
                                                                    <div>
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                                                                            <DateTimePicker
                                                                                label="select Date and Time"
                                                                                value={dateAndTimeEnds}
                                                                                onChange={handleChangeDateAndTimeEnds}
                                                                                disabled={multipleTimeEnds === "Never"}

                                                                            />
                                                                        </LocalizationProvider>
                                                                    </div>
                                                                </div>
                                                            </RadioGroup>

                                                        </div>

                                                    </div>
                                                )}


                                            </RadioGroup>

                                            <div>
                                                <div className="ml-10">
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                                                            label="Allow user to re-enter the journey"
                                                        />
                                                    </FormGroup>
                                                </div>
                                                {/* {storedText && <p>{storedText}</p>} */}
                                            </div>

                                        </div>
                                        {/* <Button variant="outlined"
                                    sx={{
                                        fontSize: "12px",
                                        padding: "4px",
                                        marginTop: "3px",
                                    }}
                                    onClick={() => setEnterUser(false)}
                                >Continue</Button> */}
                                    </AccordionDetails>
                                </Accordion>


                                {/* ,,,,,, I have done for first sub-accordion , the condition do for this 2nd one  */}





                                {/* 3rd sub-accordion  */}
                                <Accordion
                                    sx={{
                                        marginBottom: "15px",
                                        borderRadius: '8px',

                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                    >
                                        <Typography>DND & Timezone</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* <Typography>
                                    Configure Do Not Disturb (DND) settings and timezones here.
                                </Typography> */}
                                        <div className="flex flex-col justify-start items-start w-full mb-5 border-1  p-4 ">

                                            < div className="flex flex-col  justify-start items-start w-full mb-5 shadow-md border-1 rounded-md pb-3 ">
                                                <FormGroup
                                                    sx={{
                                                        marginLeft: "15px"
                                                    }}

                                                >
                                                    <FormControlLabel
                                                        control={<Checkbox checked={isCheckedDndDayAndTime} onChange={handleCheckboxChangeDndDayAndTime} style={{
                                                            transform: 'scale(0.8)', // Adjust the scale to reduce size
                                                        }} />}
                                                        label={<span style={{
                                                            fontSize: '1rem',
                                                        }}>Do Not Distrub (DnD) </span>}

                                                    />
                                                </FormGroup>
                                                <p className="ml-8 mb-5 text-[12px]">Available for Mobile Push, Web Push, WhatsApp, SMS and Email channels only
                                                </p>

                                                {isCheckedDndDayAndTime && (<div>
                                                    <Divider
                                                        sx={{
                                                            width: "800px",
                                                            marginBottom: "5px",
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="ml-10 text-[15px]"> Do not deliver this journey on</p>

                                                        <div className="mb-5 ml-10 ">
                                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'start', mt: 2 }}>
                                                                {daysOfWeek.map((day) => (
                                                                    <Fab
                                                                        key={day}
                                                                        color={selectedDays[day] ? 'primary' : 'inherit'}

                                                                        onClick={() => handleToggleDay(day)}
                                                                        aria-label={day.toLowerCase()}
                                                                        sx={{
                                                                            width: '40px',
                                                                            height: '25px',
                                                                            boxShadow: 'none'
                                                                        }}                                                                            >
                                                                        {day.charAt(0)}
                                                                    </Fab>
                                                                ))}
                                                            </Box>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <p className="ml-8 mb-5 text-bold text-[16px]">
                                                            Message handling during DND


                                                        </p>

                                                        <RadioGroup
                                                            aria-label="entry-criteria"
                                                            name="entry-criteria"
                                                            // value={entryCriteria}
                                                            defaultValue="Discard messages scheduled during DND. (users will progress through the unreachable path)"

                                                            onChange={handleChangeDndRadioHandling}
                                                        >
                                                            <FormControlLabel
                                                                value="Discard messages scheduled during DND. (users will progress through the unreachable path)"
                                                                sx={{
                                                                    marginLeft: "10px",
                                                                    fontSize: "12px",
                                                                }}
                                                                control={<Radio />}
                                                                label="Discard messages scheduled during DND. (users will progress through the unreachable path)"
                                                            />
                                                            <FormControlLabel
                                                                value="Delay message send until the end of DND"
                                                                sx={{
                                                                    marginLeft: "10px",
                                                                    fontSize: "12px",

                                                                }}
                                                                control={<Radio />}
                                                                label="Delay message send until the end of DND"
                                                            />


                                                        </RadioGroup>


                                                    </div>
                                                </div>)}

                                            </div>
                                            < div className="flex  flex-col  justify-start items-start  gap-1 w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                                                <FormGroup
                                                    sx={{
                                                        marginLeft: "5px"
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={<Checkbox checked={isCheckedDndTimeZone} onChange={handleCheckboxChangeDndTimeZone} style={{
                                                            transform: 'scale(0.8)',
                                                        }} />}
                                                        label={<span style={{
                                                            fontSize: '1rem',
                                                        }}>Time zone </span>}

                                                    />
                                                </FormGroup>

                                                {isCheckedDndTimeZone &&

                                                    <div>
                                                        <Divider
                                                            sx={{
                                                                width: "800px",
                                                                marginBottom: "5px",
                                                            }}
                                                        />

                                                        <p className="ml-7 text-[15px]"> Deliver in User's time zone</p>

                                                        <div className=' flex  justify-center p-6 m-2 items-center  w-full bg-[#E7EAFF] '>
                                                            <p className="ml-10 text-[14px]">
                                                                <span className='font-bold text-[14px] '>Important:</span>
                                                                If the journey start time is after a user's local time, the message will be delivered next day.

                                                            </p>

                                                        </div>

                                                    </div>
                                                }

                                            </div>
                                        </div>

                                    </AccordionDetails>
                                </Accordion>

                                {/* 4th sub-accordion */}

                                <Accordion>


                                    <AccordionSummary
                                        onClick={handleAccordionChange}
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel3-content"
                                        id="panel3-header"
                                        sx={{
                                            backgroundColor: "#F9F9FB",
                                            minHeight: '45px',
                                            height: '45px',
                                            borderRadius: '8px 8px 0 0',

                                            '&.Mui-expanded': {
                                                minHeight: '45px',
                                                height: '45px',
                                            },
                                            '& .MuiAccordionSummary-content': {
                                                margin: 0,
                                            },
                                            padding: '0 16px',
                                        }}
                                    >

                                        Timeout
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        < div className="flex flex-col  justify-start items-start w-full mb-5 shadow-md border-1 rounded-md pb-3 ">

                                            <div>
                                                <p className="ml-5 mt-1 font-bold text-[16px]">
                                                    Set journey timeout duration


                                                </p>

                                            </div>
                                            <div className="flex items-center justify-start mt-5 ml-5 gap-1">
                                                <input
                                                    type="number"
                                                    value={numberTimeout}
                                                    onChange={handleChangeNumberTimeout}
                                                    className="w-16 text-center p-[6px] text-md bg-gray-200 rounded"
                                                    min="1"
                                                />

                                                <Box sx={{ minWidth: 120 }}>
                                                    <FormControl fullWidth sx={{ height: '40px' }}>
                                                        <InputLabel id="demo-simple-select-label" sx={{ lineHeight: '1.5' }}>select Repeat</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={timeout}
                                                            label="select Repeat"
                                                            onChange={handleChangeTimeout}
                                                            sx={{ height: '40px', lineHeight: '1.5' }}
                                                        >
                                                            <MenuItem value={"Minutes"}>Minutes</MenuItem>
                                                            <MenuItem value={"Hours"}>Hours</MenuItem>
                                                            <MenuItem value={"Days"}>Days</MenuItem>
                                                            <MenuItem value={"Week"}>Week</MenuItem>
                                                            <MenuItem value={"Month"}>Month</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                            </div>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>



                            </AccordionDetails>
                        </Accordion>


                        {/* <div className='flex justify-end mt-5'>
                    <button  type="submit" onClick={handleSubmit} >Save & Close</button>
                </div> */}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus type="submit" onClick={handleSubmit}>
                    Save changes
                </Button>
            </DialogActions>


        </div>

    );
}

