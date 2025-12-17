
import { Link, NavLink, useParams } from "react-router-dom";
import api from "../../../api";
import { fixDate } from "../../../utils"
import { useState, useEffect } from "react";
import { USER } from "../../../constants";

function ApplicationDetail() {
    const [applicant, setApplicant] = useState(null)
    const [loading, setLoading] = useState(false)
    const [decision, setDecision] = useState('success')
    const [approved, setApproved] = useState(false)
    const [rejected, setRejected] = useState(false)
    const [reason, setReason] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const {id} = useParams()

    useEffect(() => {
    	fetchApplicant();
    	setApproved(false)
    	setRejected(false)
    }, [])

    const fetchApplicant = async() => {
        setLoading(true)
        try {
            const res = await api.get(`management/learner-applications/${id}/`)
            if (res.status === 200) {
                setApplicant(res.data)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (err) {
            alert(err.message)
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async(e) => {
    	e.preventDefault()
    	setSubmitting(true)
    	try {
    		if (approved === rejected) {
	    		throw new Error('Either reject or approve should be selected')
	    	} else {
	    		// Set pending to false
	    		// If approved set the reason
	    		// If rejected set the reason
	    		// Set the date of approval or rejection
	    		console.log('Approved: ', approved, '\nRejected: ', rejected)
	    		const res = await api.put(`management/learner-applications/${id}/`, {
		    		pending: false,
		    		rejected: rejected,
		    		approved_reason: approved ? reason : '',
		    		rejected_reason: rejected ? reason : '',
		    		date_approved: approved ? Date(Date.now).split('GMT')[0].slice(0, Date(Date.now).split('GMT')[0].lastIndexOf(':')) : '',
		    		date_rejected: rejected ? Date(Date.now).split('GMT')[0].slice(0, Date(Date.now).split('GMT')[0].lastIndexOf(':')) : ''
		    	})

		    	if (res.status === 200) {
		    		alert(approved ? `Applicant \'${applicant.learner_first_name} ${applicant.learner_surname}\' has beeen APPROVED successfully!!` : `Applicant \'${applicant.learner_first_name} ${applicant.learner_surname}\' has beeen REJECTED successfully!!`)
		    	} else {
		    		console.log("Not 200: ",res)
		    	}
		    	console.log(res)
	    	}
    	} catch (err) {
    		alert(err.message)
    	} finally {
    		setSubmitting(false)
    		fetchApplicant()
    	}
    }

    const handleReasonChange = (e) => {
		setReason(e.target.value);
		setDecision(!approved ? 'danger' : 'success');
	}
  return (
    !loading && applicant !== null ? <div className='fs-6'>
                                    <div className="div bg-dark-roon-sm text-light">
							            <nav className='p-2'>
							                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
							                <NavLink className={"naked-link-sm"} to={"/admin/learner-applications"}>Applications  {">"}</NavLink>
							                <NavLink className={"naked-link-sm"} to={"#"}>{applicant.learner_first_name + " " + applicant.learner_surname}  {">"}</NavLink>
							            </nav>
                                    </div>
                                    <div className="m-3">
                                        <div className="row">
                                            <div className="col-lg-5 m-2">
                                                <img width={350} src={applicant.picture} alt="learner full body picture" />
                                            </div>
                                            <div className="col-lg-5">
                                                <h1 className="display-5 fw-bold">{`${applicant.learner_first_name} ${applicant.learner_surname}`}</h1>
                                                <p><i className="fas fa-envelope me-2"></i>{applicant.email}</p>
                                                <p><span className="fw-bold">Date applied:</span> {fixDate(applicant.date_applied)}</p>
                                                <p><span className="fw-bold">First name:</span> {applicant.learner_first_name}</p>
                                                <p><span className="fw-bold">Surname:</span> {applicant.learner_surname}</p>
                                                <p><span className="fw-bold">Date of birth:</span> {applicant.date_of_birth}</p>
                                                <p><span className="fw-bold">ID or Passport:</span> {applicant.id_or_passport}</p>
                                                <p><span className="fw-bold">Citizenship:</span> {applicant.citizenship}</p>
                                                <p><span className="fw-bold">Country of residence:</span> {applicant.country_of_residence}</p>
                                                <p><span className="fw-bold">Parent's first name:</span> {applicant.parent_first_name}</p>
                                                <p><span className="fw-bold">Parent's Surname:</span> {applicant.parent_surname}</p>
                                                <p><span className="fw-bold">Relation to parent:</span> {applicant.parent_relation}</p>
                                                <p><span className="fw-bold">Phone:</span> {applicant.phone} <span className='text-muted'>(recommended form of contact)</span></p>
                                                <p><span className="fw-bold">Email:</span> {applicant.email}</p>
                                                <p><span className="fw-bold">Grade applied for:</span> {applicant.grade_applied_for}</p>
                                                <p><span className="fw-bold">Highest grade passed:</span> {applicant.highest_grade_passed}</p>
                                                <p><span className="fw-bold">Year when grade was passed:</span> {applicant.year_when_grade_was_passed}</p>
                                                <p><span className="fw-bold">Previous school:</span> {applicant.previous_school}</p>
                                                <hr/>
                                            </div>
                                            <div className="col-lg-5 m-2">
                                            	<p>LAST REPORT CARD:</p>
                                                {
                                                	applicant.last_report !== null ? <a href={applicant.last_report}><img width={350} src={applicant.last_report} alt="learner's report card" /></a>
                                                								   : <h5 className='btn btn-default border'>THERE IS NO REPORT CARD IMAGE</h5>
                                                }
                                            </div>
                                            {
                                            	applicant.pending ? <div className='col-lg-5 m-2'>
						                                            	<form method='post' onSubmit={handleSubmit}>
						                                            		<p className='text-muted'>*THE DECISION YOU ARE ABOUT TO MAKE IS FINAL. YOU CANNOT EDIT IT AFTERWARDS. Because the SMS functionality has not yet been implemented, I advise you to contact the applicant yourself.</p>
						                                            		<label style={{marginRight: "2em"}} htmlFor='reject' className='text-danger fw-bold fs-4'><input type='checkbox' name='reject' onChange={(e) => setRejected(e.target.checked)}/> Reject</label>
						                                            		<label htmlFor='reject' className='text-success fw-bold fs-4'><input type='checkbox' name='approve' onChange={(e) => setApproved(e.target.checked)}/> Approve</label>
						                                            		<br/>
						                                            		<textarea value={reason} onChange={(e) => handleReasonChange(e)} required className='form-control' rows={6} placeholder='type in the reason for why you approve or reject this application...'></textarea>
						                                            		<br/>
						                                            		{
						                                            			submitting ? <button disabled className={`btn btn-${decision}`} >submitting...</button>
						                                            						: <button type='submit' className={`btn btn-${decision}`} >{rejected===true ? "Reject" : 'Approve'}</button>
						                                            		}
						                                            	</form>
						                                            </div>
						                                          : <div className='col-lg-5 m-2'>
						                                          		<h3 className='roon mt-2 fw-bold'>FINAL DECISION:</h3>
						                                          		<p><span className="fw-bold text-warning">STATUS:</span> {applicant.rejected ? <span className='text-danger'>REJECTED</span> : <span className='text-success'>APPROVED</span>}</p>
                                                						<p><span className="fw-bold">{applicant.rejected ? <span className='text-danger'>REJECTED </span> : <span className='text-success'>APPROVED </span>} BY:</span> {applicant.rejected_by !== null ? applicant.rejected_by.username : applicant.approved_by !== null ? applicant.approved_by.username : 'Null'}</p>
                                                						<p><span className="fw-bold">DATE {applicant.date_approved ? <span className='text-success'>APPROVED</span> : <span className='text-danger'>REJECTED</span>}:</span> {applicant.date_approved ? applicant.date_approved : applicant.date_rejected}</p>
                                                						<div>
                                                							<span className="fw-bold">REASON FOR {applicant.approved_reason ? <span className='text-success'>APPROVAL</span> : <span className='text-danger'>REJECTION</span>}:</span> <br/>
                                                							<div className='p-2 border rounded-3'>
                                                								{applicant.approved_reason ? applicant.approved_reason : applicant.rejected_reason}
                                                							</div>
                                                						</div>
                                                						<br/><br/>
						                                          	</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            :  <h1 className="text-center text-muted display-3 m-3">LOADING...</h1>
  )
}

export default ApplicationDetail;
