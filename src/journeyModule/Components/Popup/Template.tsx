

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
// import { environment } from '../../../../environments/environment';

interface TemplateCardProps {
    imageSrc: string;
    altText: string;
    description: string;
    onClick: () => void;
    isSelected: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ imageSrc, altText, description, onClick, isSelected }) => {
          const img = "data:image/jpeg;base64,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"

  
    return (
        <div onClick={onClick} className={`rounded-lg border-2 bg-card text-card-foreground shadow-sm h-[250px] w-[200px] transition-colors duration-300 ease-in-out ${isSelected ? 'border-blue-400' : 'border-gray-400'}`}>
            <div className="flex justify-center items-center">
                <img
                    src={img}
                    alt={altText}
                    className="mb-4 object-cover h-48"
                    width="250"
                />
            </div>
            <p className="text-sm flex justify-center items-center ">{description}</p>
        </div>
    );
}

const Template = ({ onClosetemplate, templateDataFromTemplatePopup }: any) => {
    const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
    const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
    const [urlProduction,setUrlProduction] = useState("https://journey-api.capengage.com/");
    const [urlDevelopment,setUrlDevelopment] = useState("http://localhost:3000/");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => { 
        try {
            const response = await fetch(`http://localhost:3000/journey/gellAllEmailTemplates`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data: any[] = await response.json();
            alert("data"+JSON.stringify(data))
            setSavedDesigns(data);
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
    };





    const handleTemplateSelect = (templateIndex: number) => {
        setSelectedTemplate(templateIndex);
    };

    const handleNextButtonClick = () => {
        if (selectedTemplate !== null) {

            templateDataFromTemplatePopup(savedDesigns[selectedTemplate]);
            // alert(JSON.stringify(savedDesigns[selectedTemplate]))
        }
        onClosetemplate()
    };

  
    
    return (
        <div>
      <div className="  fixed inset-0 z-50  flex justify-center items-center bg-gray-700 h-[800px] w-full  bg-opacity-50">
                <div className="bg-white p-8  rounded-lg shadow-lg max-h-full border-2 ">
                    <div className="flex justify-between items-center mb-6  overflow-hidden ">
                        <h1 className="text-2xl font-bold">Choose Template</h1>
                        <button className="text-lg" onClick={onClosetemplate}>✕</button>
                    </div>
                    <div className="max-h-[480px] overflow-y-auto">
                        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-5 max-lg:gap-7 max-sm:grid-cols-1 gap-4">
                            {savedDesigns.map((design, index) => (
                                <TemplateCard
                                    key={index}
                                    imageSrc="s" // Assuming the image source is part of the design object
                                    altText={`Template ${index}`}
                                    description={`Description for template ${index}`}
                                    onClick={() => handleTemplateSelect(index)}
                                    isSelected={selectedTemplate === index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="  ">
                        <div className="w-full h-10 relative">
                            <div className="absolute right-8 top-3">
                                <button type="button" onClick={handleNextButtonClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md px-7 py-3 text-center me-2 mb-2">
                                    <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-md " />
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Template;

