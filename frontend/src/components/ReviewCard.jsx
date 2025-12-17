
import defaultProfile from '../assets/imgs/profile.png'
import api from '../api.js'
import { useState } from 'react'

const reviewPic = {
  borderRadius: "100%",
  width: "2.7em",
  height: "2.7em",
  marginRight: ".23em",
  objectFit: "cover"
}

const ReviewCard = ({review, admin}) => {
  const [approving, setApproving] = useState(false)
  const [approvingID, setApprovingID] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deletingID, setDeletingID] = useState(null)

  const deleteReview = async (id) => {
      setDeleting(true)
      setDeletingID(id)
      try{
          const by = await api.get(`management/reviews/${id}/`)
          let isSure = prompt("Type 'yes' to delete the review by " + by.data.name)
          if (!isSure) isSure = "no";
          if (isSure.toLowerCase() === 'yes') {
              const res = await api.delete(`management/reviews/${id}/`)
              if (res.status === 204) {
                  alert(`Successfully deleted review by ${by.data.name}`)
                  document.location.reload()
              } else {
                  // console.log(res)
                  alert("Failed to delete the review by ".concat(by.data.name, ". Please try again later."))
              }

          } else {
              alert("Review by " + by.data.name + " was not deleted because you did not type 'yes'")
              setDeleting(false)
              setDeletingID(null)
          }
      } catch (err) {
          alert(err.message)
          // console.log(err)
      } finally {
          setDeleting(false)
          setDeletingID(null)
      }
  }

  const approveReview = async (id) => {
      setApproving(true)
      setApprovingID(id)
      try {
          const by = await api.get(`management/reviews/${id}/`)
          let isSure = prompt("Type 'yes' to APPROVE the review by " + by.data.name)
          if (!isSure) isSure = "no";
          if (isSure.toLowerCase() === 'yes'){
              const res = await api.put(`management/reviews/${id}/approve/`, {
                  pending: false,
                  name: by.data.name,
                  body: by.data.body
              })
              if (res.status === 200) {
                  setApproving(false)
                  setApprovingID(null)
                  alert("Successfully approved the review by ".concat(by.data.name))
                  document.location.reload()
              } else {
                  alert("Could not approve review by ".concat(by.data.name, ". Please try again later."))
              }
          } else {
              alert("Review was not approved because you did not type 'yes'")
          }
      } catch (err) {
          alert(err)
          // console.log(err)
      } finally {
          setApproving(false)
          setApprovingID(null)
      }
  }

  return (
    <div style={{whiteSpace: "normal", display: "inline-block"}}>
    <div style={{width: "22em"}} className="col-lg-3 col-md-6 col-sm-12 my-2 mx-1">
      <div style={{border: `.15em solid rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="card">
        <div className="card-header">
          <h4 className="card-title">
            <a href={review.picture ? review.picture : ""} target="_blank">
            <img src={review.picture ? review.picture : defaultProfile} style={reviewPic} alt="" className="d-inline-block" />
            </a>
            ({"⭐"}{String(review.stars).padEnd(3, ".0")}) {review.name}
          </h4>
        </div>
        <div className="card-body">
          {review.body}
        </div>
        {
          admin  && <div className="card-footer">
                      {
                        review.pending ? approving && approvingID == review.id ? <button onClick={() => approveReview(review.id)} disabled className="btn btn-success" style={{marginRight: ".1em"}}>...</button>
                            : <button onClick={() => approveReview(review.id)} className="btn btn-success" style={{marginRight: ".1em"}}>
                                <i className="fas fa-check"></i>
                              </button> : <i className="fas-fa-check"></i>
                      }
                      {
                        deleting && deletingID == review.id ? <button className='btn btn-danger' onClick={() => deleteReview(review.id)} disabled>...</button>
                            : <button className='btn btn-danger' onClick={() => deleteReview(review.id)}>
                                <i className="fas fa-trash"></i>
                              </button>
                      }
                      {
                        !review.pending && <p className="btn btn-default"><i className="fas fa-check"></i> Approved {review.approved_by !== null && <span>by {review.approved_by.username}</span>}</p>
                      }
                    </div>
        }
      </div>
    </div>
    </div>
  )
}

export default ReviewCard;
