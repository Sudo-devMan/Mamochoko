
import {BrowserRouter as Router, Routes, Route, useLocation, NavLink, Link} from 'react-router-dom'
import Header from './Header';
import { useState, useEffect } from 'react';
import api from '../../api.js';
import ResourceForm from '../../components/ResourceForm.jsx';

function Main() {

    return (
        <div className='bg-light'>
            <div className='p-1'>
                <h3>WELCOME, BRUHH</h3>
            </div>

            <div className="row">
                <div className="col-lg-6 col-12 m-3">
                    <table className="table table-secondary table-hover table-bordered col-lg-6">
                        <thead>
                            <caption>USER MANAGEMENT</caption>
                        </thead>
                        <tbody>
                            <tr>
                                <td><NavLink to={"/admin/staff"}>Users</NavLink></td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-plus me-2"></i> Add
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Developer (Mashamaite H.M)</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-phone me-2"></i> Contact
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table table-secondary table-hover table-bordered col-lg-6">
                        <thead>
                            <caption>MANAGEMENT</caption>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Announcements</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-plus me-2"></i> Add
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><Link to="/admin/reviews">Reviews</Link></td>
                                <td>
                                    {
                                        pendingReviews.length > 0 ?
                                            <button className={`btn btn-warning btn-sm`}>
                                                <i className="fas fa-clock me-2"></i> {
                                                    pendingReviews.length
                                                }
                                            </button> :
                                            <button className={`btn btn-secondary btn-sm`}>
                                                <i className="fas fa-clock me-2"></i> {
                                                    pendingReviews.length
                                                }
                                            </button>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>Learner Applications</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-clock me-2"></i> 0
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Moments</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-plus me-2"></i> Add
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td><Link to={"/admin/resources"}>Resources</Link></td>
                                <td>
                                    <button onClick={() => handleForm()} className="btn btn-secondary btn-sm">
                                        <i className={`fas fa-${btnIcon} me-2`}></i> {btnText}
                                    </button>
                                    {
                                        showForm && <ResourceForm/>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="table table-secondary table-hover table-bordered col-lg-6">
                        <thead>
                            <caption>PUBLIC INFORMATION</caption>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Address And Location</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-pen me-2"></i> Edit
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>School Times</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-pen me-2"></i> Edit
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Home page wallpaper</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-pen me-2"></i> Edit
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Contact Info</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm">
                                        <i className="fas fa-pen me-2"></i> Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-4 col-12" style={{width: "96%", margin: ".8em"}}>
                    <table className="table table-secondary">
                        <thead>
                            <caption>RECENT ACTIONS</caption>
                        </thead>
                        <tbody>
                            <tr>
                                <p style={{fontSize: ".8rem"}} className="text-muted">
                                <p className="fw-bold fs-5">MaDee's Actions</p>
                                <hr />
                                Uploaded Grade 10 L.O Notes (<i>10:43, 01/10/2025</i>)
                                <hr />
                                Uploaded Social Sciences notes Grade 8: History Term 4 (<i>20:21, 01/10/2025</i>)
                                </p>
                            </tr>
                            <tr>
                                <p style={{fontSize: ".8rem"}} className="text-muted">
                                <p className="fw-bold fs-5">Mphaki's Actions</p>
                                <hr />
                                Uploaded Grade 11 L.O Notes (<i>07:21, 29/09/2025</i>)
                                <hr />
                                Uploaded Sepedi Grade 10: Term 4 P1 2024 (<i>20:21, 01/10/2025</i>)
                                <hr />
                                Disapproved a Review by John McClane (<i>10:57, 11/10/2025</i>)
                                </p>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    )
}

export default Main;