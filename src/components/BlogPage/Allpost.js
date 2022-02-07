import React from 'react';
import { Link } from 'react-router-dom';
import CenterWell from '../Disease/CenterWell';
import Date from '../Date'

const AllPost = ({id, title, content, rowno, f_title, w_title, country, type, published_date, over_allrating, imgLocation, authorName}) => {
    function IsJsonValid(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return [];
        }
        return JSON.parse(str).blocks;
    }
    var previewContent = []
    if(content){
        previewContent = IsJsonValid(content)
    }
    var imageLoc = '';
    if(imgLocation && imgLocation.includes('cures_articleimages')){
        imageLoc = `https://all-cures.com:444/`+imgLocation.replace('json', 'png').split('/webapps/')[1]
    } else {
        imageLoc = 'https://all-cures.com:444/cures_articleimages//299/default.png'
    }

    var articleTitle = title
    var regex = new RegExp(' ', 'g');
    // var regexDr = new RegExp('Dr. ', 'g');

    //replace via regex
    articleTitle = articleTitle.replace(regex, '-');

    // var authorLinkName = authorName
    // authorLinkName = authorLinkName.replace(regex, '-');
    // authorLinkName = authorLinkName.replace(regexDr, '');
    return (
            <>
            <div key={id.toString()} className="d-flex cures-search-tab w-100 card mb-5">
                <div className='col-md-3 cures-tab-img rounded px-0'>
                        <img src={`${imageLoc}`} alt={articleTitle}/>
                                {/* {
                                    over_allrating !== 0?
                                    <div className='checked'id="starMob"><span class="fa fa-star checked mr-1"></span>{Math.round(over_allrating * 10) / 10}</div>
                                    : null
                                } */}
                                </div>
                <div className='col-md-9 mb-2'>
                    {/* <div className="card-body"> */}
                            {/* <div className='col-md-3'></div> */}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    <Link to={ `/cure/${id}-${articleTitle}` }  className="d-flex justify-content-between align-items-center">
                                        <div className="card-title h5 text-capitalize">{title.toLowerCase()}</div>
                                    </Link>
                                </div>
                                {
                                    over_allrating !== 0?
                                    <div className='checked'id="starWeb"><span class="fa fa-star checked mr-1"></span>{Math.round(over_allrating * 10) / 10}</div>
                                    : null
                                }
                                
                            </div>
                        
                        <div className="card-info">
                            <div className="card-subtitle text-muted text-capitalize">{w_title.toLowerCase()}</div>
                            <div className='card-article-content-preview'>
                            {
                                    previewContent && previewContent !== undefined?
                                    previewContent.map((j, idx) => idx<1 && (
                                        <CenterWell
                                            key={idx}
                                            content = {j.data.content}
                                            type = {j.type}
                                            text = {j.data.text.substr(0, 250)+'...'}
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
                        <div className="text-left mt-2 text-muted" id="publish-date">
                        {
                                    authorName !== "All Cures Team"?
                                    <Link to={`/profile/${rowno}`}>{authorName}</Link> 
                                    : authorName
                                }{" "} 
                                ▪️ {<Date dateString={published_date} />}</div>
                        </div>
                        <div className='cures-tab-chips'>
                                {
                                type.includes('1') || type === '1'?
                                    <div className="chip overview">Overview</div>
                                : null
                                //     <div className="chip cure">Cures</div>
                                // : type === '3'?
                                //     <div className="chip symptoms">Symptoms</div>
                                // : null
                            }
                            {
                                type.includes('2') || type === '2'?
                                    <div className="chip cure">Cure</div>
                                    : null
                            }
                            {
                                type.includes('3') || type === '3'?
                                <div className="chip symptoms">Symptoms</div>
                                    : null
                            }
                            {   
                                country !== 0?
                                    country === 9?
                                        <div className ="chip country ml-2 color-white">India</div>
                                        : country === 10?
                                            <div className="chip country ml-2 color-white">Iran</div>
                                            :   country === 11?
                                            <div className="chip country ml-2 color-white">China</div>
                                            :   country === 12?
                                            <div className="chip country ml-2 color-white">Japan</div>
                                            : country === 14?
                                            <div className="chip country ml-2 color-white">Netherland</div>
                                            :   country === 13?
                                            <div className="chip country ml-2 color-white">Greece</div>
                                            : null
                                        : null
                            }
                            </div>
                    {/* </div> */}
                </div>
            </div>
            </>
        )    

}
export default AllPost;