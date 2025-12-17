
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import { NavLink } from 'react-router-dom'
import ReviewForm from '../components/ReviewForm';
import api from '../api.js';
import defaultProfile from '../assets/imgs/profile.png'

const reviewPic = {
  borderRadius: "100%",
  width: "2.7em",
  height: "2.7em",
  marginRight: ".23em",
  objectFit: "cover"
}

function Reviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    api.get("management/reviews/").then(revs => {
      // console.log(revs.data)
      setReviews(revs.data)
      setLoading(false)
      let approved = revs.data.filter((rev) => {
        if (!rev.pending) {
          return rev
        }
      })
      setReviews(approved)
    }).catch(err => {
      // console.log(err)
      setLoading(false)
    })
  }, [])
  return (
    <>
    <div className="body-2">
            <Header/>
            <div className='homepage'>
                <section className="white-on-phone hero align-middle">
                    <div>
                        <h1 className='text-secondary fw-bold display-1 m-2 mt-4'>HERE ARE <br /> MAMOCHOKO <span className='roon'>REVIEWS</span></h1>
                        <p className='text-white mx-2 mt-2 fs-4'>This background image is a trophy we have received from Topmak for obtaining position one in the district for our 2024 matric 100% pass rate</p>
                    </div>
                </section>
            </div>
        </div>
    <div className='p-1 bg-light goUpBg'>
        <h1 className="roon text-center mt-5 mb-2">
          What people say
        </h1>

        <div className="container">
          <div className="row">
            {
              reviews.length > 0 ? reviews.map((review, i) => {
                return (
                  <div key={i} style={{width: "22em"}} className="col-lg-3 col-md-6 col-sm-12 my-2">
                    <div style={{border: `.15em solid rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="card">
                      <div className="card-header">
                        <h4 className="card-title">
                          <a href={review.picture ? review.picture : ""} target="_blank">
                          <img src={review.picture ? review.picture : defaultProfile} style={reviewPic} alt="" className="d-inline-block" />
                          </a>
                          ({"⭐"}{review.stars.toString().padEnd(3, ".0")}) {review.name}
                        </h4>
                      </div>
                      <div className="card-body">
                        {review.body}
                      </div>
                    </div>
                  </div>
                )
              }) : loading ? <div>
                <h1 className="text-center m-5 text-muted">Loading...</h1>
                <i className="text-center text-muted">
                  Drink some water as we fetch the reviews for you
                </i>
              </div> : <div>
                <h1 className="text-center m-5 text-muted">No reviews yet....</h1>
                <i className="text-center text-muted">
                  Feel free to post your own using the form below!
                </i>
              </div>
            }
          </div>
          <br /><br /><br />
          <ReviewForm/>

        </div>
    </div>
    </>
  )
}

export default Reviews;
