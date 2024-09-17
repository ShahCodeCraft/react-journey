
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
// import { sendBrandID } from "../../../env"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Popup from './Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';


// dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SmsCampaignPopup from './Popup/SmsCampaignPopup';
import EmailCampaignPopup from "./Popup/EmailCampaignPopup";
import WhatsAppCampaignPopup from './Popup/WhatsAppCampaignPopup';
import WebPushCampaignPopup from './Popup/WebPushCampaignPopup';
// import SetupHandlePort from './SetupHandlePort';
import SetupSettingsPopup from './Popup/SetupJourneySetting';
import { styled } from '@mui/material';


// for right  side pop 
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { emailCampaignIdReducer, setupfilledReducer, setUpformDataIdReducer, smsCampaignIdReducer, webPushCampaignIdReducer, whatsAppCampaignIdReducer } from '../../reducer/slice';
import SegmentUsers from './Popup/SegmentUsers';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';



// campaign looping list
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
// import { environment } from '../../../environments/environment';
import SegmentSetSnackBar from './snackBar/SegmentSetSnackBar';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import { FixedSizeList } from 'react-window';


import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});





const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        position: 'fixed',
        top: 0,
        right: 0,
        margin: 0,
        height: '100vh', // Full viewport height
        width: '77%', // Adjust the width as needed
        maxWidth: '77%',
    },
}));




interface Props {
    selectedNode: any;
    firstNode: any;
    sendDataToParent: (data: any) => any;
    sendIdToParent: (data: any) => any;
    sendSecondsParent: (labelName: string, data: any, delayID: any) => any;
    sendMillisecond: (data: any) => any;
    // person : TestProps

}

interface Campaign {
    _id: string;
    whatsAppCampaignName: string;
    // Add other properties as needed
}



