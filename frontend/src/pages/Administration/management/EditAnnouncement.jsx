
import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { Link, useParams, NavLink } from 'react-router-dom'
import { USER } from '../../../constants'

function EditAnnouncement() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [a, setA] = useState(null)
    const action = 'Update'
    const {id} = useParams()

    const user = JSON.parse(localStorage.getItem(USER))

    useEffect(() => {getAnnouncement()}, [])

    const getAnnouncement = async() => {
        setFetching(true)
        try {
            const res = await api.get('management/announcements/'.concat(id, '/'))
            setTitle(res.data.title)
            setBody(res.data.body)
            setA(res.data)
            // console.log("Fetched for updating bruh: ",res)
        } catch (err) {
            alert(err.message)
        } finally {
            setFetching(false)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.put('management/announcements/'.concat(id, '/'), {title, body})
            // console.log(res)
            if (res.status === 200) {
                alert("Successfully updated announcement!")
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    !fetching && a !== null && a.user.username === user.username && a.user.id === user.id ? <>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/announcements"}>Announcements  {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"#"}>Edit  {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"#"}>{title.slice(0, 20)}...  {">"}</NavLink>
            </nav>
        </div>
        <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
            <h3 className='roon'>{action} announcement</h3>
            { !fetching ?
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
                        loading ? <input type="button" disabled value={`Updating...`} className='btn btn-primary col-12' />
                            : <input type="submit" className='btn btn-primary col-12' value={action} />
                    }
                </form>
                : <h1 className="text-muted fw-bold text-center m-3">LOADING...</h1>
            }
            <Link to={'/admin/announcements'}>
                <button className='btn btn-secondary mt-2 col-12'><i className="fas fa-arrow-left"></i>Back</button>
            </Link>
        </div>
    </> : a !== null && a.user.id !== user.id ? <p>YOU AIN'T SUPPOSED TO BE HERE</p> : <p>(clears throat)</p>
  )
}

export default EditAnnouncement;