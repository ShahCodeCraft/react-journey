
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import EmailEditor from 'react-email-editor';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { templateEmailReducer, templatePop } from "../../../reducer/slice"
import Template from '../Popup/Template';

import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


// buttons mui
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';



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
import { styled } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import EmailTemplateCards from '../Popup/EmailTemplateCards';
// import { environment } from '../../../../environments/environment';




// snackbar
// import * as React from 'react';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



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
// dialog ends






interface User {
  name: string;
  email: string;
  phoneNumber: string;
}

interface ExportTemplates {
  [key: string]: string;
}

// interface AppProps {
//   variationId: number;

// }

const EmailEditorTemplate = () => {
  const emailEditorRef = useRef<any>(null);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
  const [newTemplate, setNewTemplate] = useState<any | null>(null);
  const [emailEditorReady, setEmailEditorReady] = useState<boolean>(true);
  const [templatePopup, setTemplatePopup] = useState(false)

  
  const selectedEmailTemplate = useSelector((state: any) => state.data.selectedEmailTemplateSlice.value);



  // dialog
  const [segmentOpen, setSegmentOpen] = useState(false)

  const handleClickSegmentOpen = () => {
      setSegmentOpen(true)
  }

  const handleClickSegmentClose = (reason: any) => {
      if (reason && reason === "backdropClick")
          return;
      setSegmentOpen(false)

  }
  const handleClickTemplateSave = (reason: any) => {
    if (reason && reason === "backdropClick")
        return;
    setSegmentOpen(false)

}

  // export templates
  const [userArray, setUserArray] = useState<User[]>([
    {
      name: 'User 1 Ss',
      email: 'abdulbasit@game.com',
      phoneNumber: '91333222234'
    },
    // {
    //   name: 'ice Ss',
    //   email: 'ice@game.com',
    //   phoneNumber: '913432432234'
    // },
    // {
    //   name: 'sun Ss',
    //   email: 'sun@game.com',
    //   phoneNumber: '913432422234'
    // },
    // {
    //   name: 'max Ss',
    //   email: 'max@game.com',
    //   phoneNumber: '91342423423234'
    // }
  ]);
  const dispatch = useDispatch();

  const [exportingtemplates, setExportingTemplates] = useState<ExportTemplates>({});

const [snackState,setSnackState] = useState("Save and select")

  const exportAllHtml = async () => {
    const generatedTemplates: ExportTemplates = {};
  
    for (const user of userArray) {
      await new Promise((resolve) => {
        emailEditorRef.current?.editor.exportHtml((data: any) => {
          let { html } = data;
          html = html.replace('{{name}}', user.name);
          html = html.replace('{{email}}', user.email);
          html = html.replace('{{phoneNumber}}', user.phoneNumber);
          
          generatedTemplates[user.name] = html;
          dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
          setExportingTemplates(generatedTemplates);
  
          console.log(`Generated template for ${user.name}: ${html}`);
  
          resolve(html);
        });
      })
    }
  };


  console.log(Object.isExtensible(exportingtemplates)); // Check if object is extensible



  // const saveDesign = async () => {
   
  //   // 
  //   emailEditorRef.current.editor.saveDesign(async (data: any) => {
  //     setNewTemplate(data);
  //     const newDesigns: any[] = [...savedDesigns, data];
  //     setSavedDesigns(newDesigns);
  //     console.log('Design saved:', newDesigns);

  //     try {
  //       const response = await axios.post(`${environment.UrlEndpoint}journey/saveEmailTemplate`, { template: data });
  //       console.log('Saved design sent to backend successfully:', response.data);
  //       const generatedTemplates: ExportTemplates = {};

  //       for (const user of userArray) {
  //         await new Promise((resolve) => {
  //           emailEditorRef.current?.editor.exportHtml((data: any) => {
  //             let { html } = data;
  //             html = html.replace('{{name}}', user.name);
  //             html = html.replace('{{email}}', user.email);
  //             html = html.replace('{{phoneNumber}}', user.phoneNumber);
              
  //             generatedTemplates[user.name] = html;
  //             dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
  //             setExportingTemplates(generatedTemplates);
      
  //             console.log(`Generated template for ${user.name}: ${html}`);
      
  //             resolve(html);
  //           });
  //         })
  //       }
    
        
  //       alert('Design saved successfully!');
  //     } catch (error) {
  //       console.error('Error saving design:', error);
  //     }
  //   });
  //   setSnackState("Save and select")
  //   setOpen(true);
  // };



  const saveDesign = async () => {
    emailEditorRef.current.editor.saveDesign(async (data: any) => {
      setNewTemplate(data);
      const newDesigns: any[] = [...savedDesigns, data];
      setSavedDesigns(newDesigns);
      console.log('Design saved:', newDesigns);
  
      try {
        const generatedTemplates: ExportTemplates = {};
  
        for (const user of userArray) {
          await new Promise((resolve) => {
            emailEditorRef.current?.editor.exportHtml(async (data: any) => {
              let { html } = data;
              html = html.replace('{{name}}', user.name);
              html = html.replace('{{email}}', user.email);
              html = html.replace('{{phoneNumber}}', user.phoneNumber);
              
              generatedTemplates[user.name] = html;
              dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
              setExportingTemplates(generatedTemplates);
  
              console.log(`Generated template for ${user.name}: ${html}`);
  
              // Create a temporary element and set its innerHTML to the generated HTML
              const tempElement = document.createElement('div');
              tempElement.innerHTML = html;
              document.body.appendChild(tempElement); // Append to DOM to ensure styles are applied
  
              // Generate image from the temporary element
              const imageBase64 = await htmlToImage.toPng(tempElement);
              document.body.removeChild(tempElement); // Clean up the temporary element
  
              // Prepare the data for the API call
              const payload = {
                template: data,
                image: imageBase64, // Base64 string of the image
              };
  
              // Send the template and image to the backend
              const response = await axios.post(`http://localhost:3000/journey/saveEmailTemplate`, { template: payload });
              console.log('Saved design and image sent to backend successfully:', response.data);
  
              resolve(html);
            });
          });
        }
  
        alert('Design saved successfully!');
      } catch (error) {
        console.error('Error saving design:', error);
      }
    });
    setSnackState("Save and select");
    setOpen(true);
  };


  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index: number = parseInt(event.target.value);
    setSelectedDesign(savedDesigns[index]);
  };

  const loadSelectedDesign = () => {
    if (selectedDesign) {
      emailEditorRef.current.editor.loadDesign(selectedDesign);
      console.log('Design loaded:', selectedDesign);
    } else {
      console.error('No design is selected to load.');
    }
  };

  const onLoad = () => {
    console.log('Editor instance is created');
    
  };





  const onReady = async () => {
    console.log('Editor is ready');
    setEmailEditorReady(false);
  if(selectedEmailTemplate){
    console.log("selectedEmailTemplate" + JSON.stringify(selectedEmailTemplate.template.template.design));
    emailEditorRef.current.editor.loadDesign(selectedEmailTemplate.template.template.design);
  
    const generatedTemplates: ExportTemplates = {};
  
    for (const user of userArray) {
      await new Promise((resolve) => {
        emailEditorRef.current?.editor.exportHtml((data: any) => {
          let { html } = data;
          html = html.replace('{{name}}', user.name);
          html = html.replace('{{email}}', user.email);
          html = html.replace('{{phoneNumber}}', user.phoneNumber);
          
          generatedTemplates[user.name] = html;
          dispatch(templateEmailReducer({ generatedTemplates: data }));
          setExportingTemplates(generatedTemplates);
  
          console.log(`Generated template for ${user.name}: ${html}`);
  
          resolve(html);
        });
      });
    }
  }
  };

  const dispatchTemplate = useDispatch()

  const selectTemplates = () => {
    // setTemplatePopup(true);
    dispatchTemplate(templatePop(!templatePopup))

  }
  const [toggle, setToggle] = useState(false);
  const handleTemplate = () => {
    // dispatchTemplateClose0(templatePop(!templatePop))
    setToggle(!toggle)


  }

  // useEffect(() => {
  //   const generateTemplates = async () => {
  //     console.log("selectedEmailTemplate" + JSON.stringify(selectedEmailTemplate.template.design));
  //     emailEditorRef.current.editor.loadDesign(selectedEmailTemplate.template.design);
    
  //     const generatedTemplates: ExportTemplates = {};
  
  //     for (const user of userArray) {
  //       await new Promise((resolve) => {
  //         emailEditorRef.current?.editor.exportHtml((data: any) => {
  //           let { html } = data;
  //           html = html.replace('{{name}}', user.name);
  //           html = html.replace('{{email}}', user.email);
  //           html = html.replace('{{phoneNumber}}', user.phoneNumber);
            
  //           generatedTemplates[user.name] = html;
  //           dispatch(templateEmailReducer({ generatedTemplates: data }));
  //           setExportingTemplates(generatedTemplates);
    
  //           console.log(`Generated template for ${user.name}: ${html}`);
    
  //           resolve(html);
  //         });
  //       });
  //     }
  //   };
  
  //   generateTemplates();
  // }, [selectedEmailTemplate]);
  

  const templateDataFromTemplatePopup = async (template: any) => {
    // alert(template)
    console.log("template"+JSON.stringify(template.template.template.design))
    setSnackState("Select Template")

    setOpen(true);

    emailEditorRef.current.editor.loadDesign(template.template.template.design);
    console.log(JSON.stringify(template.template))
    const generatedTemplates: ExportTemplates = {};

    for (const user of userArray) {
      await new Promise((resolve) => {
        emailEditorRef.current?.editor.exportHtml((data: any) => {
          let { html } = data;
          html = html.replace('{{name}}', user.name);
          html = html.replace('{{email}}', user.email);
          html = html.replace('{{phoneNumber}}', user.phoneNumber);
          
          generatedTemplates[user.name] = html;
          dispatch(templateEmailReducer({ generatedTemplates: data }));
          setExportingTemplates(generatedTemplates);
  
          console.log(`Generated template for ${user.name}: ${html}`);
  
          resolve(html);
        });
      })
    }
   
    setSegmentOpen(false)

  }

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };


  const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
    // Your logic for handling the close event
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <div className=''>

         <Stack spacing={2} direction="row">
      <Button variant="outlined" onClick={saveDesign}>Save and select</Button>
      <Button variant="outlined" onClick={handleClickSegmentOpen}>Select Template</Button>
    </Stack>

      {/* </div> */}
      {emailEditorReady ? <Skeleton /> : null}
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      {emailEditorReady ? <Skeleton /> : null}
      {/* {toggle && <Template onClosetemplate={handleTemplate} templateDataFromTemplatePopup={templateDataFromTemplatePopup} />} */}
            {/* dialog code */}

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
                                                    Select Template</h3>                                           <IconButton
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
                                            
                                                        <EmailTemplateCards handleClickTemplateSave={handleClickTemplateSave} templateDataFromTemplatePopup={templateDataFromTemplatePopup}  />
                                            </DialogContent>
                                            

                                        </BootstrapDialog>


