
import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import api from '../../../api'
import MomentForm from '../../../components/Admin/MomentForm'
import MomentCard from '../../../components/Admin/MomentCard'
import { fixDate } from '../../../utils'
import { USER } from '../../../constants'

function MomentsAdmin() {

	const [showForm, setShowForm] = useState(false)
    const [btnText, setText] = useState("Upload moment")
    const [btnIcon, setIcon] = useState("plus")
    const [search, setSearch] = useState("")
    const [searched, setSearched] = useState([])
    const [per, setPer] = useState([])
    const [moments, setMoments] = useState([])
    const [fetching, setFetching] = useState(false)
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [facebookLink, setFacebookLink] = useState('')
	const [files, setFiles] = useState([])
	const [uploading, setUploading] = useState(false)

	const handleSubmit = async(e) => {
		e.preventDefault()
		setUploading(true)
		try {
			const formData = new FormData()
			formData.append('title', title)
			formData.append('body', body)
			formData.append('facebook_link', facebookLink)
			files.forEach((f) => formData.append('media_uploads', f))

			const res = await api.post('management/moments/', formData)

			if (res.status === 201) {
				alert('Successfully uploaded moment!')
				setTitle('')
				setBody('')
				setFiles([])
				e.target.reset()
			} else {
				throw new Error("Sumn ain't right. Try again")
			}
			
		} catch (err) {
			if (err.message.includes('401')) {
				navigate('/logout')
			}
			alert(err.message)
			console.log(err)
		} finally {
			setUploading(false)
			// window.location.reload()
			fetchMoments()
		}
	}


    useEffect(() => {
    	fetchMoments()
    }, [])

    useEffect(() => {
		if (search.trim().length > 0) {
		let theNewMoments = moments.filter((paper) => {
				if (
				      paper.body.toLowerCase().includes(search.toLowerCase()) || 
				      paper.title.toLowerCase().includes(search.toLowerCase()) ||
				      paper.user.username.toLowerCase().includes(search.toLowerCase())
				    )
				    {
				    return paper
				}
			})
			// console.log(theNewPapers)
			setSearched(theNewMoments);
		} else {
			setSearched([]);
			fetchMoments()
		}
	}, [search])

	const handleForm = () => {
        setShowForm(p => !p)
        if (!showForm) {
            setText("Hide Form");
            setIcon("close")
        } else {
            setText("Upload moment");
            setIcon("plus")
        }
    }

    const fetchMoments = async() => {
    	setFetching(true)
    	try {
    		const res = await api.get('management/moments/')
    		setMoments(res.data)
    		setPer(res.data)
    		// console.log(res)
    	} catch (err) {
    		alert(err.message)
    		console.log(err)
    	} finally {
    		setFetching(false)
    	}
    }
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
					fetchMoments()
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
		<div>
			<div className="div bg-dark-roon-sm text-light">
	            <nav className='p-2'>
	                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
	                <NavLink className={"naked-link-sm"} to={"/admin/moments"}>Moments  {">"}</NavLink>
	                {/*<NavLink className={"naked-link-sm"} to={"#"}>Pending & Approved  {">"}</NavLink>*/}
	            </nav>
	        </div>
	        <div className='m-3'>
	            <h4 className='text-dark fs-3'>Moments</h4>
	            <button onClick={() => handleForm()} className="btn btn-secondary rounded-5">
	                <i className={`fas fa-${btnIcon} me-2`}></i> {btnText}
	            </button>
        	</div>

	        {
	            showForm && <form className='col-lg-4 m-3 p-2 rounded-2 border bg-light' method='post' onSubmit={handleSubmit}>
								<h1 className='roon mb-3'>Share a moment</h1>
								
								<input required type='text' className='form-control mb-2' placeholder='moment title' value={title} onChange={(e) => setTitle(e.target.value)}/>
								
								<textarea required rows={8} value={body} onChange={(e) => setBody(e.target.value)} placeholder='what was happening?' className='form-control mb-3'></textarea>
								
								<label htmlFor='files'>Click below to select videos and pictures</label>
								<input name='files' required type='file' className='form-control mb-2' multiple accept='image/*, video/*' onChange={(e) => setFiles(Array.from(e.target.files))}/>
								
								{
									uploading ? <button type='submit' className='btn btn-primary col-12' disabled>sharing...</button>
												: <button type='submit' className='btn btn-primary col-12'>Share</button>
								}
							</form>
	        }

	        <form onSubmit={(e) => e.preventDefault()} className="border m-3 form p-1 d-flex justify-self-center col-lg-4">
	            <div className="form-group col-12">
	                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder='search moment..' className="form-control" />
	            </div>
	        </form>
			
			<div>
				{
                search.split('').join('').length > 0 ? <div className="row p-1">
										                    <h4 className="mb-3 roon fw-bold fs-4">SEARCHED MOMENTS - {`(${searched.length})`} {search.split('').join('').length > 0 && <span className='text-warning'>'{search.length > 10 ? `${search.slice(0, 10)}...` : search}'</span>}</h4>
										                    {
										                        searched.length > 0 ? searched.map((moment, i) => {
										                            return (
										                                <div key={moment.id} className="col-lg-4 col-12 mb-1">
																			<div className="card">
																				<Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>
																					{
																						moment.media[0].media_type === 'image' ? <img style={{height: "20em", width: "100%", objectFit: "cover"}} src={moment.media[0].file} alt="Moment featured image" />
																																: <video loop muted autoPlay style={{height: "20em", width: "100%", objectFit: "cover"}}>
																																	<source src={moment.media[0].file} type='video/mp4' />
																																</video>
																					}
																				</Link>
																				<div className="card-body">
																					<h3 className="card-title">{moment.title}</h3>
																					<p className="card-details">
																						{moment.body.slice(0, 100)}...<Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>see more</Link>
																					</p>
																				</div>
																				<div className="card-footer">
																					<div>
																						<img style={{width: "2.8em", height: "2.8em", borderRadius: "100%"}} className='d-inline-block me-2' src={moment.user.picture}/>
																						<p className='d-inline-block fs-5 me-5'>{moment.user.username}</p>
																						{
																							localUser.id === moment.user.id && <p className='d-inline-block'>
																																	<Link to={`/admin/moments/edit/${moment.id}`} className='btn btn-dark me-2'><i className='fas fa-pen'></i></Link>
																																	{
																																		!deleting && deletingId !== moment.id ? <button onClick={() => deleteMoment(moment.id)} className='btn btn-danger'><i className='fas fa-trash'></i></button>
																																											: <button disabled className='btn btn-danger'>...</button>
																																	}
																																</p>
																						}
																					</div>
																					{
																						moment.facebook_link && <a target='_blank' href="" className="card-link btn btn-primary">See more on facebook</a>
																					}
																					<p style={{fontSize: ".8rem"}} className="card-link"><i className='text-muted'>Posted: {fixDate(moment.date)}</i></p>
																				</div>
																			</div>
																		</div>
										                            )
										                        })
										                            : <h1 className="fw-bold text-center text-muted display-3">'<span className='text-warning'>{search.length > 10 ? `${search.slice(0, 10)}...` : search}</span>' NOT FOUND</h1>
										                    }
										                </div>
										              : <div className="row p-1">
												            {moments.length > 0 ? 
												                moments.map((moment, i) => {
												                    return (
												                        <div key={moment.id} className="col-lg-4 col-12 mb-1">
																			<div className="card">
																				<Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>
																					{
																						moment.media[0].media_type === 'image' ? <img style={{height: "20em", width: "100%", objectFit: "cover"}} src={moment.media[0].file} alt="Moment featured image" />
																																: <video loop muted autoPlay style={{height: "20em", width: "100%", objectFit: "cover"}}>
																																	<source src={moment.media[0].file} type='video/mp4' />
																																</video>
																					}
																				</Link>
																				<div className="card-body">
																					<h3 className="card-title">{moment.title}</h3>
																					<p className="card-details">
																						{moment.body.slice(0, 100)}...<Link className='fw-bold text-black text-decoration-none' to={`/admin/moments/${moment.id}/detail`}>see more</Link>
																					</p>
																				</div>
																				<div className="card-footer">
																					<div>
																						<img style={{width: "2.8em", height: "2.8em", borderRadius: "100%"}} className='d-inline-block me-2' src={moment.user.picture}/>
																						<p className='d-inline-block fs-5 me-5'>{moment.user.username}</p>
																						{
																							localUser.id === moment.user.id && <p className='d-inline-block'>
																																	<Link to={`/admin/moments/edit/${moment.id}`} className='btn btn-dark me-2'><i className='fas fa-pen'></i></Link>
																																	{
																																		!deleting && deletingId !== moment.id ? <button onClick={() => deleteMoment(moment.id)} className='btn btn-danger'><i className='fas fa-trash'></i></button>
																																											: <button disabled className='btn btn-danger'>...</button>
																																	}
																																</p>
																						}
																					</div>
																					{
																						moment.facebook_link && <a target='_blank' href="" className="card-link btn btn-primary">See more on facebook</a>
																					}
																					<p style={{fontSize: ".8rem"}} className="card-link"><i className='text-muted'>Posted: {fixDate(moment.date)}</i></p>
																				</div>
																			</div>
																		</div>
												                    )
												                })
												            : fetching ? <h1 className="text-muted text-center m-3 my-4">LOADING...</h1> : <h1 className="text-muted text-center m-3 my-4">NO MOMENTS</h1>}
												        </div>
            	} <hr/>
			</div>
		</div>
	)
}

export default MomentsAdmin
