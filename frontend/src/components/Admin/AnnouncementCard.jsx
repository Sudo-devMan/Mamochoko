
import { USER } from "../../constants"
import { fixDate } from "../../utils"
import { profilePic } from "./UserCard"
import { Link } from "react-router-dom"
import { createContext, useState } from "react"
import api from "../../api"

const profile = {
    width: "2.8em",
    height: "2.8em",
    marginRight: ".3em",
    borderRadius: "100%"
    // objectFit: "cover"
}

const AnnContext = createContext()

function AnnouncementCard({announcement}) {
    const {id, title, body, date, user} = announcement
    const localUser = JSON.parse(localStorage.getItem(USER))
    const [deleting, setDeleting] = useState(false);
    const [deletingID, setDeletingID] = useState(null)

    const deleteAnnouncement = async (id) => {
        setDeleting(true)
        setDeletingID(id)
        try{
            const by = await api.get(`management/announcements/${id}/`)
            let isSure = prompt("Type 'yes' to delete the announcement: ".concat(by.data.title))
            if (!isSure) isSure = "no";
            if (isSure.toLowerCase() === 'yes') {
                const res = await api.delete(`management/announcements/${id}/`)
                if (res.status === 204) {
                    setDeleting(false)
                    setDeletingID(null)
                    alert(`Successfully deleted Announcement: ${by.data.title}`)
                    window.location.reload()
                } else {
                    // console.log(res)
                    alert("Failed to delete the Announcement: ".concat(by.data.title))
                    setDeleting(false)
                    setDeletingID(null)
                }

            } else {
                alert("Announcement by was not deleted because you did not type 'yes'")
                setDeleting(false)
                setDeletingID(null)
            }
        } catch (err) {
            alert(err.message)
            // console.log(err)
            setDeleting(false)
            setDeletingID(null)
        } finally {
            setDeleting(false)
            setDeletingID(null)
        }
    }


    // console.log(announcement)
    return (
        <div className="card align-top d-inline-block p-1 m-1 border col-lg-3 col-md-6">
           <Link className="text-decoration-none text-black" to={`/announcements/${id}/detail/`}>
                <div className="card-header">
                    <h3 className="card-title fs-4">{title}</h3>
                    <p style={{fontSize: ".8rem"}} className="text-muted card-text">{fixDate(date)}</p>
                </div>
           </Link>
            <div className="card-body">
                <p className="card-text">{body.slice(0, 50)} <Link className="text-decoration-none text-muted fw-bold" to={`/announcements/${id}/detail/`}>...see more</Link></p>
            </div>
            <div className="card-footer">
                <img style={profile} src={user.picture ? user.picture : profilePic} alt="user profile picture" className="d-inline-block" />
                <p className="d-inline-block" style={{marginRight: ".2em"}}>{user.username} | {user.role}</p>
                {
                    localUser && localUser.id === user.id && localUser.role === 'Admin' && <span>
                        <Link to={'/admin/announcements/edit/'.concat(id)}>
                            <button className="btn btn-success btn-sm" style={{marginRight: ".2em"}}><i className="fas fa-pen me-2"></i></button>
                        </Link>
                        {
                            deleting ? <button className="btn btn-danger btn-sm" disabled>...</button> :
                                    <button onClick={() => deleteAnnouncement(id)} className="btn btn-danger btn-sm"><i className="fas fa-trash me-2"></i></button>
                        }
                    </span>
                }
            </div>
        </div>
    )
}

export default AnnouncementCard
export {profile}