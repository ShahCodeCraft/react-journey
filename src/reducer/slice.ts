
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstNum: 0,
    secondNum: 0,
    additionalKey:2
};

const grabIdSlice = createSlice({
    name: "deleteId",
    initialState: initialState,
    reducers: {
        deleteId: (state, action) => {
            // Assuming payload is an object with firstNum and secondNum properties
            const { firstNum, secondNum,additionalKey } = action.payload;
            state.firstNum = firstNum;
            state.secondNum = secondNum;
            state.additionalKey = additionalKey;
        },
    }
});



const checkDeleteNode = createSlice({
    name:"deleteNode",
    initialState: {value: -2},
    reducers: {
        deleteNode:(state, action) => {
            state.value = action.payload;
        },
    }
});

const nodeApiData = createSlice({
    name:"nodeApiData",
    initialState: {value: {}},
    reducers: {
        updatedData:(state, action) => {
            state.value = action.payload;
        },
    }
});

// updatedDelayData

const nodeDelayData = createSlice({
    name:"nodeApiData",
    initialState: {value: {}},
    reducers: {
        updatedDelayData:(state, action) => {
            state.value = action.payload;
        },
    }
});

// emailEditorData

const emailEditorData = createSlice({
    name:"emailEditorData",
    initialState: {value: {template: null, id:-22}},
    reducers: {
        templateEmailReducer:(state, action) => {
            state.value.template = action.payload.generatedTemplates;
            state.value.id = action.payload.variationId
        },
    }
});


// templatePopup
const templatePopup = createSlice({
    name:"templatePopup",
    initialState:{value:false},
    reducers:{
        templatePop:(state,action)=>{
            state.value = action.payload;
        }
    }
})


const selectedSegment = createSlice({
    name:"selectedSegment",
    initialState:{value:{}},
    reducers:{
        segmentSelect:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload;
        }
    }
})


const jsonData = createSlice({
    name:"jsonData",
    initialState:{value:{}},
    reducers:{
        jsonDataReducer:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload;
        }
    }
})


const campaigndata = createSlice({
    name:"campaigndata",
    initialState:{value:{}},
   
    reducers:{
        campaignReducer:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload;
        }
    }

})


const journeyNameSlice = createSlice({
    name:"JourneyName",
    initialState:{value:{}},
   
    reducers:{
        journeyNameReducer:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload;
        }
    }

})

const triggerJsonSlice = createSlice({
    name:"triggerJsonSlice",
    initialState:{value:false},
   
    reducers:{
        triggerJsonReducer:(state,action)=>{
            console.log(action.payload)
            state.value = action.payload;
        }
    }

})


// delayNode
const delayNodeIds = createSlice({
    name:"delayNodeIds",
    initialState: {value: {}},
    reducers: {
        delayNodeReducer:(state, action) => {
            console.log(action.payload)
            // alert("data came"+ JSON.stringify(action.payload))
            state.value = action.payload;

        },
    }
});

