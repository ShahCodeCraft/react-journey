// url validator

import validator from 'validator';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';

import axios from 'axios';


// dompurify
// import DOMPurify from 'dompurify'; // Import DOMPurify
// import DOMPurify from 'dompurify';


// checkedbox
// import Checkbox from '@mui/material/Checkbox';

// Radio 




import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


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
import { useDispatch } from 'react-redux';
import { webPushCampaignIdReducer } from '../../../reducer/slice';
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
    handleSubmitWebPushCampaignFun: () => void;
    userSelectedNode: any;
    selectedCampaign?: any;  // Optional property

}

export default function WebPushCampaignPopup({ selectedCampaign,userSelectedNode, handleSubmitWebPushCampaignFun }: PopupProps) {


    const [urlProduction,setUrlProduction] = React.useState("https://journey-api.capengage.com/");
    const [urlDevelopment,setUrlDevelopment] = React.useState("http://localhost:3000/");

        const [providerData, setProviderData] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.capengage.com/66576877ed2c040189175681/webPushProvider');
                setProviderData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
    
        fetchData();
    }, []);

    // checked box
    const [autoHide, setAutoHide] = React.useState(false);

    // audience Name
    const [campaignName, setCampaignName] = React.useState('');

    //Audience dropdown select  CampaignTag

    const [campaignTag, CampaignTag] = React.useState<string[]>([]);
    const [campaignTagError, setCampaignTagError] = React.useState(false); // Renamed error state


    //  service provider state
    const [providerError, setProviderError] = React.useState(false)
    // email title error
    const [webPushTitleError, setwebPushTitleError] = React.useState(false)

    // email content error
    const [webPushContentError, setWebPushContentError] = React.useState(false)
    //  campaign namae Error
    const [campaignNameError, setCampaignNameError] = React.useState(false);

    // iconUrlError
    const [iconUrlError, setIconUrlError] = React.useState(false);

    // actionUrlError
    const [actionUrlError, setActionUrlError] = React.useState(false);

    // actionError 2
    const [actionUrlError2, setActionUrlError2] = React.useState(false);

    // imageUrlError
    const [imageUrlError, setImageUrlError] = React.useState(false);

    // labelError
    const [labelError, setLabelError] = React.useState(false);

    //   loading

    const [loading, setLoading] = React.useState(false);

    //   provider dropdown state

    const [provider, setProvider] = React.useState('');

    // email title and message state

    const [webPushData, setWebPushData] = React.useState({
        title: '',
        content: ''
    });

    // icon state 
    const [iconUrl, setIconUrl] = React.useState('');

    // action state
    const [actionUrl, setActionUrl] = React.useState("")

    // aciton state 2
    const [actionUrl2, setActionUrl2] = React.useState("");

    // image state
    const [imageUrl, setImageUrl] = React.useState("");

    // label state
    const [label, setLabel] = React.useState("");

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);


    const [radio, setRadio] = React.useState('default');

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadio((event.target as HTMLInputElement).value);
    };

    // checked box

    const handleCheckboxChange = (event: any) => {
        setAutoHide(event.target.checked);
    };



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
            const emailtitleErr = webPushData.title.trim() === '';
            const emailContentErr = webPushData.content.trim() === '';
            const iconUrlError = iconUrl.trim() === "";
            const actionUrlError = actionUrl.trim() === "";
            const imageUrlError = imageUrl.trim() === "";
            const labelError = label.trim() === "";
            const actionUrlError2 = actionUrl2.trim() === "";
            setActionUrlError2(actionUrlError2)
            setLabelError(labelError);
            setImageUrlError(imageUrlError)
            setActionUrlError(actionUrlError)
            setIconUrlError(iconUrlError);
            setProviderError(providerError);
            setwebPushTitleError(emailtitleErr);
            setWebPushContentError(emailContentErr);
            if (providerError || emailtitleErr || emailContentErr || iconUrlError || actionUrlError || imageUrlError || labelError || actionUrlError2) {
                currentStepFailed = true;
            }
        }


        if (activeStep === 2) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } if (activeStep === 3) {

            const stripHtmlTags = (str:any) => {
                if (str) {
                  return str.replace(/<[^>]*>/g, '');
                }
                return '';
              };
            const sanitizedContent = stripHtmlTags(webPushData.content);

            const campaignData = {
                webPushCampaignName: campaignName,
                webPushCampaignTags: campaignTag,
                webPushProvider: provider,
                webPushTitle: webPushData.title,
                webPushContent: sanitizedContent,
                iconUrl: iconUrl,
                actionUrl: actionUrl,
                imageUrl: imageUrl,
                label: label,
                actionUrl2: actionUrl2,
                autoHide: autoHide,
                model: radio,
            }
            // alert(JSON.stringify(campaignData))

            if (selectedCampaign) {
                try {
                    const response = await axios.patch(`http://localhost:3000/journey/updateWebPushCampaign/${selectedCampaign._id}`, campaignData);
                    console.log('Web push campaign data updated successfully:', response.data);
                    const webPushCampaignData = {
                        webPushCampaignId: response.data.id,
                        nodedata: userSelectedNode,
                    };
                    dispatch(webPushCampaignIdReducer(webPushCampaignData));
                    handleSubmitWebPushCampaignFun();
                } catch (error) {
                    console.error('Error updating web push campaign data:', error);
                }
            } else {
                try {
                    const response = await axios.post(`http://localhost:3000/journey/uploadWebPushCampaign`, campaignData);
                    console.log('Web push campaign data saved successfully:', response.data);
                    const webPushCampaignData = {
                        webPushCampaignId: response.data.id,
                        nodedata: userSelectedNode,
                    };
                    dispatch(webPushCampaignIdReducer(webPushCampaignData));
                    handleSubmitWebPushCampaignFun();
                } catch (error) {
                    console.error('Error saving web push campaign data:', error);
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
            setCampaignName(selectedCampaign.webPushCampaignName)
            CampaignTag(selectedCampaign.webPushCampaignTags)
            setProvider(selectedCampaign.webPushProvider)
          
            setWebPushData({
                ...webPushData,
                content: selectedCampaign.webPushContent,
                title: selectedCampaign.webPushTitle
            });
            setIconUrl(selectedCampaign.iconUrl);
            setActionUrl(selectedCampaign.actionUrl)
            setImageUrl(selectedCampaign.imageUrl)
            setLabel(selectedCampaign.label)
            setActionUrl2(selectedCampaign.actionUrl2)
            setAutoHide(selectedCampaign.autoHide)
            setRadio(selectedCampaign.model)

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
            const emailtitleErr = webPushData.title.trim() !== '';
            const emailContentErr = webPushData.content.trim() !== '';
            const iconUrlError = iconUrl.trim() !== "";
            const actionUrlError = actionUrl.trim() !== "";
            const imageUrlError = imageUrl.trim() !== "";
            const labelError = label.trim() !== "";
            const actionUrlError2 = actionUrl2.trim() !== "";



            if (providerError && emailtitleErr && emailContentErr && iconUrlError && actionUrlError && imageUrlError && labelError && actionUrlError2) {
                // If both errors exist, remove the step from failedSteps
                setFailedSteps((prevFailedSteps) =>
                    prevFailedSteps.filter((failedStep) => failedStep !== step)
                );
            }
        }
    }, [provider, webPushData.title, webPushData.content, iconUrl, actionUrl, imageUrl, label, actionUrl2]);




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



    // email title and message

    const handleTitleChange = (event: any) => {

        const value = event.target.value;
        if (value.length <= 32) {
            setWebPushData({
                ...webPushData,
                title: value
            });
        }

        setwebPushTitleError(false)
    };

    const handleContentChange = (value: string) => {
        // const plainText = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });

        // if (plainText.length <= 32) {
        setWebPushData({
            ...webPushData,
            content: value
        });
        // }


        setWebPushContentError(false)

    };




    // simple text area
    // const handleContentChange = React.useCallback((e:any) => {
    //     const value = e.target.value;
    //     setWebPushData(prevState => ({
    //         ...prevState,
    //         content: value
    //     }));
    //     setWebPushContentError(false);
    // }, []);




    // message  provider dropdown


    const handleChangeProvider = (event: SelectChangeEvent) => {
        setProvider(event.target.value);
        setProviderError(false)
    };

    // icon state and methods

    const handleIconChange = (event: any) => {
        if (validator.isURL(event.target.value)) {
            setIconUrl(event.target.value)
            setIconUrlError(false)
        }
    }

    const handleResetIconUrl = () => {
        setIconUrl("")
    }

    const handleActionChange = (event: any) => {
        if (validator.isURL(event.target.value)) {

            setActionUrl(event.target.value);
            setActionUrlError(false)
        }
    }

    const handleAction2Change = (event: any) => {
        if (validator.isURL(event.target.value)) {

            setActionUrl2(event.target.value);
            setActionUrlError2(false)
        }
    }

    const handleImageChange = (event: any) => {
        // isURL(str [, options]) 
        if (validator.isURL(event.target.value)) {
            // alert("yes form image url")
            setImageUrl(event.target.value);
            setImageUrlError(false)
        }
    }

    const handleResetImageUrl = () => {
        setImageUrl("");
    }

    const handleLabelChange = (event: any) => {
        setLabel(event.target.value);
        setLabelError(false);
    }


    return (
        <div className="flex justify-center items-start mt-10 w-full bg-white  ">
            <Box sx={{ width: '80%' }}>
                <Stepper activeStep={activeStep} className='sticky top-1 p-10 rounded-lg shadow-lg border-gray-300  z-50'
                    style={{ backgroundColor: "white" }}
                >
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
                            <Step key={label} className="bg-white ">
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
                                <InputLabel htmlFor="my-input" className='text-md' style={{ fontWeight: 'bold' }}>WEBPUSH SERVICE PROVIDER: </InputLabel>



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

                            {/* layout */}
                            <div className='w-full h-20 shadow-xl mb-3 flex justify-start items-center rounded-lg border-b-black '>
                                <h1 className='font-bold text-lg ml-5'>Layout</h1>
                            </div>

                            <div className='flex gap-3 justify-start items-center w-full h-32 shadow-xl mb-10  rounded-lg'>
                                <h1 className=' text-lg ml-5'>Layout:</h1>
                                <h2 className=' text-lg '>Banner</h2>

                            </div>
                            {/* first shadow */}
                            <div className='flex flex-col shadow-lg rounded-lg border-b-gray-600  pb-20 h-full'>
                                <h1 className='font-bold text-lg ml-5'>Basic</h1>
                                <hr className='font-bold' />
                                {/* campaign message */}
                                <div className='flex-grow flex flex-col gap-5 '>
                                    <div className="flex gap-6 mt-10">
                                        <InputLabel
                                            htmlFor="email-title"
                                            className="flex justify-end text-md font-extrabold w-1/6 text-right"
                                        >
                                            Title:
                                        </InputLabel>
                                        <TextField
                                            style={{ width: '75%' }}
                                            required
                                            id="email-title"
                                            label="Title"
                                            placeholder="Recommended maximum length 32 characters"
                                            value={webPushData.title}
                                            onChange={handleTitleChange}
                                            error={webPushTitleError}
                                            helperText={webPushTitleError ? "Please write Title..." : ""}
                                        />
                                    </div>

                                    {/* message */}
                                    <div>
                                        <div className=' flex gap-3 mt-10 '>
                                            <InputLabel htmlFor="email-content" className='text-md font-extrabold w-1/6 text-right '>Message:</InputLabel>
                                            <ReactQuill
                                                className='rounded-md'
                                                theme="snow"
                                                placeholder='Recommended maximum length 42 characters'
                                                style={{ height: '100px', width: '75%', border: webPushContentError ? '1px solid red' : '' }}
                                                value={webPushData.content}
                                                onChange={handleContentChange}
                                            />
                                            {/* <textarea
            className='rounded-md'
            placeholder='Recommended maximum length 42 characters'
            style={{ height: '100px', width: '75%', border: webPushContentError ? '1px solid red' : '' }}
            value={webPushData.content}
            onChange={handleContentChange}
            aria-label="minimum height"
        /> */}



                                        </div>
                                        {webPushContentError && <p style={{ color: 'red' }} className="text-red-400 ml-64">Please write text Message...</p>}
                                    </div>

                                    {/* icon */}
                                    <div>

                                        <div className="flex justify-start items-center  gap-3 mt-10 ">
                                            <InputLabel htmlFor="email-title" className='text-md font-extrabold w-1/6 text-right '>ICON:</InputLabel>
                                            <TextField
                                                style={{ width: '50%' }}
                                                required
                                                id="email-title"
                                                label="Url"
                                                placeholder='Paste Icon Url '
                                                value={iconUrl}
                                                onChange={handleIconChange}
                                                error={iconUrlError}
                                                helperText={iconUrlError ? "Please copy and paste Icon Url..." : ""}
                                            />
                                            <Button variant="outlined" onClick={handleResetIconUrl} className='rounded-full' >Reset</Button>

                                        </div>
                                        <p className='font-light text-sm text-gray-400 mt-2 ml-44 ' >Recommended size 192px. JPG, JPEG, Format, only: Less than 1 MB In size URL must beign with HTTPS:</p>
                                    </div>

                                    {/* ON-CLICK-ACTION */}
                                    <div>

                                        <div className="flex justify-start items-center  gap-3 mt-10 ">
                                            <InputLabel htmlFor="email-title" className='text-md font-extrabold w-1/6 text-right  '>ON-CLICK-ACTION:</InputLabel>
                                            <TextField
                                                style={{ width: '75%' }}
                                                required
                                                id="email-title"
                                                label="Url"
                                                placeholder='Paste Action Url'
                                                value={actionUrl}
                                                onChange={handleActionChange}
                                                error={actionUrlError}
                                                helperText={actionUrlError ? "Please copy and paste Action Url..." : ""}
                                            />

                                        </div>
                                        <p className='font-light text-sm text-gray-400 mt-2 ml-44 ' > URL can be HTTP or HTTPS.</p>
                                    </div>

                                </div>
                            </div>


                            {/* second Shadow */}


                            <div className='flex flex-col shadow-lg rounded-lg border-b-gray-600 mt-20 pb-20 h-full'>
                                <h1 className='font-bold text-xl ml-5 '>Images</h1>
                                <hr className='font-bold text-2xl mb-3 ' />

                                {/* Images */}
                                <div>

                                    <div className="flex justify-start items-center  gap-3 mt-10 ">
                                        <InputLabel htmlFor="image-url" className='text-md font-extrabold w-1/6 text-right '>Images:</InputLabel>
                                        <TextField
                                            style={{ width: '50%' }}
                                            required
                                            id="image-url"
                                            label="Url"
                                            placeholder='Paste Image Url '
                                            value={imageUrl}
                                            onChange={handleImageChange}
                                            error={imageUrlError}
                                            helperText={imageUrlError ? "Please copy and paste Image Url..." : ""}
                                        />
                                        <Button variant="outlined" onClick={handleResetImageUrl} className='rounded-full' >Reset</Button>

                                    </div>
                                    <div className='mx-20'>
                                        <p className='font-light text-sm text-gray-400 mt-2  ' >Recommended size 720px. x 480px. Minimum size 360px x 240px Aspect ratio (width:height): 3:2 Actual rendering depends on screen size. JPG, JPEG, PNG formats only Less than 1 MB in size URL must begin with HTTPS.</p>
                                        <p className='font-light text-sm text-gray-400   mt-5 ' >Banner Images are not supported by alt OS and Browser types, in such cases Notification will be sent without the banner image.<a>Know more</a></p>

                                    </div>
                                </div>
                            </div>

                            {/* third shadow */}
                            <div className='flex flex-col shadow-lg rounded-lg border-2 mt-20 pb-20 h-full'>
                                <h1 className='font-bold text-xl ml-5 mt-4'>Button</h1>
                                <hr className='font-bold text-2xl mb-3' />

                                <div className='w-full pl-8 pr-2'>
                                    {/* label */}
                                    <div className='flex flex-col items-start mt-10'>
                                        <div className="flex items-center gap-2 w-full">
                                            <InputLabel htmlFor="email-title-label" className='text-md font-extrabold w-1/4 text-right'>LABEL:</InputLabel>
                                            <TextField
                                                className='w-2/4'
                                                required
                                                id="email-title-label"
                                                label="label"
                                                placeholder='write label...'
                                                value={label}
                                                onChange={handleLabelChange}
                                                error={labelError}
                                                helperText={labelError ? "Please write Label..." : ""}
                                            />
                                        </div>
                                        <p className='font-light text-sm text-gray-400 mt-2 w-2/3 text-center'>Maximum length: 22 characters.</p>

                                    </div>

                                    {/* ON-CLICK-ACTION */}
                                    <div className='flex flex-col items-start mt-10'>
                                        <div className="flex items-center gap-2 w-full">
                                            <InputLabel htmlFor="email-title-action" className='text-md font-extrabold w-1/4 text-right'>ON-CLICK-ACTION:</InputLabel>
                                            <TextField
                                                className='w-2/4'
                                                required
                                                id="action"
                                                label="Url"
                                                placeholder='Paste Action Url'
                                                value={actionUrl2}
                                                onChange={handleAction2Change}
                                                error={actionUrlError2}
                                                helperText={actionUrlError2 ? "Please copy and paste Action Url..." : ""}
                                            />
                                        </div>
                                        <p className='font-light text-sm text-gray-400 mt-2 w-2/3 text-center'>URL can be HTTP or HTTPS.</p>
                                    </div>
                                </div>
                            </div>



                            {/* forth shadow */}

                            <div className='flex flex-col shadow-lg rounded-lg border-2 mt-20 pb-20 h-full'>
                                <h1 className='font-bold text-xl ml-5 mt-4'>Advance Options:</h1>
                                <hr className='font-bold text-2xl mb-3' />
                                <div className='flex gap-3 ml-5'>
                                    <h2 className='flex justify-center items-center'>Auto Hide</h2>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={autoHide}
                                                onChange={handleCheckboxChange}
                                            />
                                        }
                                        label="Do not auto hide notification. Continue to show until user clicks or disconnects the notification."
                                        className='flex justify-center items-center'
                                    />
                                </div>

                                <div className='ml-10' >

                                    <FormControl >
                                        <div className='flex gap-7 justify-center items-center'>


                                            <FormLabel id="demo-controlled-radio-buttons-group">Model</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={radio}
                                                onChange={handleChangeRadio}
                                            >
                                                <FormControlLabel value="Default" control={<Radio />} label="Default" />
                                                <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                </div>



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


                                {/*  webPushCampaignName: campaignName,
                webPushCampaignTags: campaignTag,
                webPushProvider: provider,
                webPushTitle: webPushData.title,
                webPushContent: webPushData.content,
                iconUrl:iconUrl,
                actionUrl:actionUrl,
                imageUrl:imageUrl,
                label:label,
                actionUrl2:actionUrl2,
                autoHide:autoHide,
                model:radio,
 */}

                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>WebPush Provider:</h3>
                                        <h3 className="text-blue-500 w-2/3">{provider}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>WebPush Title:</h3>
                                        <h3 className="text-blue-500 w-2/3">{webPushData.title}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>WebPush Content:</h3>
                                        <h3 className="text-blue-500 w-2/3 break-words" dangerouslySetInnerHTML={{ __html: webPushData.content }}></h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>Icon-Url:</h3>
                                        <h3 className="text-blue-500 w-2/3">{iconUrl}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>On-Click-Action:</h3>
                                        <h3 className="text-blue-500 w-2/3">{actionUrl}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>Image-Url:</h3>
                                        <h3 className="text-blue-500 w-2/3">{imageUrl}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>Label:</h3>
                                        <h3 className="text-blue-500 w-2/3">{label}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>On-Click-Action:</h3>
                                        <h3 className="text-blue-500 w-2/3">{actionUrl2}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>Auto-Hide:</h3>
                                        <h3 className="text-blue-500 w-2/3">{autoHide}</h3>
                                    </div>
                                    <div className='flex gap-5 px-5 py-2 mt-1'>
                                        <h3 className='w-1/6'>Model:</h3>
                                        <h3 className="text-blue-500 w-2/3">{radio}</h3>
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

