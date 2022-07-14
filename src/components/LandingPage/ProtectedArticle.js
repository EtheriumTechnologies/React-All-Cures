import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import CenterWell from '../Disease/CenterWell'
import Heart from"../../assets/img/heart.png";
import Date from '../Date'
import OwlCarousel from "react-owl-carousel";
import logo from './logo.png';
import Vector from './Vector.svg'
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core"

const options = {
   margin: 30,
   responsiveClass: true,
   nav: true,
   loop: false,
   dots: true,
   smartSpeed: 1000,
   singleItem: true,
   items:1,
   responsive: {
       0: {
           items: 1,
       },
       400: {
           items: 1,
       },
       600: {
           items: 2,
       },
       700: {
           items: 2,
       },
       1000: {
           items: 3,

       }
   },
};


const ArticlePreview = (props) => {
    const [items, setItems] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [articleFilter, setArticleFilter]= useState(props.dcName? props.dcName: 'recent')
    
    function diseasePosts(type){                     // For specific blogs like "/blogs/diabetes"
        // if(type){
          fetch(`${backendHost}/isearch/${type}`)
          .then((res) => res.json())
          .then((json) => {
            setLoaded(true)
            setItems(json)
          })
          .catch(err => null)
      }

    function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkvprotected`)
          .then((res) => res.json())
          .then((json) => {
            var temp = []
            json.forEach(i => {
                temp.push(i)
            });
            setItems(temp)
            setLoaded(true)
        })
          .catch(err => null)
    }


    function IsJsonValid(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return [];
        }
        return JSON.parse(str).blocks;
    }

    useEffect(() => {
        allPosts()
    }, [])

    if(!isLoaded){
        return (
            <div className="loader my-4">
                <img src={Heart} alt="All Cures Logo" id="heart"/>
            </div>
        );
    }
    else {
        return(
        <>
        <div className="container">
        
            <div className="row" marginBottom={10}>
            <div className="main-hero" id="main-hero">
            <OwlCarousel {...options} nav="true" id="featured" height={550} items={1} singleItem={true} margin={10}>
                {
                    items.length !== 0?
                    items.filter((i, idx) => idx < 9).map((i) => {
                    var content = []
                    var imgLocation = i.content_location
                    var imageLoc = '';
                    if(i.content){
                        content = IsJsonValid(decodeURIComponent(i.content))
                    }
                    if(imgLocation && imgLocation.includes('cures_articleimages')){
                        imageLoc = `https://all-cures.com:444/`+imgLocation.replace('json', 'png').split('/webapps/')[1]
                    } else {
                        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
                    }

                    var title = i.title
                    var regex = new RegExp(' ', 'g');

                    //replace via regex
                    title = title.replace(regex, '-');
                    return(
                    <div className="col-4">
                    <div className="card my-2 w-100">
                        <div className=''>
                            
                        <div className='bg-text row wrap' style={{top:50,height:100,width:100,justifyContent:'center',alignItems:'center',}}>  <img src = {Vector}  alt='ddd'/>
                       <div style={{flex:1,flexDirection:'column',alignContent:'space-between',alignItems:'center',justifyContent:'center'}}>
                       <text>Premium</text>
                       <text>Content</text>
                       </div><br/><br/>
                       
                       <button classname="btn btn-default">View Plans</button>

                                </div>
                              
                             <div className='mainid' style={{backgroundImage:`url(${imageLoc})` ,height:200,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
                             
 
                             </div>

                            {/* <img src ={imageLoc} className="mainid"/> */}
                            </div>
                        <div className="card-body">
                            <h6 className='pb-2 text-muted'>


                                {
                                    i.authors_name !== "All Cures Team"?
                                    <Link to={`/profile/${i.rowno}`}>{i.authors_name}</Link> 
                                    : i.authors_name
                                }{" "}▪️ {<Date dateString={i.published_date} />}</h6>
                            <h5 className="card-title text-capitalize"><Link to={`/cure/${i.article_id}-${title}`}>{i.title.toLowerCase()}</Link></h5>
                            <div className="card-info">
                                {/* <h6 className="card-subtitle mb-2 text-muted text-capitalize">
                                    {i.window_title.toLowerCase()}
                                </h6> */}
                                
                                <div className="card-text card-article-content-preview">
                                    {
                                        content?
                                            content.map((j, idx) => idx<1 && (
                                                <CenterWell
                                                    content = {j.data.content}
                                                    type = {j.type}
                                                    text = {j.data.text.substr(0, 250) + '....'}
                                                    title = {j.data.title}
                                                    message = {j.data.message}
                                                    source = {j.data.source}
                                                    embed = {j.data.embed}
                                                    caption = {j.data.caption}
                                                    alignment = {j.data.alignment}
                                                    imageUrl = {j.data.file? j.data.file.url: null}
                                                    url = {j.data.url}
                                                />
                                            ))
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                
                // : null
                
                ): null
            }</OwlCarousel>
            </div>
            </div>
           
            </div>
        </>
    )
}
}

export default ArticlePreview