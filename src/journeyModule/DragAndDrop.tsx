
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel,
    useReactFlow,
    MiniMap,
    Controls,
    Background,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    MarkerType,


} from "reactflow";
import "reactflow/dist/base.css";
import Sidebar from "./Components/Sidebar";
import HandlesPort from "./NodeHandles/HandlesPort";
import SmsHandlePort from "./NodeHandles/SmsHandlePort";
import WhatsappHandlePort from "./NodeHandles/WhatsappHandlePort";
import ButtonEdge from './buttonDelayEdge/ButtonEdge';

import SidebarR from "./Components/SidebarR";
import StartHandlesPort from "./NodeHandles/StartHandlePort";
import EndHandlesPort from "./NodeHandles/EndHandlePort";

import axios from 'axios'; // Import Axios for making HTTP requests
import WebPushHandlePort from "./NodeHandles/WebPushHandlePort";
import DelayHandlePort from "./NodeHandles/DelayHandlePort";
import { trigger } from "@angular/animations";
import { effect } from "@angular/core";

import { store } from "../redux/store"
import { Provider, useDispatch, useSelector } from "react-redux";

import Popup from "./Components/Popup/Popup"
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import TriggerHandlePort from "./NodeHandles/TriggerHandlePort";
import AnnotationNode from "./NodeHandles/AnnotationNode";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { edgeReducer, jsonDataReducer, missingValueMessageReducer, segmentnodeTypeReducer, setupfilledReducer, setUpformDataIdReducer, toastJourneyPublishedReducer, triggerJsonReducer } from "../reducer/slice";
import SetupHandlePort from "./NodeHandles/SetupHandlePort";

// mui arrow
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { v4 as uuidv4 } from 'uuid';
import ContinueBuildingJourney from "./Components/Popup/ContinueBuildingJourney";
import PublishJourneySnackBar from "./Components/snackBar/PublishJourneySnackBar";
// import { environment } from "../../environments/environment";
import MissingValuesMessage from "./Components/Popup/MissingValueMessage";


// Key for local storage
const flowKey = "flow-key";





interface FetchedData {
    selectedNodeId: string;
    campaignId: string;
    campaignName: string;
}



// let id = 5;
let nodeNameId = 1;

// Function for generating unique IDs for nodes
// const getId = () => `${id++}`;

const nodeTypes = {
    port: HandlesPort,
    sms: SmsHandlePort, whatsapp: WhatsappHandlePort, start: StartHandlesPort,
    end: EndHandlesPort, webPush: WebPushHandlePort, delay: DelayHandlePort,
    trigger: TriggerHandlePort, annotation: AnnotationNode, setup: SetupHandlePort, // Add the new node type
};
const edgeTypes = {
    buttonedge: ButtonEdge,
};


type NodeData = {
    label: string;
    description?: string; // Make description optional
    fetchedData?: null;
    delayTime?: null;
    level?: number;
    arrowStyle?: {
        right: number;
        bottom: number;
        transform: string;
        // width:string;
    };
};

type NodeType = {
    id: string;
    type: string;
    data: NodeData;
    position: {
        x: number;
        y: number;
        zoom?: number;
    };
    draggable?: boolean;
    selectable?: boolean;
};



