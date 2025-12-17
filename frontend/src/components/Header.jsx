
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { USER } from '../constants';
import api from '../api';

const link = {
    textDecoration: "none",
    color: "#1e0b0bff",
    margin: ".5em 1em",
}

const Header = () => {
  const location = useLocation();
  const localUser = JSON.parse(localStorage.getItem(USER))
  const [isAnn, setAnn] = useState(false)

  useEffect(() => {
    api.get('management/announcements/')
    .then(res => {
      if (res.data.length > 0) {
        setAnn(true)
      } else {
        setAnn(false)
      }
    })
    .catch(err => console.log(err))
  }, [])

  return (
    !location.pathname.includes('admin') && <header id='mtop' className='text-light shadow m-2 p-3 rounded-2 header'>
        <h1 className='text-start fw-bold text-light'>
          <Link className='text-white text-decoration-none' to={'/'}>Mamochoko</Link> {localUser && <Link to={`users/profile/${localUser.id}`}><span><i className="fas fa-circle-user float-end"></i></span></Link>}
        </h1>
        {window.screen.width > 640 ? 
          <nav className='text-center roon'>
              <NavLink to="/" className='text-light' style={link}><i className="fas fa-house text-light me-2"></i>Home</NavLink>
              <NavLink to="/about" className='text-light' style={link}><i className="fas fa-info text-light me-2"></i>About</NavLink>
              <NavLink to="/moments" className='text-light' style={link}><i className="fas fa-star text-light me-2"></i>Moments</NavLink>
              <NavLink to="/resources" className='text-light' style={link}><i className="fas fa-book text-light me-2"></i>Resources</NavLink>
              <NavLink to="/contact" className='text-light' style={link}><i className="fas fa-phone text-light me-2"></i>Contact</NavLink>
              {/* <NavLink to="/announcements" className='text-light' style={link}><i className="fas fa-bullhorn text-light me-2"></i>Announcements</NavLink> */}
          </nav>: 
          <nav className='text-center roon'>
              <NavLink to="/" className='text-light' style={link}><i className="fas fa-house text-light me-2"></i></NavLink>
              <NavLink to="/about" className='text-light' style={link}><i className="fas fa-info text-light me-2"></i></NavLink>
              <NavLink to="/moments" className='text-light' style={link}><i className="fas fa-star text-light me-2"></i></NavLink>
              <NavLink to="/resources" className='text-light' style={link}><i className="fas fa-book text-light me-2"></i></NavLink>
              <NavLink to="/contact" className='text-light' style={link}><i className="fas fa-phone text-light me-2"></i></NavLink>
              {/* <NavLink to="/announcements" className='text-light' style={link}><i className="fas fa-bullhorn text-light me-2"></i></NavLink> */}
          </nav>}
    </header>
  )
}

export default Header;