
import { Link, NavLink, useParams } from "react-router-dom";
import api from "../../../api";
import { useState, useEffect } from "react";
import { USER } from "../../../constants";

function UserDetail() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const {id} = useParams()
    const localUser = JSON.parse(localStorage.getItem(USER))

    useEffect(() => {fetchUser()}, [])

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
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
  return (
    !loading && user !== null ? <>
                                    <div className="div bg-dark-roon-sm text-light">
                                        <nav className='p-2'>
                                            <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"/admin/users"}>Users  {">"}</NavLink>
                                            <NavLink className={"naked-link-sm"} to={"#"}>{user.username}  {">"}</NavLink>
                                        </nav>
                                    </div>
                                    <div className="m-3">
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
                                                    user.id === localUser.id && <>
                                                                                    <Link to={`/admin/users`} className="btn btn-secondary me-2"><i className="fas fa-arrow-left"></i></Link>
                                                                                    <Link to={`/admin/users/${localUser.id}/edit`} className="btn btn-dark"><i className="fas fa-pen"></i></Link>
                                                                                </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            :  <h1 className="text-center text-muted display-3 m-3">LOADING...</h1>
  )
}

export default UserDetail;