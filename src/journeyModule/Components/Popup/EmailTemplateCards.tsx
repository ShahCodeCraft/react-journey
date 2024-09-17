import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, DialogActions } from '@mui/material';
import axios from 'axios';
// import { environment } from '../../../../environments/environment';

interface EmailTemplateCardsProps {
  templateDataFromTemplatePopup: (value: any) => any;
  handleClickTemplateSave: (value:void) => void;
}

const EmailTemplateCards: React.FC<EmailTemplateCardsProps> = ({ handleClickTemplateSave, templateDataFromTemplatePopup }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const [urlProduction,setUrlProduction] = React.useState("https://journey-api.capengage.com/");
  const [urlDevelopment,setUrlDevelopment] = React.useState("http://localhost:3000/");

  useEffect(() => {
    fetchData();
  }, []);

  console.log("savedDesigns"+ JSON.stringify(savedDesigns[savedDesigns.length-1]))

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/journey/gellAllEmailTemplates`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: any[] = await response.json();
      // alert("data" + JSON.stringify(data))
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
    }
  };

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));

  };

  const handleSelectButtonClick = () => {
    if (selectedIndex !== null) {

      templateDataFromTemplatePopup(savedDesigns[selectedIndex]);
      // alert(JSON.stringify(savedDesigns[selectedIndex]))
      handleClickTemplateSave()
    }
  };



  const img = "https://cdn.pixabay.com/photo/2017/08/12/23/29/background-texture-2635740_640.jpg"
  return (
    <div className='flex flex-col'>


      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {savedDesigns.map((design, index) => (
          <Card
            sx={{
              maxWidth: 345,
              border: selectedIndex === index ? '2px solid blue' : '1px solid #ccc',
            }}
            key={index}
            onClick={() => handleSelect(index)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image={design.template.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Template:{index}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                descriptions of template:{index}
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions> */}
          </Card>
        ))}

      </div>
      <div className="flex ml-3">
        <DialogActions>
          <Button autoFocus

            onClick={handleSelectButtonClick}>
            Save
          </Button>
        </DialogActions>
      </div>
    </div>

  );
};

export default EmailTemplateCards;
