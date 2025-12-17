
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { USER } from "../../constants";
import api from "../../api";

function EditProfilePublic() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const {id} = useParams()
    const localUser = JSON.parse(localStorage.getItem(USER))
    const location = useLocation()
    const navigate = useNavigate()

    // data
    const [first_name, setFirst_name] = useState(localUser.first_name)
    const [last_name, setLast_name] = useState(localUser.last_name)
    const [email, setEmail] = useState(localUser.email)
    const [username, setUsername] = useState(localUser.username)
    const [picture, setPicture] = useState(null)
    const [phone, setPhone] = useState(localUser.phone)

    useEffect(() => {fetchUser()}, [])

    const fetchUser = async() => {
        setLoading(true)
        try {
            const res = await api.get(`auth/users/${id}/`)
            if (res.status === 200) {
                setUser(res.data)
            } else if (res.status === 400) {
                alert(res.data.detail)
            }else {
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
        setUpdating(true)
        try {
            const formData = new FormData();
            formData.append('first_name', first_name)
            formData.append('last_name', last_name)
            formData.append('email', email)
            formData.append('username', username)
            formData.append('phone', phone)

            if (picture !== null) {
                formData.append('picture', picture)
            }

            const res = await api.put(`auth/users/${localUser.id}/`, formData)
            if (res.status === 200) {
                alert("Changes saved!")
                localStorage.setItem(USER, JSON.stringify(res.data))
                navigate(-1)
            }
        } catch (err) {
            if (err.message.includes("400")){
                if (err.toString().includes('xios')){
                    let msg = JSON.parse(err.request.response)
                    if (msg.username) {
                        alert(msg.username)
                    } else if (msg.email) {
                        alert(msg.email)
                    }
                }
            } else {
                alert(err.message)
            }
        } finally {
            setUpdating(false)
        }
    }

    const deleteAccount = async(id) => {
        setDeleting(true)
        try {
            const isSure = prompt("                     ⚠WARNING⚠\nAre you sure you want to delete your account? Because this action is permanent and you will never get this account back. All the things you uplkoaded, posted, etc. will also be deleted. Type 'yes' if you are sure.")
            if (isSure === 'yes') {
                const res = await api.delete(`auth/users/${id}/`)
                if (res.status === 204) {
                    alert("DELETION SUCCESSFUL\nGoodbye old friend. We had a good run.")
                    localStorage.clear()
                    navigate('/')
                }
            } else {
                alert("Your account was not deleted because you did not type 'yes'. Thank God you still wanna be with us😌")
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setDeleting(false)
        }
    }

  return (
    !loading && localUser && user !== null && user.id === localUser.id ? <>
                                    {/* <div className="div bg-dark-roon-sm text-light">
                                        <nav className='p-2'>
                                            <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"/admin/users"}>Users  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"/admin/users/".concat(user.id, '/detail')}>{user.username}  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"#"}>Edit  {">"}</NavLink>
                                        </nav>
                                    </div> */}
                                    <h1 className="display-3 text-center my-4 roon">Edit Profile</h1>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="m-3 border rounded-3">
                                        <div className="row">
                                            <div className="col-lg-5 m-2">
                                                <img width={350} src={user.picture} alt="user profile picture" />
                                                <label className='fw-bold' htmlFor="pp">Change profile picture:
                                                <input onChange={(e) => setPicture(e.target.files[0])} type="file" name="pp" className="form-control" /></label>
                                            </div>
                                            <div className="col-lg-5">
                                                <h1 className="display-5 fw-bold">{username}</h1>
                                                <p><i className="fas fa-envelope me-2"></i>{email}</p>

                                                <div className="form-group mb-2">
                                                    <label htmlFor="username"><span className="fw-bold">Username: {username.indexOf(' ') !== -1 ? <span style={{color: 'red', fontSize: ".8rem"}}>username should not contain spaces!</span> : username.length > 15 ? <span style={{color: 'red', fontSize: ".8rem"}}>username should not be longer than 15 characters!</span> : <span></span>}</span></label>
                                                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" type="text" name="email" placeholder="enter username.." />
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label htmlFor="email"><span className="fw-bold">Email:</span></label>
                                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" type="email" name="email" placeholder="enter email.." />
                                                </div>
                                                
                                                <div className="form-group mb-2">
                                                    <label htmlFor="firstName"><span className="fw-bold">First name:</span></label>
                                                    <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} className="form-control" type="text" name="firstName" placeholder="enter first name.." />
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label htmlFor="lastName"><span className="fw-bold">Last name:</span></label>
                                                    <input value={last_name} onChange={(e) => setLast_name(e.target.value)} className="form-control" type="text" name="lastName" placeholder="enter last name.." />
                                                </div>

                                                <div className="form-group mb-2">
                                                    <label htmlFor="phone"><span className="fw-bold">Phone:</span></label>
                                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" type="text" name="phone" placeholder="enter phone number.." />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                {
                                                    updating ? <button disabled className="btn btn-primary m-2">saving...</button>
                                                             : username.indexOf(' ') !== -1 || username.length > 15  ? <h3 style={{color: "red"}}>Please correct username</h3> : <input type="submit" value="Save changes" className="btn btn-primary m-2" />
                                                }
                                            </div>
                                        </div>
                                    </form>
                                    {
                                        !deleting ? <button onClick={() => deleteAccount(id)} className="btn btn-danger m-3"><i className="fas fa-trash me-2"></i>Delete Account</button>
                                            : <button disabled className="btn btn-danger m-3"><i className="fas fa-trash me-2"></i>Deleting Account...</button>
                                    }
                                    <br /><br /><br /><br /><br /><br /><br />
                                </>
                            :  localUser && user !== null && user.id !== localUser.id ? <h1 className="text-center text-muted display-3 m-3">BRUH 💀..</h1> : <h1 className="text-center text-muted display-3 m-3">LOADING...</h1>
  )
}

export default EditProfilePublic;