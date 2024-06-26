
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';
import { Alert, Form } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';




function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState(1); 
  const [status,setStatus] = useState('')
  const [campaignList,setCampaignList] = useState([])
  const [emaill, setEmail] = useState()
  const [type,setType] = useState()
  const[alt,setAlt] = useState()
 const[pinCode,setPinCode] = useState()
 const [startDate, setStart] = useState(Date)
 const [endDate, setEnd] = useState(Date)
  const [alert,setAlert] = useState()
  const [alertMessage, setAlertMessage] = useState('');
  const [image, setImage] = useState(null);
  const[companyList,setCompanyList] = useState([])
  const[adsList,setAdsList] = useState([])
  const [condition, setCondition] = useState('');
  const[appImage,setAppImage]=useState(null)
  




  const submitForm = async (event) => {
  event.preventDefault();

 


    const AdMap = {
      CampaignID: first,
      DiseaseCondition: middle,
      SlotID: last,
      AdTitle: type,
      AdDescription: pinCode,
      AdCount: emaill,
      StartDate: startDate,
      EndDate: endDate,
      ImageAltText: alt,
      AdTypeID: condition,
    };
  
    // Log AdMap data before sending
    console.log('AdMap:', AdMap);
  
    const formData = new FormData();
    formData.append('AdMap', JSON.stringify(AdMap)); // Convert AdMap object to JSON and append it to formData
    if (image) {
      formData.append('image', image);
    }

    if (appImage) {
      formData.append('mobile_image',appImage);
    }
  
    console.log(formData.json)
    axios.post(`${backendHost}/sponsored/create/ad`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // .then(() => {
    //   setAlert(true);
    //   setTimeout(() => {
    //     setAlert(false);
    //   }, 4000);
    // })
    // .catch((error) => {
    //   console.error('Error creating ad:', error);
    // });

    .then((response) => {
      if (response.data === 1) {
        setAlertMessage('Ads created successfully!!');
      } else if (response.data === 0) {
        setAlertMessage('Ads not created. Please check all fields and try again.');
      } else {
        setAlertMessage('An error occurred. Please contact the development team.');
      }

      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Hide alert after 3 seconds
    })
    .catch((error) => {
      console.error('Error creating ad:', error);
      setAlertMessage('An error occurred. Please contact the development team.');
      setTimeout(() => {
        setAlertMessage('');
      }, 3000); // Hide alert after 3 seconds
    });

  };
  
  

// const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setImage(file);

//     console.log("Image selected:", {
//       image: file.name,
//     });
//   };


const handleImageChange = async (e) => {
  const file = e.target.files[0];
  setImage(file);

  console.log('Image selected:', {
    image: file.name,
  });

  if (file) {
    const adType = last;
    const fileSize = file.size / 1024;
    const [width, height] = await getImageDimensions(file);

    if (adType === 1) { // Check for integer value instead of 'Banner'
      if (width !== 970 || height !== 90) {
        setAlertMessage('Invalid image dimensions for Banner. Please upload an image with dimensions 970x90.');
        setImage(null);
      } else if (fileSize > 100) {
        setAlertMessage('Image size for Banner is too large. Please upload an image with size up to 100KB.');
        setImage(null);
      }
    } else if (adType === 2) { // Check for integer value instead of 'Left'
      if (width !== 156 || height !== 514) {
        setAlertMessage('Invalid image dimensions for Left. Please upload an image with dimensions 156x514.');
        setImage(null);
      } else if (fileSize > 20) {
        setAlertMessage('Image size for Left is too large. Please upload an image with size up to 20KB.');
        setImage(null);
      }
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  }
};



const handleAppImageChange = async (e) => {
  const file = e.target.files[0];
  setAppImage(file);

  console.log('Image selected:', {
    appImage: file.name,
  });

  if (file) {
    const fileSize = file.size / 1024;
    const [width, height] = await getImageDimensions(file);

    if (width !== 300 || height !== 50) {
      setAlertMessage('Invalid image dimensions for Mobile Banner. Please upload an image with dimensions 300x50.');
      setAppImage(null);
    } else if (fileSize > 100) {
      setAlertMessage('Image size for Banner is too large. Please upload an image with size up to 100KB.');
      setAppImage(null);
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  }
};


const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve([img.width, img.height]);
    };
    img.src = URL.createObjectURL(file);
  });
};
 
 

