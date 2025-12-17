
import React, { useState } from 'react'
import api from '../../api'

function AnnouncementForm({action}) {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(false)

    const [editId, setEditId] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
           if (action === 'Post') {
                const res = await api.post('management/announcements/', {title, body})
                if (res.status === 201) {
                    setBody('')
                    setTitle('')
                    alert('Successfully posted announcement!')
                    window.location.reload()
                } else {
                    throw new Error(`Something went wrong`)
                }
           } else if (editId !== null) {
                const res = await api.put('management/announcements/'.concat(editId, "/"), {title, body})
                console.log(res)
           }
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
        <h3 className='roon'>{action} announcement</h3>
        <form encType='multipart/form-data' onSubmit={handleSubmit} method='post'>
            <div className="form-group mb-2">
                <input required value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" className="form-control mb-2"
                        name='name'
                        placeholder='Title.....' />
                <textarea required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='Announcement body...'
                    name="body" id="body"
                    className="form-control mb-1"
                    rows={10}></textarea>
                
            </div>

            {/* <div className="form-group mb-5 border bg-white p-3 rounded-5">
                <label htmlFor="resource">Click to selelect resource</label>
                <input required type="file" onChange={(e) => setDocument(e.target.files[0])} name="resource" id="resource" />
            </div> */}

            {
                loading ? <input type="button" disabled value={`${action}ing...`} className='btn btn-primary col-12' />
                    : <input type="submit" className='btn btn-primary col-12' value={action} />
            }
        </form>
    </div>

  )
}

export default AnnouncementForm;