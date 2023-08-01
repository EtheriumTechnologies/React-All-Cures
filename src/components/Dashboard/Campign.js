
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import AllPost from './Allpost';
import { Alert, Form } from 'react-bootstrap';





function App() {
  const [first, setFirst] = useState();
  const [middle, setMiddle] = useState();
  const [last, setLast] = useState();
  const [status,setStatus] = useState('')
  const [authorAddr, setAddr] = useState()
  const [emaill, setEmail] = useState()
  const [type,setType] = useState()
  const[id,setId] = useState()
 const[pinCode,setPinCode] = useState()
 const [startDate, setStart] = useState(Date)
 const [endDate, setEnd] = useState(Date)
  const [alert,setAlert] = useState()

  
  const submitForm = (e) => {
    e.preventDefault();
    axios.post(`${backendHost}/sponsored/create/campaign  `, {
        "CompanyID": first,
        "CampaignName": middle,
        "StartDate": startDate,
        "EndDate": endDate,

    })
    .then(res => {
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 4000);
    })
    .catch(res => console.log(res))
}


 

  return (
      
  
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> <b> (Create Campaign)</b></div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Company Name  <b> (Required)</b></Form.Label>
                            <Form.Control value={first} onChange={(e) => setFirst(e.target.value)}  type="text" name=""
                            placeholder="Enter Company Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Campaign Name  <b> (Optional)</b></Form.Label>
                            <Form.Control  value={middle} onChange={(e) => setMiddle(e.target.value)} type="text" name=""
                            placeholder="Enter Campaign Name..." />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign Start Date</Form.Label>
                            <Form.Control type="Date" value={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Campaign End Date</Form.Label>
                            <Form.Control value={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                    
                      
                    
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Campaign Create successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>

               
                </div>
            </div>
   
   
       
       
        

  );
}

export default App;