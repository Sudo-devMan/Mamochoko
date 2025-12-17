
import React, { useRef, useState } from 'react'
import api from '../api.js'

function ReviewForm() {
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

  return (
        <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
            <h3 className='roon'>Submit your own review</h3>
            <p className="text-muted">*PLEASE ENSURE THAT YOU SEND VALID INFORMATION</p>
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
  )
}

export default ReviewForm;