const App = () => {


    const selectedSegmentData = useSelector((state: any) => state.data.segmentS.value);
    console.log(selectedSegmentData)

    const selectedSegmentKeys = Object.keys(selectedSegmentData);
    const [urlProduction, setUrlProduction] = useState("https://journey-api.capengage.com/");
    const [urlDevelopment, setUrlDevelopment] = useState("http://localhost:3000/");

    const navigate = useNavigate();

    // Initial node setup
    const initialNodes: NodeType[] = [
        {
            id: "0",
            type: "setup",
            data: {
                label: "Setup",
                description: "Define Journey Setting",
                fetchedData: null,
                delayTime: null,
            },
            position: { x: 100, y: 100, zoom: 1000 },
        },
        {
            id: 'annotation-1',
            type: 'annotation',
            draggable: false,
            selectable: false,
            data: {
                level: 1,
                label: "Start by setting up your journey's basic details—it's the first step towards building your journey.",
                // label: 'Entry criteria is the behavior based on which users enter the journey. Drag and drop a segment to start building now',
                arrowStyle: {
                    right: 0,
                    bottom: 0,
                    transform: 'translate(0px,0px) rotate(0deg)',
                },

            },
            // position: { x: -80, y: -30 },
            position: { x: 100, y: 170, zoom: 30 },

        },





    ];


    // States and hooks setup
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any[]>([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [selectedElements, setSelectedElements] = useState<any[]>([]);
    const [nodeName, setNodeName] = useState("");
    const [stateValue, setStateValue] = useState<boolean>(true);
    const [secondsToWait, setSecondsToWait] = useState<any>()
    const [firstNode, setFirstNode] = useState();
    const [updatedData, setUpdatedData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null);
    const [jsonDataArray, setJsonDataArray] = useState<any[]>([]);
    const [prevLength, setPrevLength] = useState(0);
    const [prevLengthNode, setPrevLengthNode] = useState(0);
    const [nodesIDandEdge, setNodeDandEdge] = useState();
    const [fetchedDataInNode, setFetchedDataInNode] = useState<FetchedData | undefined>({
        selectedNodeId: "",
        campaignId: "",
        campaignName: ""
    });

    const [zoomOnScroll, setZoomOnScroll] = useState(false);
    const [panOnDrag, setPanOnDrag] = useState(false);
    const [publishJourneyResponse, setPublishJourneyResponse] = useState("")
    const [missingValuesMessage, setMissingValuesMessage] = useState("")

    interface TimeState {
        nodeName: string;
        seconds: any;
    }
    const [time, setTime] = useState<TimeState | undefined>(undefined);

    console.log(time)
    // useSelectors
    const { firstNum, secondNum, additionalKey } = useSelector((state: any) => state.data.deleteId);

    const deleteNodeId = useSelector((state: any) => state.data.deleteSingleNode.value)
    console.log(firstNum)

    const idAndData = useSelector((state: any) => state.data.updatedData.value)

    const delayIdAndDelayTime = useSelector((state: any) => state.data.delayData.value);

    const campaignData = useSelector((state: any) => state.data.campaign.value)


    const journeyName = useSelector((state: any) => state.data.journeyName.value);

    const triggerJson = useSelector((state: any) => state.data.triggerJson.value);

    const delayIds = useSelector((state: any) => state.data.delaynodeId.value)
    const toastJourneyPublished = useSelector((state: any) => state.data.toastJourneyPublishedSlice.value)

    const webPushCampaignData = useSelector((state: any) => state.data.webPushCampaignIdSlice.value);
    const whatsAppCampaignData = useSelector((state: any) => state.data.whatsAppCampaignIdSlice.value);
    const smsCampaignData = useSelector((state: any) => state.data.smsCampaignIdSlice.value);
    const emailCampaignData = useSelector((state: any) => state.data.emailCampaignIdSlice.value);
    const setupCheck = useSelector((state: any) => state.data.setupfilledSlice.value);
    const setupId = useSelector((state: any) => state.data.setUpformDataIdSlice.value);

    const segmentNodeonPanel = useSelector((state: any) => state.data.segmentnodeTypeSlice.value)
    const continueBuildingJourneyUserSelection = useSelector((state: any) => state.data.continueBuildingJourneySlice.value)
    const filteredSegmentedUser = useSelector((state: any) => state.data.filteredSegmentedUserSlice.value);
    const missingValueMessageSelector = useSelector((state: any) => state.data.missingValueMessageSlice.value);

    const dispatchMissingValueMessageReducer = useDispatch()

    interface ConnectedNodes {
        sourceNode: string;
        targetNode: string;
        additionalKey: number;
        label: string;
    }


    const [connectedNodes, setConnectedNodes] = useState<ConnectedNodes>(delayIds);

    console.log(triggerJson)

    // const firstObject = delayIdAndDelayTime?.data.length ? delayIdAndDelayTime?.data[0] : "No delay data" ;
    // console.log(firstObject);
    console.log(secondsToWait)


    if (delayIdAndDelayTime.data && delayIdAndDelayTime.data.length) {
        console.log('Data exists:', delayIdAndDelayTime.data[0]);
    }

    console.log(delayIdAndDelayTime)

    // this function is used for sending data to child from child

    console.log(idAndData)
    const handleChange = (value: boolean) => {
        setStateValue(value);
        console.log(value)
    };

    console.log("edges : " + JSON.stringify(edges))


    // Update parent component's state with data from child
    const handleChildData = (updatedNodeData: any) => {
        console.log(updatedNodeData);

        // Assuming nodes array is sorted by node id
        const index = binarySearch(nodes, updatedNodeData.id);

        if (index !== -1) {
            // Replace the node with the updated data
            nodes[index] = updatedNodeData;
            setNodes([...nodes]); // Update state
            console.log("Node updated at index:", index);
        } else {
            console.log("Node not found with ID:", updatedNodeData.id);
        }
    };

    function binarySearch(arr: any[], target: any): number {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid].id === target) {
                return mid; // Return index if found
            } else if (arr[mid].id < target) {
                left = mid + 1; // Search in the right half
            } else {
                right = mid - 1; // Search in the left half
            }
        }

        return -1; // Element not found
    }

    console.log(nodes)



    const edgesDispatch = useDispatch()
    useEffect(() => {
        edgesDispatch(edgeReducer(edges))
    }, [edges])


    // Update nodes data when nodeName or selectedElements changes
    console.log("nodes" + JSON.stringify(nodes))
    console.log(selectedElements)
    //    console.log(onNodesChange)
    useEffect(() => {
        if (selectedElements.length > 0) {
            // alert("selectedElements" + JSON.stringify(selectedElements[0]))

            setNodes((nds) =>
                nds.map((node) => {
                    console.log(selectedElements[0])
                    if (node.id === selectedElements[0]?.id) {

                        node.data = {
                            ...node.data,
                            label: nodeName,
                        };
                    }

                    return node;
                })
            );
        } else {
            setNodeName(""); // Clear nodeName when no node is selected
        }
    }, [nodeName, selectedElements, setNodes]);



    // campaigndata injected into the node
    useEffect(() => {
        if (campaignData && campaignData.id) {
            const updatedNodes = nodes.map(node => {
                if (node.id === campaignData.id) {
                    // Merge the campaignData into the node
                    return {
                        ...node,
                        campaignData: campaignData
                    };
                }
                return node;
            });
            setNodes(updatedNodes);
        }
        console.log(nodes)
    }, [campaignData]);




    const onNodeClick = useCallback((event: any, node: any) => {
        console.log(node);
        setSelectedElements([node]);
        // alert("selectedElements" + JSON.stringify(selectedElements[0]))
        setNodeName(node.data.label);
        setNodes((nodes) =>
            nodes.map((n) => ({
                ...n,
                selected: n.id === node.id,
            }))
        );
    }, []);


    // Setup viewport
    const { setViewport } = useReactFlow();



    // Check for empty target handles
    const checkEmptyTargetHandles = () => {
        let emptyTargetHandles = 0;
        edges.forEach((edge) => {
            if (!edge.targetHandle) {
                emptyTargetHandles++;
            }
        });
        return emptyTargetHandles;
    };


    const isNodeUnconnected = useCallback(() => {
        // Filter nodes that are not of type "setup" and do not have any edges connected to them
        const unconnectedNodes = nodes.filter(
            (node) =>
                node.type !== 'setup' &&
                !edges.some((edge) => edge.source === node.id || edge.target === node.id)
        );

        return unconnectedNodes.length > 0;
    }, [nodes, edges]);



    interface FlowData {
        nodes: any[]; // Replace 'any' with the type of your nodes
        edges: any[]; // Replace 'any' with the type of your edges
        viewport: { x: number; y: number; zoom: number }; // Adjust the type according to your viewport
    }

    // const params = useParams(); //

    // 

    const graphData = {
        nodes: [
            {
                id: "0",
                data: {
                    label: "Email",
                    description: "User Email Address",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 178,
                    y: -54.5
                },
                type: "port",
                width: 162,
                height: 50,
                selected: true
            },
            {
                id: "1",
                data: {
                    label: "SMS_0",
                    description: "User SMS Address",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 201,
                    y: 78.5
                },
                type: "sms",
                width: 114,
                height: 50
            }
        ],
        edges: [
            {
                source: "0",
                sourceHandle: "Submitted",
                target: "1",
                targetHandle: "EntryHandle",
                type: "buttonedge"
            }
        ],
        viewport: {
            x: -144,
            y: 272,
            zoom: 2
        }
    };

    const fdsaf = {
        nodes: [
            {
                id: "1",
                data: {
                    label: "SMS_0",
                    description: "user SMS Address",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 100.49684884526175,
                    y: -43.45397251732031
                },
                type: "sms",
                width: 114,
                height: 50,
                selected: false
            },
            {
                id: "2",
                data: {
                    label: "Delay_0",
                    description: "user Delay time",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 261.04793879902326,
                    y: -30.812738914542937
                },
                type: "delay",
                width: 82,
                height: 34,
                selected: false
            },
            {
                id: "3",
                data: {
                    label: "Start",
                    description: "",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 31.90187006934235,
                    y: -37.35561524248433
                },
                type: "start",
                width: 20,
                height: 20,
                selected: true
            },
            {
                id: "4",
                data: {
                    label: "End",
                    description: "",
                    fetchedData: null,
                    delayTime: null
                },
                position: {
                    x: 408.4807520553028,
                    y: -27.904793879902314
                },
                type: "end",
                width: 20,
                height: 20,
                selected: false
            }
        ],
        edges: [
            {
                id: "reactflow__edge-1Clicked-2delayIdSource",
                source: "1",
                sourceHandle: "Clicked",
                target: "2",
                targetHandle: "delayIdSource",
                type: "buttonedge",
                animated: "true",
                style: {
                    stroke: "black"
                },
                markerEnd: {
                    type: "arrow"
                }
            },
            {
                id: "reactflow__edge-3EntryFlow-1EntryHandle",
                source: "3",
                sourceHandle: "EntryFlow",
                target: "1",
                targetHandle: "EntryHandle",
                type: "buttonedge",
                animated: "true",
                style: {
                    stroke: "black"
                },
                markerEnd: {
                    type: "arrow"
                }
            },
            {
                id: "reactflow__edge-2delayIdTarget-4ExitHandle",
                source: "2",
                sourceHandle: "delayIdTarget",
                target: "4",
                targetHandle: "ExitHandle",
                type: "buttonedge",
                animated: "true",
                style: {
                    stroke: "black"
                },
                markerEnd: {
                    type: "arrow"
                }
            }
        ],
        viewport: {
            x: -17.882356357241015,
            y: 261.3842109083756,
            zoom: 1.3755418181397436
        }
    };




    const [flow, setFlow] = useState('');

    // Load flow from localStorage on component mount
    useEffect(() => {
        const savedFlow = localStorage.getItem('savedFlow');
        if (savedFlow) {
            setFlow(JSON.parse(savedFlow));
            //   console.log("flowstate" + JSON.stringify(flow))
            //   onRestore(JSON.parse(savedFlow))
        }
    }, []);

    useEffect(() => {
        if (continueBuildingJourneyUserSelection) {
            onRestore(flow)
        } else {
            return
        }

    }, [continueBuildingJourneyUserSelection])

    // Save flow to localStorage whenever it changes
    useEffect(() => {
        const autoTracking = async () => {
            if (reactFlowInstance) {
                const emptyTargetHandles = checkEmptyTargetHandles();

                if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
                    return
                } else {
                    const flow = reactFlowInstance.toObject();
                    console.log("flow", flow);
                    localStorage.setItem('savedFlow', JSON.stringify(flow));
                }
            }
        };

        autoTracking(); // Call autoTracking whenever flow or any other relevant data changes
    }, [flow, reactFlowInstance, nodes, isNodeUnconnected]);





    // 

    const [savedFlows, setSavedFlows] = useState<FlowData[]>([graphData, fdsaf]); // Specify the type of state variable
    console.log(savedFlows);

    const onSave = useCallback(async () => { // Make this function async
        if (reactFlowInstance) {
            const emptyTargetHandles = checkEmptyTargetHandles();

            if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
                // alert(
                //   "Error: More than one node has an empty target handle or there are unconnected nodes."
                // );
            } else {
                const flow = reactFlowInstance.toObject();
                console.log("flow" + JSON.stringify(flow));

                try {
                    const response = await fetch(`http://localhost:3000/journey/saveAsDraft`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(flow), // Convert flow to JSON string
                    });

                    if (response.ok) {
                        setSavedFlows((prevFlows) => [...prevFlows, flow]); // Store flow data in state
                        // alert("Save successful!"); // Provide feedback when save is successful
                    } else {
                        // alert("Error saving flow"); // Provide feedback if save fails
                    }
                } catch (error) {
                    console.error("Error:", error);
                    //   alert("Error saving flow"); // Provide feedback if there is an error
                }
            }
        }
    }, [reactFlowInstance, nodes, isNodeUnconnected]); // Add async here



    //   useEffect(() => {
    //     const fetchSavedFlows = async () => {
    //       try {
    //         const response = await fetch('http://localhost:3000/journey/saveAsDraftgetAll');
    //         if (response.ok) {
    //           const data: FlowData[] = await response.json();
    //           setSavedFlows(data);
    //         } else {
    //           console.error('Failed to fetch data:', response.statusText);
    //         }
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };

    //     fetchSavedFlows();
    //   }, []);







    const params = useParams(); // Get the id parameter from the URL
    const id = params?.['id'] || ''; // Access id safely and provide a default value


    let templateDisplay = false

    const dispatchSetup = useDispatch();
    const onRestore = useCallback((flow: any) => {
        console.log("flow" + JSON.stringify(flow))
        // set true when template is loading to display engagements
        dispatchSegmentNode(segmentnodeTypeReducer(true));
        // setting 1 to form filled to display segments
        dispatchSetup(setupfilledReducer(1))

        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });

        // alert(edges);


    }, [setNodes, setEdges, setViewport, setJsonDataArray]);



    const hasEffectRun = useRef(false);

    useEffect(() => {
        // Check if both nodes and edges have data and if the effect has not run yet
        if (nodes.length > 0 && edges.length > 0 && !hasEffectRun.current) {
            const restoredJsonDataArray = edges.map((edge: any) => {
                const sourceNode = nodes.find((node: any) => node.id === edge.source);
                const targetNode = nodes.find((node: any) => node.id === edge.target);

                const jsonData = {
                    source: edge.source,
                    target: edge.target,
                    sourceHandle: edge.sourceHandle || '',
                    targetHandle: edge.targetHandle || '',
                    type: edge.type,
                    SourceLabel: sourceNode ? sourceNode.data.label : null,
                    TargetLabel: targetNode ? targetNode.data.label : null,
                    delay: sourceNode ? sourceNode.data.delayTime : null,
                    campaignId: targetNode ? targetNode.data.fetchedData : null,

                    // campaignData: sourceNode && sourceNode.data.delayTime ? targetNode.campaignData : undefined,
                };

                return jsonData;
            });
            setJsonDataArray(restoredJsonDataArray);

            // Set the hasEffectRun flag to true to indicate that the effect has run
            hasEffectRun.current = true;
        }
    }, [nodes, edges]);


    // Use useEffect to log the updated jsonDataArray
    useEffect(() => {
        console.log("Restored jsonDataArray:", jsonDataArray);
    }, [jsonDataArray]);



    // poping anotations -1 when setup is filled  adding anotation-3 init

    useEffect(() => {
        // Check if setup is filled
        if (setupId.id) {
            // Filter out nodes with id 'annotation-1'
            const filteredNodes = nodes.filter(node => node.id !== 'annotation-1');
            //   setNodes(filteredNodes);

            //   // Add the new node
            const newNode = {
                id: 'annotation-3',
                type: 'annotation',
                draggable: false,
                selectable: false,

                data: {
                    label: 'Entry Segment',
                    description: "Drag and drop segment",
                },
                position: { x: 100, y: 170, zoom: 30 },
            };

            // Update the state with the new list of nodes
            setNodes([...filteredNodes, newNode]);
        }
    }, [setupId]);


    //   filteredSegmentedUser   

    useEffect(() => {
        // Check if setup is filled
        if (filteredSegmentedUser) {
            // Filter out nodes with id 'annotation-1'
            const filteredNodes = nodes.filter(node => node.id !== 'annotation-4');

            // Update the state with the new list of nodes
            setNodes(filteredNodes);
        }
    }, [filteredSegmentedUser]);



    //  make is panable and zoomable
    useEffect(() => {
        // Check if there is a node with type 'trigger'
        const hasTrigger = nodes.some(node => node.type === 'trigger');

        if (hasTrigger) {
            setPanOnDrag(true);
            setZoomOnScroll(true);
        } else {
            setZoomOnScroll(false);
            setPanOnDrag(false);
        }
    }, [nodes]);



    // Function to handle click on a saved flow template
    const handleClickTemplate = useCallback((flow: any) => {
        onRestore(flow); // Restore the selected flow
    }, [onRestore]);







    const secondsFromChild = (labelName: string, seconds: any, edgeData: any) => {
        setSecondsToWait(seconds);
        setConnectedNodes(edgeData)
        setNodeDandEdge(edgeData)
        setTime({ nodeName: labelName, seconds: seconds[0] }); // data send to time
        console.log(edgeData)
        console.log(nodesIDandEdge)
        // alert("gfdsgs" + JSON.stringify(edgeData))





        // 

        if (edgeData && nodes) {
            console.log("ttttttttttttttttttttttttttttt")
            // alert("ffdea")
            const { sourceNode } = edgeData;
            const nodeToUpdate = nodes.find(node => node.id === sourceNode);
            console.log("nodeToUpdate" + JSON.stringify(nodeToUpdate))
            if (nodeToUpdate && seconds.length > 0) {
                // alert("timeNode" + JSON.stringify(seconds[0]))

                nodeToUpdate.data = {
                    ...nodeToUpdate.data,
                    delayTime: seconds[0],
                    // delayDate:date,
                };

                setNodes(prevNodes => prevNodes.map(node => (node.id === sourceNode ? nodeToUpdate : node)));

                const updatedJsonDataArray = jsonDataArray.map(item => {
                    if (item.source === sourceNode) {
                        return {
                            ...item,
                            delay: nodeToUpdate.data.delayTime,
                            // delayDate:nodeToUpdate.data.delayDate,
                        };
                    }
                    return item;
                });
                setJsonDataArray(updatedJsonDataArray);

                // Update edges if connectedNodes.sourceNode and connectedNodes.targetNode are defined

                const updatedEdges = edges.map(edge => {
                    // const delayData = [secondsToWait[0], date]; 
                    const delayData = [seconds[0]];

                    if (edgeData && edgeData.sourceNode === edge.source && edgeData.targetNode === edge.target) {
                        // alert("yes, its true !!!"+delayData)
                        return {
                            ...edge,
                            data: delayData,
                        };
                    } else {
                        console.log("notFound")
                    }
                    return edge;
                });
                setEdges(updatedEdges);
            }
        }



    }




    const sendMillisecond = (millisecond: any) => {
        setSecondsToWait(millisecond);
    }


    const onConnect = useCallback(
        async (params: any) => {
            console.log("Edge created: ", params);
            const { source, target, targetHandle, sourceHandle } = params;
            console.log(targetHandle)
            // Get the source node
            const sourceNode = nodes.find((node: any) => node.id === source);
            const targetNode = nodes.find((node: any) => node.id === target);
            console.log(params.sourceHandle)

            if (!sourceNode) {
                console.error("Source node not found!");
                return;
            }

            // Check if the source node has fetchedData
            // || !sourceNode.data.fetchedData
            if (!sourceNode.data) {
                console.error("Source node has no fetchedData!");
                return;
            }

            if (source === target) {
                console.error("Source and target nodes cannot be the same!");
                return;
            }



            // Add the edge
            params.label = sourceHandle;
            params.type = 'buttonedge';
            // params.type = "smoothstep"  ;
            params.style = {
                stroke: "gray"
            }
            // params.animated = "true";
            params.markerEnd = {
                type: MarkerType.Arrow
            }
            setEdges((eds: any[]) => addEdge(params, eds));

            createJson(params, nodes);
        },
        [nodes, setEdges, setJsonDataArray]
    );


    const createJson = useCallback(
        (params: any, nodes: any) => {
            // alert(JSON.stringify(params))
            const sourceNode = nodes.find((node: any) => node.id === params.source);
            const targetNode = nodes.find((node: any) => node.id === params.target);
            console.log(sourceNode.data.delayTime)
            // Check if sourceHandle is defined before accessing it
            const sourceHandle = params.sourceHandle !== undefined ? params.sourceHandle : '';

            const fetchedData = sourceNode && sourceNode.data.fetchedData;
            const sourceampaignId = fetchedData && fetchedData.campaignId;
            const sourcecampaignName = fetchedData && fetchedData.campaignName;

            const targetFetchedData = targetNode && targetNode.data.fetchedData;
            const targetcampaignId = targetFetchedData && targetFetchedData.campaignId;
            const targetcampaignName = targetFetchedData && targetFetchedData.campaignName;
            console.log(targetcampaignId)
            console.log(JSON.stringify(sourceNode.data.label))


            // alert(JSON.stringify(sourceNode.data.delayTime[0]));

            const jsonData: {
                source: any;
                target: any;
                sourceHandle: any;
                targetHandle: any;
                type: any;
                SourceLabel: any;
                TargetLabel: any;

                // apiData: {
                //     sourceCampaignId: any;
                //     sourceCampaignName: any;
                //     targetCampaignId: any;
                //     targetCampaignName: any;
                // }[];
                delay: any;
                campaignData?: any;
                Segment?: any; // Define Segment as possibly undefined
                journeyName?: any
                campaignId?: any
            } = {
                source: params.source,
                target: params.target,
                sourceHandle: sourceHandle,
                targetHandle: params.targetHandle,
                type: params.type,
                SourceLabel: sourceNode ? sourceNode.data.label : null,

                TargetLabel: targetNode ? targetNode.data.label : null,

                // apiData: [
                //     {
                //         sourceCampaignId: sourceampaignId || null,
                //         sourceCampaignName: sourcecampaignName || null,
                //         targetCampaignId: targetcampaignId || null,
                //         targetCampaignName: targetcampaignName || null,
                //     },

                // ],
                campaignId: targetNode ? targetNode.data.fetchedData : null,
                delay: sourceNode.data.delayTime,

            };
            // campaignData
            console.log(campaignData)
            // if (sourceNode.data.delayTime) {
            //     jsonData.campaignData = targetNode.campaignData;
            //     console.log(campaignData)
            // }

            // if (sourceNode && sourceNode.data.label === "Trigger") {
            //     jsonData.Segment = selectedSegmentData;
            //     jsonData.journeyName = journeyName;
            // }

            setJsonDataArray((prevArray: any) => [...prevArray, jsonData]);


            console.log(edges);
            console.log(campaignData)
            console.log(jsonData); // Logging the JSON data for verification
        },
        [setJsonDataArray]
    );
    console.log(jsonDataArray)



    useEffect(() => {
        if (time) {
            const updatedDataArray = jsonDataArray.map(item => {
                if (item.SourceLabel === time.nodeName && item.delay === null) {
                    return {
                        ...item,
                        delay: {
                            hours: time.seconds.hours,
                            minutes: time.seconds.minutes,
                            seconds: time.seconds.seconds
                        }
                    };
                }
                return item;
            });

            // Update the state with the modified data array
            setJsonDataArray(updatedDataArray);
        }
    }, [time]);

    useEffect(() => {
        const updatedDataArray = jsonDataArray.map(item => {
            if (campaignData && item.TargetLabel === campaignData.nodeName && !item.campaignData) {
                return {
                    ...item,
                    campaignData: campaignData.campaignData
                };
            }
            return item;
        });

        // Update the state with the modified data array
        setJsonDataArray(updatedDataArray);
    }, [campaignData]);







    useEffect(() => {
        // Check if the length has reduced
        if (edges.length < prevLength) {
            // Call your function here
            changeJson();
        }

        // Update the previous length to the current length
        setPrevLength(edges.length);
    }, [edges]); // Dependency on the edges array


    const changeJson = () => {
        console.log(firstNum)
        console.log(secondNum)
        console.log(additionalKey)
        const jsonDataArrayFiltered = jsonDataArray.filter(item =>
            !(item.source === firstNum && item.target === secondNum)
        );



        setJsonDataArray(jsonDataArrayFiltered);
        console.log(jsonDataArrayFiltered)
    };



    useEffect(() => {
        // Check if the length has reduced
        if (nodes.length < prevLengthNode) {
            changeJsonNode();
        }

        // Update the previous length to the current length
        setPrevLengthNode(nodes.length);
    }, [nodes]); // Dependency on the edges array


    const toastJourneyPublishedDispatch = useDispatch()
    const changeJsonNode = () => {
        console.log(deleteNodeId);

        const jsonDataArrayFiltered = jsonDataArray.filter(item =>
            !(item.source === deleteNodeId || item.target === deleteNodeId)
        );

        setJsonDataArray(jsonDataArrayFiltered);
        console.log(jsonDataArrayFiltered);
    };


    const jsonDispatch = useDispatch();
    useEffect(() => {
        jsonDispatch(jsonDataReducer(jsonDataArray))
    }, [jsonDataArray])

    const dispatchTriggerJson = useDispatch();
    useEffect(() => {
        if (triggerJson) {
            sendJsonToBackend(triggerJson)
            console.log(jsonDataArray)
            dispatchTriggerJson(triggerJsonReducer(false))
        }

    }, [triggerJson])
    const journeyStatus = "running"

    // const sendJsonToBackend = async (clicked: any) => {
    //     // if (clicked) {
    //     // alert("filteredSegmentedUser: "+JSON.stringify(filteredSegmentedUser))
    //     const updatedDataArray = jsonDataArray.map(item => {
    //         if (item.delay === null) {
    //             return {
    //                 ...item,
    //                 delay: {
    //                     hours:0,
    //                     minutes:0,
    //                     seconds:0,
    //                 }
    //             };
    //         }
    //         return item;
    //     });


    //     console.log(JSON.stringify(updatedDataArray));
    //     const JourneyData = {
    //         journeyName: journeyName,
    //         journeyId:  uuidv4(),
    //         journeySetupId: setupId.id,
    //         journeySegmentedUsersId: filteredSegmentedUser,
    //         // segmentData: selectedSegmentData,
    //         journeyFlow: updatedDataArray,
    //         status: journeyStatus,  

    //     }
    //     console.log(JourneyData)
    //     // alert(JourneyData)

    //     try {
    //         const response = await axios.post(`${environment.UrlEndpoint}journey/data`, JourneyData);
    //         console.log('Response:', response.data);
    //         setPublishJourneyResponse(response.data._id)
    //         toastJourneyPublishedDispatch(toastJourneyPublishedReducer(true))
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    //     // }
    // };


    const sendJsonToBackend = async (clicked: any) => {
        // if (clicked) {
        // alert("filteredSegmentedUser: "+JSON.stringify(filteredSegmentedUser))
        const updatedDataArray = jsonDataArray.map(item => {
            if (item.delay === null) {
                return {
                    ...item,
                    delay: {
                        hours: 0,
                        minutes: 0,
                        seconds: 0,
                    }
                };
            }
            return item;
        });

        console.log(JSON.stringify(updatedDataArray));

        const JourneyData = {
            journeyName: journeyName,
            journeyId: uuidv4(),
            journeySetupId: setupId.id,
            journeySegmentedUsersId: filteredSegmentedUser._id,
            // segmentData: selectedSegmentData,
            journeyFlow: updatedDataArray,
            status: journeyStatus,
        };

        console.log(JourneyData);

        // Check for missing values
        const missingValues = [];
        if (!journeyName) missingValues.push('journeyName');
        if (!setupId.id) missingValues.push('setupId.id');
        if (!filteredSegmentedUser._id) missingValues.push('Segment');
        if (!journeyStatus) missingValues.push('journeyStatus');

        // alert(JSON.stringify(filteredSegmentedUser))
        const missingCampaignIds = updatedDataArray
            .filter(item => !item.campaignId)
            .map((item, index) => `Campaign at node: ${item.TargetLabel}`);

        if (missingCampaignIds.length > 0) {
            missingValues.push(...missingCampaignIds);
        }

        if (missingValues.length === 0) {
            try {
                const response = await axios.post(`http://localhost:3000/journey/data`, JourneyData);
                console.log('Response:', response.data);
                setPublishJourneyResponse(response.data._id);
                toastJourneyPublishedDispatch(toastJourneyPublishedReducer(true));
                navigate("/chooseTemplate/journeyFlow/published");

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            const missingValuesMessage = 'Please select ' + missingValues.join(', ');
            console.warn(missingValuesMessage);
            // alert(missingValuesMessage);
            setMissingValuesMessage(missingValuesMessage)
            dispatchMissingValueMessageReducer(missingValueMessageReducer(true))


        }
        // } 
    };






    console.log(jsonDataArray); // Logging the JSON data for verification
    console.log(edges)



    useEffect(() => {
        const updatedJsonDataArray = jsonDataArray.map(item => {
            let updatedDelayData = item.delay; // Initialize with the existing delay

            if (item.source === delayIdAndDelayTime.id) {
                // here i want to put data in to delay 
                if (delayIdAndDelayTime.data && delayIdAndDelayTime.data.length) {
                    updatedDelayData = delayIdAndDelayTime.data[0]; // Assign value to updatedDelayData
                }
            }

            return {
                ...item,
                delay: updatedDelayData
            };
        });

        // Update jsonDataArray state with the updated data
        setJsonDataArray(updatedJsonDataArray);
    }, [delayIdAndDelayTime]);






    const dispatchSegmentNode = useDispatch();

    // Enable drop effect on drag over
    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);


    // Handle drop event to add a new node
    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const dataString = event.dataTransfer.getData("application/reactflow")
            console.log(dataString)
            const { nodeType, title, description } = JSON.parse(dataString);

            if (typeof dataString === "undefined" || !dataString) {
                return;
            }

            let position;

            const triggerNodeCount = nodes.filter(node => node.type === 'trigger').length;

            // alert(JSON.stringify(nodes))
            if (nodeType === "trigger" && triggerNodeCount === 0) {
                position = {
                    x: 100,
                    y: 170,
                };
            } else {
                position = reactFlowInstance.screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                });
            }


            // const position = reactFlowInstance.screenToFlowPosition({
            //     x: event.clientX,
            //     y: event.clientY,
            // });

            const newNode = {
                id: uuidv4(),
                // id:getId(),
                type: nodeType,
                position,
                // ${nodeNameId++}
                data: {
                    label: `${title}`,
                    description: description,
                    fetchedData: null,
                    delayTime: null,
                },
            };

            console.log("Node created: ", newNode);

            // checking if nodetype is trigger then removing the anotation nodes then adding tirgger node
            const hasTrigger = nodeType == 'trigger';


            if (hasTrigger) {
                dispatchSegmentNode(segmentnodeTypeReducer(hasTrigger));
            }

            setNodes((nds) => nds.concat(newNode));

        },
        [reactFlowInstance]
    );

    // removing automation nodes when segmentnode is in panel
    useEffect(() => {

        if (segmentNodeonPanel) {
            const filteredNodes = nodes.filter(node => node.type !== 'annotation');
            setNodes(filteredNodes);
        }

    }, [segmentNodeonPanel])




    interface Props {
        idObj: any;

    }



    // for WebPush nodes  updating data Id

    useEffect(() => {
        // Check if webPushCampaignData is defined
        if (webPushCampaignData) {
            // alert(JSON.stringify(webPushCampaignData.webPushCampaignId));

            // Check if nodedata and userSelectedNode are defined
            if (webPushCampaignData.nodedata && webPushCampaignData.nodedata) {
                // alert(JSON.stringify(webPushCampaignData.nodedata.userSelectedNode.id));

                const updatedNodes = nodes.map(node => {
                    if (node.id === webPushCampaignData.nodedata.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: webPushCampaignData.webPushCampaignId,
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);
            }
        }
    }, [webPushCampaignData.webPushCampaignId]);


    // // camapign id webpush to json array edgecase

    useEffect(() => {
        const updatedDataArray = jsonDataArray.map(item => {
            if (webPushCampaignData && item.target === webPushCampaignData.nodedata.id && !item.campaignId) {
                return {
                    ...item,
                    campaignId: webPushCampaignData.webPushCampaignId
                };
            }
            return item;
        });

        // Update the state with the modified data array
        setJsonDataArray(updatedDataArray);
    }, [webPushCampaignData.webPushCampaignId]);


    // for whatApp nodes  updating data Id

    useEffect(() => {
        // Check if whatsAppCampaignData is defined
        if (whatsAppCampaignData) {
            // alert(JSON.stringify(whatsAppCampaignData.whatsAppCampaignId));

            // Check if nodedata and userSelectedNode are defined
            if (whatsAppCampaignData.nodedata && whatsAppCampaignData.nodedata) {
                // alert(JSON.stringify(whatsAppCampaignData.nodedata.userSelectedNode.id));

                const updatedNodes = nodes.map(node => {
                    if (node.id === whatsAppCampaignData.nodedata.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: whatsAppCampaignData.whatsAppCampaignId,
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);
            }
        }
    }, [whatsAppCampaignData.whatsAppCampaignId]);



    // // camapign id whatsApp to json array edgecase

    useEffect(() => {
        const updatedDataArray = jsonDataArray.map(item => {
            if (whatsAppCampaignData && item.target === whatsAppCampaignData.nodedata.id && !item.campaignId) {
                return {
                    ...item,
                    campaignId: whatsAppCampaignData.whatsAppCampaignId
                };
            }
            return item;
        });

        // Update the state with the modified data array
        setJsonDataArray(updatedDataArray);
    }, [whatsAppCampaignData.whatsAppCampaignId]);



    // for whatApp nodes  updating data Id

    useEffect(() => {
        // Check if whatsAppCampaignData is defined
        if (smsCampaignData) {
            // alert(JSON.stringify(smsCampaignData.smsCampaignId));

            // Check if nodedata and userSelectedNode are defined
            if (smsCampaignData.nodedata && smsCampaignData.nodedata) {
                // alert(JSON.stringify(smsCampaignData.nodedata.userSelectedNode.id));

                const updatedNodes = nodes.map(node => {
                    if (node.id === smsCampaignData.nodedata.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: smsCampaignData.smsCampaignId,
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);
            }
        }
    }, [smsCampaignData.smsCampaignId]);



    // // camapign id whatsApp to json array edgecase

    useEffect(() => {
        const updatedDataArray = jsonDataArray.map(item => {
            if (smsCampaignData && item.target === smsCampaignData.nodedata.id && !item.campaignId) {
                return {
                    ...item,
                    campaignId: smsCampaignData.smsCampaignId
                };
            }
            return item;
        });

        // Update the state with the modified data array
        setJsonDataArray(updatedDataArray);
    }, [smsCampaignData.smsCampaignId]);




    // for whatApp nodes  updating data Id

    useEffect(() => {
        // Check if whatsAppCampaignData is defined
        if (emailCampaignData) {
            // alert(JSON.stringify(emailCampaignData));

            // Check if nodedata and userSelectedNode are defined
            // alert(JSON.stringify(emailCampaignData.nodedata.userSelectedNode.id));
            if (emailCampaignData.nodedata && emailCampaignData.nodedata) {

                const updatedNodes = nodes.map(node => {
                    if (node.id === emailCampaignData.nodedata.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: emailCampaignData.emailCampaignId,
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);
            }
        }
    }, [emailCampaignData.emailCampaignId]);


    // // camapign id whatsApp to json array edgecase

    useEffect(() => {
        const updatedDataArray = jsonDataArray.map(item => {
            if (emailCampaignData && item.target === emailCampaignData.nodedata.id) {
                return {
                    ...item,
                    campaignId: emailCampaignData.emailCampaignId
                };
            }
            return item;
        });

        // Update the state with the modified data array
        setJsonDataArray(updatedDataArray);
    }, [emailCampaignData.emailCampaignId]);






    const sendIdToParent = async (idObj: any) => {
        console.log(JSON.stringify(idObj));
        console.log(idObj.selectedNodeLabel)
        setFetchedDataInNode(idObj)
        if (idObj.selectedNodeLabel === "whatsapp") {
            try {

                const fetchedData = idObj;
                console.log(fetchedData)

                const updatedNodes = nodes.map(node => {
                    if (node.id === idObj.selectedNodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: fetchedData
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else if (idObj.selectedNodeLabel === "sms") {
            try {

                const fetchedData = idObj;
                console.log(fetchedData)

                const updatedNodes = nodes.map(node => {
                    if (node.id === idObj.selectedNodeId) {

                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: fetchedData
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else if (idObj.selectedNodeLabel === "webPush") {
            try {

                const fetchedData = idObj;
                console.log(fetchedData)

                const updatedNodes = nodes.map(node => {
                    if (node.id === idObj.selectedNodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: fetchedData
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else if (idObj.selectedNodeLabel === "port") {
            try {

                const fetchedData = idObj;
                console.log(fetchedData)

                const updatedNodes = nodes.map(node => {
                    if (node.id === idObj.selectedNodeId) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                fetchedData: fetchedData
                            }
                        };
                    }
                    return node;
                });

                setNodes(updatedNodes);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }


        console.log(nodes)
    };


    // check when node is connected and then data is not set then grab the data and updated the json

    useEffect(() => {
        if (fetchedDataInNode) {
            const updatedJsonDataArray = jsonDataArray.map((item) => {
                if (fetchedDataInNode.selectedNodeId === item.source) {
                    return {
                        ...item,
                        apiData: [{
                            sourceCampaignId: fetchedDataInNode.campaignId,
                            sourceCampaignName: fetchedDataInNode.campaignName,
                            targetCampaignId: item.apiData[0].targetCampaignId,
                            targetCampaignName: item.apiData[0].targetCampaignName,
                        }],
                    };
                } else if (fetchedDataInNode.selectedNodeId === item.target) {
                    return {
                        ...item,
                        apiData: [{
                            sourceCampaignId: item.apiData[0].sourceCampaignId,
                            sourceCampaignName: item.apiData[0].sourceCampaignName,
                            targetCampaignId: fetchedDataInNode.campaignId,
                            targetCampaignName: fetchedDataInNode.campaignName,
                        }],
                    };
                } else {
                    return item;
                }
            });

            setJsonDataArray(updatedJsonDataArray);
        }
    }, [fetchedDataInNode]);



    interface Edge {
        id: string;
        source: string;
        target: string;
        // Add other properties as needed
    }


    const rfStyle = {
        backgroundColor: "#ffffff",
        height: "100vh",

    };


    enum BackgroundVariant {
        Lines = 'lines',
        Dots = 'dots',
        Cross = 'cross',
    }
    const defaultViewport = { x: 0, y: 0, zoom: 1.3 };


    return (
        <div className="  w-full"

            style={{
                height: "77vh"
            }}
        >

            {flow && <ContinueBuildingJourney />}
            {missingValueMessageSelector && <MissingValuesMessage missingValuesMessage={missingValuesMessage} />}
            {/* <Navbar sendJsonToBackend={sendJsonToBackend} journeyName={journeyName}/> */}

            {/* <div className="flex-grow lg:flex lg:flex-row-reverse  h-72 "> */}
            <div
                className="flex-grow lg:flex lg:flex-row-reverse overflow-y-hidden "
                style={{ maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}
            >
                <div className={`flex-grow w-full   min-h-[80%] ${stateValue === false && " min-h-screen"} `}
                    // style={{
                    //     height:"80vh"
                    // }}
                    ref={reactFlowWrapper}>
                    <ReactFlow


                        nodes={nodes}
                        // nodeTypes={nodeTypes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        style={rfStyle}
                        onNodeClick={onNodeClick}
                        zoomOnScroll={zoomOnScroll}
                        defaultViewport={defaultViewport}
                        panOnDrag={panOnDrag}
                        className="touchdevice-flow overflow-y-hidden"

                        selectionOnDrag

                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        // onNodesDelete={onNodesDelete}
                        onPaneClick={() => {
                            setSelectedElements([]);
                            setNodes((nodes) =>
                                nodes.map((n) => ({
                                    ...n,
                                    selected: false,
                                }))
                            );
                        }}
                    // fitView

                    >
                        {/* variant="dots" */}
                        <Background gap={30} size={10} color="#ECECEC" variant={BackgroundVariant.Cross} />
                        <Controls />
                        <MiniMap position={"bottom-right"} zoomable pannable />

                    </ReactFlow>




                </div>

                {/* <button onClick={onSave} className="absolute animate-[wiggle_1s_ease-in-out_infinite] top-20 right-4 w-24 rounded-r-full rounded-l-full  bg-purple-600 text-white px-4 py-2 text-[10px] rounded-md mr-4  border border-purple-600">
                 SaveAsDraft
                </button> */}

          
     {/* draft */}
                {/* <div className="p-6 max-w-lg mx-auto bg-white  shadow-md border border-slate-400 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Saved Drafts:</h3>
      <ul className="list-disc list-inside space-y-2">
        {savedFlows.map((flow, index) => (
          <li
            key={index}
            onClick={() => handleClickTemplate(flow)}
            className="cursor-pointer p-1 bg-blue-100 hover:bg-blue-200 rounded-md transition duration-200 ease-in-out"
          >
            Drafts {index + 1}
          </li>
        ))}
      </ul>
    </div> */}






                {toastJourneyPublished ? (<PublishJourneySnackBar displaySnack={toastJourneyPublished} />) : ""}






                {/* <SidebarTest /> */}
                <SidebarR selectedNode={selectedElements[0]} firstNode={nodes[0]} sendDataToParent={handleChildData}
                    sendIdToParent={sendIdToParent} sendSecondsParent={secondsFromChild} sendMillisecond={sendMillisecond}

                // updatedData={updatedData} 
                />
                {stateValue && <Sidebar
                    nodeName={nodeName}
                    setNodeName={setNodeName}
                    selectedNode={selectedElements[0]}
                    setSelectedElements={setSelectedElements}
                    handleChange={handleChange}


                />}
                {!stateValue &&
                    <div onClick={() => handleChange(true)} className="absolute animate-[wiggle_1s_ease-in-out_infinite] top-16 -left-4 w-10 h-10 rounded-r-full rounded-l-full h-10 bg-purple-600 text-white px-4 py-2 rounded-md mr-4 
                     border border-purple-600 flex justify-center items-center  ">
                        {/* <FontAwesomeIcon icon={faArrowRight} className="  " /> */}
                        <KeyboardDoubleArrowRightIcon className="ml-[5px]" />

                    </div>

                }









            </div>
        </div>
    );
};

// Wrap App with ReactFlowProvider
function DnDFlow() {
    return (
        // <Provider store={store}>
        <ReactFlowProvider>
            <App />
        </ReactFlowProvider>
        // </Provider>
    );
}

export default DnDFlow;






