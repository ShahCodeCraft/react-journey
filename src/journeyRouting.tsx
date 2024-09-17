
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BannerPage from './journeyModule/Pages/BannerPage';
import ChooseTemplates from './journeyModule/Pages/ChooseTemplates';
import JourneyPopup from './journeyModule/Components/Popup/JourneyPopup';
import TriggerSetup from './journeyModule/Components/TriggerSetup';
import DnDFlow from './journeyModule/DragAndDrop';
import JourneyFlow from './journeyModule/Pages/JourneyFlow';
import SmsCampaignPopup from './journeyModule/Components/Popup/SmsCampaignPopup';
import WhatsAppCampaignPopup from './journeyModule/Components/Popup/WhatsAppCampaignPopup';
import WebPushCampaignPopup from './journeyModule/Components/Popup/WebPushCampaignPopup';
import PleaseViewOnLaptop from './journeyModule/Pages/PleaseViewOnLaptop';
import EmailEditorTemplate from './journeyModule/Components/EmailEditor/EmailEditorTemplate';
import Published from './journeyModule/Pages/Publish';
 
const JourneyRouting = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    {isLargeScreen ? (
                        <>
                            <Route path="/" index element={<BannerPage />} />
                            {/* <Route path="chooseTemplate" element={<ChooseTemplates />} /> */}
                            <Route path="chooseTemplate/journeyFlow/*" element={<JourneyFlow />} />
                            {/* <Route path="chooseTemplate/journeyFlow/triggerSetup/journey" element={<DnDFlow />} /> */}
                            {/* <Route path="journey" element={<DnDFlow />} />
                            <Route path="journey/:id" element={<DnDFlow />} /> */}
                         <Route path="chooseTemplate/journeyFlow/published" element={<Published />} />
        
                        </>
                    ) : (
                        <Route path="*" element={<PleaseViewOnLaptop />} />
                    )}
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default JourneyRouting;


