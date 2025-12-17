
import { Navigate, Link } from "react-router-dom";
// import jwtDecode from 'jwt-decode';
import api from '../api.js'
import { REFRESH_TOKEN, ACCESS_TOKEN, USER } from "../constants";
import { useEffect, useState } from "react";

function Protected({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const user = JSON.parse(localStorage.getItem(USER))

    useEffect(() => {
        auth().catch(err => setIsAuthorized(false))
    }, [])

    const refreshToken = async() => {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('auth/token/refresh/', {refresh: refresh_token})
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                if (user.role.toLowerCase() === 'admin') setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (err) {
            // console.log(err)
            setIsAuthorized(false)
        }
    }

    // check token, check expiration, else refresh, tell login
    const auth = async() => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
        }
        // const decoded = jwtDecode(token);
        const decoded = {exp: 18000}
        const expiration = decoded.exp;
        const now = Date.now()/1000;

        if (expiration < now) {
            await refreshToken()
        } else {
            if (user.role.toLowerCase() === 'admin') setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return (
            <>
                {
                    user && user.role.toLowerCase() !== 'admin' ? <h1 style={{fontSize: '.7rem'}} className="mt-3 text-center">Nice try, {user.username} {':)'}. You are not an admin, <Link to={'/'}>GET OUT</Link>!</h1>
                                                        : user ? <h1 className="mt-3 text-center">Loading...</h1> : <h1 style={{fontSize: '.7rem'}} className="mt-3 text-center">You ain't supposed to be here, <Link to={'/'}>LEAVE</Link></h1>
                }
            </>
        )
    }

    if (isAuthorized){
        return children
    } else {
        localStorage.clear()
        return <Navigate to={'/login'}/>
    }
}

export default Protected
