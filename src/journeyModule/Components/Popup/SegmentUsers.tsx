import React, { useEffect, useState } from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InputLabel, TextField, Button, Radio, RadioGroup, FormControlLabel, Grid, DialogActions } from '@mui/material';
import { faChildren, faCircleXmark, faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SegmentLogic from './SegmentLogic';

import axios from 'axios';


// mui dropdown
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { filteredSegmentedUserReducer } from '../../../reducer/slice';



const SegmentUsers = () => {

    const [segmentName, setSegmentName] = React.useState('');
   const segmentId = useSelector((state: any)=> state.data.filteredSegmentedUserSlice.value._id)
   
    const handleSegmentNameChange = (event: any) => {
        setSegmentName(event.target.value);
    };
    console.log(JSON.stringify(segmentId))

    // dropdown mui functions

    const [data, setData] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState<any>();
    console.log(JSON.stringify(selectedValue))

    
    useEffect(() => {
        axios.get('https://api.capengage.com/66576877ed2c040189175681/segment')
            .then(response => {
                setData(response.data);
                console.log("response.data" + JSON.stringify(response.data))
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
      const dispatchfilteredSegmentedUser = useDispatch()
    const handleChange = (event: any) => {
        setSelectedValue(event.target.value._id);
        console.log(event.target.value._id)

        dispatchfilteredSegmentedUser(filteredSegmentedUserReducer(event.target.value))
    };

    // alert(JSON.stringify(selectedValue))


    return (
        <div>
            <div className='flex justify-start '>
                <div className='w-full bg-white '>

                    {/* <div className="flex flex-col justify-start items-start gap-1 w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                        <InputLabel htmlFor="journey-name" className='text-[8px]' style={{ fontWeight: 'bold' }}>
                            Segment Name:
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

                            id="segment-name"
                            // label="Required"
                            placeholder='Enter Segment Name'
                            value={segmentName}
                            onChange={handleSegmentNameChange}

                        />
                    </div> */}


                    <Accordion defaultExpanded
                        sx={{
                            borderRadius: '8px',
                        }}
                    // onClick={handleAccordionChangeMain}
                    >
                        <AccordionSummary
                            sx={{
                                backgroundColor: "#E6DDFF",
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
                            <div className="  bg-gradient-to-r from-blue-500 to-purple-500 w-8 h-8 border rounded-full flex justify-center items-center mr-2">
                                <FontAwesomeIcon icon={faChildren} className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <Typography className='font-medium tracking-wider text-[14px]'>
                                    Segment
                                </Typography>
                                <p className='tracking-wider text-slate-900 text-xs '>
                                    Find users from segment

                                </p>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Accordion
                                sx={{
                                    marginBottom: "15px",
                                    marginTop: "15px",
                                    borderRadius: '8px',
                                }}
                                defaultExpanded
                            >
                                <AccordionSummary
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
                                    <Typography>Target Segment</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* <SegmentLogic segmentName={segmentName} /> */}

                                    <FormControl sx={{ m: 1, width: 300 }} >
                                        <InputLabel id="demo-simple-select-label">Select Segment</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedValue}
                                            label="Select Value"
                                            onChange={handleChange}
                                        >
                                            {data.map((item, index) => (
                                                <MenuItem key={index} value={item} >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>



                                    {/* <Button variant="outlined"
                                    sx={{
                                        fontSize: "12px",
                                        padding: "4px",
                                        marginTop: "3px",
                                    }}
                                >Continue</Button> */}
                                </AccordionDetails>
                            </Accordion>

                        </AccordionDetails>

                    </Accordion>


                </div>
            </div>



        </div>
    )
}

export default SegmentUsers
