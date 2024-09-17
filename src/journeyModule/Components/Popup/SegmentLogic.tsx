// import axios from 'axios';


// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useState } from 'react';

// function SegmentLogic() {
//     const [conditions, setConditions] = useState([]);
//     const [brandID, setBrandID] = useState('');
//     const [segmentName, setSegmentName] = useState('');
//     const [segmentData, setSegmentData] = useState(null);


//     const handleOrClick = () => {
//         setConditions([...conditions, { id: conditions.length + 1, key: '', operator: '', value: '', additionalConditions: [] }]);
//     };

//     const handleAndClick = (conditionIndex) => {
//         setConditions(prevConditions => {
//             return prevConditions.map((condition, index) => {
//                 if (index === conditionIndex) {
//                     return {
//                         ...condition,
//                         additionalConditions: [...condition.additionalConditions, { id: condition.additionalConditions.length + 1, key: '', operator: '', value: '' }]
//                     };
//                 }
//                 return condition;
//             });
//         });
//     };

//     const handleDeleteCondition = (conditionId) => {
//         setConditions(prevConditions => prevConditions.filter(condition => condition.id !== conditionId));
//     };

//     const handleDeleteAdditionalCondition = (conditionIndex, additionalConditionId) => {
//         setConditions(prevConditions => {
//             return prevConditions.map(condition => {
//                 if (condition.id === conditionIndex) {
//                     return {
//                         ...condition,
//                         additionalConditions: condition.additionalConditions.filter(additionalCondition => additionalCondition.id !== additionalConditionId)
//                     };
//                 }
//                 return condition;
//             });
//         });
//     };

//     const handleConditionChange = (e, conditionIndex, isAdditional, additionalIndex) => {
//         const { name, value } = e.target;
//         setConditions(prevConditions => {
//             return prevConditions.map((condition, index) => {
//                 if (index === conditionIndex) {
//                     if (isAdditional) {
//                         return {
//                             ...condition,
//                             additionalConditions: condition.additionalConditions.map(additionalCondition => {
//                                 if (additionalCondition.id === additionalIndex) {
//                                     return {
//                                         ...additionalCondition,
//                                         [name]: value
//                                     };
//                                 }
//                                 return additionalCondition;
//                             })
//                         };
//                     } else {
//                         return {
//                             ...condition,
//                             [name]: value
//                         };
//                     }
//                 }
//                 return condition;
//             });
//         });
//     };

//     const handleSubmit = async () => {
//         const allConditions = conditions.map(condition => {
//             // Main condition
//             const mainCondition = {
//                 id: condition.id,
//                 attribute: condition.key, // Change key to attribute
//                 operator: condition.operator,
//                 value: condition.value
//             };

//             // Additional conditions
//             const additionalConditions = condition.additionalConditions.map(additionalCondition => ({
//                 id: condition.id,
//                 attribute: additionalCondition.key, // Change additionalKey to attribute
//                 operator: additionalCondition.operator, // No need to change operator
//                 value: additionalCondition.value // No need to change value
//             }));

//             // Combine main and additional conditions
//             const allConditionData = [mainCondition, ...additionalConditions];
//             return allConditionData;
//         });

//         const data = {
//             BrandID: brandID,
//             segmentName: segmentName,
//             conditions: allConditions,
//         }

//         console.log(data);
//         console.log("BrandID:", brandID);
//         console.log("Segment Name:", segmentName);

//         try {
//             // Send a POST request to save the new segment data
//             const response = await axios.post('http://localhost:8000/segmentFilter', data);
//             console.log('Segment created successfully:', response.data);
//             setSegmentData(response.data);

//             alert("submitted")
//             // Reset form fields after successful submission

//         } catch (error) {
//             console.error('Error creating segment:', error);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-white mb-20">
//             <h2 className="text-lg font-semibold mb-4">Add Conditions</h2>

//             {/* Separate inputs for BrandID and Segment Name */}
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     value={brandID}
//                     onChange={(e) => setBrandID(e.target.value)}
//                     className="mr-4"
//                     placeholder="BrandID"
//                 />
//                 <input
//                     type="text"
//                     value={segmentName}
//                     onChange={(e) => setSegmentName(e.target.value)}
//                     placeholder="Segment Name"
//                 />
//             </div>

