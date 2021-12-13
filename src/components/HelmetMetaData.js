import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function HelmetMetaData(props) {   
   let location = useLocation();
   let currentUrl = "https://all-cures.com" + location.pathname;
   let quote = props.quote !== undefined ? props.quote : "";
   let title = props.title !== undefined ? "All-Cures - "+props.title : "All-Cures - All in one Health App";
   let image = props.image !== undefined ? props.image : "https://all-cures.com/cures_articleimages/20211121_134401.jpg";
   let description = props.description !== undefined ? props.description  : "We are a new age healthcare technology firm who are trying make it simple and convenient for the users to get information on Cures from anywhere in the world." +"With over 20 years of experience building technology products in the healthcare segment, our team is developing an integrated platform for all your health needs." +"We are passionate about giving our users the unique experience that is both fulfilling and wholesome.";   
   let hashtag = props.hashtag !== undefined ? props.hashtag : "#allcures";
   return ( <Helmet>
     <title>{title}</title>
     <meta charset="utf-8" />
     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
     <meta name="csrf_token" content="" />
     <meta property="type" content="website" />
     <meta property="url" content={currentUrl} />
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
     <meta name="msapplication-TileColor" content="#ffffff" />
     <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
     <meta name="theme-color" content="#ffffff" />
     <meta name="_token" content="" />
     <meta name="robots" content="noodp" />
     <meta property="title" content={title} />
     <meta property="quote" content={quote} />
     <meta name="description" content={description} />
     <meta property="image" content={image} />
     <meta property="og:locale" content="en_US" />
     <meta property="og:type" content="website" />
     <meta property="og:title" content={title} />
     <meta property="og:quote" content={quote} />
     <meta property="og:hashtag" content={hashtag} />
     <meta property="og:image" content={image} />
     <meta content="image/*" property="og:image:type" />
     <meta property="og:url" content={currentUrl} />
     <meta property="og:site_name" content="AllCures" />
     <meta property="og:description" content={description} />    
    </Helmet>
    );
}