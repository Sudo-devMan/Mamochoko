
import { useEffect, useState } from "react";
import { USER } from "../constants";
import { Link } from "react-router-dom";

const styles = {
    position: 'fixed',
    fontSize: '.8rem',
    backgroundColor: '#19c519ff',
    color: "#fff",
    zIndex: '1',
    margin: '.1em',
    marginTop: "2em",
    transform: 'translateY(5em)',
    padding: '.05em',
    borderRadius: '.1em'
}

const logout = {
    position: 'fixed',
    zIndex: '1',
    margin: '.1em',
    marginTop: "2em",
    transform: 'translateY(8em)',
    padding: '.05em',
    borderRadius: '.1em',
    fontSize: '.8rem'
}

const admin = {
    position: 'fixed',
    zIndex: '1',
    margin: '.1em',
    marginTop: "2em",
    transform: 'translateY(11em)',
    padding: '.05em',
    borderRadius: '.1em',
    fontSize: '.8rem'
}


function LoggedIndicator() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem(USER))

  if (localUser !== null) {
    setUser(localUser)
  }
  }, [])
  return (
    <>
      <div style={styles}>
          <Link className="text-white" to={`/users/profile/${user ? user.id : ''}`}>{user ? user.username : 'Logged In'}</Link>
      </div>
      <Link to={'/logout'} style={logout} className="fw-bold text-danger border">Logout</Link>

      {
        user && user.role === 'Admin' && <Link style={admin} to={'/admin/home'} className="fw-bold text-warning border">Admin</Link>
      }
    </>
  )
}

export default LoggedIndicator;