//             <div className='mb-2'>
//                 <h2 className='text-sm font-medium '>Display common properties such as (optional)</h2>
//             </div>

//             <div className="space-y-6">
//                 {/* Render existing conditions */}
//                 {conditions.map((condition, index) => (
//                     <div key={condition.id}>
//                         <div className="p-4 border border-slate-400 rounded-md space-y-1">
//                             <div>
//                                 <div className="flex space-x-4">
//                                     <select
//                                         name="key"
//                                         value={condition.key}
//                                         onChange={(e) => handleConditionChange(e, index)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     >
//                                         <option value="">Select Condition</option>
//                                         <option value="name">name</option>
//                                         <option value="product">product</option>

//                                         <option value="email">email</option>
//                                         <option value="gender">gender</option>
//                                         <option value="ip_address">ip_address</option>
//                                         <option value="city">city</option>
//                                         <option value="country">country</option>
//                                     </select>
//                                     <select
//                                         name="operator"
//                                         value={condition.operator}
//                                         onChange={(e) => handleConditionChange(e, index)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     >
//                                         <option value="">Select Operator</option>
//                                         <option value="eq">eq</option>
//                                         <option value="ne">ne</option>
//                                         <option value="gt">gt</option>
//                                         <option value="in">in</option>
//                                         <option value="lt">lt</option>
//                                         <option value="nin">nin</option>
//                                     </select>
//                                     <input
//                                         type="text"
//                                         name="value"
//                                         value={condition.value}
//                                         onChange={(e) => handleConditionChange(e, index)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                         placeholder="Enter value"
//                                     />
//                                 </div>
//                             </div>
//                             {condition.additionalConditions.map((additionalCondition, additionalIndex) => (
//                               <div>
//                                  {/* <div className="ml-10">
//                                 <div className="h-4 mt-2 ml-3 border-l border-gray-500"></div>
//                                 <div className="text-gray-500 bg-slate-100 my-1 w-7">AND</div>
//                                 <div className="h-4 mb-2 ml-3 border-l border-gray-500"></div>
//                             </div> */}
//                                   <div key={`additional-row-${additionalIndex}`} className="flex space-x-4">
//                                     <select
//                                         name="key"
//                                         value={additionalCondition.key}
//                                         onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     >
//                                         <option value="">Select Additional Condition</option>
//                                         <option value="name">name</option>
//                                         <option value="product">product</option>

//                                         <option value="email">email</option>
//                                         <option value="gender">gender</option>
//                                         <option value="ip_address">ip_address</option>
//                                         <option value="city">city</option>
//                                         <option value="country">country</option>
//                                     </select>
//                                     <select
//                                         name="operator"
//                                         value={additionalCondition.operator}
//                                         onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                     >
//                                         <option value="">Select Additional Operator</option>
//                                         <option value="eq">eq</option>
//                                         <option value="ne">ne</option>
//                                         <option value="gt">gt</option>
//                                         <option value="in">in</option>
//                                         <option value="lt">lt</option>
//                                         <option value="nin">nin</option>
//                                     </select>
//                                     <input
//                                         type="text"
//                                         name="value"
//                                         value={additionalCondition.value}
//                                         onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
//                                         className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//                                         placeholder="Enter value"
//                                     />
//                                     {/* <button
//                                         onClick={() => handleDeleteAdditionalCondition(index, additionalCondition.id)}
//                                         className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-red-500 text-white hover:bg-red-600/90 h-10 px-4 py-2"
//                                     >
//                                         Delete
//                                     </button> */}
//                                 </div>