const SidebarR = ({ selectedNode, firstNode, sendDataToParent, sendIdToParent, sendSecondsParent, sendMillisecond }: Props) => {

    const customColor = {
        background: "#FCFCFC"

    };
    // person.name = "afda"
    interface NodeState {
        title: string,
        description: string
    }

    const [userSelectedNode, setUserSelectedNode] = useState<any>(firstNode);
    const [nodeName, setNodeName] = useState<NodeState>({ title: "", description: "" });
    const prevNodeName = useRef<NodeState>({ title: "", description: "" });
    const [nodeidApiid, setNodeidApiid] = useState({
        selectedNodeId: "",
        campaignId: ""

    })
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [showHidePopup, setShowHidePopup] = useState(false);
    const [showTimeForm, setShowTImeForm] = useState(false)
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);

    const journeyName = useSelector((state: any) => state.data.journeyName.value);
    const triggerJson = useSelector((state: any) => state.data.triggerJson.value);
    const setupCheck = useSelector((state: any) => state.data.setupfilledSlice.value);
    const dispatchSetupnodess = useDispatch();


    // sms campaign state and methods
    const [open, setOpen] = React.useState(false);
    const [checkEditOrNew, setCheckEditOrNew] = useState("old")

    const handleClickOpen = (data:any) => {
        setCheckEditOrNew(data)

        setOpen(true);
    };


    const handleClickSmsEdit = (data:any)=>{
        setSelectedCampaign(data);
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmitSmsCampaignFun = () => {

        setOpen(false);
        setShowHide(false);

    }
    // email campaign state and methods

    const [emailCampaignOpen, setEmailCampaignOpen] = useState(false)
    const handleClickEmailOpen = (data:any) => {
        setCheckEditOrNew(data)
        setEmailCampaignOpen(true)

    }

    const handleClickEmailEdit =(data:any)=>{
        setSelectedCampaign(data);
       
        setEmailCampaignOpen(true)

    }

    const emailCampaignClose = () => {
        setEmailCampaignOpen(false)

    }

    const handleSubmitCampaignFun = () => {
        // alert("from email")
        setEmailCampaignOpen(false)
        setShowHide(false);

    }

    // Setup  state and methods

    const [setupSettingsOpen, setSetupSettingsOpen] = useState(false)

    const handleClickSetupSettingsOpen = () => {
        setSetupSettingsOpen(true)
    }

    // segment state and methods

    const [segmentOpen, setSegmentOpen] = useState(false)

    const handleClickSegmentOpen = () => {
        setSegmentOpen(true)
    }

    const [showComponent, setShowComponent] = useState(false);

    const handleClickSegmentClose = (reason: any) => {
        if (reason && reason === "backdropClick")
            return;
            setShowComponent(false); // First, unmount the component
            setTimeout(() => {
              setShowComponent(true); // Then, remount the component
            }, 0);

        setSegmentOpen(false)



    }

    const dispatchSetup = useDispatch();



    const setupSettingsClose = (reason: any) => {

        if (reason && reason === "backdropClick")
            return;
        setSetupSettingsOpen(false)

    }


    const dispatchSetupChangeCloseOpen = useDispatch()

    const setupSettingsCloseSubmit = (reason: any) => {
        if (reason && reason === "backdropClick")
            return;

        // dispatchSetupChangeCloseOpen(setUpformCloseOpenReducer(true))
        // dispatchSetup(setupfilledReducer(1))
        setSetupSettingsOpen(false)
    }


    //    const changeToFalse =(data:any)=>{
    //     alert("data id of setup" + JSON.stringify(data))
    //                 dispatchSetupnodess(setUpformDataIdReducer(data));


    //     // dispatchSetup(setupfilledReducer(1))
    //     setSetupSettingsOpen(false)
    //             setShowHide(false);

    //    }

    const changeToFalse = useCallback((data: any) => {
        // alert("data id of setup" + JSON.stringify(data));
        if (data) {

            dispatchSetupnodess(setUpformDataIdReducer(data));
        }
        setSetupSettingsOpen(false);
        setShowHide(false);
    }, [dispatchSetupnodess]);

    // whatsapp campaign state and methods

    const [whatsAppCampaignOpen, setWhatsAppCampaignOpen] = useState(false);
    const handleClickWhatsAppOpen = (data:any) => {
        setCheckEditOrNew(data)
        setWhatsAppCampaignOpen(true);
    }

    const handleClickWhatsappEdit = (data:any)=>{
        setSelectedCampaign(data);
        setWhatsAppCampaignOpen(true);

    }

    const whatsAppCampaignClose = () => {
        setWhatsAppCampaignOpen(false);
    }

    const handleSubmitWhatsAppCampaignFun = () => {
        setWhatsAppCampaignOpen(false);
        setShowHide(false);

    }

    // webPush campaign state and methods


    const [webPushCampaignOpen, setWebPushCampaignOpen] = useState(false);

    const handleClickWebPushOpen = (data:any) => {
        setCheckEditOrNew(data)
        setWebPushCampaignOpen(true);
    }

    const handleClickWebpushEdit = (data:any)=>{
        setSelectedCampaign(data);
        setWebPushCampaignOpen(true);

    }

    const webPushCampaignClose = () => {
        setWebPushCampaignOpen(false);
    }


    const handleSubmitWebPushCampaignFun = () => {
        setWebPushCampaignOpen(false);
        setShowHide(false);
    }

    console.log(userSelectedNode)


    const delayIds = useSelector((state: any) => state.data.delaynodeId.value)
    const segmentId = useSelector((state: any)=> state.data.filteredSegmentedUserSlice.value.name)

    // alert(JSON.stringify("INSIDEBARr" +JSON.stringify(delayIds)))

    const [delayIdsState, setDelayIdsState] = useState(delayIds)



    // get all campaings



    useEffect(() => {
        prevNodeName.current = nodeName; // Store the previous value of nodeName
    }, [nodeName]);

    const [showHide, setShowHide] = useState(false);
    useEffect(() => {
        if (selectedNode) {
            setShowTImeForm(false)
            setShowHide(true);
        } else {
            setShowHide(false);
        }
    }, [selectedNode]);



    useEffect(() => {
        if (delayIds.label) {

            // alert("from sidebar: " + JSON.stringify(delayIds));
            setShowHide(true);
            setShowTImeForm(true);
        } else {
            setShowHide(false);
            setShowTImeForm(false);
        }
    }, [delayIds.label]);


    useEffect(() => {
        if (selectedNode === undefined) return;
        if (selectedNode !== userSelectedNode) {
            setUserSelectedNode(selectedNode);
        }
    }, [selectedNode, userSelectedNode]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNodeName((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        userSelectedNode.data.label = nodeName.title === "" ? userSelectedNode.data.label : nodeName.title;
        userSelectedNode.data.description = nodeName.description === "" ? userSelectedNode.data.description : nodeName.description;
        sendDataToParent(userSelectedNode);
        setNodeName({ title: "", description: "" });
        setShowHide(false);
    };

    const [width, setWidth] = useState(window.innerWidth);
    const handelResize = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener("resize", handelResize);
        return () => {
            window.removeEventListener("resize", handelResize);
        };
    }, []);

    const [campaignsWhatsApp, setCampaignsWhatsApp] = useState<any[]>([]);
    const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]); // State to hold campaign ids and names
    const [campaignsWebPush, setCampaignsWebPush] = useState<any[]>([]);
    const [campaignsSms, setCampaignsSms] = useState<any[]>([]);

    const [campaignsEmail, setCampaignsEmail] = useState<any[]>([]);

    console.log(userSelectedNode.type)
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isLoadingSms, setIsLoadingSms] = useState(true);
    const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(true);
    const [isLoadingWebPush, setIsLoadingWebPush] = useState(true);
    const [isLoadingEmail, setIsLoadingEmail] = useState(true);


    // const BrandID = sendBrandID;
    // console.log(BrandID)
    // Function to fetch data from API
    const fetchData = async () => {

        if (userSelectedNode.type === "sms") {
            try {
                const response = await axios.get(`http://localhost:3000/journey/getAllSmsCampaigns`); // Replace <your_api_url> with your actual API URL
                // Extract campaign ids and names from response data and set it in state
                console.log(response.data)
                const campaignsData = response.data.map((campaign: any) => ({
                    id: campaign._id,
                    name: campaign.campaignName
                }));

                setCampaignsSms(response.data);
                setIsLoadingSms(false);


            } catch (error) {
                console.error('Error fetching data:', error);
            }

        } else if (userSelectedNode.type === "whatsapp") {
            try {
                const response = await axios.get(`http://localhost:3000/journey/getAllWhatsappCampaigns`); // Replace <your_api_url> with your actual API URL
                // Extract campaign ids and names from response data and set it in state
                console.log(response.data)
                const campaignsData = response.data.map((campaign: any) => ({
                    id: campaign._id,
                    name: campaign.campaignName
                }));

                // setCampaigns(response.data);
                setCampaignsWhatsApp(response.data);
                setIsLoadingWhatsApp(false)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else if (userSelectedNode.type === "webPush") {

            try {
                const response = await axios.get(`http://localhost:3000/journey/getAllWebPushCampaigns`); // Replace <your_api_url> with your actual API URL
                // Extract campaign ids and names from response data and set it in state
                console.log(response.data)
                const campaignsData = response.data.map((campaign: any) => ({
                    id: campaign._id,
                    name: campaign.campaignName
                }));

                setCampaignsWebPush(response.data);
                setIsLoadingWebPush(false)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else if (userSelectedNode.type === "port") {

            try {
                const response = await axios.get(`http://localhost:3000/journey/getAllEmailCampaigns`); // Replace <your_api_url> with your actual API URL
                // Extract campaign ids and names from response data and set it in state
                console.log(response.data)
                const campaignsData = response.data.map((campaign: any) => ({
                    id: campaign._id,
                    name: campaign.campaignName
                }));

                setCampaignsEmail(response.data);
                setIsLoadingEmail(false)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }



    };

    console.log("campaignsWhatsApp" + JSON.stringify(campaignsWhatsApp))
    useEffect(() => {
        // Fetch data when component mounts
        fetchData();
    }, [userSelectedNode]);


    const handleCampaignIdClick = async (id: any, name: string) => {
        sendIdToParent({
            selectedNodeId: userSelectedNode.id,
            campaignId: id,
            campaignName: name,
            selectedNodeLabel: userSelectedNode.type
        });
        setSelectedCampaignId(id);
    };



    const handleChangeDelay = (e: any) => {
        const { name, value } = e.target;
        setTime(prevTime => ({
            ...prevTime,
            [name]: parseInt(value, 10) // Convert value to integer
        }));
    };

    const handleSubmitDelay = (e: any) => {
        e.preventDefault();
        const labelName = userSelectedNode.data.label
        const totalMilliseconds = time.hours * 3600000 + time.minutes * 60000 + time.seconds * 1000;
        console.log(totalMilliseconds); // Use the time object as needed
        sendSecondsParent(labelName, [{ hours: time.hours, minutes: time.minutes, seconds: time.seconds }], delayIds)
        setTime({ hours: 0, minutes: 0, seconds: 0 })
        setShowHide(false);
        sendMillisecond(totalMilliseconds)

    };

    // for whatsApp selection
    const dispatchWhatsAppCampaignIdReducer = useDispatch();
    const handleCampaignClick = (campaign: any) => {
        if (selectedCampaign && selectedCampaign._id === campaign._id) {
            // If the clicked campaign is already selected, deselect it
            setSelectedCampaign(null);
            const whatsAppCampaignData = {
                whatsAppCampaignId: "",
                nodedata: userSelectedNode,
            }
            dispatchWhatsAppCampaignIdReducer(whatsAppCampaignIdReducer(whatsAppCampaignData));

        } else {
            // Otherwise, select the clicked campaign
            setSelectedCampaign(campaign);
            const whatsAppCampaignData = {
                whatsAppCampaignId: campaign._id,
                nodedata: userSelectedNode,
            }
            dispatchWhatsAppCampaignIdReducer(whatsAppCampaignIdReducer(whatsAppCampaignData));

        }
    };

    // for Sms selection
    const dispatchSmsCampaignIdReducer = useDispatch();
    const handleSmsCampaignClick = (campaign: any) => {
        if (selectedCampaign && selectedCampaign._id === campaign._id) {
            // If the clicked campaign is already selected, deselect it
            setSelectedCampaign(null);
            const smsCampaignData = {
                smsCampaignId: "",
                nodedata: userSelectedNode,
            }
            dispatchSmsCampaignIdReducer(smsCampaignIdReducer(smsCampaignData));

        } else {
            // Otherwise, select the clicked campaign
            setSelectedCampaign(campaign);
            const smsCampaignData = {
                smsCampaignId: campaign._id,
                nodedata: userSelectedNode,
            }
            dispatchSmsCampaignIdReducer(smsCampaignIdReducer(smsCampaignData));

        }
    };


    // for Email selection

    const dispatchEmailCampaignIdReducer = useDispatch();
    const handleEmailCampaignClick = (campaign: any) => {
        if (selectedCampaign && selectedCampaign._id === campaign._id) {
            // If the clicked campaign is already selected, deselect it
            setSelectedCampaign(null);
            const emailCampaignData = {
                emailCampaignId: "",
                nodedata: userSelectedNode,
            }
            dispatchEmailCampaignIdReducer(emailCampaignIdReducer(emailCampaignData));

        } else {
            // Otherwise, select the clicked campaign
            setSelectedCampaign(campaign);
            const emailCampaignData = {
                emailCampaignId: campaign._id,
                nodedata: userSelectedNode,
            }
            dispatchEmailCampaignIdReducer(emailCampaignIdReducer(emailCampaignData));

        }
    };




    // for WebPush selection

    const dispatchWebPushCampaignIdReducer = useDispatch();
    const handleWebPushCampaignClick = (campaign: any) => {
        if (selectedCampaign && selectedCampaign._id === campaign._id) {
            // If the clicked campaign is already selected, deselect it
            setSelectedCampaign(null);
            const webPushCampaignData = {
                webPushCampaignId: "",
                nodedata: userSelectedNode,
            }
            dispatchWebPushCampaignIdReducer(webPushCampaignIdReducer(webPushCampaignData));

        } else {
            // Otherwise, select the clicked campaign
            setSelectedCampaign(campaign);
            const webPushCampaignData = {
                webPushCampaignId: campaign._id,
                nodedata: userSelectedNode,
            }
            dispatchWebPushCampaignIdReducer(webPushCampaignIdReducer(webPushCampaignData));

        }
    };




    const popup = () => {

        setShowHidePopup(() => {
            return !showHidePopup
        });
    }

    const handleClosePopup = () => {
        setShowHidePopup(false); // Update the state to hide the Popup
    };

    console.log(userSelectedNode.data.label)




    return (
        <div >
            {/* {width} */}
            {showHide ?
                <div className={`flex flex-col overflow-y-scroll absolute right-3 h-[610px] border-l-2 p-4 ${width < 720 ? 'w-48' : 'w-80'}`}
                    style={customColor}
                >

                    {/* delayFrom between nodes */}

                    {(delayIdsState && showTimeForm) ? (
                        <form onSubmit={handleSubmitDelay}>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold my-2">Time Input</h2>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="hours">
                                        Hours
                                    </label>
                                    <input
                                        value={time.hours}
                                        onChange={handleChangeDelay}
                                        id="hours"
                                        name="hours"
                                        type="number"
                                        min="0"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="minutes">
                                        Minutes
                                    </label>
                                    <input
                                        value={time.minutes}
                                        onChange={handleChangeDelay}
                                        id="minutes"
                                        name="minutes"
                                        type="number"
                                        min="0"
                                        max="59"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="seconds">
                                        Seconds
                                    </label>
                                    <input
                                        value={time.seconds}
                                        onChange={handleChangeDelay}
                                        id="seconds"
                                        name="seconds"
                                        type="number"
                                        min="0"
                                        max="59"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                        </form>
                    ) : (
                        journeyName !== "" ? (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <h2 className="text-lg font-semibold mb-2">Customize Node Input:</h2>
                                    <div className="flex flex-col mb-1">
                                        <label className="mb-1 font-medium" htmlFor="label">
                                            Label
                                        </label>
                                        <input
                                            value={nodeName.title}
                                            onChange={handleChange}
                                            id="label"
                                            name="title"
                                            className="border border-gray-300 rounded-md px-3 py-2"
                                            placeholder={userSelectedNode.data.label}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-1">
                                        <label className="mb-1 font-medium" htmlFor="description">
                                            Description
                                        </label>
                                        <input
                                            value={nodeName.description}
                                            onChange={handleChange}
                                            id="description"
                                            name='description'
                                            className="border border-gray-300 rounded-md px-3 py-2"
                                            placeholder={userSelectedNode.data.description}
                                        />
                                    </div>
                                </div>
                                <button type='submit' className=" mb-2  bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                                    Submit
                                </button>
                            </form>
                        ) : (
                            // trigger
                            <form >
                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold mb-2">Component</h2>
                                    <div className="flex flex-col mb-3">
                                        <label className="mb-1 font-medium" htmlFor="label">
                                            Journey Name
                                        </label>
                                        <input
                                            value={journeyName}
                                            onChange={handleChange}
                                            id="label"
                                            name="title"
                                            className="border border-gray-300 rounded-md px-3 py-2"
                                            placeholder={userSelectedNode.data.label}
                                        />
                                    </div>
                                    <div className="flex flex-col mb-3">
                                        <label className="mb-1 font-medium" htmlFor="description">
                                            Segment Name
                                        </label>
                                        <input
                                            value={triggerJson}
                                            onChange={handleChange}
                                            id="description"
                                            name='description'
                                            className="border border-gray-300 rounded-md px-3 py-2"
                                            placeholder={userSelectedNode.data.description}
                                        />
                                    </div>
                                </div>
                                <button type='submit' className="mt-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Submit
                                </button>
                            </form>
                        )
                    )}


                    {/* 
                    {userSelectedNode.type === "delay" ? (
                        <form onSubmit={handleSubmitDelay}>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Time Input delayNode</h2>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="hours">
                                        Hours
                                    </label>
                                    <input
                                        value={time.hours}
                                        onChange={handleChangeDelay}
                                        id="hours"
                                        name="hours"
                                        type="number"
                                        min="0"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="minutes">
                                        Minutes
                                    </label>
                                    <input
                                        value={time.minutes}
                                        onChange={handleChangeDelay}
                                        id="minutes"
                                        name="minutes"
                                        type="number"
                                        min="0"
                                        max="59"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="seconds">
                                        Seconds
                                    </label>
                                    <input
                                        value={time.seconds}
                                        onChange={handleChangeDelay}
                                        id="seconds"
                                        name="seconds"
                                        type="number"
                                        min="0"
                                        max="59"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>
                        </form>
                    ) : (



                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold mb-2">Component</h2>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="label">
                                        Label
                                    </label>
                                    <input
                                        value={nodeName.title}
                                        onChange={handleChange}
                                        id="label"
                                        name="title"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                        placeholder={userSelectedNode.data.label}
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label className="mb-1 font-medium" htmlFor="description">
                                        Description
                                    </label>
                                    <input
                                        value={nodeName.description}
                                        onChange={handleChange}
                                        id="description"
                                        name='description'
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                        placeholder={userSelectedNode.data.description}
                                    />
                                </div>

                            </div>
                            <button type='submit'></button>
                        </form>)} */}

                    {(userSelectedNode.type === "whatsapp" && !showTimeForm) ? (
                        <div>
                            <hr className='text-black font-semibold shadow-md ' />
                            <div className="flex items-center justify-between my-2 p-1 border-2 rounded-xl ">
                                <h3 className="text-sm  font-semibold">Create New WhatsApp Campaign</h3>
                                <Button

                                ><FontAwesomeIcon onClick={()=>handleClickWhatsAppOpen("new")} icon={faCirclePlus} className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>

                                <Dialog
                                    fullScreen
                                    open={whatsAppCampaignOpen}
                                    onClose={whatsAppCampaignClose}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={whatsAppCampaignClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                Create WhatsApp Campaign-
                                            </Typography>

                                        </Toolbar>
                                    </AppBar>
                                    <List>

                                    {(selectedCampaign && checkEditOrNew != "new") ? (
                                            <WhatsAppCampaignPopup
                                                selectedCampaign={selectedCampaign}
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitWhatsAppCampaignFun={handleSubmitWhatsAppCampaignFun}
                                            />
                                        ) : (
                                            <WhatsAppCampaignPopup
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitWhatsAppCampaignFun={handleSubmitWhatsAppCampaignFun}
                                            />
                                        )}

                                        {/* <WhatsAppCampaignPopup userSelectedNode={userSelectedNode} handleSubmitWhatsAppCampaignFun={handleSubmitWhatsAppCampaignFun} /> */}

                                    </List>
                                </Dialog>



                            </div>

                            {/* campaign displaying */}
                            <h1 className="text-lg  font-semibold">WhatsApp Campaigns List:</h1>
                            <div className="flex flex-col border border-1 rounded-xl mb-2 overflow-y-scroll h-56">
            {isLoadingWhatsApp ? (
                <>
                    <Skeleton height={40} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={40} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={40} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={40} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={40} style={{ margin: '5px', borderRadius: '8px' }} />
                </>
            ) : (
                campaignsWhatsApp.slice().reverse().map((campaign) => (
                    <ListItem
                      key={campaign._id}
                      component="div"
                      style={{
                        padding: '1px',
                        marginBottom:"5px",
                        marginTop:"5px"
                      }}
                    >
                      <ListItemButton
                        onClick={() => handleCampaignClick(campaign)}
                        style={{
                          border: '1px solid #ccc',
                          backgroundColor: selectedCampaign && selectedCampaign._id === campaign._id ? '#007bff' : '#f0f0f0',
                          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                          padding: "3px",
                          width: '95%',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <ListItemText
                          primary={campaign.whatsAppCampaignName.length > 15
                            ? campaign.whatsAppCampaignName.substring(0, 15) + '...'
                            : campaign.whatsAppCampaignName}
                          style={{
                            color: selectedCampaign && selectedCampaign._id === campaign._id ? '#ffffff' : '#000000',
                            padding: '5px',
                          }}
                        />
                        <FontAwesomeIcon
                          onClick={(e) => {
                            e.stopPropagation();  // Prevent triggering the ListItemButton click
                            handleClickWhatsappEdit(campaign);
                          }}
                          className='w-5 h-5 hover:cursor-pointer text-gray-400 hover:text-gray-600'
                          icon={faPenToSquare}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
            )}
        </div>

                        </div>


                    ) : (userSelectedNode.type === "sms" && !showTimeForm) ? (
                        <div>
                            <hr className='text-black font-semibold shadow-md ' />
                            <div className="flex items-center justify-between my-2 p-1 border-2 rounded-xl ">
                                <h3 className="text-sm  font-semibold">Create New Sms Campaign</h3>
                                <Button

                                ><FontAwesomeIcon onClick={()=>handleClickOpen("new")} icon={faCirclePlus} className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>


                                {/*  */}

                                <Dialog
                                    fullScreen
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={handleClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                Create Sms Campaign-
                                            </Typography>

                                        </Toolbar>
                                    </AppBar>
                                    <List>

                                    {(selectedCampaign && checkEditOrNew != "new") ? (
                                            <SmsCampaignPopup
                                                selectedCampaign={selectedCampaign}
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitSmsCampaignFun={handleSubmitSmsCampaignFun}
                                            />
                                        ) : (
                                            <SmsCampaignPopup
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitSmsCampaignFun={handleSubmitSmsCampaignFun}
                                            />
                                        )}


                                    </List>
                                </Dialog>
                                {/*  */}
                            </div>


                            {/* campaign displaying */}
                            <h1 className="text-lg  font-semibold">Sms Campaigns List:</h1>
                            {/* <div className="flex flex-col border border-1 rounded-xl mb-2 overflow-y-scroll h-56">
                                {campaignsSms.slice().reverse().map((campaign) => ( // Reverse order of campaignsWhatsApp
                                    <ListItem
                                        key={campaign._id}
                                        component="div"
                                        style={{
                                            padding: 0,
                                            margin: 0,
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={() => handleSmsCampaignClick(campaign)}
                                            style={{
                                                border: '1px solid #ccc',
                                                backgroundColor: selectedCampaign && selectedCampaign._id === campaign._id ? '#007bff' : '#f0f0f0',
                                                padding: 0,
                                                width: '100%',
                                                height: "50px",
                                                borderRadius: '8px', // Border radius for the ListItemButton
                                                margin: '5px', // Adjust margin as needed
                                            }}
                                        >
                                            <ListItemText
                                                primary={campaign.smsCampaignName.length > 15
                                                    ? campaign.smsCampaignName.substring(0, 15) + '...'
                                                    : campaign.smsCampaignName}
                                                style={{
                                                    color: selectedCampaign && selectedCampaign._id === campaign._id ? '#ffffff' : '#000000',
                                                    padding: '10px',
                                                }}
                                            />

                                            <FontAwesomeIcon onClick={handleClickOpen} className='w-4 h-4 relative right-2 hover:cursor-pointer text-gray-300 hover:text-gray-500 flex justify-center items-center ' icon={faPenToSquare} />

                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </div> */}
                            <div className="flex flex-col border border-1 rounded-xl mb-2 overflow-y-scroll h-56">
    {isLoadingSms ? ( // Replace isLoading with your actual loading state
        <>
            <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
            <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
            <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
            <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
            <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
        </>
    ) : (
        campaignsSms.slice().reverse().map((campaign) => (
            <ListItem
              key={campaign._id}
              component="div"
              style={{
                padding: '1px',
                marginBottom:"5px",
                marginTop:"5px"
              }}
            >
              <ListItemButton
                onClick={() => handleSmsCampaignClick(campaign)}
                style={{
                    border: '1px solid #ccc',
                    backgroundColor: selectedCampaign && selectedCampaign._id === campaign._id ? '#007bff' : '#f0f0f0',
                    // backgroundColor: 
                    // (selectedCampaign && selectedCampaign._id === campaign._id && 
                    // (userSelectedNode.data.fetchedData === campaign._id)) 
                    // ? '#007bff' : '#f0f0f0',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    padding: "3px",
                    width: '95%',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
              >
                <ListItemText
                  primary={campaign.smsCampaignName.length > 15
                    ? campaign.smsCampaignName.substring(0, 15) + '...'
                    : campaign.smsCampaignName}
                    style={{
                        color: selectedCampaign && selectedCampaign._id === campaign._id ? '#ffffff' : '#000000',
                        padding: '5px',
                      }}
                />
                <FontAwesomeIcon
                  onClick={(e) => {
                    e.stopPropagation();  // Prevent triggering the ListItemButton click
                    handleClickSmsEdit(campaign);
                  }}
                  className='w-5 h-5 hover:cursor-pointer text-gray-400 hover:text-gray-600'
                  icon={faPenToSquare}
                />
              </ListItemButton>
            </ListItem>
          ))
    )}
</div>


                        </div>

                    ) : (userSelectedNode.type === "webPush" && !showTimeForm) ? (
                        <div>
                            <hr className='text-black font-semibold shadow-md ' />
                            <div className="flex items-center justify-between my-2 p-1 border-2 rounded-xl ">
                                <h3 className="text-sm  font-semibold">Create New webPush Campaign</h3>
                                <Button

                                ><FontAwesomeIcon onClick={()=>handleClickWebPushOpen("new")} icon={faCirclePlus} className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>



                                <Dialog
                                    fullScreen
                                    open={webPushCampaignOpen}
                                    onClose={webPushCampaignClose}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={webPushCampaignClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                Create WebPush Campaign-
                                            </Typography>

                                        </Toolbar>
                                    </AppBar>
                                    <List>

                                    {(selectedCampaign && checkEditOrNew != "new") ? (
                                            <WebPushCampaignPopup
                                                selectedCampaign={selectedCampaign}
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitWebPushCampaignFun={handleSubmitWebPushCampaignFun}
                                            />
                                        ) : (
                                            <WebPushCampaignPopup
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitWebPushCampaignFun={handleSubmitWebPushCampaignFun}
                                            />
                                        )}

                                        {/* WebPushCampaignPopup */}
                                    </List>
                                </Dialog>

                            </div>


                            {/* campaign displaying */}
                            <h1 className="text-lg  font-semibold">WebPush Campaigns List:</h1>
                            <div className="flex flex-col border border-1 rounded-xl mb-2 overflow-y-scroll h-56">
            {isLoadingWebPush ? (
                <>
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                </>
            ) : (
                campaignsWebPush.slice().reverse().map((campaign) => (
                    <ListItem
                      key={campaign._id}
                      component="div"
                      style={{
                        padding: '1px',
                        marginBottom:"5px",
                        marginTop:"5px"
                      }}
                    >
                      <ListItemButton
                        onClick={() => handleWebPushCampaignClick(campaign)}
                        style={{
                            border: '1px solid #ccc',
                            backgroundColor: selectedCampaign && selectedCampaign._id === campaign._id ? '#007bff' : '#f0f0f0',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            padding: "3px",
                            width: '95%',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                      >
                        <ListItemText
                          primary={campaign.webPushCampaignName.length > 15
                            ? campaign.webPushCampaignName.substring(0, 15) + '...'
                            : campaign.webPushCampaignName}
                            style={{
                                color: selectedCampaign && selectedCampaign._id === campaign._id ? '#ffffff' : '#000000',
                                padding: '5px',
                              }}
                        />
                        <FontAwesomeIcon
                          onClick={(e) => {
                            e.stopPropagation();  // Prevent triggering the ListItemButton click
                            handleClickWebpushEdit(campaign);
                          }}
                          className='w-5 h-5 hover:cursor-pointer text-gray-400 hover:text-gray-600'
                          icon={faPenToSquare}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
            )}
        </div>


                        </div>
                    ) : (userSelectedNode.type === "port" && !showTimeForm) ? (
                        <div>
                            <hr className='text-black font-semibold shadow-md ' />
                            <div className="flex items-center justify-between my-2 p-1 border-2 rounded-xl ">
                                <h3 className="text-sm  font-semibold">Create New Email Campaign</h3>
                                <Button

                                ><FontAwesomeIcon onClick={()=>handleClickEmailOpen("new")} icon={faCirclePlus} className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>

                                {/* <div onClick={handleClickEmailOpen} >
                                    <Button  ><FontAwesomeIcon icon={faCirclePlus} className=' w-7 h-7 relative right-8 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>

                                </div> */}
                                <Dialog
                                    fullScreen
                                    open={emailCampaignOpen}
                                    onClose={emailCampaignClose}
                                    TransitionComponent={Transition}
                                >
                                    <AppBar sx={{ position: 'relative' }}>
                                        <Toolbar>
                                            <IconButton
                                                edge="start"
                                                color="inherit"
                                                onClick={emailCampaignClose}
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                                Create Email Campaign-
                                            </Typography>

                                        </Toolbar>
                                    </AppBar>
                                    <List>
                                        {(selectedCampaign && checkEditOrNew != "new") ? (
                                            <EmailCampaignPopup
                                                selectedCampaign={selectedCampaign}
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitCampaignFun={handleSubmitCampaignFun}
                                            />
                                        ) : (
                                            <EmailCampaignPopup
                                                userSelectedNode={userSelectedNode}
                                                handleSubmitCampaignFun={handleSubmitCampaignFun}
                                            />
                                        )}
                                    </List>
                                </Dialog>

                            </div>


                            {/* campaign displaying */}
                            <h1 className="text-lg  font-semibold">Email Campaigns List:</h1>
                            <div className="flex flex-col border border-1 rounded-xl mb-2 overflow-y-scroll h-56">
            {isLoadingEmail ? (
                <>
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                    <Skeleton height={50} style={{ margin: '5px', borderRadius: '8px' }} />
                </>
            ) : (
                campaignsEmail.slice().reverse().map((campaign) => (
                    <ListItem
                      key={campaign._id}
                      component="div"
                      style={{
                        padding: '1px',
                        marginBottom:"5px",
                        marginTop:"5px"
                      }}
                    >
                      <ListItemButton
                        onClick={() => handleEmailCampaignClick(campaign)}
                        style={{
                            border: '1px solid #ccc',
                            backgroundColor: selectedCampaign && selectedCampaign._id === campaign._id ? '#007bff' : '#f0f0f0',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            padding: "3px",
                            width: '95%',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                      >
                        <ListItemText
                          primary={campaign.emailCampaignName.length > 15
                            ? campaign.emailCampaignName.substring(0, 15) + '...'
                            : campaign.emailCampaignName}
                            style={{
                                color: selectedCampaign && selectedCampaign._id === campaign._id ? '#ffffff' : '#000000',
                                padding: '5px',
                              }}
                        />
                        <FontAwesomeIcon
                          onClick={(e) => {
                            e.stopPropagation();  // Prevent triggering the ListItemButton click
                            handleClickEmailEdit(campaign);
                          }}
                          className='w-5 h-5 hover:cursor-pointer text-gray-400 hover:text-gray-600'
                          icon={faPenToSquare}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
            )}
        </div>


                        </div>
                    ) :
                        (userSelectedNode.type === "setup" && !showTimeForm) ? (
                            // <div>
                            //     <div className="flex items-center justify-between">
                            //         <h3 className="text-lg font-semibold ">Setup Settings</h3>
                            //         {/* <span><FontAwesomeIcon onClick={popup} icon={faCirclePlus} className=' w-7 h-7 relative right-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></span> */}
                            //         {/*  */}
                            //     <div >
                            //     <Button onClick={handleClickSetupSettingsOpen}  ><FontAwesomeIcon icon={faCirclePlus} className=' w-7 h-7 relative right-1 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>

                            //     </div>


                            //         <BootstrapDialog
                            //             fullScreen

                            //             // onClose={setupSettingsClose}
                            //             aria-labelledby="customized-dialog-title"
                            //             open={setupSettingsOpen}
                            //             TransitionComponent={Transition}
                            //             sx={{

                            //                 height: "100vh",
                            //             }}


                            //         >
                            //             <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title "  className="bg-slate-50" >
                            //         <h3 className="text-sm ">
                            //         Setup - Journey Setup </h3>                                           <IconButton
                            //                     aria-label="close"
                            //                     onClick={setupSettingsClose}
                            //                     sx={{
                            //                         position: 'absolute',
                            //                         right: 8,
                            //                         top: 5,

                            //                         color: (theme) => theme.palette.grey[500],
                            //                     }}
                            //                 >
                            //                     <CloseIcon />
                            //                 </IconButton>
                            //             </DialogTitle>
                            //             {/* <DialogContent dividers> */}
                            //                 <SetupSettingsPopup  changeToFalse={changeToFalse}  />

                            //             {/* </DialogContent> */}
                            //             {/* <DialogActions>
                            //                 <Button autoFocus onClick={setupSettingsCloseSubmit}>
                            //                     Save changes
                            //                 </Button>
                            //             </DialogActions> */}

                            //         </BootstrapDialog>
                            //     </div>

                            // </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Setup Settings</h3>
                                    {/* <span><FontAwesomeIcon onClick={popup} icon={faCirclePlus} className=' w-7 h-7 relative right-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></span> */}
                                    <div>
                                        <Button onClick={handleClickSetupSettingsOpen}>
                                            <FontAwesomeIcon icon={faCirclePlus} className='w-7 h-7 relative right-1 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center' />
                                        </Button>
                                    </div>

                                    <BootstrapDialog
                                        fullScreen
                                        aria-labelledby="customized-dialog-title"
                                        open={setupSettingsOpen}
                                        TransitionComponent={Transition}
                                        sx={{ height: "100vh" }}
                                    >
                                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className="bg-slate-50">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-sm">Setup - Journey Setup</h2>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={setupSettingsClose}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 5,
                                                        color: (theme) => theme.palette.grey[500],
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </div>
                                        </DialogTitle>
                                        {/* <DialogContent dividers> */}
                                        <SetupSettingsPopup changeToFalse={changeToFalse} />
                                        {/* </DialogContent> */}
                                        {/* <DialogActions>
                <Button autoFocus onClick={setupSettingsCloseSubmit}>
                    Save changes
                </Button>
            </DialogActions> */}
                                    </BootstrapDialog>
                                </div>
                            </div>


                        ) :

                            (userSelectedNode.type === "trigger" && !showTimeForm) ? (
                                <div>
                                    <hr className='text-black font-semibold shadow-md ' />
                            <div className="flex items-center justify-between my-2 p-1 border-2 rounded-xl ">
                                        <h3 className="text-lg font-semibold ">Segment</h3>
                                        {/* <span><FontAwesomeIcon onClick={popup} icon={faCirclePlus} className=' w-7 h-7 relative right-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></span> */}
                                        {/*  */}
                                        <Button onClick={handleClickSegmentOpen} ><FontAwesomeIcon icon={faCirclePlus}className=' w-7 h-7 hover:cursor-pointer hover:text-gray-500 flex justify-center items-center ' /></Button>


                                        <BootstrapDialog
                                            fullScreen

                                            // onClose={setupSettingsClose}
                                            aria-labelledby="customized-dialog-title"
                                            open={segmentOpen}
                                            TransitionComponent={Transition}
                                            sx={{

                                                height: "100vh",
                                            }}


                                        >
                                            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title " className="bg-slate-50" >
                                                <h3 className="text-sm ">
                                                    Segment</h3>                                           <IconButton
                                                        aria-label="close"
                                                        onClick={handleClickSegmentClose}
                                                        sx={{
                                                            position: 'absolute',
                                                            right: 8,
                                                            top: 5,

                                                            color: (theme) => theme.palette.grey[500],
                                                        }}
                                                    >
                                                    <CloseIcon />
                                                </IconButton>
                                            </DialogTitle>
                                            <DialogContent dividers>
                                                {/* <SetupSettingsPopup userSelectedNode={userSelectedNode} /> */}
                                                <SegmentUsers />

                                            </DialogContent>
                                            <div className="flex ml-3">
                                                <DialogActions>
                                                    <Button autoFocus

                                                        onClick={handleClickSegmentClose}>
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </div>

                                        </BootstrapDialog>
                                    </div>
                                    {/* {segementId && <p>{segementId}</p>} */}

                                    <div className="py-4">
      <hr className="mb-4 border-gray-300" />
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Selected Segment Name:
      </label>
      <div className={`flex items-center ${segmentId ? 'bg-white' : 'bg-gray-100'} border border-gray-300 rounded p-2`}>
        <AccountCircle className={`${segmentId ? 'text-blue-500' : 'text-gray-500'} mr-2`} />
        <span className={segmentId ? 'text-black text-sm font-medium' : 'text-gray-700 text-sm font-medium'}>
          {segmentId ? segmentId : 'No segment selected'}
        </span>
      </div>
    </div>

                                </div>
                            ) : null}


                </div>
                :
                <p></p>
            }

            {/* popup */}

            {showHidePopup && <Popup onClose={handleClosePopup} nodeId={userSelectedNode.id} nodeName={userSelectedNode.data.label} />}
            {/* <Popup onClose={handleClosePopup} /> */}
            {showComponent && <SegmentSetSnackBar />}
        </div >
    );
};

export default SidebarR;

