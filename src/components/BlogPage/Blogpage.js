import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
// import EditModal from './EditModal'
import AllPost from './Allpost.js';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default class Blogpage extends Component{

    constructor(props) {
        super(props);
        const params = props.match.params
        this.state = { 
          limit: 250,
          dc: props.location.search.split('&')[1],
          param: params,
          items: [],
          isLoaded: false,
          regionPostsLoaded: false,
          articleFilter: 'Recent',
          country: new URLSearchParams(this.props.location.search).get('c'),
          diseaseCondition: new URLSearchParams(this.props.location.search).get('dc'),
          articleFilter: 'recent'
        };
        const options = {
          margin: 1,
          responsiveClass: true,
          nav: true,
          dots: false,
          autoplay: false,
          smartSpeed: 1000,
          // responsive: {
          //     0: {
          //         items: 1,
          //     },
          //     150: {
          //         items: 2,
          //     },
          //     300: {
          //         items: 2,
          //     },
          //     450: {
          //         items: 3,
          //     },
          //     600: {
          //         items: 5,
          //     },
          //     750: {
          //         items: 6,
          //     },
          //     900: {
          //         items: 7,
          //     }
          // },
       };
      }

      allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
              if(this.state.articleFilter === 'recent'){
                
                json.forEach(i => {
                    if(i.pubstatus_id === 3){
                        temp.push(i)
                    }
                });
                this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'earliest'){
                  json.forEach(i => {
                      if(i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp.reverse()})
              } else if(this.state.articleFilter === 'diabetes'){
                  json.forEach(i => {
                      if(i.dc_name === 'Diabetes' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'neurology'){
                  json.forEach(i => {
                      if(i.dc_name === 'Neurology' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'arthritis'){
                  json.forEach(i => {
                      if(i.dc_name === 'Arthritis' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              } else if(this.state.articleFilter === 'anemia'){
                  json.forEach(i => {
                      if(i.dc_name === 'Anemia' && i.pubstatus_id === 3){
                          temp.push(i)
                      }
                  });
                  this.setState({isLoaded: true, items: temp})
              }
          })
          .catch(err => console.log(err))
      }
      
      diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              isLoaded: true,
              items: json,
            });
          })
          .catch(err => console.log(err))
        // }
      }

      regionalPosts(){
        fetch(`${backendHost}/isearch/treatmentregions/${this.state.dc.split('=')[1]}`)       // /isearch/treatmentregions/${this.state.diseaseCondition}
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            regionPostsLoaded: true,
            items: json.reverse(),
          });
        })
        .catch(err => console.log(err))
      }

      // handleScroll = () => {
      //   const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
      //   if (bottom) {
      //     console.log('inside', bottom)
      //     this.setState({
      //       limit: this.state.limit + 25
      //     }, () => this.allPosts());
      //   }
      // };
      // React.useEffect(() => {
        
      // }, []);

      articleFilterClick(e, filter) {
        this.setState({articleFilter: filter})
        var siblings = e.target.parentNode.parentElement.children
        if(siblings){
            for(var i=0;i<siblings.length; i++){
                if(siblings[i].className =='active'){
                    siblings[i].classList.remove('active')
                }
              }
            e.target.parentElement.classList.add('active')
        }
    }

      componentDidMount() {
        // if(this.props.match.params.type === undefined){
        //   this.allPosts()
        // }
        console.log(this.props.match.params.type)
        if(this.props.match.params.type !== undefined){
          this.diseasePosts(this.props.match.params.type)
        } else if(this.props.location.search){
          this.regionalPosts()
        } else {
          this.allPosts()
        }
      }

      componentDidUpdate(prevProps, prevState){
        if ( prevProps.match.params.type !== this.props.match.params.type ){
          if(this.props.match.params.type){
            this.diseasePosts(this.props.match.params.type)
          } else {
            this.allPosts()
          } 
        }
      }
      
    render(){
        var { isLoaded, items, regionPostsLoaded } = this.state;
        if(!isLoaded && !regionPostsLoaded) {
        return (
        <>
          <Header history={this.props.history}/>
            <div className="loader my-4">
              <i className="fa fa-spinner fa-spin fa-6x" />
            </div>
          <Footer/>
        </>  
      );
    } else if(isLoaded){
        return(
            <>
            <Header history={this.props.history}/>
            
                <div className="container cures-search my-4">
                  {
                    this.props.match.params.type?
                    <div className="h3 text-capitalize text-center font-weight-bold mb-4">Cures Related to "{this.props.match.params.type.toLowerCase()}"</div>
                    :<div class="tab-nav">
                    <div class="comman-heading">
                       <div class="h3 mb-4 text-capitalize mr-5">
                          {this.state.articleFilter} Cures
                       </div>
                    </div>
                    <ul>
                    <OwlCarousel className="owl-theme owl-loading" loop {...this.options}>
                    
                       <li role="presentation" >
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'recent'}, () => {
                            this.allPosts()
                            this.articleFilterClick(e, 'recent')
                            })}>Recent</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'earliest'}, () => {
                            this.allPosts()
                            this.articleFilterClick(e, 'earliest')
                            })}>Earliest</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'diabetes'}, () => {
                            this.diseasePosts('diabetes')
                            this.articleFilterClick(e, 'diabetes')
                            })}>Diabetes</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'arthritis'}, () => {
                            this.diseasePosts('arthritis')
                            this.articleFilterClick(e, 'arthritis')
                            })}>Arthritis</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'thyroid'}, () => {
                            this.diseasePosts('thyroid')
                            this.articleFilterClick(e, 'thyroid')
                            })}>Thyroid</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'insomnia'}, () => {
                            this.diseasePosts('insomnia')
                            this.articleFilterClick(e, 'insomnia')
                            })}>Insomnia</button>
                       </li>
                       <li role="presentation">
                          <button className="btn mr-2" 
                          onClick={(e) => this.setState({ articleFilter: 'Blood Pressure'}, () => {
                            this.diseasePosts('Blood Pressure')
                            this.articleFilterClick(e, 'Blood Pressure')
                            })}>Blood Pressure</button>
                       </li>
                       {/* <li role="presentation">
                          <button className="btn" onClick={(e) => articleFilterClick(e, 'recent')}>Most Rated</button>
                       </li> */}
                    
                    </OwlCarousel>
                    </ul>
                 </div>
                  }
                  {
                    items.length === 0 && this.state.articleFilter !== 'recent'?
                    <div className='my-5 py-4 h5 container text-center'>We do not have any cures for this condition yet but our editorial team is working on it. In the meantime, if you have a cure, Please <Link to="/article">Click Here</Link> to add the cure to our site.</div>: null
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      i.pubstatus_id === 3 ?            // Selects articles with publish status = 3 (Published)
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            country = {i.country_id}
                            content = {decodeURIComponent(i.content? i.content.includes('%22%7D%7D%5D%7D')?
                            i.content: i.content.replaceAll('%7D', '%22%7D%7D%5D%7D')
                            : null)}
                            type = {i.type}
                            imgLocation = {i.content_location}
                            published_date = {i.published_date}
                            key = {i.article_id}
                            over_allrating={i.over_allrating}
                            allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    {/* <button className="white-button-shadow btn w-100" 
                    onClick={() => {
                      this.setState({
                        limit: this.state.limit+25
                      }, () => this.allPosts())
                    }}>Show more</button> */}
                    </div>
                </div>
            <Footer/>
            </>
        );
    } else if(regionPostsLoaded){
      return(
        <>
            <Header history={this.props.history}/>
            
                <div className="container my-4">
                  {
                    this.state.param.type?
                    <h1 className="h2 text-center">Cures related to "{this.state.param.type}"</h1>
                    :<h1 className="h2 text-center">All Cures</h1>
                  }
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                      parseInt(i.country_id) === parseInt(this.state.country) ?            // Selects articles according to country required
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            key = {i.article_id}
                            // f_title = {i.friendly_name}
                            // w_title = {i.window_title}
                            // allPostsContent={() => this.allPosts()}
                        />
                        : null
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
      );
    }
}
}