//                               </div>
//                             ))}
//                             <div className='pt-4'>
//                                 <button onClick={() => handleAndClick(index)} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-500 text-primary-foreground hover:bg-green-600/90 h-10 px-4 py-2 bg-green-400">
//                                     <strong><pre>+</pre></strong> And
//                                 </button>
//                                 <FontAwesomeIcon
//                                     icon={faTrash}
//                                     onClick={() => handleDeleteCondition(condition.id)}
//                                     className="ml-4 w-4 h-8 inline-flex items-center float-right text-red-500 hover:cursor-pointer"
//                                 />
//                             </div>
//                         </div>
//                         {index !== conditions.length - 1 && (
//                             <div className="ml-10">
//                                 <div className="h-4 mt-2 ml-3 border-l border-gray-500"></div>
//                                 <div className="text-gray-500 bg-slate-100 my-1 w-7">AND</div>
//                                 <div className="h-4 mb-2 ml-3 border-l border-gray-500"></div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//                 <button onClick={handleOrClick} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
//                     Or
//                 </button>
//                 <button onClick={handleSubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-500 text-white hover:bg-green-600/90 h-10 px-4 py-2">
//                     Submit
//                 </button>
//             </div>




//         </div>
//     );
// }

// export default SegmentLogic;



import axios from 'axios';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, ChangeEvent } from 'react';
import { Button, DialogActions, Divider, InputLabel } from '@mui/material';
import { filteredSegmentedUserReducer } from '../../../reducer/slice';
import { useDispatch } from 'react-redux';
// import { environment } from '../../../../environments/environment';

interface Condition {
    id: number;
    key: string;
    operator: string;
    value: string;
    additionalConditions: AdditionalCondition[];
}

interface AdditionalCondition {
    id: number;
    key: string;
    operator: string;
    value: string;

}

interface SegmentLogicProps {
    segmentName: string;
}

