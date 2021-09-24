import React, { Component } from "react";

import axios from 'axios';
import Results from './Results'
import { Dropdown, Button, DropdownButton, Nav, Modal, Alert} from 'react-bootstrap';



class CommentsRev extends Component {
  constructor(props) {
    super(props);
    // const params = props.match.params
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      selectedCheckboxes: [],
      unselectedCheckboxes: [],
      isChecked: true,
      currentlySelected: ''
     
      // param: params,
      // getComments: 'all',
    };
  }

  
  getComments(val) {
    
    axios.get(`/rating/comments${val}`)
      .then(res => {
        console.log(res.data)
        
        // rate_id: 8
        // reviewed: 1
        const approvedIds = res.data.filter(item => {
          if(item.reviewed) return true
          return false
        }).map(item => item.rate_id)

        this.setState({ approvedIds })

        var s = [];
        res.data.map(i => {
          s.push(i.rate_id);
        })
        console.log(s)
        this.setState({
          commentItems:res.data,
          unselectedCheckboxes: s
        })
        
        console.log('kjdghkhgkhgsd',this.state.unselectedCheckboxes)
      })
      // .then(res => {
      //   res.data.map((i) => {
      //     console.log(i.rate_id)
      //   })
      //   // console.log(check)
      // })
      .catch(err => console.log(err))
    
  }


  postApproved(selected, rejected) {
    // console.log('post approved fired!');
    console.log(selected.join())
    console.log(rejected.join())

    const isCurrentItemApproved = !this.state.approvedIds.includes(this.state.currentlySelected) ? 1 : 0
    console.log(isCurrentItemApproved, this.state.currentlySelected,this.state.approvedIds)
    
    axios.post(`/rating/reviewedby/1/reviewed/${isCurrentItemApproved}`, {
      "rateids": selected.join(),
      "rateids_rejected": rejected.join()
    })
      .then(res => {
        console.log(res)
        this.setState({ShowSubmitAlert: true});
       
      })
      .catch(err => console.log(err))
      this.setState({ShowErrorAlert: true});
      setTimeout(()=>{
      this.setState({ShowErrorAlert: false});
      },4000)

    
  }

  

  componentDidMount() {
    
  
    this.getComments('/')

    
  }
  
  onChange = id => {
    // event.target.checked
    this.setState({ currentlySelected: id })

    const index = this.state.unselectedCheckboxes.indexOf(id);
    if (index > -1) {
      this.state.unselectedCheckboxes.splice(index, 1);
    }
    console.log('after delete: ',this.state.unselectedCheckboxes)
    console.log('##########################',id)
    const selectedCheckboxes = this.state.selectedCheckboxes;
    console.log(selectedCheckboxes)
    // Find index
    const unselectedCheckboxes = this.state.unselectedCheckboxes
    const findIdx = selectedCheckboxes.indexOf(id);
    const unselectIdx = unselectedCheckboxes.indexOf(id);

    // Index > -1 means that the item exists and that the checkbox is checked
    // and in that case we want to remove it from the array and uncheck it
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

    
    // this.setState({
    //   UnselectedCheckboxes: UnselectedCheckboxes
    // });
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
    console.log(checkboxes)
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
                                        
                                        // this.setState({
                                        //   getComments: e.target.value
                                        // })
                                        if(e.target.value == '0') {
                                          this.getComments('/0')
                                        }else if(e.target.value == '1') {
                                          this.getComments('/1')
                                        }else {
                                          this.getComments('/')
                                        }
                                      }}
                                      id="">
                                      <option value="all"  onClick={() => this.getComments('/')}>All</option>
                                      <option value="1" onClick={() => this.getComments('/1')} >Approved</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Approved</option>
                                      
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
                             
                                {" "}
                              </div>
                              {
                                item.reviewed === 1 ?
                                  <div>
                                  <input type = "checkbox"
                                  onChange={() => {
                                    this.onChange(item.rate_id)
                                    
                                    this.setState({
                                      customSelector: [...new Set(this.state.customSelector), item.rate_id ],
                                      checked: !this.state.isChecked
                                    })
                                    console.log('custom select ' + this.state.customSelector);
                                  }}
                                  selected={selectedCheckboxes.includes(item.rate_id)}
                                  className="check c1"
                                  defaultChecked={item.reviewed}
                                //  onChange={this.toggleChange}
                                  
                                />
                                
                                

                              </div>
                              

                              
                              : <input type = "checkbox"
                              onChange={() => this.onChange(item.rate_id)}
                              selected={selectedCheckboxes.includes(item.rate_id)}
                              className="check c1"
                              
                              
                            />
                        }
                              
                              
                             
                             

                              <div className="patient-msg">
                              
                                {/* <p>{item.rate_id}</p> */}
                                <div className="pb-2"><span className="font-weight-bold"><h2>Comments:</h2></span> {item.comments}</div>
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
                                            : console.log('Submit ALert')
                                    }

                                    {
                                        this.state.ShowErrorAlert
                                            ? <SubmitError ShowErrorAlert={this.state.ShowErrorAlert}/>
                                            : console.log('')
                                    }
                                
                                <button className='bcolor' onClick={() => {this.postApproved(selectedCheckboxes, unselectedCheckboxes)}}>Submit</button>
                              </div>
                         
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        <h3>Menu 1</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
    </>
    
  )
}

}

// SHOW ALERT

function SubmitAlert(props) {
  console.log('Submit ALert', props.ShowSubmitAlert)
  if(props.ShowSubmitAlert) {
      return(
          <Alert className="bg-green">Comments has been saved successfully!</Alert>
      );
  }
}

// Show Error Alert

function SubmitError(props) {
  console.log('Submit ALert', props.ShowErrorAlert)
  if(props.ShowErrorAlert) {
      return(
          <Alert className="bg-red">Some Error occured!</Alert>
      );
  }
}
export default CommentsRev; 