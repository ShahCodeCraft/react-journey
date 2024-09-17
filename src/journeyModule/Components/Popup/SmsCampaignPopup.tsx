

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
// stepper
const steps = ['AUDIENCE', 'MESSAGE', 'TEST', 'PREVIEW & LAUNCH'];

// imput file


// button
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// loading button


// delete button

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



// text-area
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


// quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


// select dropdown
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { height } from '@mui/system';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailEditorTemplate from '../EmailEditor/EmailEditorTemplate';
import axios from 'axios';
import { smsCampaignIdReducer } from '../../../reducer/slice';
import { useDispatch } from 'react-redux';
// import { environment } from '../../../../environments/environment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Automations',
    'Campaigns',
    'Welcome',

];

const providerList = [
    'Provider 1',
    'Provider 2',
    'Provider 3'
]





interface PopupProps {
    handleSubmitSmsCampaignFun: () => void;
    userSelectedNode: any;
    selectedCampaign?: any;  // Optional property

}

export default function SmsCampaignPopup({ selectedCampaign,userSelectedNode, handleSubmitSmsCampaignFun }: PopupProps) {


    // console.log("selectedCampaign"+JSON.stringify(selectedCampaign))

    const [urlProduction, setUrlProduction] = React.useState("https://journey-api.capengage.com/");
    const [urlDevelopment, setUrlDevelopment] = React.useState("http://localhost:3000/");



    const [providerData, setProviderData] = React.useState([]);

React.useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.capengage.com/66576877ed2c040189175681/smsProvider');
            setProviderData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };

    fetchData();
}, []);

