
import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard';
import { Link } from 'react-router-dom';
// import reviews from '../../data/reviews';
import ReviewForm from './ReviewForm';
import api from '../api.js'
import defaultPP from '../assets/imgs/profile.png'

const HomeTabs = () => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.get('management/reviews/')
            .then(revs => {
                setReviews(revs.data)
                setLoading(false)
                let approved = revs.data.filter((review, index) => {
                    if (!review.pending) {
                        return review
                    }
                })
                setReviews(approved)
            })
            .catch(err => {
                setLoading(false)
                alert(err)
            })
    }, [])
    
  return (
    <div>
        <section className="mission-vission scronimate">
            <h1 className='text-center m-2 mt-2 display-3 roon'>Mission & Vission</h1>
            <div className="row m-3">
                <div className="col rounded-2 border p-3 mb-2 shadow border" style={{marginRight: "1em"}}>
                    <h2 className='dark-roon'>Mission</h2>
                    <p>Motivate staff and members on a continuous basis in order to promote the spirit of <span className="roon">learning and teaching</span> to produce high quality education.</p>
                </div>
                <div className="col rounded-2 border p-3 shadow border">
                    <h2 className='dark-roon'>Vision</h2>
                    <p>To equipt our learners with <span className="roon">high quality education</span> that will provide them with <span className="roon">skills, knowledge and values</span> necessary to produce marketable citizens.</p>
                </div>
            </div>
        </section>
        <div className='row m-3'>
            <section className='resources scronimate col-lg-5 shadow border m-1 p-4 rounded-3'>
                <div className="row w-75">
                    <h1 className='dark-roon'>Resources</h1>
                    <p>Get access to academic resources to help you excel in your studies</p>
                    <Link className={"row"} style={{textDecoration: "none"}} to={"/resources"}>
                        <div className="col-6 p-3">
                            Previous question Papers
                            {/* <i className="fas fa-book"></i> */}
                        </div>
                        <div className="col-6 p-3">
                            Study Guides
                            <i className="fas fa-book me-2"></i>
                        </div>
                        <div className="col-6 p-3">
                            Notes
                            <i className="fas fa-book me-2"></i>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="moments scronimate col-lg-5 container shadow border rounded-3 m-1 p-3">
                <h1 className='dark-roon'>Moments</h1>
                <p>For the past {Number(new Date().getFullYear()) - 2016} years, we have been fully commited to become <span className="roon">the best school</span> we can be.</p>
                <p>Explore our <span className="roon fw-bold">moments - achievements, activities, programs - </span> to see how we have been keeping that promise!</p>
                <Link to={"/moments"}><button id='go' className="btn btn-primary ml-5 btn-lg">GO! 👉</button></Link>
            </section>
        </div>

        <br />
        <div className="reviews">
            <h1 className='text-center display-3 roon my-5 scronimate'>Reviews <br /> Ba re eng ka rena?!!</h1> <br />

            <div style={{whiteSpace: 'nowrap', overflowX: 'auto'}} className="review-boxes flex-direction-column justify-content-center align-middle m-2">
                {
                    reviews.length > 0 ? reviews.slice(0,3).map((review, index) => {
                        // {console.log(review)}
                        return <ReviewCard key={index} review={review} admin={false}/>
                    }) 

                        : loading ? <h1 className='text-center text-muted m-5'>LOADING...</h1> : <h1 className='text-center text-muted m-5'>NO REVIEWS <br /> <span className="fs-6">Feel free to <a href="#reviewForm">submit your own review</a></span></h1>
                }
            </div>
            <h6 className="text-primary text-center">
                <Link to="/reviews">See more reviews</Link>
            </h6>
        

           <br /><br />
            {/* Change method to post when you integrate backend */}
            <div id='reviewForm' className='row m-2'>
                <ReviewForm/>
                <div className="col-lg-5 see-about scronimate-right">
                    <h2 className='display-1'>See more about us!!!</h2>
                    <button className="btn btn-primary btn-lg"><a href={"/about"} className={"text-white text-decoration-none"}>Let's Go!!👉</a></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeTabs;