{/* snackbar */}
<div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackState === "Select Template" ? "Template Selected" : "Save and Selected"}
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
};

export default EmailEditorTemplate;



// import React, { useRef, useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios library
// import EmailEditor from 'react-email-editor';
// import Skeleton from 'react-loading-skeleton';
// import { useDispatch, useSelector } from 'react-redux';
// import { templateEmailReducer, templatePop } from "../../../reducer/slice"
// import Template from '../Popup/Template';

// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


// // buttons mui
// import Stack from '@mui/material/Stack';
// // import Button from '@mui/material/Button';



// // dialog
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemButton from '@mui/material/ListItemButton';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';
// import { styled } from '@mui/material';

// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import EmailTemplateCards from '../Popup/EmailTemplateCards';
// import { environment } from '../../../../environments/environment';




// // snackbar
// // import * as React from 'react';
// // import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';



// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement;
//     },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="left" ref={ref} {...props} />;
// });





// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//     '& .MuiDialog-paper': {
//         position: 'fixed',
//         top: 0,
//         right: 0,
//         margin: 0,
//         height: '100vh', // Full viewport height
//         width: '77%', // Adjust the width as needed
//         maxWidth: '77%',
//     },
// }));
// // dialog ends






// interface User {
//   name: string;
//   email: string;
//   phoneNumber: string;
// }

