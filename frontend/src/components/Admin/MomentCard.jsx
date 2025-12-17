
import { Link, useNavigate } from 'react-router-dom'
import { fixDate } from '../../utils'
import { USER } from '../../constants'
import api from '../../api'
import { useState } from 'react'

function MomentCard ({moment}) {
	const localUser = JSON.parse(localStorage.getItem(USER))
	// console.log(moment)

	const [deletingId, setDeletingId] = useState(null)
	const [deleting, setDeleting] = useState(false)

	const navigate = useNavigate()

	const deleteMoment = async(id) => {
		setDeleting(true)
		setDeletingId(id)
		try {
			const m = await api.get(`management/moments/${id}/`)
			const isSure = prompt(`Are you sure you wanna delete your moment: ${m.title} \nType 'yes' to delete the moment.`)
			if (isSure === 'yes') {
				const res = await api.delete(`management/moments/${id}/`)
				if (res.status === 204) {
					alert('Moment has been successfully deleted!')
					navigate(0)
				} else {
					throw new Error("Something went wrong")
				}
			} else {
				alert('Moment was not deleted because you did not type \'yes\'')
			}
		} catch (err) {
			alert(err.message)
		} finally {
			setDeleting(false)
			setDeletingId(null)
		}
	}
	return (
		<div key={moment.id} className="col-lg-3 col-md-5 col-12 mb-1">
	        <div className="card">
				{
					localUser && localUser.role === 'Admin' ? 	<Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>
																	{
																		moment.media[0].media_type === 'image' ? <img style={{height: "20em", width: "100%", objectFit: "cover"}} src={moment.media[0].file} alt="Moment featured image" />
																												: <video loop muted autoPlay style={{height: "20em", width: "100%", objectFit: "cover"}}>
																													<source src={moment.media[0].file} type='video/mp4' />
																												</video>
																	}
																</Link>
															:	<Link className='fw-bold text-black text-decoration-none' to={`/moments/${moment.id}/detail`}>
																	{
																		moment.media[0].media_type === 'image' ? <img style={{height: "20em", width: "100%", objectFit: "cover"}} src={moment.media[0].file} alt="Moment featured image" />
																												: <video loop muted autoPlay style={{height: "20em", width: "100%", objectFit: "cover"}}>
																													<source src={moment.media[0].file} type='video/mp4' />
																												</video>
																	}
																</Link>
				}
	            
	            <div className="card-body">
	                <h3 className="card-title">{moment.title}</h3>
	                <p className="card-details">
	                    {moment.body.slice(0, 100)}...{localUser && localUser.role === 'Admin' ? <Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>see more</Link> : <Link className='fw-bold text-black text-decoration-none' to={`/moments/${moment.id}/detail`}>see more</Link>}
	                </p>
	            </div>
	            <div className="card-footer">
	            	<div>
	            		<img style={{width: "2.8em", height: "2.8em", borderRadius: "100%"}} className='d-inline-block me-2' src={moment.user.picture}/>
	            		<p className='d-inline-block fs-5 me-5'>{moment.user.username}</p>
	            		{
							localUser && localUser.id === moment.user.id && <p className='d-inline-block'>
																	<Link to={`/admin/moments/edit/${moment.id}`} className='btn btn-dark me-2'><i className='fas fa-pen'></i></Link>
																	{
																		!deleting && deletingId !== moment.id ? <button onClick={() => deleteMoment(moment.id)} className='btn btn-danger'><i className='fas fa-trash'></i></button>
																											: <button disabled className='btn btn-danger'>...</button>
																	}
																</p>
						}
	            	</div>
	                {
	                	moment.facebook_link && <a target='_blank' href={moment.facebook_link} className="card-link btn btn-primary">See more on facebook</a>
	                }
	                <p style={{fontSize: ".8rem"}} className="card-link"><i className='text-muted'>Posted: {fixDate(moment.date)}</i></p>
	            </div>
	        </div>
	    </div>
	)
}

export default MomentCard;
