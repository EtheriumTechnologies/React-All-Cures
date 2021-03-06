import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'
import { Alert} from 'react-bootstrap';
import { backendHost } from '../../api-config';

class PromoPaid extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      selectedCheckboxes: [],
      unselectedCheckboxes: [],
      isChecked: true,
     
    };
  }

  
  getComments(val) {
    
    axios.get(`${backendHost}/promo/articlespromostage/${val}`)
      .then(res => {
        var s = [];
        res.data.map(i => (
          s.push(i.article_id)
        ))
        this.setState({
          commentItems:res.data,
          unselectedCheckboxes: s
        })
      })

      .catch(err => {return})
    
  }


  
  postApproved(selected,rejected){
    axios.post(`${backendHost}/promo/reviewed/1/stage/1`, {
      "articles_ids": selected.join(),
      "articles_ids_rejected":rejected.join()
    })
    .then(res => {
      this.setState({ShowSubmitAlert: true});
     
    })
    .catch(err => {return})
    this.setState({ShowErrorAlert: true});
      setTimeout(()=>{
      this.setState({ShowErrorAlert: false});
      },2000)
  }


  componentDidMount() {
    this.getComments('/')
  }
  
  onChange = id => {
    // event.target.checked
    const index = this.state.unselectedCheckboxes.indexOf(id);
    if (index > -1) {
      this.state.unselectedCheckboxes.splice(index, 1);
    }
    const selectedCheckboxes = this.state.selectedCheckboxes;
    // Find index
    const unselectedCheckboxes = this.state.unselectedCheckboxes
    const findIdx = selectedCheckboxes.indexOf(id);
    const unselectIdx = unselectedCheckboxes.indexOf(id);

   
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    if(unselectIdx > -1){
      return null
    }
    this.setState({
      selectedCheckboxes: selectedCheckboxes
    });

  };
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }
render(){
  const { selectedCheckboxes, unselectedCheckboxes } = this.state;
  
   function select(e) {
    
    var checkboxes = document.getElementsByClassName('check');
    for (var checkbox of checkboxes) {
        checkbox.checked = e.target.checked;
    }
    
  }

  
  return (
    <>
    
              <div className="tab-content">
              <div><input type="checkbox" onClick={select} className="select-all all" />
              <label for="checkbox" className="select-all">Select All</label></div>
              <div className="my-3 container" style={{zIndex: '999999'} }>
                <Results/>
                
                                    <select name=""className="form-select"
                                      onChange={(e)=> {
                                     
                                        if(parseInt(e.target.value) === 0) {
                                          this.getComments('/0')
                                        }else if(parseInt(e.target.value) === 1) {
                                          this.getComments('/1')
                                        }else {
                                          this.getComments('/')
                                        }
                                      }}
                                      id="">
                                      <option value="all"  onClick={() => this.getComments('/')}>All</option>
                                      <option value="1" onClick={() => this.getComments('/1')} >Paid</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Paid</option>
                                      
                                    </select>
                                    
                                </div>
             
                      <div id="patient" className="tab-pane active">
                        
                        <div className="rating-outer" id="rating">
                        
                        {this.state.commentItems.map((item,i) => {
                            return (
                              <>
                                <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                              {/* {item.article_id}
                              {item.promo_code} */}
                              <div className="pb-2"><span className="font-weight-bold">Artcile Id:</span> {item.article_id}</div>
                              <div className="pb-2"><span className="font-weight-bold">Promo Code:</span> {item.promo_code}</div>
                                {" "}
                              </div>
                              {
                                item.promo_stage === 1 ?
                                  <div>
                                  <input type = "checkbox"
                                 onChange={() => this.onChange(item.article_id)}
                                 selected={selectedCheckboxes.includes(item.article_id)}
                                 className="check c1"
                                 checked
                                  
                                />
                                
                                

                              </div>
                              

                              
                              : <input type = "checkbox"
                              onChange={() => this.onChange(item.article_id)}
                              selected={selectedCheckboxes.includes(item.article_id)}
                              className="check c1"
                              
                              
                            />
                        }
                              
                              <div className="patient-msg">
                              
                                {/* <p>{item.article_id}</p> */}
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          {/* <p>Selected checkboxes: {JSON.stringify(selectedCheckboxes)}</p>
                          <p>unselected checkboxes: {JSON.stringify(unselectedCheckboxes)}</p> */}
                         
                          <div>
                          {
                                        this.state.ShowSubmitAlert
                                            ? <SubmitAlert ShowSubmitAlert={this.state.ShowSubmitAlert}/>
                                            : null
                                    }

                                    {
                                        this.state.ShowErrorAlert
                                            ? <SubmitError ShowErrorAlert={this.state.ShowErrorAlert}/>
                                            : null
                                    }
                                <button className='bcolor'onClick={() => {
                                const confirmBox = window.confirm(
                                  "Are You Sure?"
                                )
                                if (confirmBox === true) {
                                  this.postApproved(selectedCheckboxes, unselectedCheckboxes) }
                              }}>
                                  
                                  
                                  Submit</button>
                              </div>
                         
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        
                     
                      </div>
                    </div>
    </>
    
  )
}

}

// SHOW ALERT

function SubmitAlert(props) {
  if(props.ShowSubmitAlert) {
      return(
          <Alert className="bg-green">Promo has been saved successfully!</Alert>
      );
  }
}

// Show Error Alert

function SubmitError(props) {
  if(props.ShowErrorAlert) {
      return(
          <Alert className="bg-red">Some Error occured!</Alert>
      );
  }
}
export default PromoPaid; 