// interface ExportTemplates {
//   [key: string]: string;
// }

// // interface AppProps {
// //   variationId: number;

// // }

// const EmailEditorTemplate = () => {
//   const emailEditorRef = useRef<any>(null);
//   const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
//   const [selectedDesign, setSelectedDesign] = useState<any | null>(null);
//   const [newTemplate, setNewTemplate] = useState<any | null>(null);
//   const [emailEditorReady, setEmailEditorReady] = useState<boolean>(true);
//   const [templatePopup, setTemplatePopup] = useState(false)

  
//   const selectedEmailTemplate = useSelector((state: any) => state.data.selectedEmailTemplateSlice.value);



//   // dialog
//   const [segmentOpen, setSegmentOpen] = useState(false)

//   const handleClickSegmentOpen = () => {
//       setSegmentOpen(true)
//   }

//   const handleClickSegmentClose = (reason: any) => {
//       if (reason && reason === "backdropClick")
//           return;
//       setSegmentOpen(false)

//   }
//   const handleClickTemplateSave = (reason: any) => {
//     if (reason && reason === "backdropClick")
//         return;
//     setSegmentOpen(false)

// }

//   // export templates
//   const [userArray, setUserArray] = useState<User[]>([
//     {
//       name: 'User 1 Ss',
//       email: 'abdulbasit@game.com',
//       phoneNumber: '91333222234'
//     },
//     {
//       name: 'ice Ss',
//       email: 'ice@game.com',
//       phoneNumber: '913432432234'
//     },
//     {
//       name: 'sun Ss',
//       email: 'sun@game.com',
//       phoneNumber: '913432422234'
//     },
//     {
//       name: 'max Ss',
//       email: 'max@game.com',
//       phoneNumber: '91342423423234'
//     }
//   ]);
//   const dispatch = useDispatch();