const delayCounter = createSlice({
    name:"delayNodeIds",
    initialState: {value: 0},
    reducers: {
        delayCounterHold:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});



const webPushCampaignIdSlice = createSlice({
    name:"webPushCampaignIdSlice",
    initialState: {value: ""},
    reducers: {
        webPushCampaignIdReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const whatsAppCampaignIdSlice = createSlice({
    name:"whatsAppCampaignIdSlice",
    initialState: {value: ""},
    reducers: {
        whatsAppCampaignIdReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const smsCampaignIdSlice = createSlice({
    name:"smsCampaignIdSlice",
    initialState: {value: ""},
    reducers: {
        smsCampaignIdReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const emailCampaignIdSlice = createSlice({
    name:"emailCampaignIdSlice",
    initialState: {value: ""},
    reducers: {
        emailCampaignIdReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const setupfilledSlice = createSlice({
    name:"setupfilledSlice",
    initialState: {value: 0},
    reducers: {
        setupfilledReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});



const segmentnodeTypeSlice = createSlice({
    name:"segmentnodeTypeSlice",
    initialState: {value: false},
    reducers: {
        segmentnodeTypeReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const continueBuildingJourneySlice = createSlice({
    name:"continueBuildingJourneySlice",
    initialState: {value: false},
    reducers: {
        continueBuildingJourneyReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});



const setUpformDataSlice = createSlice({
    name:"setUpformDataSlice",
    initialState: {value: {id:false}},
    reducers: {
        setUpformDataReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});

const filteredSegmentedUserSlice = createSlice({
    name:"filteredSegmentedUserSlice",
    initialState: {value:""},
    reducers: {
        filteredSegmentedUserReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});




const setUpformDataIdSlice = createSlice({
    name:"setUpformDataSlice",
    initialState: {value: {id:false}},
    reducers: {
        setUpformDataIdReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const edgesSlice = createSlice({
    name:"edgesSlice",
    initialState: {value: {}},
    reducers: {
        edgeReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});


const toastJourneyPublishedSlice = createSlice({
    name:"toastJourneyPublishedSlice",
    initialState: {value:false},
    reducers: {
        toastJourneyPublishedReducer:(state, action) => {
            console.log(action.payload)
            state.value = action.payload;

        },
    }
});



const missingValueMessageSlice = createSlice({
        name:"missingValueMessageSlice",
        initialState: {value:false},
        reducers:{
            missingValueMessageReducer:(state,action) =>{
                state.value = action.payload;

            }
        }
})

const selectedEmailTemplateSlice = createSlice({
    name:"selectedEmailTemplateSlice",
    initialState: {value:""},
    reducers:{
        selectedEmailTemplateReducer:(state,action) =>{
            state.value = action.payload;
        }
    }
})


export const {selectedEmailTemplateReducer} = selectedEmailTemplateSlice.actions;
export const SelectedEmailTemplateSlice = selectedEmailTemplateSlice.reducer;


export const {missingValueMessageReducer} = missingValueMessageSlice.actions;
export const MissingValueMessageSlice = missingValueMessageSlice.reducer;


export const {toastJourneyPublishedReducer} = toastJourneyPublishedSlice.actions;
export const ToastJourneyPublishedSlice = toastJourneyPublishedSlice.reducer;


export const {edgeReducer} = edgesSlice.actions;
export const EdgesSlice = edgesSlice.reducer;


export const {setUpformDataIdReducer} = setUpformDataIdSlice.actions;
export const SetUpformDataIdSlice = setUpformDataIdSlice.reducer;


export const {filteredSegmentedUserReducer} = filteredSegmentedUserSlice.actions;
export const FilteredSegmentedUserSlice = filteredSegmentedUserSlice.reducer;


export const {setUpformDataReducer} = setUpformDataSlice.actions;
export const SetUpformDataSlice = setUpformDataSlice.reducer;


export const {continueBuildingJourneyReducer} = continueBuildingJourneySlice.actions;
export const ContinueBuildingJourneySlice = continueBuildingJourneySlice.reducer;


export const {segmentnodeTypeReducer} = segmentnodeTypeSlice.actions;
export const SegmentnodeTypeSlice = segmentnodeTypeSlice.reducer;



export const {setupfilledReducer} = setupfilledSlice.actions;
export const SetupfilledSlice = setupfilledSlice.reducer;


export const {emailCampaignIdReducer} = emailCampaignIdSlice.actions;
export const EmailCampaignIdSlice = emailCampaignIdSlice.reducer;


export const {smsCampaignIdReducer} = smsCampaignIdSlice.actions;
export const SmsCampaignIdSlice = smsCampaignIdSlice.reducer;

export const {whatsAppCampaignIdReducer} = whatsAppCampaignIdSlice.actions;
export const WhatsAppCampaignIdSlice = whatsAppCampaignIdSlice.reducer;

export const {webPushCampaignIdReducer} = webPushCampaignIdSlice.actions;
export const WebPushCampaignIdSlice = webPushCampaignIdSlice.reducer;


export const {delayCounterHold} = delayCounter.actions;
export const DelayCounter = delayCounter.reducer;

export const {delayNodeReducer} = delayNodeIds.actions;
export const DelayNodeIds = delayNodeIds.reducer;


export const {triggerJsonReducer} = triggerJsonSlice.actions;
export const TriggerJsonSlice = triggerJsonSlice.reducer;


export const {journeyNameReducer} = journeyNameSlice.actions;
export const JourneyNameSlice = journeyNameSlice.reducer;

export const {campaignReducer} = campaigndata.actions;
export const Campaigndata = campaigndata.reducer;

export const {jsonDataReducer} = jsonData.actions;
export const JsonData = jsonData.reducer;

export const {segmentSelect} = selectedSegment.actions;
export const SelectedSegment = selectedSegment.reducer;

export const {templatePop} = templatePopup.actions;
export const TemplatePopup = templatePopup.reducer;


export const {templateEmailReducer} = emailEditorData.actions;
export const EmailEditorData = emailEditorData.reducer;

export const {updatedDelayData} = nodeDelayData.actions;
export const NodeDelayData = nodeDelayData.reducer;


export const {updatedData} = nodeApiData.actions;
export const NodeApiData = nodeApiData.reducer;

export const {deleteNode} = checkDeleteNode.actions;
export const DeleteNode = checkDeleteNode.reducer;


export const { deleteId } = grabIdSlice.actions;
export default grabIdSlice.reducer;
