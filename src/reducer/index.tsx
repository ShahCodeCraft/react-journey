import { combineReducers } from "@reduxjs/toolkit";
import grabIdSlice, {DeleteNode, NodeApiData, NodeDelayData, EmailEditorData,TemplatePopup, SelectedSegment, Campaigndata, JourneyNameSlice, TriggerJsonSlice, DelayNodeIds, DelayCounter, WebPushCampaignIdSlice, WhatsAppCampaignIdSlice, SmsCampaignIdSlice, EmailCampaignIdSlice, SetupfilledSlice, SegmentnodeTypeSlice, ContinueBuildingJourneySlice, SetUpformDataSlice, FilteredSegmentedUserSlice, SetUpformDataIdSlice, EdgesSlice, ToastJourneyPublishedSlice, MissingValueMessageSlice, SelectedEmailTemplateSlice} from "./slice";


const rootReducer = combineReducers({
    deleteId:grabIdSlice,
    deleteSingleNode: DeleteNode,
    updatedData : NodeApiData,
    delayData  :NodeDelayData,
    emailEditor: EmailEditorData,
    templatePopData:TemplatePopup,
    segmentS:SelectedSegment,
    campaign:Campaigndata,
    journeyName:JourneyNameSlice,
    triggerJson:TriggerJsonSlice,
    delaynodeId:DelayNodeIds,
    delayCounter:DelayCounter,
    webPushCampaignIdSlice:WebPushCampaignIdSlice,
    whatsAppCampaignIdSlice:WhatsAppCampaignIdSlice,
    smsCampaignIdSlice:SmsCampaignIdSlice,
    emailCampaignIdSlice:EmailCampaignIdSlice,
    setupfilledSlice:SetupfilledSlice,
    segmentnodeTypeSlice:SegmentnodeTypeSlice,
    continueBuildingJourneySlice:ContinueBuildingJourneySlice,
    setUpformDataSlice:SetUpformDataSlice,
    filteredSegmentedUserSlice:FilteredSegmentedUserSlice,
    setUpformDataIdSlice:SetUpformDataIdSlice,
    edgesSlice:EdgesSlice,
    toastJourneyPublishedSlice:ToastJourneyPublishedSlice,
    missingValueMessageSlice:MissingValueMessageSlice,
    selectedEmailTemplateSlice:SelectedEmailTemplateSlice,
    
});


export default rootReducer;