const getHospital = () => {
    axios.get(`${backendHost}/sponsored/getall/parent_disease_id `)
    .then(res => {
        console.log(res)
        console.log(res.data)
        setCompanyList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

const getAds = () => {
    axios.get(`${backendHost}/sponsored/list/adsslottypes `)
    .then(res => {
        
        setAdsList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}



const getCampaign = () => {
  axiosInstance.get(`/article/all/table/Campaign`)
    .then(res => {
        
        setCampaignList(res.data)
    })
    .catch(err => 
        console.log(err)
    )
}

useEffect(() => {
  
    getHospital()
    getAds()
    getCampaign()

}, []) 

const handleAdTypeChange = (e) => {
  const selectedValue = e.target.value;
  const adTypeToValueMap = {
    Banner: 1,
    Left: 2,
  };
  setLast(adTypeToValueMap[selectedValue]);
};

  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> <b> (Create AD)</b></div>
                        <Form onSubmit={submitForm}  >
                            <div className="row m-4">
                       
                       
         
                       <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Campaign <b>(Required)</b></label>
                        
                        <Form.Control
                         as="select"
                         name="hospital"
                          value={first}
                           onChange={(e) => setFirst(e.target.value)}
                             placeholder=" Enter Company" required className="form-control"
                             > 
<option>Select Campaign</option>
    {campaignList.map((c) => {
        
        return (
            <option value={c[0]}>{c[2]}</option>
        ) 
    })}
           </Form.Control>
                
                        </Form.Group>




                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Ad Condition  <b>(Required)</b></label>
                        <select name="hospital" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="Select Ad Condition" required className="form-control">
                    <option>Select Ad Condition</option>
    
                    <option value='1'>Generic</option>
                    <option value='2'>Target</option>
                        </select>
                        </Form.Group>
                        { condition=='2' &&

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter DiseaseCondition  <b>(Required)</b></label>
                        <select name="hospital" value={middle} onChange={(e) => setMiddle(e.target.value)} placeholder=" Enter Company" required className="form-control">
                 <option>Select Diseases</option>
                   {companyList.map((c) => {
        
                   return (
                       <option value={c[0]}>{c[1]}</option>
                       )
                          })}
                           </select>
                        </Form.Group>
                              }

                    
{/* 
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}} >
                        <label htmlFor="">Enter Ad Type  <b>(Required)</b></label>
                        <select name="hospital" value={last} onChange={(e) => setLast(e.target.value)} placeholder=" Enter Company" required className="form-control">
  <option>Select Ads Type</option>
    {adsList.map((c) => {
        
        return (
            <option value={c[0]}>{c[1]}</option>
        )
    })}
</select>
                        </Form.Group> */}


                        
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <label htmlFor="">Enter Ad Type <b>(Required)</b></label>
                <select
                  name="hospital"
                  value={last === 1 ? 'Banner' : 'Left'} // Convert integer value back to string for the select input
                  onChange={handleAdTypeChange}
                  placeholder=" Enter Company"
                  required=""
                  className="form-control"
                >
                  <option value="Banner">Banner</option>
                  <option value="Left">Left</option>
                </select>
              </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter AD Title  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={type} onChange={(e) => setType(e.target.value)} type="text" name=""
                            placeholder="Enter Ad Title..." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter AdDescription  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={pinCode} onChange={(e) => setPinCode(e.target.value)} type="text" name=""
                            placeholder="Enter AdDescription..." />
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter AD Impressions  <b>(Required)</b></Form.Label>
                            <Form.Control  value={emaill} onChange={(e) => setEmail(e.target.value)} type="number" name=""
                            placeholder="Enter AdCount..." required />
                        </Form.Group>
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter ImageAltText  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={alt} onChange={(e) => setAlt(e.target.value)} type="text" name=""
                            placeholder="Enter ImageAltText..." />
                        </Form.Group>
                       
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Upload Image for Web</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Group>


                       
              <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                <Form.Label>Upload Image for App</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleAppImageChange} />
              </Form.Group>


    <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>AD Start Date</Form.Label>
                            <Form.Control type="Date" value={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>AD End Date</Form.Label>
                            <Form.Control value={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                    
                      
                    
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </Form>
                    </div>

                    {alertMessage && (
          <Alert variant="danger" className="h6 mx-3">
            {alertMessage}
          </Alert>
        )}

               
                </div>
            </div>
   
   
       
       
        

  );
}


export default App
