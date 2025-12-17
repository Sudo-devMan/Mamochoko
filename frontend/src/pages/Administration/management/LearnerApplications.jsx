
import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import api from '../../../api';
import { fixDate } from '../../../utils';

function LearnerApplications() {
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState([])
    const [applications, setApplications] = useState([])
    const [all, setAll] = useState([])
    const [searched, setSearched] = useState([])

    const fetchApplications = async() => {
        setLoading(true)
        try {
            const res = await api.get('management/learner-applications/')
            setAll(res.data)
            const rejected = res.data.filter((a) => {
                if (!a.pending && a.rejected) {
                    return a
                }
            })
            const pending = res.data.filter((a) => {
                if (a.pending) {
                    return a
                }
            })
            setApplications(rejected)
            setPending(pending)
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {fetchApplications()}, [])

    useEffect(() => {fetchApplications()}, [])

    useEffect(() => {
        if (search.trim().length > 0) {
            let theNewApplications = all.filter((a) => {
                if (
                    a.learner_first_name.toLowerCase().includes(search.toLowerCase()) || 
                    a.learner_surname.toLowerCase().includes(search.toLowerCase()) ||
                    a.previous_school.toLowerCase().includes(search.toLowerCase()) ||
                    a.grade_applied_for.toString().toLowerCase().includes(search.toLowerCase()) 
                    ){
                    return a
                }
            })
        // console.log(theNewAnnouncements)
        setSearched(theNewApplications);
    } else {
        setSearched([]);
    }
    }, [search])

  return (
    <div>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"#"}>Applications  {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"#"}>Pending & Rejected  {">"}</NavLink>
            </nav>
        </div>
        <div className='m-3'>
            <h4 className='text-dark fs-3'>Pending Applications</h4>
            <Link className='btn btn-success m-1' to={'/admin/learner-applications/approved'}>Go to approved applications</Link>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="border m-3 form p-1 d-flex justify-self-center col-lg-4">
            <div className="form-group col-12">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder='search application, name, surname, school, etc.' className="form-control" />
            </div>
        </form>
        <div className='p-lg-3 p-1'>
            {
                search.split('').join('').length > 0 && <>
                     <h4 className="mb-3 roon fw-bold fs-4">SEARCHED APPLICATIONS - {`(${searched.length})`} {search.split('').join('').length > 0 && <span className='text-warning'>'{search.length > 10 ? `${search.slice(0, 10)}...` : search}'</span>}</h4>
                    {
                        searched.length > 0 ? searched.map((a, i) => {
                            return (
                                <div key={i} className='card col-lg-3 d-inline-block m-2'>
                                    <div className="card-header">
                                        <img style={{width: "2.8em", height: "2.8em", marginRight: ".3em", borderRadius: "100%"}} className='rounded-pp d-inline-block me-2' src={a.picture} alt="learner's full body picture" />
                                        <p className='d-inline-block'>{`${a.learner_surname} ${a.learner_first_name}`}</p>
                                    </div>
                                    <div className="card-body">
                                        <p><span className="fw-bold">Previous school: </span>{a.previous_school}</p>
                                        <p><span className="fw-bold">Applied for: </span>Grade {a.grade_applied_for}</p>
                                        <p><span className="fw-bold">Date applied: </span>{fixDate(a.date_applied)}</p>
                                        <p><span className="fw-bold">Status: </span>
                                            {!a.pending && a.rejected ? <span className='text-danger fw-bold'>REJECTED</span> : a.pending ? <span className='text-warning fw-bold'>PENDING</span> : <span className='text-success fw-bold'>APPROVED</span>}
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={`/admin/learner-applications/${a.id}/detail`} className="card-link btn btn-primary">See In Detail</Link>
                                    </div>
                                </div>  
                            )
                        })
                            : <h1 className="fw-bold text-center text-muted display-3">'<span className='text-warning'>{search.length > 10 ? `${search.slice(0, 10)}...` : search}</span>' NOT FOUND</h1>
                    }
                </>
            } <hr/>
            <h3 className='text-warning'>Pending ({pending.length})</h3>
            {
                pending.length > 0 ? pending.map((a, i) => {
                    return (
                        <div key={i} className='card d-inline-block m-2'>
                            <div className="card-header">
                                <img style={{width: "2.8em", height: "2.8em", marginRight: ".3em", borderRadius: "100%"}} className='rounded-pp d-inline-block me-2' src={a.picture} alt="learner's full body picture" />
                                <p className='d-inline-block'>{`${a.learner_surname} ${a.learner_first_name}`}</p>
                            </div>
                            <div className="card-body">
                                <p><span className="fw-bold">Previous school: </span>{a.previous_school}</p>
                                <p><span className="fw-bold">Applied for: </span>Grade {a.grade_applied_for}</p>
                                <p><span className="fw-bold">Date applied: </span>{fixDate(a.date_applied)}</p>
                                <p><span className="fw-bold">Status: </span>{a.pending ? <span className="text-warning fw-bold">PENDING</span> : <span className='text-success fw-bold'>Approved</span>}</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/admin/learner-applications/${a.id}/detail`} className="card-link btn btn-primary">See In Detail</Link>
                            </div>
                        </div>
                    )
                })
                : loading ? <h1 className='m-5 text-muted text-center'>LOADING...</h1> : <h1 className='m-5 text-muted text-center'>NO <span className="text-warning">PENDING</span> APLICATIONS</h1>
            }
            <hr />
            <h3 className="text-danger">Rejected ({applications.length})</h3>
            {
                applications.length > 0 ? applications.map((a, i) => {
                    return (
                        <div key={i} className='card d-inline-block m-2'>
                            <div className="card-header">
                                <img style={{width: "2.8em", height: "2.8em", marginRight: ".3em", borderRadius: "100%"}} className='rounded-pp d-inline-block me-2' src={a.picture} alt="learner's full body picture" />
                                <p className='d-inline-block'>{`${a.learner_surname} ${a.learner_first_name}`}</p>
                            </div>
                            <div className="card-body">
                                <p><span className="fw-bold">Previous school: </span>{a.previous_school}</p>
                                <p><span className="fw-bold">Applied for: </span>Grade {a.grade_applied_for}</p>
                                <p><span className="fw-bold">Date applied: </span>{fixDate(a.date_applied)}</p>
                                <p><span className="fw-bold">Status: </span>{a.rejected ? <span className="text-danger fw-bold">REJECTED</span> : <span className='text-success fw-bold'>APPROVED</span>}</p>
                                <p><span className="fw-bold">Rejected by: </span>{a.rejected_by !== null ? a.rejected_by.username : 'Null'}</p>
                                <p><span className="fw-bold">Reason for rejection: </span>{a.rejected_reason ? a.rejected_reason.slice(0, 10) : 'Null'}...</p>
                            </div>
                            <div className="card-footer">
                                <Link to={`/admin/learner-applications/${a.id}/detail`} className="card-link btn btn-primary">See In Detail</Link>
                            </div>
                        </div>
                    )
                })
                : loading ? <h1 className='m-5 text-muted text-center'>LOADING...</h1> : <h1 className='m-5 text-muted text-center'>NO <span className="text-danger">REJECTED</span> APLICATIONS</h1>
            }
        </div>
    </div>
  )
}

export default LearnerApplications;