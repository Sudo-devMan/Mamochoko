
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import profilePic from '../../../assets/imgs/profile.png'
import api from '../../../api';
import UserCard from '../../../components/Admin/UserCard';

function Users() {
    const [admins, setAdmins] = useState([])
    const [guests, setGuests] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [searched, setSearched] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (search.split(' ').join('').length > 0) {
        let theNewUsers = allUsers.filter((user) => {
            if (
                user.username.toLowerCase().includes(search.toLowerCase()) || 
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.role.toLowerCase().includes(search.toLowerCase())
            )
            {
            return user
            }
        })
        // console.log(theNewusers)
        setSearched(theNewUsers);
    } else {
        setSearched([]);
    }
    }, [search])

    const fetchUsers = async() => {
        setLoading(true)
        try{
            const res = await api.get('auth/users/')
            const a = res.data.filter((user, i) => {
                return user.role === 'Admin'
            })
            const g = res.data.filter((user, i) => {
                return user.role === 'Guest'
            })
            setAdmins(a);
            setGuests(g)
            setAllUsers(res.data)
        } catch(err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/users"}>Users  {">"}</NavLink>
            </nav>
        </div>
        <div className='m-3'>
            <h4 className='text-dark fs-3'>Users {search.split(' ').join('') && <span><span className="text-warning">'{search.length > 15 ? `${search.slice(0, 15)}...` : search}'</span></span>}</h4>
            <div className='col-lg-4 col-md-4 col-sm-8 d-flex justify-self-center m-1'>
                <input type="search"
                    name="search" 
                    id="search" 
                    placeholder='search username, email, role...' 
                    className=' form-control rounded-5'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="p-2">
            {
                search.length > 0 && <>
                     <h4 className="mb-3 roon fw-bold fs-4">SEARCHED USERS - {`(${searched.length})`}</h4>
                    {
                        searched.length > 0 ? searched.map((user, i) => {
                            return (
                                <UserCard key={i} username={user.username} email={user.email} pp={user.picture} role={user.role} />
                            )
                        })
                            : <h1 className="fw-bold text-center text-muted display-3">'<span className='text-warning'>{search.length > 10 ? `${search.slice(0, 10)}...` : search}</span>' NOT FOUND</h1>
                    }
                </>
            }
            <h4 className="mb-3 roon">ADMIN USERS - {`(${admins.length})`}</h4>
            {
                admins.length > 0 ? admins.reverse().map((user, i) => {
                    return (
                        <UserCard key={i} id={user.id} username={user.username} email={user.email} pp={user.picture} role={user.role} />
                    )
                })
                    : loading ? <h1 className="fw-bold text-center text-muted display-3">LOADING...</h1> : <h1 className="fw-bold text-center text-muted display-3">NO ADMIN USERS</h1>
            }

            <hr />

            <h4 className="mb-3 roon">GUEST USERS - {`(${guests.length})`}</h4>
            {
                guests.length > 0 ? guests.reverse().map((user, i) => {
                    return (
                        <UserCard key={i} id={user.id} username={user.username} email={user.email} pp={user.picture} role={user.role} />
                    )
                })
                    : loading ? <h1 className="fw-bold text-center text-muted display-3">LOADING...</h1> : <h1 className="fw-bold text-center text-muted display-3">NO GUEST USERS</h1>
            }
        </div>
    </div>
  )
}

export default Users;