const SegmentLogic: React.FC<SegmentLogicProps> = ({ segmentName }) => {
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [brandID, setBrandID] = useState<string>('');
    // const [segmentName, setSegmentName] = useState<string>('');
    const [segmentData, setSegmentData] = useState<any>(null);
    const [onUserSubmit, setOnUserSubmit] = useState(true);

    const [urlProduction,setUrlProduction] = React.useState("https://journey-api.capengage.com/");
    const [urlDevelopment,setUrlDevelopment] = React.useState("http://localhost:3000/");

    const handleOrClick = () => {
        setConditions([...conditions, { id: conditions.length + 1, key: '', operator: '', value: '', additionalConditions: [] }]);
    };

    const handleAndClick = (conditionIndex: number) => {
        setConditions(prevConditions => {
            return prevConditions.map((condition, index) => {
                if (index === conditionIndex) {
                    return {
                        ...condition,
                        additionalConditions: [...condition.additionalConditions, { id: condition.additionalConditions.length + 1, key: '', operator: '', value: '' }]
                    };
                }
                return condition;
            });
        });
    };

    const handleDeleteCondition = (conditionId: number) => {
        setConditions(prevConditions => prevConditions.filter(condition => condition.id !== conditionId));
    };

    const handleDeleteAdditionalCondition = (conditionIndex: number, additionalConditionId: number) => {
        setConditions(prevConditions => {
            return prevConditions.map(condition => {
                if (condition.id === conditionIndex) {
                    return {
                        ...condition,
                        additionalConditions: condition.additionalConditions.filter(additionalCondition => additionalCondition.id !== additionalConditionId)
                    };
                }
                return condition;
            });
        });
    };

    const handleConditionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, conditionIndex: number, isAdditional?: boolean, additionalIndex?: number) => {
        const { name, value } = e.target;
        setConditions(prevConditions => {
            return prevConditions.map((condition, index) => {
                if (index === conditionIndex) {
                    if (isAdditional && additionalIndex !== undefined) {
                        return {
                            ...condition,
                            additionalConditions: condition.additionalConditions.map(additionalCondition => {
                                if (additionalCondition.id === additionalIndex) {
                                    return {
                                        ...additionalCondition,
                                        [name]: value
                                    };
                                }
                                return additionalCondition;
                            })
                        };
                    } else {
                        return {
                            ...condition,
                            [name]: value
                        };
                    }
                }
                return condition;
            });
        });
    };


    const dispatchfilteredSegmentedUser = useDispatch()
    const handleSubmit = async () => {
        setOnUserSubmit(false)
        const allConditions = conditions.map(condition => {
            const mainCondition = {
                id: condition.id,
                attribute: condition.key,
                operator: condition.operator,
                value: condition.value
            };

            const additionalConditions = condition.additionalConditions.map(additionalCondition => ({
                id: condition.id,
                attribute: additionalCondition.key,
                operator: additionalCondition.operator,
                value: additionalCondition.value
            }));

            return [mainCondition, ...additionalConditions];
        });

        const data = {
            BrandID: "dummyBrand7",
            segmentName: segmentName,
            conditions: allConditions,
        } 

        console.log(data);
        console.log("BrandID:", brandID);
        console.log("Segment Name:", segmentName);

        try {
            const response = await axios.post(`http://localhost:3000/journey/segmentFilter`, data);
            console.log('Segment created successfully:', response.data);
            setSegmentData(response.data);
            dispatchfilteredSegmentedUser(filteredSegmentedUserReducer(response.data))
            // alert("submitted")
        } catch (error) {
            console.error('Error creating segment:', error);
        }
    };


    const getOperatorSymbol = (operator: string) => {
        switch (operator) {
            case 'eq':
                return '=';
            case 'ne':
                return '!=';
            case 'gt':
                return '>';
            case 'lt':
                return '<';
            case 'in':
                return 'in';
            case 'nin':
                return 'not in';
            default:
                return '';
        }
    };


    return (
        <div>

            {onUserSubmit ? <div className="max-w-4xl mx-auto p-6 bg-white mb-20">
                <h2 className="text-lg font-semibold mb-4">Past behavior: All Users</h2>
                {/* <div className="mb-4">
                <input
                    type="text"
                    value={brandID}
                    onChange={(e) => setBrandID(e.target.value)}
                    className="mr-4"
                    placeholder="BrandID"
                />
           
            </div> */}

                <div className='mb-2'>
                    <h2 className='text-sm font-medium '>Display common properties:</h2>
                </div>

                <div className="space-y-6">
                    {conditions.map((condition, index) => (
                        <div key={condition.id}>
                            <div className="p-4 border border-slate-400 rounded-md space-y-1">
                                <div>
                                    <div className="flex space-x-4">
                                        <select
                                            name="key"
                                            value={condition.key}
                                            onChange={(e) => handleConditionChange(e, index)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        >
                                            <option value="">Select Condition</option>
                                            <option value="name">name</option>
                                            <option value="product">product</option>
                                            <option value="email">email</option>
                                            <option value="gender">gender</option>
                                            <option value="ip_address">ip_address</option>
                                            <option value="city">city</option>
                                            <option value="country">country</option>
                                        </select>
                                        <select
                                            name="operator"
                                            value={condition.operator}
                                            onChange={(e) => handleConditionChange(e, index)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        >
                                            <option value="">Select Operator</option>
                                            <option value="eq">eq</option>
                                            <option value="ne">ne</option>
                                            <option value="gt">gt</option>
                                            <option value="in">in</option>
                                            <option value="lt">lt</option>
                                            <option value="nin">nin</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="value"
                                            value={condition.value}
                                            onChange={(e) => handleConditionChange(e, index)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            placeholder="Enter value"
                                        />
                                    </div>
                                </div>
                                {condition.additionalConditions.map((additionalCondition, additionalIndex) => (
                                    <div key={`additional-row-${additionalIndex}`} className="flex space-x-4">
                                        <select
                                            name="key"
                                            value={additionalCondition.key}
                                            onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        >
                                            <option value="">Select Additional Condition</option>
                                            <option value="name">name</option>
                                            <option value="product">product</option>
                                            <option value="email">email</option>
                                            <option value="gender">gender</option>
                                            <option value="ip_address">ip_address</option>
                                            <option value="city">city</option>
                                            <option value="country">country</option>
                                        </select>
                                        <select
                                            name="operator"
                                            value={additionalCondition.operator}
                                            onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        >
                                            <option value="">Select Additional Operator</option>
                                            <option value="eq">eq</option>
                                            <option value="ne">ne</option>
                                            <option value="gt">gt</option>
                                            <option value="in">in</option>
                                            <option value="lt">lt</option>
                                            <option value="nin">nin</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="value"
                                            value={additionalCondition.value}
                                            onChange={(e) => handleConditionChange(e, index, true, additionalCondition.id)}
                                            className="flex-1 h-10 w-36 rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            placeholder="Enter value"
                                        />
                                    </div>
                                ))}
                                <div className='pt-4'>

                                    <Button variant="outlined"
                                        onClick={() => handleAndClick(index)}
                                        sx={{
                                            fontSize: "12px",
                                            padding: "4px",
                                            marginTop: "3px",

                                        }}
                                    >    <strong><pre className="mr-1">+</pre></strong> And - Add Property..
                                    </Button>

                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        onClick={() => handleDeleteCondition(condition.id)}
                                        className="ml-4 w-4 h-8 inline-flex items-center float-right text-red-500 hover:cursor-pointer"
                                    />
                                </div>
                            </div>
                            {index !== conditions.length - 1 && (
                                <div className="ml-10">
                                    <div className="h-4 mt-2 ml-3 border-l border-gray-500"></div>
                                    <div className="text-gray-500 bg-slate-100 my-1 w-7">OR</div>
                                    <div className="h-4 mb-2 ml-3 border-l border-gray-500"></div>
                                </div>
                            )}
                        </div>
                    ))}


                    <div className="inline-flex items-center justify-center gap-2 w-60 " >
                        <Button onClick={handleOrClick} variant="outlined"
                            sx={{
                                fontSize: "12px",
                                padding: "4px",
                                marginTop: "3px",

                            }}
                        >                 Add Segment
                        </Button>

                        <Button onClick={handleSubmit} variant="outlined"
                            sx={{
                                fontSize: "12px",
                                padding: "4px",
                                marginTop: "3px",
                            }}
                        >                 Submit
                        </Button>



                    </div>






                </div>

            </div> :

                //         <div className="flex flex-col justify-start items-start gap-1 w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                //                                 <div className="flex justify-between w-full">
                //                                     <InputLabel htmlFor="journey-name"
                //                                         style={{
                //                                             fontWeight: 'bold',
                //                                             fontSize: "14px",
                //                                         }}>
                // Past behavior: New Segment                                    </InputLabel>
                //                                     <FontAwesomeIcon icon={faPenToSquare} onClick={()=>setOnUserSubmit(true)}
                //                                     />
                //                                 </div>
                //                                 <Divider
                //                                     sx={{
                //                                         width: "800px",
                //                                         marginBottom: "5px",
                //                                     }}
                //                                 />
                //                                 <h2 className=" text-[15px] font-bold">
                //                                     Enter Users
                //                                 </h2>
                //                                 <h3 className="mb-1 text-[12px]">
                //                                     {/* {entryCriteria} */}
                //                                 </h3>
                //                             </div>

                <div className="w-full mb-5 shadow-md border-1 rounded-md p-4 ">
                    <div className="flex justify-between w-full">
                        <InputLabel htmlFor="journey-name" className="font-bold text-base">
                            Past behavior: New Segment
                        </InputLabel>
                        <FontAwesomeIcon icon={faPenToSquare} onClick={() => setOnUserSubmit(true)} />
                    </div>
                    <Divider className="w-800 my-6" />
                    <h2 className="text-base font-medium text-gray-400">
                        AND have common properties like
                    </h2>
                    {conditions.map(condition => (
                        <React.Fragment key={condition.id}>
                            <ul className="list-none flex pl-4  mb-2">
                                <li className="mr-4  text-sm ">
                                    &bull; {condition.key}   {getOperatorSymbol(condition.operator)}   {condition.value}
                                </li>
                                {/* <li className="mr-4">
                    {getOperatorSymbol(condition.operator)}
                </li>
                <li>
                    {condition.value}
                </li> */}
                            </ul>
                            {condition.additionalConditions.length > 0 && (
                                <ul className="list-none pl-4">
                                    {condition.additionalConditions.map(additionalCondition => (
                                        <li key={additionalCondition.id} className="mb-2 text-sm ">
                                            &bull; {additionalCondition.key} {getOperatorSymbol(additionalCondition.operator)} {additionalCondition.value}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </React.Fragment>
                    ))}
                </div>



            }
        </div>
    );



}

export default SegmentLogic;
