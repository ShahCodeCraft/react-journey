

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

// radiio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
import { emailCampaignIdReducer, selectedEmailTemplateReducer } from '../../../reducer/slice';
import { useDispatch, useSelector } from 'react-redux';
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







interface SetupSettingsPopupProps {
    handleSubmitCampaignFun: () => void;
    userSelectedNode: any;
    selectedCampaign?: any;  // Optional property

}

export default function SmsCampaignPopup({ selectedCampaign, userSelectedNode, handleSubmitCampaignFun }: SetupSettingsPopupProps) {

    console.log("selectedCampaign"+JSON.stringify(selectedCampaign))
    const [providerData, setProviderData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.capengage.com/66576877ed2c040189175681/emailProvider');
                setProviderData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
    
        fetchData();
    }, []);

    const [urlProduction,setUrlProduction] = React.useState("https://journey-api.capengage.com/");
    const [urlDevelopment,setUrlDevelopment] = React.useState("http://localhost:3000/");
  

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

// radio mui 

    //   loading

    const [loading, setLoading] = React.useState(false);

    //   provider dropdown state

    const [provider, setProvider] = React.useState('');

    // email subject and message state

    const [emailData, setEmailData] = React.useState({
        subject: '',
        content: ''
    });

    interface CampaignData {
        emailCampaignName: string;
        emailCampaignTags: string[];
        emailProvider: string;
        emailSubject: string;
        emailContent?: string; // Define emailContent as an optional property
        emailTemplate?: string; // Define emailTemplate as an optional property
        fileAttachments: { id: number; file: null }[];
        // fileAttachments: { id: number; file: null }[];
        status:Boolean,

    }

    // message data
    const [messageData, setMessageData] = React.useState({
        serviceProvider: '',
        emailSubject: '',
        emailContent: '',
        attachments: [{ id: 1, file: null }],
    });

    const emailTemplate = useSelector((state: any) => state.data.emailEditor.value)
  // raido button logic
  const [selectedOption, setSelectedOption] = React.useState('custom'); // 'custom' or 'template'

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
            const emailSubjectErr = emailData.subject.trim() === '';
            let emailContentErr 
            if(selectedOption === 'custom'){
                 emailContentErr = emailData.content.trim() === '';

            }else{

                 emailContentErr =  emailTemplate == true && false
            }

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



            // Define the object with common properties
            const campaignData: CampaignData = {
                emailCampaignName: campaignName,
                emailCampaignTags: campaignTag,
                emailProvider: provider,
                emailSubject: emailData.subject,
                // fileAttachments: attachments,
                fileAttachments: (attachments.length === 1 && attachments[0].file === null) ? [] : attachments,
                status:false,
            };

            // Conditional property assignment
            if (selectedOption === "custom") {
                campaignData.emailContent = emailData.content;
            } else {
                campaignData.emailContent = emailTemplate;
            }

            // alert(JSON.stringify(campaignData))



            if (selectedCampaign) {
    try {
        const response = await axios.patch(`http://localhost:3000/journey/updateEmailCampaign/${selectedCampaign._id}`, campaignData);
        console.log('Email campaign data updated successfully:', response.data);
        const emailCampaignData = {
            emailCampaignId: response.data.id,
            nodedata: userSelectedNode,
        };
        dispatch(emailCampaignIdReducer(emailCampaignData));
        handleSubmitCampaignFun();
    } catch (error) {
        console.error('Error updating email campaign data:', error);
    }
} else {
    try {
        const response = await axios.post(`http://localhost:3000/journey/uploadEmailCampaign`, campaignData);
        console.log('Email campaign data saved successfully:', response.data);
        const emailCampaignData = {
            emailCampaignId: response.data.id,
            nodedata: userSelectedNode,
        };
        dispatch(emailCampaignIdReducer(emailCampaignData));
        handleSubmitCampaignFun();
    } catch (error) {
        console.error('Error saving email campaign data:', error);
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

    // React.useEffect(()=>{
    //     if(selectedCampaign){
    //         setCampaignName(selectedCampaign.emailCampaignName)
    //         CampaignTag(selectedCampaign.emailCampaignTags)
    //         setProvider(selectedCampaign.emailProvider)
    //         setEmailData({ subject: selectedCampaign.emailSubject,content: selectedCampaign.emailContent });
    //         if (selectedCampaign.fileAttachments && selectedCampaign.fileAttachments.length > 0) {
    //             setAttachments(selectedCampaign.fileAttachments);
    //         }

    //     }
    // },[])

    const dispatchSelectedEmailTemplateReducer = useDispatch()
    React.useEffect(() => {
        if (selectedCampaign) {
            setCampaignName(selectedCampaign.emailCampaignName);
            CampaignTag(selectedCampaign.emailCampaignTags);
            setProvider(selectedCampaign.emailProvider);
            setEmailData({ 
                subject: selectedCampaign.emailSubject, 
                content: selectedCampaign.emailContent 
            });


            if (selectedCampaign.fileAttachments && selectedCampaign.fileAttachments.length > 0) {
                setAttachments(selectedCampaign.fileAttachments);
            }

            // Check if emailContent is a string or an object
            if (typeof selectedCampaign.emailContent === 'string') {
                setSelectedOption('custom');
            } else {
                dispatchSelectedEmailTemplateReducer(selectedEmailTemplateReducer(selectedCampaign.emailContent))
                setSelectedOption('template');
            }

        }
    }, [selectedCampaign]);



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
            const emailSubjectErr = emailData.subject.trim() !== '';
            const emailContentErr = emailData.content.trim() !== '';

            if (providerError && emailSubjectErr && emailContentErr) {
                // If both errors exist, remove the step from failedSteps
                setFailedSteps((prevFailedSteps) =>
                    prevFailedSteps.filter((failedStep) => failedStep !== step)
                );
            }
        }
    }, [provider, emailData.subject, emailData.content]);




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
        setEmailData({
            ...emailData,
            subject: event.target.value
        });

        setEmailSubjectError(false)
    };

    const handleContentChange = (value: string) => {
        setEmailData({
            ...emailData,
            content: value
        });
    };




    // message  provider dropdown


    const handleChangeProvider = (event: SelectChangeEvent) => {
        setProvider(event.target.value);
        setProviderError(false)
    };

    // attachements 
    const [attachments, setAttachments] = React.useState([{ id: 1, file: null }]);

    const addAttachment = () => {
        const newAttachment = { id: attachments.length + 1, file: null };
        setAttachments([...attachments, newAttachment]);
    };

    const handleDeleteAttachment = (id: any) => {
        const updatedAttachments = attachments.filter((attachment) => attachment.id !== id);
        setAttachments(updatedAttachments);
    };

    const handleAttachmentChange = (e: any, id: any) => {
        console.log(id)
        const file = e.target.files[0];
        const updatedAttachments = attachments.map((attachment) =>
            attachment.id === id ? { ...attachment, file: file } : attachment
        );
        setAttachments(updatedAttachments);
    };

    React.useEffect(() => {
        attachments.map((att) => {
            return console.log(att.id)
        })
    }, [attachments])



  
    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
    };




    // attachment aws updates
    const handleUploadButtonClick = async (id: any) => {
        console.log(id);
        // alert(id);
        const fileInput = document.getElementById(`outlined-required-${id}`);


        if (!fileInput || !(fileInput instanceof HTMLInputElement)) {
            console.error('File input element not found or not an input element');
            return;
        }

        const file = fileInput.files?.[0]; // Extract the file from the file input
        if (!file) {
            console.error('No file selected');
            return;
        }
        if (file) setLoading(true)


        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://api.capengage.com/65f930a4f0dd63fb7b13b8b8/emailCampaign/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json(); // Assuming the response contains JSON data
                // Update attachments state with the response data
                // alert(JSON.stringify("this is the aws file string" + data))
                // alert(JSON.stringify(data.attachmentUrl))
                const updatedAttachments = attachments.map((attachment) =>
                    attachment.id === id ? { ...attachment, file: data.attachmentUrl } : attachment
                );
                setAttachments(updatedAttachments);
                setLoading(false)
                // alert("file uploaded")
            } else {
                console.error('Failed to upload file');
                // Handle failure, if needed
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error, if needed
        }
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
                                <InputLabel htmlFor="my-input" className='text-md' style={{ fontWeight: 'bold' }}>EMAIL SERVICE PROVIDER: </InputLabel>



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
                                    <InputLabel htmlFor="email-subject" className='text-md font-extrabold' style={{ fontWeight: 'bold' }}>Email Subject</InputLabel>
                                    <TextField
                                        style={{ width: '75%' }}
                                        required
                                        id="email-subject"
                                        label="Required"
                                        value={emailData.subject}
                                        onChange={handleSubjectChange}
                                        error={emailSubjectError}
                                        helperText={
                                            emailSubjectError ? "Please write Email Subject..." : ""
                                        }
                                    />
                                </div>


                                {/* <div className="flex flex-col gap-3 mt-5">
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                value="custom"
                                                checked={selectedOption === 'custom'}
                                                onChange={handleOptionChange}
                                            />
                                            Custom
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                value="template"
                                                checked={selectedOption === 'template'}
                                                onChange={handleOptionChange}
                                            />
                                            Template
                                        </label>
                                    </div> */}
                                    <div className="flex flex-col gap-3 mt-5">
    {/* <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
            <input
                type="radio"
                value="custom"
                checked={selectedOption === 'custom'}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="text-gray-700">Custom</span>
        </label>
        <label className="flex items-center space-x-2">
            <input
                type="radio"
                value="template"
                checked={selectedOption === 'template'}
                onChange={handleOptionChange}
                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="text-gray-700">Template</span>
        </label>
    </div> */}

    <FormControl component="fieldset">
      <FormLabel component="legend">Select Option</FormLabel>
      <RadioGroup
        aria-label="options"
        name="options"
        value={selectedOption}
        onChange={handleOptionChange}
        row
      >
        <FormControlLabel value="custom" control={<Radio />} label="Custom" />
        <FormControlLabel value="template" control={<Radio />} label="Template" />
      </RadioGroup>
    </FormControl>





                                    {selectedOption === 'custom' && (
                                        <>
                                            <InputLabel htmlFor="email-content" className='text-md font-extrabold' style={{ fontWeight: 'bold' }}>Email Content</InputLabel>
                                            <ReactQuill
                                                className='rounded-md '
                                                theme="snow"
                                                style={{ height: '300px', border: emailContentError ? '1px solid red' : '' }}
                                                value={emailData.content}
                                                onChange={handleContentChange}
                                            />
                                            {emailContentError && <p style={{ color: 'red' }} className="text-red-400 ml-5" >Please write text Message...</p>}
                                        </>
                                    )}


                                    {selectedOption === 'template' && (
                                        <EmailEditorTemplate />
                                    )}
                                </div>


                            </div>

                            {/* Attachments */}
                            <div className='p-5 my-10 shadow-lg border border-gray-50 rounded-md'>
                                <h2 className='text-md font-extrabold mb-2'>ATTACHMENTS:</h2>
                                {attachments.map((attachment) => (
                                    <div key={attachment.id} className="flex flex-col gap-3 mt-5">
                                        <InputLabel htmlFor={`file-upload-${attachment.id}`} className='text-md font-extrabold' style={{ fontWeight: 'bold' }}> ATTACHMENT {attachment.id}: </InputLabel>
                                        <div className="flex gap-3">
                                            <TextField
                                                style={{ width: '70%' }}
                                                required
                                                id={`outlined-required-${attachment.id}`}
                                                type="file"
                                                onChange={(e) => handleAttachmentChange(e, attachment.id)}
                                            />
                                            <label htmlFor={`file-upload-${attachment.id}`} className="flex items-center justify-center cursor-pointer">


                                                {loading ?
                                                    <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                        </svg>
                                                        Loading...
                                                    </button> : <Button
                                                        component="label"
                                                        className="py-20"
                                                        role={undefined}
                                                        variant="contained"
                                                        tabIndex={-1}
                                                        // startIcon={<CloudUploadIcon />}
                                                        onClick={() => handleUploadButtonClick(attachment.id)}
                                                    >
                                                        Upload file
                                                        <VisuallyHiddenInput />
                                                    </Button>
                                                }



                                            </label>


                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <div className=" text-red-500">
                                                    <IconButton aria-label="delete" size="large">
                                                        <DeleteIcon onClick={() => handleDeleteAttachment(attachment.id)} className=" text-red-500" fontSize="inherit" />
                                                    </IconButton>
                                                </div>
                                            </Stack>


                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='flex justify-center items-center mt-3'>
                                <Button className="p-10 border-2 border-solid border-gray-500 shadow-lg rounded-full hover:bg-slate-300" onClick={addAttachment}>
                                    Add Another Attachment
                                </Button>
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
                                        <h3  >Email Subject:</h3> <h3 className="text-blue-500">{emailData.subject}</h3>
                                    </div>

                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3>Email Content: </h3>
                                        <h3 className="text-blue-500 w-2/3" dangerouslySetInnerHTML={{ __html: emailData.content }}></h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3>Attachments:</h3>
                                        <div className="text-blue-500">
                                            {attachments.map((attachment, index) => (
                                                <div key={index}>
                                                    <p>ID: {attachment.id}</p>
                                                    <p>File: {typeof attachment.file === 'string' ? attachment.file : " No file uploaded"}</p>
                                                </div>
                                            ))}

                                        </div>
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

