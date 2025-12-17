
import { useEffect, useState, useRef } from 'react';
import ReviewCard from '../../../components/ReviewCard'
import { NavLink } from 'react-router-dom';
import ReviewForm from '../../../components/ReviewForm';
import api from '../../../api.js'
import defaultPP from '../../../assets/imgs/profile.png'

const reviewPic = {
  borderRadius: "100%",
  width: "2.7em",
  height: "2.7em",
  marginRight: ".23em",
  objectFit: "cover"
}



const ReviewsAdmin = () => {
    const [showForm, setShowForm] = useState(false)
    const [btnText, setText] = useState("Add Review")
    const [btnIcon, setIcon] = useState("plus")

    const [approving, setApproving] = useState(false)
    const [approvingID, setApprovingID] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [deletingID, setDeletingID] = useState(null)
    const [fetching, setFetching] = useState(false)

    const [reviews, setReviews] = useState([])
    const [pendingReviews, setPendingReviews] = useState([])
    const [approved, setApproved] = useState([])

    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState([])

        const [name, setName] = useState("")
        const [pic, setPic] = useState(null)
        const [body, setBody] = useState("")
        const [stars, setStars] = useState("")
        const [loading, setLoading] = useState(false)
        const [pending, setPending] = useState(true)
    
        const form = useRef(null);
    
        const handleSubmit = async(e) => {
            e.preventDefault()
            setLoading(true)
    
            const formData = new FormData()
            formData.append('picture', pic);
            formData.append('name', name);
            formData.append('stars', Number.parseInt(stars));
            formData.append('body', body);
            formData.append('pending', pending.toString());
    
            
            try{
                const res = await api.post('management/reviews/', formData)
                // console.log(res)
                if (res.status === 201) {
                    alert("Thank you for taking the time to share your opinion about us. It is now pending for approval. You may see in the reviews page after a few days, ".concat(name, "!"))
                    setName("")
                    setBody("")
                    setStars("")
                    setPic(null)
                    fetchReviews()
                } else {
                    alert("Your review could not be submitted. Please try again later.")
                }
            } catch (err) {
                setLoading(false)
                alert(err.message)
                console.log(err)
            } finally {
                setLoading(false)
            }
    
        }
    

    useEffect(() => {
        if (search.split(' ').join('').length > 0) {
        let theNewRevs = reviews.filter((review) => {
            if (
                review.name.toLowerCase().includes(search.toLowerCase()) || 
                review.body.toLowerCase().includes(search.toLowerCase())
            )
            {
            return review
            }
        })
        // console.log(theNewusers)
        setSearched(theNewRevs);
    } else {
        setSearched([]);
    }
    }, [search])

    const admin = true; // this is very important variable


    const fetchReviews = () => {
        setFetching(true)
        api.get("management/reviews/")
            .then(revs => {
                // console.log(revs.data)
                setReviews(revs.data)
                setPendingReviews([])
                setApproved([])
                revs.data.map((review) => {
                    if (review.pending){
                        setPendingReviews(prev => [...prev, review])
                        // console.log(pendingReviews)
                    } else {
                        setApproved(prev => [...prev, review])
                        // console.log(approved)
                    }
                })
                setFetching(false)
                
            })
            .catch(err => {
                setFetching(false)
                // console.log(err)
                alert(err.message)
            })
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const handleForm = () => {
        setShowForm(p => !p)
        if (!showForm) {
            setText("Hide Form");
            setIcon("close")
        } else {
            setText("Add Review");
            setIcon("plus")
        }
    }

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
                      fetchReviews()
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
                    //   document.location.reload()
                    fetchReviews()
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
    <div>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/reviews"}>Reviews  {">"}</NavLink>
            </nav>
        </div>
        <div className='m-3'>
            <h4 className='text-dark fs-3'>Reviews {search.split(' ').join('') && <span><span className="text-warning">'{search.length > 15 ? `${search.slice(0, 15)}...` : search}'</span></span>}</h4>
            <button onClick={() => handleForm()} className="btn btn-secondary rounded-5">
                <i className={`fas fa-${btnIcon} me-2`}></i> {btnText}
            </button>
        </div>

        {
            showForm && <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
            <h3 className='roon'>Submit your own review</h3>
            <form ref={form} encType='multipart/form-data' onSubmit={handleSubmit} method='post'>
                <div className="form-group mb-2">
                    <textarea required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='What is your opinion about us?!'
                        name="review" id="review"
                        className="form-control mb-1"
                        rows={5}></textarea>
                    <input required value={name}
                           onChange={(e) => setName(e.target.value)}
                           type="text" className="form-control"
                           name='name'
                           placeholder='Enter your name.....' />
                </div>

                <div className="form-control mb-2">
                    {/* <center>
                        <p className="m-3">
                            <i name="1" className="fas fa-star me-4 fs-1"></i>
                            <i name="2" className="fas fa-star me-4 fs-1"></i>
                            <i name="3" className="fas fa-star me-4 fs-1"></i>
                            <i name="4" className="fas fa-star me-4 fs-1"></i>
                            <i name="5" className="fas fa-star me-4 fs-1"></i>
                        </p>
                    </center> */}
                    <input required type="number" min={1} max={5} value={stars} onChange={(e) => setStars(e.target.value)} placeholder='rate out of 5...' className="form-control" />
                </div>

                <div className="form-group mb-5 border bg-white p-3 rounded-5">
                    <label htmlFor="profile-pic">Select Profile Pic</label>
                    <input required accept='image/*' type="file" onChange={(e) => setPic(e.target.files[0])} name="profile-pic" id="profile-pic" />
                </div>

                {
                    loading ? <input type="button" disabled value={"submitting..."} className='btn btn-primary' />
                        : <input type="submit" className='btn btn-primary' />
                }
            </form>
        </div>
        }

        <div className='col-lg-4 col-md-4 col-sm-8 d-flex justify-self-center m-1'>
            <input type="search"
                name="search" 
                id="search" 
                placeholder='search review, name...' 
                className=' form-control rounded-5'
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {
            search.split(' ').join('').length > 0 &&    <div className="m-2">
                                                            <p className='mx-2 fw-bold roon'>SEARCHED ({searched.length})</p>
                                                            {
                                                                searched.length > 0 ? searched.map((review, index) => {
                                                                    return (
                                                                            <div key={index} style={{whiteSpace: "normal", display: "inline-block"}}>
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
                                                                })
                                                                : <h1 className="text-center text-muted display-3 fw-bold">'<span className="text-warning">{search.length > 10 ? `${search.slice(0, 10)}...` : search}</span>' NOT FOUND</h1>
                                                            }
                                                            <hr />
                                                        </div>
        }

        <div className="m-2">
            <p className='mx-2 fw-bold'>PENDING ({pendingReviews.length})</p>
            {
                pendingReviews.length > 0 ? pendingReviews.map((review, index) => {
                    return (
                        review.pending && 
                                        <div key={index} style={{whiteSpace: "normal", display: "inline-block"}}>
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
                })
                : fetching ? <h1 className="text-center text-muted display-3 fw-bold">LOADING...</h1> : <h1 className="text-center text-muted display-3 fw-bold">NO <span className="text-warning">PENDING</span> REVIEWS</h1>
            }

            <hr className="my-3" />

            <p className='mx-2 text-success fw-bold'>APPROVED ({approved.length})</p>
            {
                approved.length > 0 ? approved.map((review, index) => {
                    return (
                        !review.pending && 
                                        <div key={index} style={{whiteSpace: "normal", display: "inline-block"}}>
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
                })
                : fetching  ? <h1 className="text-center text-muted display-3 fw-bold">LOADING...</h1> : <h1 className="text-center text-muted display-3 fw-bold">NO <span className="text-success">APPROVED</span> REVIEWS</h1>
            }
        </div>
    </div>
  )
}

export default ReviewsAdmin;
