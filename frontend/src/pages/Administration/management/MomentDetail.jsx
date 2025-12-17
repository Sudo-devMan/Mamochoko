
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import api from "../../../api";
import { useState, useEffect } from "react";
import { fixDate } from "../../../utils";
import { USER } from "../../../constants";

const profile = {
    width: "2.8em",
    height: "2.8em",
    marginRight: ".3em",
    borderRadius: "100%"
    // objectFit: "cover"
}


function MomentDetail() {
    const [moment, setMoment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const {id} = useParams()

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem(USER))

    useEffect(() => {fetchMoment()}, [])

    const fetchMoment = async() => {
        setLoading(true)
        try {
            const res = await api.get(`management/moments/${id}/`)
            if (res.status === 200) {
                setMoment(res.data)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (err) {
            if (err.message.includes('401')) {
                navigate('/logout')
            }
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteMoment = async() => {
        setDeleting(true)
        try {
            const m = await api.get(`management/moments/${id}/`)
            const isSure = prompt(`Are you sure you wanna delete your moment: ${m.title} \nType 'yes' to delete the moment.`)
            if (isSure === 'yes') {
                const res = await api.delete(`management/moments/${id}/`)
                if (res.status === 204) {
                    alert('Moment has been successfully deleted!')
                    navigate(-1)

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
        }
    }
    
    const deleteMomentMedia = async(id) => {
        setDeleting(true)
        try {
            if (moment.media.length === 1){
                alert("You cannot delete all the pictures and videos, cuz nthwena e tlo ba weird.")
            } else {
                const isSure = prompt(`Are you sure you wanna delete? Type 'yes' to delete`)
                if (isSure === 'yes') {
                    const res = await api.delete(`management/moment-media/${id}/`)
                    if (res.status === 204) {
                        alert('Moment media has been successfully deleted!')
                        fetchMoment()
                    } else {
                        throw new Error("Something went wrong")
                    }
                } else {
                    alert('Moment was not deleted because you did not type \'yes\'')
                }
            }

        } catch (err) {
            alert(err.message)
        } finally {
            setDeleting(false)
        }
    }
    


  return (
    !loading && moment !== null ? <>
                                    <div className="div bg-dark-roon-sm text-light">
                                        <nav className='p-2'>
                                            <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"/admin/moments"}>Moments  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"#"}>{moment.title.slice(0, 13)}...  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"#"}>Detail  {">"}</NavLink>
                                        </nav>
                                    </div>
                                    <div className="m-3">
                                        <div className="container p-2 mb-2">
                                                    <div className="float-start">
                                                        <img style={profile} src={moment.user.picture} alt="user profile picture" className="d-inline-block" />
                                                        <p className="fs-4 d-inline-block">{moment.user.username}</p>
                                                    </div>
                                                    <div className="float-end">
                                                        <p className="fs-6 d-inline-block">{fixDate(moment.date)}</p>
                                                    </div>
                                                </div> <br /><hr/><br />
                                        <div  className="row">
                                            <div style={{overflowX: 'auto', whiteSpace: 'nowrap'}} className="col-lg-7 m-2">
                                                {
                                                    moment.media.map((media, i) => {
                                                        if (media.media_type === 'image') {
                                                            return <div key={i} className="d-inline-block align-top m-1 border shadow">
                                                                        <img key={i} width={350} src={media.file} alt="moment picture" />
                                                                        <br/>
                                                                        { user.id === moment.id && <button onClick={() => deleteMomentMedia(media.id)} className="btn btn-default m-1"><i className="fas fa-trash text-danger"></i></button> }
                                                                    </div>
                                                        } else {
                                                            return <div key={i} className="d-inline-block align-top m-1 border shadow">
                                                                        <video key={i} width={350} controls>
                                                                            <source src={media.file}  type="video/mp4"/>
                                                                        </video> <br/>
                                                                        { user.id === moment.user.id && <button onClick={() => deleteMomentMedia(media.id)} className="btn btn-default m-1"><i className="fas fa-trash text-danger"></i></button> }
                                                                    </div>
                                                        }
                                                    })
                                                }
                                                
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="container">
                                                    <h1 className="display-6">{moment.title}</h1>
                                                    <hr />
                                                    <p>{moment.body}</p>
                                                    <hr />
                                                    {
                                                        moment.user.id === user.id ? <div className="card-footer">
                                                                                                <Link to={'/admin/moments'} className="card-link btn btn-secondary me-2">
                                                                                                    <i className="fas fa-arrow-left me-2"></i>
                                                                                                </Link>
                                                                                                <Link to={'/admin/moments/edit/'.concat(moment.id)} className="card-link btn btn-dark me-2">
                                                                                                    <i className="fas fa-pen me-2"></i>
                                                                                                </Link>
                                                                                                {
                                                                                                    !deleting ? <button onClick={() => deleteMoment()} className="card-link btn btn-danger">
                                                                                                                    <i className="fas fa-trash me-2"></i>
                                                                                                                </button>
                                                                                                                :  <button disabled className="card-link btn btn-danger">
                                                                                                                    ...
                                                                                                                </button>
                                                                                                }
                                                                                            </div>
                                                                                            :  <div className="card-footer">
                                                                                                <Link to={'/admin/moments'} className="card-link btn btn-secondary me-2">
                                                                                                    <i className="fas fa-arrow-left me-2"></i>
                                                                                                </Link>
                                                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            :  <h1 className="text-center text-muted display-3 m-3">LOADING...</h1>
  )
}

export default MomentDetail;