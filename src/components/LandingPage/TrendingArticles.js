import React, { useState, useEffect } from 'react';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'

const TrendingArticles = () => {
    
        return(
        <>
            <div className="trending-articles">
                <div className="col-4 my-3">
                <Link to="/cures/yoga">
                    <div className="card d-flex justify-content-between rounded">
                        <div className="h5 text-dark">Yoga</div>
                        <div id="trending-articles-1">
                        
                            <img className="rounded-right" src="https://images.pexels.com/photos/2294353/pexels-photo-2294353.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
                           
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="col-4 my-3">
                    <Link to="/cures/Chinese">
                        <div className="card d-flex justify-content-between">
                            <div className="h5 text-dark text-center">Chinese<br/> Medicine</div>
                            <div id="trending-articles-2">
                                <img className="rounded-right" src="https://images.unsplash.com/photo-1577344718665-3e7c0c1ecf6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaXRhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-4 my-3">
                    <Link to="/cures/Ayurveda">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark">Ayurveda</div>
                        <div id="trending-articles-3">
                            <img className="rounded-right" src="https://images.unsplash.com/photo-1495461199391-8c39ab674295?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXl1cnZlZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"></img>
                        </div>
                    </div>
                    </Link>
                </div>
                
                <div className="col-4 my-3">
                    <Link to="/cures/Homeopathy">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark">Homeopathy</div>
                        <div id="trending-articles-3">
                            <img className="rounded-right" src="https://images.unsplash.com/photo-1529058993007-d6011678776d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWVvcGF0aHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"></img>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="col-4 my-3">
                    <Link to="/cures/Naturopathy">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark">Naturopathy</div>
                        <div id="trending-articles-3">
                            <img className="rounded-right" src="https://images.pexels.com/photos/161599/scent-sticks-fragrance-aromatic-161599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
                        </div>
                    </div>
                    </Link>
                </div>
                <div className="col-4 my-3">
                    <Link to="/cures/Yunani">
                    <div className="card d-flex justify-content-between">
                        <div className="h5 text-dark">Yunani</div>
                        <div id="trending-articles-3">
                            <img className="rounded-right" src="https://cdn.pixabay.com/photo/2019/11/19/10/07/olives-4636996__340.jpg"></img>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TrendingArticles