//



    // audience Name
    const [campaignName, setCampaignName] = React.useState('');

    //Audience dropdown select  CampaignTag

    const [campaignTag, CampaignTag] = React.useState<string[]>([]);
    const [campaignTagError, setCampaignTagError] = React.useState(false); // Renamed error state


    //  service provider state
    const [providerError, setProviderError] = React.useState(false)
    // email subject error
    const [emailSubjectError, setEmailSubjectError] = React.useState(false)

    // email content error
    const [emailContentError, setEmailContentError] = React.useState(false)
    //  campaign namae Error
    const [campaignNameError, setCampaignNameError] = React.useState(false);


    //   loading

    const [loading, setLoading] = React.useState(false);

    //   provider dropdown state

    const [provider, setProvider] = React.useState('');

    // email subject and message state

    const [smsData, setSmsData] = React.useState({
        subject: '',
        content: ''
    });




    // stepper
    const [activeStep, setActiveStep] = React.useState(0);


    const dispatch = useDispatch();
    // failedStep check

    const [failedSteps, setFailedSteps] = React.useState<number[]>([]);

    const handleNext = async () => {
        let currentStepFailed = false;

        if (activeStep === 0) {
            // Validation for step 0
            // Update failedSteps array if step 0 fails validation
            const tagError = campaignTag.length === 0;
            const nameError = campaignName.trim() === '';
            setCampaignTagError(tagError);
            setCampaignNameError(nameError);
            if (tagError || nameError) {
                currentStepFailed = true;
            }
        } else if (activeStep === 1) {
            // Validation for step 1
            // Update failedSteps array if step 1 fails validation
            const providerError = provider.trim() === '';
            const emailSubjectErr = smsData.subject.trim() === '';
            const emailContentErr = smsData.content.trim() === '';
            setProviderError(providerError);
            setEmailSubjectError(emailSubjectErr);
            setEmailContentError(emailContentErr);
            if (providerError || emailSubjectErr || emailContentErr) {
                currentStepFailed = true;
            }
        }


        if (activeStep === 2) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } if (activeStep === 3) {

            const campaignData = {
                smsCampaignName: campaignName,
                smsCampaignTags: campaignTag,
                smsProvider: provider,
                smsSubject: smsData.subject,

                smsContent: smsData.content,


            }
            // alert(JSON.stringify(campaignData))

            if (selectedCampaign) {
                try {
                    const response = await axios.patch(`http://localhost:3000/journey/updateSmsCampaign/${selectedCampaign._id}`, campaignData);
                    console.log('SMS campaign data updated successfully:', response.data);
                    const smsCampaignData = {
                        smsCampaignId: response.data.id,
                        nodedata: userSelectedNode,
                    };
                    dispatch(smsCampaignIdReducer(smsCampaignData));
                    handleSubmitSmsCampaignFun();
                } catch (error) {
                    console.error('Error updating SMS campaign data:', error);
                }
            } else {
                try {
                    const response = await axios.post(`http://localhost:3000/journey/uploadSmsCampaign`, campaignData);
                    console.log('SMS campaign data saved successfully:', response.data);
                    const smsCampaignData = {
                        smsCampaignId: response.data.id,
                        nodedata: userSelectedNode,
                    };
                    dispatch(smsCampaignIdReducer(smsCampaignData));
                    handleSubmitSmsCampaignFun();
                } catch (error) {
                    console.error('Error saving SMS campaign data:', error);
                }
            }
            


        }


        // Update failedSteps array with the current step index if it failed validation
        if (currentStepFailed) {
            setFailedSteps((prevFailedSteps) => [...prevFailedSteps, activeStep]);
        } else {
            // Remove the current step from failedSteps array if it passed validation
            setFailedSteps((prevFailedSteps) => prevFailedSteps.filter((step) => step !== activeStep));
            if (activeStep === 0) setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (activeStep === 1) setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        // alert(failedSteps)
    };

    React.useEffect(()=>{
        if(selectedCampaign){
            setCampaignName(selectedCampaign.smsCampaignName)
            CampaignTag(selectedCampaign.smsCampaignTags)
            setProvider(selectedCampaign.smsProvider)
            setSmsData({ subject: selectedCampaign.smsSubject,content: selectedCampaign.smsContent });
           

        }
    },[])



    React.useEffect(() => {
        const step = activeStep;
        if (step === 0) {
            const tagError = campaignTag.length !== 0;
            const nameError = campaignName.trim() !== '';

            if (tagError && nameError) {
                // If both errors exist, remove the step from failedSteps
                setFailedSteps((prevFailedSteps) =>
                    prevFailedSteps.filter((failedStep) => failedStep !== step)
                );
            }
        }
    }, [campaignTag, campaignName]);

    React.useEffect(() => {
        const step = activeStep;
        if (step === 1) {
            const providerError = provider.trim() !== '';
            const emailSubjectErr = smsData.subject.trim() !== '';
            const emailContentErr = smsData.content.trim() !== '';

            if (providerError && emailSubjectErr && emailContentErr) {
                // If both errors exist, remove the step from failedSteps
                setFailedSteps((prevFailedSteps) =>
                    prevFailedSteps.filter((failedStep) => failedStep !== step)
                );
            }
        }
    }, [provider, smsData.subject, smsData.content]);




    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    //Audience dropdown select  CampaignTag

    const handleChangeCampaignTag = (event: SelectChangeEvent<typeof campaignTag>) => {
        const {
            target: { value },
        } = event;
        CampaignTag(
            typeof value === 'string' ? value.split(',') : value,
        );

        setCampaignTagError(false)
    };
    // text-area

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
    };

    const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
    };

    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
    );


    // button 
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });




    // audience Name

    // //  campaign namae Error
    //  const [campaignNameError , setCampaignNameError] = React.useState(false);
    const handleCampaignNameChange = (event: any) => {
        setCampaignName(event.target.value);
        if (event.target.validity.valid) {
            setCampaignNameError(false);
        } else {
            setCampaignNameError(true);
        }
    };



    // email subject and message

    const handleSubjectChange = (event: any) => {
        setSmsData({
            ...smsData,
            subject: event.target.value
        });

        setEmailSubjectError(false)
    };

    const handleContentChange = (value: string) => {
        setSmsData({
            ...smsData,
            content: value
        });
    };




    // message  provider dropdown


    const handleChangeProvider = (event: SelectChangeEvent) => {
        setProvider(event.target.value);
        setProviderError(false)
    };


    return (
        <div className="flex justify-center items-start mt-10 w-full  ">
            <Box sx={{ width: '80%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const labelProps: {
                            optional?: React.ReactNode;
                            error?: boolean;
                        } = {};

                        // Check if the current step has failed and is the active step
                        if (failedSteps.includes(index) && activeStep === index) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    empty Fields
                                </Typography>
                            );
                            labelProps.error = true;
                        }

                        return (
                            <Step key={label}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>


                {(
                    <React.Fragment>
                        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

                        {/* Aduience */}
                        <div style={{ display: activeStep === 0 ? 'block' : 'none' }}

                        >
                            {/* Audience  */}
                            <form className='mt-20'>
                                <div className='flex justify-start items-center gap-16'>
                                    <InputLabel htmlFor="my-input" className='text-md  ' style={{ fontWeight: 'bold' }}>
                                        <b>CAMPAIGN NAME:</b> </InputLabel>

                                    <TextField
                                        style={{ width: '45%' }}
                                        required
                                        id="outlined-required"
                                        label="Required"
                                        value={campaignName}
                                        onChange={handleCampaignNameChange}
                                        error={campaignNameError}
                                        helperText={
                                            campaignNameError ? "Please write campaign Name (letters and spaces only)" : ""
                                        }
                                    // inputProps={{
                                    //     pattern: "[A-Za-z ]+",
                                    // }}
                                    // defaultValue="Hello World"
                                    />
                                </div>
                                {/* dropDown */}

                                <div className='flex justify-start items-center gap-16 mt-5'>
                                    <InputLabel htmlFor="my-input" className='text-md' style={{ fontWeight: 'bold' }}>CAMPAIGN TAGS: </InputLabel>

                                    <FormControl sx={{ m: 1, width: 300 }} error={campaignTagError} >
                                        <InputLabel id="demo-multiple-checkbox-label"> Tag</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            multiple
                                            value={campaignTag}
                                            onChange={handleChangeCampaignTag}
                                            input={<OutlinedInput label="Tag" />}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    <Checkbox checked={campaignTag.indexOf(name) > -1} />
                                                    <ListItemText primary={name} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText>{campaignTagError ? 'Error: Please select campaign tag' : ''}</FormHelperText>

                                    </FormControl>
                                </div>

                            </form>
                        </div>
                        {/* Message */}
                        <div style={{ display: activeStep === 1 ? 'block' : 'none' }} className='my-20 pb-52'>
                            {/* provider 1 */}
                            <div className='flex justify-start items-center gap-16 '>
                                <InputLabel htmlFor="my-input" className='text-md' style={{ fontWeight: 'bold' }}>SMS SERVICE PROVIDER: </InputLabel>



                                <FormControl sx={{ m: 1, minWidth: 300 }} error={providerError} >
                                    <InputLabel id="provider-label">Provider</InputLabel>
                                    <Select
                                        labelId="provider-label"
                                        id="provider"
                                        value={provider}
                                        onChange={handleChangeProvider}
                                        autoWidth={false} // Set autoWidth to false
                                        label="Provider"
                                        style={{ width: 300 }} // Set a fixed width here
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {providerData && providerData.map((item: any) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.configurationName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{providerError ? 'Error: Please select Service Provider' : ''}</FormHelperText>

                                </FormControl>

                            </div>
                            {/* campaign message */}


                            <div>
                                <InputLabel htmlFor="email-subject" className="text-md mb-5" style={{ fontWeight: 'bold' }}>
                                    <b>CAMPAIGN MESSAGE</b>
                                </InputLabel>
                                <div className="flex flex-col gap-3">
                                    <InputLabel htmlFor="email-subject" className='text-md font-extrabold' style={{ fontWeight: 'bold' }}>Sender:</InputLabel>
                                    <TextField
                                        style={{ width: '75%' }}
                                        required
                                        id="email-subject"
                                        label="Required"
                                        value={smsData.subject}
                                        onChange={handleSubjectChange}
                                        error={emailSubjectError}
                                        helperText={
                                            emailSubjectError ? "Please write Email Subject..." : ""
                                        }
                                    />
                                </div>

                                <InputLabel htmlFor="email-content" className='text-md font-extrabold' style={{ fontWeight: 'bold' }}>Message:</InputLabel>
                                <ReactQuill
                                    className='rounded-md '
                                    theme="snow"
                                    style={{ height: '300px', border: emailContentError ? '1px solid red' : '' }}
                                    value={smsData.content}
                                    onChange={handleContentChange}
                                />
                                {emailContentError && <p style={{ color: 'red' }} className="text-red-400 ml-5" >Please write text Message...</p>}
                            </div>
                        </div>


                        {/* test */}
                        <div style={{ display: activeStep === 2 ? 'block' : 'none' }} className='mt-20' >


                            <div className='flex justify-start items-center gap-16'>
                                <InputLabel htmlFor="my-input" className='text-md  ' style={{ fontWeight: 'bold' }}>
                                    <b>SEND TEST MESSAGE TO:</b> </InputLabel>

                                <TextField
                                    style={{ width: '45%' }}
                                    required
                                    id="outlined-required"
                                    label="
                    sooraj@gmail.com, goutam@gamil.com,
                    Recipient"
                                // defaultValue="Hello World"
                                />
                            </div>
                            <div className='ml-64 mt-10' >
                                <p >
                                    Note : Test campaign helps you test your campaigns on an internal user before you launch your campaign. Please ensure that you only add your own details or your team member's details or create a test segment.</p>

                                <Button className="ml-2 mt-5 border-1 shadow-md rounded-xl ">
                                    Test
                                </Button>
                            </div>


                        </div>
                        {/* preview */}
                        <div style={{ display: activeStep === 3 ? 'block' : 'none' }} className='my-20 pb-52 '>
                            <div className='w-full shadow-xl  rounded-lg pb-8 ' >
                                <div className='flex justify-between  ' >
                                    <h2 className='p-5  text-lg font-bold  '>Audience</h2>
                                    <FontAwesomeIcon onClick={() => setActiveStep(0)} className='w-7 h-7 relative right-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' icon={faPenToSquare} />
                                </div>
                                <div className='flex gap-5 p-5 mt-3' >
                                    <h3  >CAMPAIGN NAME:</h3> <h3 className="text-blue-500">{campaignName}</h3>

                                </div>

                                <div className='flex justify-between'>

                                    <div className='flex gap-2 p-5 mt-1' >
                                        <h3  >CONTENT TYPE: </h3> <h3 className="text-blue-500">"Promotional"</h3>
                                    </div>
                                    <div className='flex gap-2 p-5 mt-1 relative right-32 ' >
                                        <h3 >CAMPAIGN TAGS:</h3>
                                        {campaignTag.map((tag, index) => {
                                            return <div key={index}>
                                                <h3 className="text-blue-500">{tag}</h3>
                                            </div>
                                        })}

                                    </div>
                                </div>

                            </div>
                            {/* message box */}
                            <div className='w-full shadow-xl  rounded-lg  mt-20 pb-8 ' >
                                <div className='flex justify-between  ' >
                                    <h2 className='p-5  text-lg font-bold '>Message</h2>
                                    <FontAwesomeIcon onClick={() => setActiveStep(1)} className='w-7 h-7 relative right-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' icon={faPenToSquare} />
                                </div>

                                <div className='flex flex-col gap-1  '>
                                    <div className='flex gap-5 px-5 py-2 mt-1' >
                                        <h3  >Email Provider:</h3> <h3 className="text-blue-500">{provider}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1' >
                                        <h3  >Email Subject:</h3> <h3 className="text-blue-500">{smsData.subject}</h3>
                                    </div>

                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3>Email Content: </h3>
                                        <h3 className="text-blue-500 w-2/3" dangerouslySetInnerHTML={{ __html: smsData.content }}></h3>
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* buttons next and back */}

                        <div className="button-section fixed bottom-4  rounded-xl bg-[#F1F5F9] w-4/5 border-2  shadow-lg py-4 px-6 z-10">
                            <div className="flex justify-between items-center">
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} className="mr-2 shadow-md rounded-xl ">
                                    Back
                                </Button>
                                <div className="flex-1"></div>
                                <Button onClick={handleNext} className="ml-2 border-1 shadow-md rounded-xl ">
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </div>
                        </div>

                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}

