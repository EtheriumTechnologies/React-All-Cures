
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendHost } from '../../api-config';
import DummyDoc from "../../assets/healthcare/img/images/defaultDoc1.png";

const DoctorsCard = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {
   
const[doctImage,setDoctImage]=useState([])
const [isDefaultImage, setIsDefaultImage] = useState(false);
   
   useEffect(() => {
   fetch(`${backendHost}/data/doctor/image`)
       .then((res) => res.json())
       .then((json) => {
         console.log('doctorrrrrrrrr',json)


        

   let matchedImageLoc = DummyDoc; 

   for (let i = 0; i < json.length; i++) {
       if (json[i].rowno == rowno && json[i].img_Loc !=null) {

         console.log('Rowno:', json[i].rowno, 'Passed Rowno:', rowno);
             matchedImageLoc = `https://ik.imagekit.io/qi0xxmh2w/productimages/tr:w-180,h-230,f-webp${json[i].img_Loc}`;
           console.log('matched', matchedImageLoc)
           break; // Break the loop once a match is found
       }

       else if(json[i].rowno == rowno && json[i].img_Loc ==null){

         matchedImageLoc = DummyDoc;
         setIsDefaultImage(true)
        }
   }

   setDoctImage(matchedImageLoc)
     
})
   
       .catch((err) => {
           console.error('Error fetching data:', err);
       });
}, []);
    return(
        <>

        <div className="item" key={rowno}>
    <div  className={`${isDefaultImage ? 'item-imgsBack' : 'item-img'}`} style={{backGroundColor:" #c6dffe"}}>
{doctImage.length>0?
  <img src={doctImage}   className={`${isDefaultImage ? 'item-imgs' : ''} `} alt="doc" />:
  <i class="fas fa-user-md fa-10x"></i>
  }
    
         
    </div>
    <div className="sider-contain">
       <div className="slider-heading">
          <h2>Dr. {firstName} {lastName}</h2>
          <p>{primary_spl}</p>
          <h5 className="text-center">{hospital_affliated} {state} {country_code}</h5>
       </div>
       <Link to={ `/profile/${rowno}-${firstName}-${lastName}` } className="appointmentBtn allBtn" id="visitDoc">Visit Profile</Link>
    </div>
 </div>
        </>
    )
}

export default DoctorsCard;
