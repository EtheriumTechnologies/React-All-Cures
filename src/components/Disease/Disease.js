import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import {Container, Row, Col, Breadcrumb } from "react-bootstrap";
import {Link } from 'react-router-dom'
import CenterWell from './CenterWell';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
import { backendHost } from '../../api-config';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
// import CenterWell from './CenterWell'
class Disease extends Component {
  constructor(props) {
    super(props);
    // const params = props.match.params
    this.state = { 
      items: [],
      comment: [],
      isLoaded: false,
      ratingValue: [],
      param : this.props.match.params,
      disease: '',
      regions: '',
      regionPostsLoaded: false,
      regionalPost: []
    };
  }
  
  fetchBlog = () => {
    fetch(`${backendHost}/article/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        }, 
        () => {
          this.fetchCountriesCures()
          this.regionalPosts()
        });
        // document.title = `All Cures | ${json.data.title}`
      });
  }

  fetchCountriesCures = () => {
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          regions: json
        })
      })
  }

  getRating = (ratingId) => {
    axios.get(`${backendHost}/rating/target/${ratingId}/targettype/2/avg`)
    .then(res => {
      this.setState({
        ratingValue:res.data,
        size: 40,
        count: 5,
      })
    }) 
    .catch(err => console.log(err))
  }

  regionalPosts(){
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)       // /isearch/treatmentregions/${this.state.diseaseCondition}
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        regionPostsLoaded: true,
        regionalPost: json,
      });
    })
  }
  comments() {                        // For all available blogs "/blogs"
    fetch(`${backendHost}/rating/target/${this.props.match.params.id}/targettype/2`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          comment: json
        })
      });
  }
  componentDidMount() {
    this.fetchBlog()
    this.comments()
    this.getRating()
    // this.regionalPosts()
    // if(this.state.items){
    //   this.fetchCountriesCures(this.state.items)
    // }
    // var rating = 4

    // console.log(document.getElementById('avg-rating'))
    // for(var i =0 ; i<a; i++){
    //   document.getElementById('avg-rating').children[i].classList.add('checked')  
    //   }
  }

  componentDidUpdate(prevProps){
    if ( prevProps.match.params.id !== this.props.match.params.id){
      this.fetchBlog()
    }
  }

  handleChange = e => {
    this.setState({
        disease: e.target.value 
    });
  }

  render() { 
    var { isLoaded,items } = this.state;
    if(!isLoaded) {
    return (
      <>
      <Header history={this.props.history}/>
        <Container className="my-5 loading">
          <div className="loader ">
            <i className="fa fa-spinner fa-spin fa-6x" />
          </div>
        </Container>
      <Footer/>
      </>  
    );
  } else if(isLoaded){
    var artContent = items.content;
    var a = JSON.parse(decodeURIComponent(artContent))
    var b = a.blocks
    return (
    <div>
      <Header history={this.props.history}/>
        <div className="ad-spac">
          {/* <img src={Wall} height="200px" width="1900px"/> */}
        </div>
        <Row>
          <Col md={2} id="sidebar-wrapper">      
            <Sidebar diseaseId={items.disease_condition_id} id={this.props.match.params.id}  name={items.dc_name} />
          </Col>
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>                                     
                <Breadcrumb.Item>
                  <Link to="/cures">
                    Cures
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/cures/${items.dc_name}`}>
                    {items.dc_name}
                  </Link>
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item active>{items.title}</Breadcrumb.Item> */}
              </Breadcrumb>
              <div className="d-flex justify-content-end mb-2">
              { this.state.regions?
                this.state.regions.map(i => (
                  <Dropdown>
        <Dropdown.Toggle className="mr-2 btn btn-info color-white">
          <span className="color-white">{i.countryname}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
            this.state.regionalPost.map(j => (
              <>
              <Dropdown.Item href="#" className="border-bottom pt-2">
              <Link to={ `/cure/${j.article_id}` }  className="d-flex justify-content-between align-items-center mr-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    
                                        <div className="card-title mr-5">{j.title}</div>
                                </div>
                                <div>
                                {
                                  j.type === '1'?
                                      <div className="chip overview">Overview</div>
                                  : j.type === '2'?
                                      <div className="chip cure">Cures</div>
                                  : j.type === '3'?
                                      <div className="chip symptoms">Symptoms</div>
                                  : null
                                }
                            {/* {   
                                j.country_id !== 0?
                                    j.country_id === 9?
                                        <div className ="chip country">India</div>
                                        : j.country_id === 10?
                                            <div className="chip country">Iran</div>
                                            :null
                                        : null
                            } */}
                            </div>
                            </div>
                            </Link>

              </Dropdown.Item>
              </>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
                ))
                : null
              }
              </div>
                {/* <Link to={`/cures?c=9&dc=${items.disease_condition_id}`} className="mr-2 btn btn-info" >Indian</Link>
                <Link to={``} className="mr-2 btn btn-success" >Chinese</Link>
                <Link to={`/cures?c=10&dc=${items.disease_condition_id}`} className="btn btn-primary">Iranian</Link>
              </div> */}
              <div className="ml-5 h1 text-uppercase text-decoration-underline">{items.title}</div>
                {b.map((i) => (
                  <CenterWell
                    pageTitle = {items.title}
                    content = {i.data.content}
                    type = {i.type}
                    text = {i.data.text}
                    title = {i.data.title}
                    message = {i.data.message}
                    source = {i.data.source}
                    embed = {i.data.embed}
                    caption = {i.data.caption}
                    alignment = {i.data.alignment}
                    imageUrl = {i.data.file? i.data.file.url: null}

                    url = {i.data.url}
                    item = {i.data.items}
                    props = {this.props}
                  />
                ))}
              
              <div className="average-rating m-auto" id="avg-rating">
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
                <span class="fa fa-star fa-2x"></span>
              </div>
                            <div className="main-hero">
                            {this.state.comment.map((item,i) => {
                            return (
                              <>
                               {/* <h4 className="card-title">Top Reviews From Globe</h4> */}
                    <div className="col-12">
                     
                    <div className="card my-4 ">
                   
                        <div className="card-body">
                       

                            <h5 className="h6"> {item.comments}</h5>
                            <div className="card-info">
                                <h6 className="card-subtitle mb-2 text-muted">
                              <b>By :  </b>  {item.first_name} {item.last_name}
                                </h6>
                               
                            </div>
                             <div className="rating">
                              
                           
                            <p>{this.state.ratingValue}</p>
                  <span className="fa fa-star"></span>

                  
                 
               </div>
                           
                        </div>
                    </div>
                </div>
                </>
                )
              })}
            </div>
      
            </div>
          </Col> 
          <Col id="sidebar-wrapper">      
          </Col>
        </Row>
      <Footer/>
    </div>
    );
  }
  }
}
 
export default Disease;