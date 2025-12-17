
import React from 'react'
import { NavLink } from 'react-router-dom';

function Staff() {
  return (
    <div>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Admins  {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/staff"}>Staff Members</NavLink>
            </nav>
        </div>
        <div className='m-3'>
            <h4 className='text-dark fs-3'>Staff Members</h4>
            <button className="btn btn-secondary rounded-5">
                <i className="fas fa-plus me-2"></i> Add Member
            </button>
        </div>

        <form className="border m-3 form p-1 d-flex justify-self-center col-lg-4">
            <div className="form-group col-12">
                <input type="text" placeholder='search member..' className="form-control" />
            </div>
        </form>

        <caption>STAFF MEMBERS</caption>
        <table style={{overflowX: "hidden"}} className="m-2 table-hover table table-bordered table-secondary">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>MaDee</td>
                    <td>madee@dev.com</td>
                    <td>0712345678</td>
                    <td>MyName</td>
                    <td>Madibana</td>
                    <td>Teacher</td>
                </tr>
                <tr>
                    <td>The NP</td>
                    <td>mphaki@dev.com</td>
                    <td>0712345678</td>
                    <td>Patrick</td>
                    <td>Mphaki</td>
                    <td>Teacher</td>
                </tr>
                <tr>
                    <td>Boss Man</td>
                    <td>theboss@dev.com</td>
                    <td>0812345678</td>
                    <td>Lehumo</td>
                    <td>Semenya</td>
                    <td>Principal</td>
                </tr>
            </tbody>
        </table>

        <center>
            <button className="btn btn-primary btn-lg m-5">
                <NavLink className={"text-decoration-none text-white"} to="/admin/members/profiles">See Members' Profiles</NavLink>
            </button>
        </center>
    </div>
  )
}

export default Staff;