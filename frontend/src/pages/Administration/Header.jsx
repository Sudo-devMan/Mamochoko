
import React from 'react'
import { NavLink } from 'react-router-dom';

function AdminHeader() {
  return (
    <header className='w-100 p-2 mb-3'>
      <br />
        <h1 style={{color: "#9c2121"}} className="text-center roon fw-bold">MAMOCHOKO ADMINISTRATION</h1>
        <div className="row px-2">
            <nav className='text-start col-9'>
                <NavLink style={{textDecoration: "none"}} className={"text-dark fw-bold"} to={"/"}>View Site</NavLink>
            </nav>
            <nav className='text-end col-3'>
                <NavLink style={{textDecoration: "none"}} className={"text-danger fw-bold"} to={"/logout"}>Log Out</NavLink>
            </nav>
        </div>
    </header>
  )
}

export default AdminHeader;