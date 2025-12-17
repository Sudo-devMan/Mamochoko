
import { useParams, Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import api from "../../../api";
import { useState, useEffect } from "react";
import { fixDate } from "../../../utils";
import { profile } from "../../../components/Admin/AnnouncementCard";
import { USER } from "../../../constants";

function AnnouncementDetail() {
    const [announcement, setAnnouncement] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const user = JSON.parse(localStorage.getItem(USER))
    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        fetchAnnouncement()
    }, [])

    const fetchAnnouncement = async() => {
        setLoading(true)
        try {
            const res = await api.get(`management/announcements/${id}/`)
            setAnnouncement(res.data)
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteAnnouncement = async (id) => {
        setDeleting(true)
        try{
            const by = await api.get(`management/announcements/${id}/`)
            let isSure = prompt("Type 'yes' to delete the announcement: ".concat(by.data.title))
            if (!isSure) isSure = "no";
            if (isSure.toLowerCase() === 'yes') {
                const res = await api.delete(`management/announcements/${id}/`)
                if (res.status === 204) {
                    setDeleting(false)
                    alert(`Successfully deleted Announcement: ${by.data.title}`)
                    navigate('/admin/announcements')
                    location.pathname = '/admin/announcements'
                    
                } else {
                    // console.log(res)
                    alert("Failed to delete the Announcement: ".concat(by.data.title))
                    setDeleting(false)
                }

            } else {
                alert("Announcement by was not deleted because you did not type 'yes'")
                setDeleting(false)
            }
        } catch (err) {
            alert(err.message)
            // console.log(err)
            setDeleting(false)
        } finally {
            setDeleting(false)
        }
    }
  return (
    <>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/announcements"}>Announcements  {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"#"}>{announcement !== null ? announcement.title.slice(0, 30) : 'loading'}...  {">"}</NavLink>
            </nav>
        </div>
        {!loading && announcement !== null ? <div>
        <div className="container p-2 mb-2">
            <div className="float-start">
                <img style={profile} src={announcement.user.picture} alt="user profile picture" className="d-inline-block" />
                <p className="fs-4 d-inline-block">{announcement.user.username}</p>
            </div>
            <div className="float-end">
                <p className="fs-6 d-inline-block">{fixDate(announcement.date)}</p>
            </div>
        </div> <br /><br />
        <div className="container">
            <h1 className="display-6">{announcement.title}</h1>
            <hr />
            <p>{announcement.body}</p>
            <hr />
            {
                announcement.user.id === user.id ? <div className="card-footer">
                                                        <Link to={'/admin/announcements'} className="card-link btn btn-secondary me-2">
                                                            <i className="fas fa-arrow-left me-2"></i>
                                                        </Link>
                                                        <Link to={'/admin/announcements/edit/'.concat(announcement.id)} className="card-link btn btn-dark me-2">
                                                            <i className="fas fa-pen me-2"></i>
                                                        </Link>
                                                        {
                                                            !deleting ? <button onClick={() => deleteAnnouncement(announcement.id)} className="card-link btn btn-danger">
                                                                            <i className="fas fa-trash me-2"></i>
                                                                        </button>
                                                                     :  <button disabled className="card-link btn btn-danger">
                                                                            ...
                                                                        </button>
                                                        }
                                                    </div>
                                                 :  <div className="card-footer">
                                                        <Link to={'/admin/announcements'} className="card-link btn btn-secondary me-2">
                                                            <i className="fas fa-arrow-left me-2"></i>
                                                        </Link>
                                                    </div>
            }
        </div>
    </div> : <h1 className="text-center text-muted m-3">LOADING...</h1> }

    </>
  )
}

export default AnnouncementDetail;