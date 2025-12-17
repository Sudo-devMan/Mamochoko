
import React, { useEffect, useState } from 'react'
import api from '../api'
import AnnouncementCard from '../components/Admin/AnnouncementCard'
import { NavLink, Link } from 'react-router-dom'
import { handleForm } from '../utils'
import AnnouncementForm from '../components/Admin/AnnouncementForm'

function AnnouncementsPublic() {
  const [theAnnouncements, setTheAnnouncements] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [btnText, setText] = useState("Post Announcement")
  const [btnIcon, setIcon] = useState("plus")
  const [action, setAction] = useState('Post')

  const handleForm = () => {
      setShowForm(p => !p)
      if (!showForm) {
          setText("Hide Form");
          setIcon("close")
      } else {
          setText("Post Announcement");
          setIcon("plus")
      }
  }

  useEffect(() => {
      if (search.trim().length > 0) {
        let theNewAnnouncements = announcements.filter((announcement) => {
          if (
              announcement.body.toLowerCase().includes(search.toLowerCase()) || 
              announcement.title.toLowerCase().includes(search.toLowerCase()) ||
              announcement.user.username.toLowerCase().includes(search.toLowerCase()) ||
              announcement.user.role.toLowerCase().includes(search.toLowerCase())
            )
            {
            return announcement
          }
        })
      // console.log(theNewAnnouncements)
      setTheAnnouncements(theNewAnnouncements);
    } else {
      setTheAnnouncements(announcements);
    }
  }, [search])

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async() => {
    setLoading(true)
    try {
      const res = await api.get('management/announcements/')
      setAnnouncements(res.data)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* <div className="div bg-dark-roon-sm text-light">
          <nav className='p-2'>
              <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
              <NavLink className={"naked-link-sm"} to={"#"}>Announcements  {">"}</NavLink>
          </nav>
      </div> */}
      <div className='m-3 my-5'>
          <h1 className='text-center roon display-1'>Announcements</h1>
          <p className="text-center">All announcements are made on the website, at school, or at meetings. If you did not hear the speaker when they made the announcement, this page is for you</p>
      </div>
      <div className="m-2">
        {
          announcements.length > 0 ? announcements.map((a, i) => {
            return (
              <AnnouncementCard key={i} announcement={a}/>
            )
          }) : loading ? <h1 className='text-center text-muted m-3'>LOADING...</h1> : <h1 className='text-center text-muted m-3'>NO ANNOUNCEMENTS POSTED</h1>
        }
      </div>
    </div>
  )
}

export default AnnouncementsPublic;