//   const [exportingtemplates, setExportingTemplates] = useState<ExportTemplates>({});

// const [snackState,setSnackState] = useState("Save and select")

//   const exportAllHtml = async () => {
//     const generatedTemplates: ExportTemplates = {};
  
//     for (const user of userArray) {
//       await new Promise((resolve) => {
//         emailEditorRef.current?.editor.exportHtml((data: any) => {
//           let { html } = data;
//           html = html.replace('{{name}}', user.name);
//           html = html.replace('{{email}}', user.email);
//           html = html.replace('{{phoneNumber}}', user.phoneNumber);
          
//           generatedTemplates[user.name] = html;
//           dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
//           setExportingTemplates(generatedTemplates);
  
//           console.log(`Generated template for ${user.name}: ${html}`);
  
//           resolve(html);
//         });
//       })
//     }
//   };


//   console.log(Object.isExtensible(exportingtemplates)); // Check if object is extensible



//   // const saveDesign = async () => {
   
//   //   // 
//   //   emailEditorRef.current.editor.saveDesign(async (data: any) => {
//   //     setNewTemplate(data);
//   //     const newDesigns: any[] = [...savedDesigns, data];
//   //     setSavedDesigns(newDesigns);
//   //     console.log('Design saved:', newDesigns);

//   //     try {
//   //       const response = await axios.post(`${environment.UrlEndpoint}journey/saveEmailTemplate`, { template: data });
//   //       console.log('Saved design sent to backend successfully:', response.data);
//   //       const generatedTemplates: ExportTemplates = {};

//   //       for (const user of userArray) {
//   //         await new Promise((resolve) => {
//   //           emailEditorRef.current?.editor.exportHtml((data: any) => {
//   //             let { html } = data;
//   //             html = html.replace('{{name}}', user.name);
//   //             html = html.replace('{{email}}', user.email);
//   //             html = html.replace('{{phoneNumber}}', user.phoneNumber);
              
//   //             generatedTemplates[user.name] = html;
//   //             dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
//   //             setExportingTemplates(generatedTemplates);
      
//   //             console.log(`Generated template for ${user.name}: ${html}`);
      
//   //             resolve(html);
//   //           });
//   //         })
//   //       }
    
        
//   //       alert('Design saved successfully!');
//   //     } catch (error) {
//   //       console.error('Error saving design:', error);
//   //     }
//   //   });
//   //   setSnackState("Save and select")
//   //   setOpen(true);
//   // };



//   const saveDesign = async () => {
//     emailEditorRef.current.editor.saveDesign(async (data: any) => {
//       setNewTemplate(data);
//       const newDesigns: any[] = [...savedDesigns, data];
//       setSavedDesigns(newDesigns);
//       console.log('Design saved:', newDesigns);
  
//       try {
//         const generatedTemplates: ExportTemplates = {};
  
//         for (const user of userArray) {
//           await new Promise((resolve) => {
//             emailEditorRef.current?.editor.exportHtml(async (data: any) => {
//               let { html } = data;
//               html = html.replace('{{name}}', user.name);
//               html = html.replace('{{email}}', user.email);
//               html = html.replace('{{phoneNumber}}', user.phoneNumber);
              
//               generatedTemplates[user.name] = html;
//               dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
//               setExportingTemplates(generatedTemplates);
  
//               console.log(`Generated template for ${user.name}: ${html}`);
  
//               // Create a temporary element and set its innerHTML to the generated HTML
//               const tempElement = document.createElement('div');
//               tempElement.innerHTML = html;
//               document.body.appendChild(tempElement); // Append to DOM to ensure styles are applied
  
//               // Generate image from the temporary element
//               const imageBase64 = await htmlToImage.toPng(tempElement);
//               document.body.removeChild(tempElement); // Clean up the temporary element
  
//               // Prepare the data for the API call
//               const payload = {
//                 template: data,
//                 image: imageBase64, // Base64 string of the image
//               };
  
//               // Send the template and image to the backend
//               const response = await axios.post(`${environment.UrlEndpoint}journey/saveEmailTemplate`, { template: payload });
//               console.log('Saved design and image sent to backend successfully:', response.data);
  
