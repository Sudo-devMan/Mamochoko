
import { Link, NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { USER } from "../../constants";
import api from "../../api";
import ResourceForm from "../../components/ResourceForm";

function UserProfile() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [resources, setResources] = useState([])
    const [downloading, setDownloading] = useState(false);
    const [downID, setDownID] = useState(null);
    const {id} = useParams()
    const localUser = JSON.parse(localStorage.getItem(USER))
    const [showForm, setShowForm] = useState(false)
    const [btnText, setText] = useState("Post Resource")
    const [btnIcon, setIcon] = useState("plus")
    const [action, setAction] = useState('Post')

    const handleForm = () => {
        setShowForm(p => !p)
        if (!showForm) {
            setText("Hide Form");
            setIcon("close")
        } else {
            setText("Post Resource");
            setIcon("plus")
        }
    }


    useEffect(() => {fetchUser(); fetchResources()}, [])

    const fetchUser = async() => {
        setLoading(true)
        try {
            const res = await api.get(`auth/users/${id}/`)
            if (res.status === 200) {
                setUser(res.data)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (err) {
            alert(err.message)
            // console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchResources = async() => {
        setFetching(true)
        try {
            const res = await api.get('management/resources/')
            if (res.status === 200) {
                let m = res.data.filter((p) => {
                    if (p.user.username === localUser.username) {
                        return p
                    }
                })
                setResources(m)
            } else {
                alert('Resources could not be fetched')
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setFetching(false)
            // console.log(resources)
        }
    }
        const [heading, setHeading] = useState('');
        const [body, setBody] = useState('');
        const [documentt, setDocumentt] = useState(null);
        const [uploading, setUpLoading] = useState(false)
        const [pending, setPending] = useState(true)
    
    
        const handleSubmit = async(e) => {
            e.preventDefault()
            setUpLoading(true)
            const form = new FormData();
            form.append('heading', heading)
            form.append('body', body);
            form.append('document', documentt)
    
            try {
                const res = await api.post('management/resources/', form);
                // console.log(res)
                alert('Successfully uploaded resource')
                setUpLoading(false)
                fetchResources()
            } catch (err) {
                alert(err)
                // console.log(err)
                setUpLoading(false)
            } finally {
                setUpLoading(false)
            }
        }

    const [deleting, setDeleting] = useState(false);
    const [deletingID, setDeletingID] = useState(null)

    const deleteResource = async (id) => {
        setDeleting(true)
        setDeletingID(id)
        try{
            const by = await api.get(`management/resources/${id}/`)
            let isSure = prompt("Type 'yes' to delete the reource ".concat(by.data.heading, " by ", by.data.user.username))
            if (!isSure) isSure = "no";
            if (isSure.toLowerCase() === 'yes') {
                const res = await api.delete(`management/resources/${id}/`)
                if (res.status === 204) {
                    setDeleting(false)
                    setDeletingID(null)
                    alert(`Successfully deleted Resource by ${by.data.user.username}`)
                    // window.location.reload()
                    fetchResources()
                } else {
                    // console.log(res)
                    alert("Failed to delete the Resource by ".concat(by.data.user.username, ". Please try again later."))
                    setDeleting(false)
                    setDeletingID(null)
                }

            } else {
                alert("Resource by " + by.data.user.username + " was not deleted because you did not type 'yes'")
                setDeleting(false)
                setDeletingID(null)
            }
        } catch (err) {
            alert(err.message)
            // console.log(err)
            setDeleting(false)
            setDeletingID(null)
        } finally {
            setDeleting(false)
            setDeletingID(null)
        }
    }

    
  return (
    !loading && user !== null ? <>
                                    {/* <div className="div bg-dark-roon-sm text-light">
                                        <nav className='p-2'>
                                            <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"/admin/users"}>Users  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"#"}>{user.username}  {">"}</NavLink>
                                        </nav>
                                    </div> */}
                                    <div className="m-3">
                                        <h1 className="display-3 roon text-center my-5">{user.username}'s Profile</h1>
                                        <div className="row">
                                            <div className="col-lg-5 m-2">
                                                <img width={350} src={user.picture} alt="user profile picture" />
                                            </div>
                                            <div className="col-lg-5">
                                                <h1 className="display-5 fw-bold">{user.username}</h1>
                                                <p><i className="fas fa-envelope me-2"></i>{user.email}</p>
                                                <p><span className="fw-bold">First name:</span> {user.first_name ? user.first_name : user.id === localUser.id ? <Link to={`/admin/users/${user.id}/edit`}>edit your profile to add your first name</Link> : 'NONE' }</p>
                                                <p><span className="fw-bold">Last name:</span> {user.last_name ? user.last_name : user.id === localUser.id ? <Link to={`/admin/users/${user.id}/edit`}>edit your profile to add your last name</Link> : 'NONE'}</p>
                                                <p><span className="fw-bold">Phone:</span> {user.phone ? user.phone : user.id === localUser.id ? <Link to={`/admin/users/${user.id}/edit`}>edit your profile to add your phone number</Link> : 'NONE'}</p>
                                                <p><span className="fw-bold">Role:</span> {user.role}</p>
                                                {
                                                    localUser && user.id === localUser.id && <>
                                                                                    <Link onClick={() => history.back()} className="btn btn-secondary me-2"><i className="fas fa-arrow-left"></i></Link>
                                                                                    <Link to={`/users/profile/${localUser.id}/edit`} className="btn btn-dark"><i className="fas fa-pen"></i></Link>
                                                                                </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <h1 className="display-4 roon text-center mb-3">My resources</h1>
                                        <br /><button onClick={() => handleForm()} className="btn btn-primary rounded-5">
                                            <i className={`fas fa-${btnIcon} me-2`}></i> {btnText}
                                        </button>
                                        {
                                            showForm && <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
                                                <h3 className='roon'>Upload a resource</h3>
                                                <p className="text-muted">*RESOURCES CAN BE PHOTOS, PDFs, AND OTHER DOCUMENT TYPES</p>
                                                <form encType='multipart/form-data' onSubmit={handleSubmit} method='post'>
                                                    <div className="form-group mb-2">
                                                        <input required value={heading}
                                                            onChange={(e) => setHeading(e.target.value)}
                                                            type="text" className="form-control"
                                                            name='name'
                                                            placeholder='Title.....' />
                                                        <textarea required
                                                            value={body}
                                                            onChange={(e) => setBody(e.target.value)}
                                                            placeholder='About the resource?'
                                                            name="body" id="body"
                                                            className="form-control mb-1"
                                                            rows={5}></textarea>
                                                        
                                                    </div>

                                                    <div className="form-group mb-5 border bg-white p-3 rounded-5">
                                                        <label htmlFor="resource">Click to selelect resource</label>
                                                        <input required type="file" onChange={(e) => setDocumentt(e.target.files[0])} name="resource" id="resource" />
                                                    </div>

                                                    {
                                                        uploading ? <input type="button" disabled value={"Uploading..."} className='btn btn-primary' />
                                                            : <input type="submit" className='btn btn-primary' value={'Upload'} />
                                                    }
                                                </form>
                                            </div>
                                        } <br />
                                    {resources.length > 0 ? 
                                        resources.map((paper, i) => {
                                            // console.log("Search: ", search) // debugging with the console as usual
                                            // console.log("Papers: ", resources)
                                            return (
                                            <div key={i} className="me-2 d-inline-block col-lg-3 col-md-6 col-sm-12 my-2">
                                                <div style={{border: `.15em solid rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="card">
                                                <div className="card-header">{paper.heading}</div>
                                                <div className="card-body">
                                                    <h4 className="card-title">{paper.body}</h4>
                                                </div>
                                                <div className="card-footer">
                                                    {downloading && downID === paper.id ?
                                                    <button disabled style={{backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`}} className="card-link btn btn-success d-inline-block m-1">
                                                            ...
                                                        </button>
                                                        :
                                                        <button
                                                        style={{backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`}}
                                                        className="card-link btn btn-success d-inline-block m-1"
                                                        onClick={async() => {
                                                        setDownloading(true)
                                                        setDownID(paper.id)
                                                        try {
                                                            const f = await fetch(paper.documentt);
                                                            const b = await f.blob();
                                                            const url = window.URL.createObjectURL(b);
                                                            const a = document.createElement("a");
                                                            a.href = url;
                                                            a.download = paper.heading;
                                                            a.click();
                                                            window.URL.revokeObjectURL(url);
                                                        } catch (err) {
                                                            alert(err.message)
                                                        } finally {
                                                            setDownloading(false)
                                                            setDownID(null)
                                                        }
                                                        }}
                                                        ><i className='fas fa-file-download'></i></button>
                                                        }
                                                    <a href={paper.document} className="btn btn-secondary me-2">
                                                        <i className="fas fa-eye"></i>
                                                    </a>
                                                    {
                                                        deleting && deletingID === paper.id && localUser && localUser.id === paper.user.id ? <button disabled className="btn btn-danger">...</button>
                                                                                            : <button onClick={() => deleteResource(paper.id)} className="btn btn-danger"><i className="fas fa-trash"></i></button>
                                                    }
                                                    <p className='text-muted d-inline-block mx-2' style={{fontSize: ".7rem"}}>{paper.user.username} | {paper.user.role}
                                                        <br />
                                                        {String(paper.upload_date).slice(0, String(paper.upload_date).slice(0, String(paper.upload_date).lastIndexOf('.')).lastIndexOf(':')).split('T').join(' ~ ').split('-').join('/')}
                                                    </p>
                                                </div>
                                                </div>
                                            </div>
                                            )
                                        })
                                        : loading ? <div className="text-center text-muted fw-bold">
                                                    <h1 className='text-center m-5 text-muted fw-bold'>Loading...</h1>
                                                    </div>
                                                : <h1 className='text-center text-muted m-5'>No papers/study guides</h1>
                                    }
                                    </div>
                                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                    <center>
                                        <p>Having fun?</p>
                                        <button style={{scale: '.7'}} onClick={() => alert("Maybe you're thirsty, go drink a lot of water. And if you have problems... I hope they get worse :)")} className="btn btn-danger me-2 d-inline-block">NO</button>
                                        <button style={{scale: '.7'}} onClick={() => alert("That's nice. Check out the moments page if you wanna have even more fun.")} className="btn btn-success me-2 d-inline-block">YES</button>
                                    </center>
                                    <br /><br /><br /><br /><br />
                                </>
                            :  <h1 className="text-center text-muted display-3 m-3">LOADING...</h1>
  )
}

export default UserProfile;