//               resolve(html);
//             });
//           });
//         }
  
//         alert('Design saved successfully!');
//       } catch (error) {
//         console.error('Error saving design:', error);
//       }
//     });
//     setSnackState("Save and select");
//     setOpen(true);
//   };


//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const index: number = parseInt(event.target.value);
//     setSelectedDesign(savedDesigns[index]);
//   };

//   const loadSelectedDesign = () => {
//     if (selectedDesign) {
//       emailEditorRef.current.editor.loadDesign(selectedDesign);
//       console.log('Design loaded:', selectedDesign);
//     } else {
//       console.error('No design is selected to load.');
//     }
//   };

//   const onLoad = () => {
//     console.log('Editor instance is created');
//   };

//   const onReady = () => {
//     console.log('Editor is ready');
//     setEmailEditorReady(false);
//   };

//   const dispatchTemplate = useDispatch()

//   const selectTemplates = () => {
//     // setTemplatePopup(true);
//     dispatchTemplate(templatePop(!templatePopup))

//   }
//   const [toggle, setToggle] = useState(false);
//   const handleTemplate = () => {
//     // dispatchTemplateClose0(templatePop(!templatePop))
//     setToggle(!toggle)


//   }



//   useEffect(()=>{
//     console.log("selectedEmailTemplate"+JSON.stringify(selectedEmailTemplate))


//   },[selectedEmailTemplate])

//   const templateDataFromTemplatePopup = async (template: any) => {
//     // alert(template)
//     console.log("template"+JSON.stringify(template.template.template.design))
//     setSnackState("Select Template")

//     setOpen(true);

//     emailEditorRef.current.editor.loadDesign(template.template.template.design);
//     console.log(JSON.stringify(template.template))
//     const generatedTemplates: ExportTemplates = {};

//     for (const user of userArray) {
//       await new Promise((resolve) => {
//         emailEditorRef.current?.editor.exportHtml((data: any) => {
//           let { html } = data;
//           html = html.replace('{{name}}', user.name);
//           html = html.replace('{{email}}', user.email);
//           html = html.replace('{{phoneNumber}}', user.phoneNumber);
          
//           generatedTemplates[user.name] = html;
//           dispatch(templateEmailReducer({ generatedTemplates: generatedTemplates }));
//           setExportingTemplates(generatedTemplates);
  
//           console.log(`Generated template for ${user.name}: ${html}`);
  
//           resolve(html);
//         });
//       })
//     }
   
//     setSegmentOpen(false)

//   }

//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };


//   const handleClose = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
//     // Your logic for handling the close event
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };


//   return (
//     <div className=''>

//          <Stack spacing={2} direction="row">
//       <Button variant="outlined" onClick={saveDesign}>Save and select</Button>
//       <Button variant="outlined" onClick={handleClickSegmentOpen}>Select Template</Button>
//     </Stack>

//       {/* </div> */}
//       {emailEditorReady ? <Skeleton /> : null}
//       <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
//       {emailEditorReady ? <Skeleton /> : null}
//       {/* {toggle && <Template onClosetemplate={handleTemplate} templateDataFromTemplatePopup={templateDataFromTemplatePopup} />} */}
//             {/* dialog code */}

//             <BootstrapDialog
//                                             fullScreen

//                                             // onClose={setupSettingsClose}
//                                             aria-labelledby="customized-dialog-title"
//                                             open={segmentOpen}
//                                             TransitionComponent={Transition}
//                                             sx={{

//                                                 height: "100vh",
//                                             }}


//                                         >
//                                             <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title " className="bg-slate-50" >
//                                                 <h3 className="text-sm ">
//                                                     Select Template</h3>                                           <IconButton
//                                                         aria-label="close"
//                                                         onClick={handleClickSegmentClose}
//                                                         sx={{
//                                                             position: 'absolute',
//                                                             right: 8,
//                                                             top: 5,

//                                                             color: (theme) => theme.palette.grey[500],
//                                                         }}
//                                                     >
//                                                     <CloseIcon />
//                                                 </IconButton>
//                                             </DialogTitle>
//                                             <DialogContent dividers>
                                            
//                                                         <EmailTemplateCards handleClickTemplateSave={handleClickTemplateSave} templateDataFromTemplatePopup={templateDataFromTemplatePopup}  />
//                                             </DialogContent>
                                            

//                                         </BootstrapDialog>


// {/* snackbar */}
// <div>
//       {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
//       <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity="success"
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {snackState === "Select Template" ? "Template Selected" : "Save and Selected"}
//         </Alert>
//       </Snackbar>
//     </div>
//     </div>
//   );
// };

// export default EmailEditorTemplate;


