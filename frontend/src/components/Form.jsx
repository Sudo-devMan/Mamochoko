
import { useState } from "react";
import api from '../api.js';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../constants";
import '../assets/css/Form.css'










//                  FIX THE FUCKING BUG!!















function Form({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("");
    const [loading, setLoading] = useState(false);
    const [adminRoot, setAdminRoot] = useState("");
    const [og, setOg] = useState(false) // for admin
    const adminPass = import.meta.env.VITE_ADMIN_ROOT_PASSWORD
    const navigate = useNavigate()
    const location = useLocation()

    const name = method === "login" ? "Login" : "Register";

    document.title = `${name} | Mamochoko`

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        localStorage.clear()
        try {
            let role = 'Guest'
            if (og) {
                if (adminRoot === adminPass) {
                    if (method !== 'login'){
                        role = 'Admin'
                        if (password !== password1) {
                            alert("Passwords do not match!!")
                        } else {
                            const res = await api.post(route, {username, password, email, role})
                            // console.log(res)
                            if (res.status === 201) {
                                const login = await api.post('auth/token/access/', {username, password})
                                // console.log('Login admin res after reg: ', login)
                                if (login.status === 200) {
                                    localStorage.setItem(ACCESS_TOKEN, login.data.access)
                                    localStorage.setItem(REFRESH_TOKEN, login.data.refresh)
                                    localStorage.setItem(USER, JSON.stringify(login.data.user))
                                    navigate('/admin/home')
                                    location.pathname = "/admin/home"
                                }
                            } else{
                                // console.log(res)
                                alert(res.statusText)
                            }
                        }
                    } else {
                        const res = await api.post(route, {username, password})
                        // console.log("Res login admin: ", res)
                        if (res.status === 200){
                            localStorage.setItem(ACCESS_TOKEN, res.data.access)
                            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                            localStorage.setItem(USER, JSON.stringify(res.data.user))
                            navigate('/admin/home')
                            location.pathname = "/admin/home"
                        } else {alert("Please enter the correct username and password!")}
                    }
                } else {
                    alert("Wrong admin root password!")
                }
            } else {
                if (method !== 'login'){
                    if (password !== password1) {
                        alert("Passwords do not match!")
                    } else {
                        const res = await api.post(route, {username, password, email})
                        // console.log("Reg res: ", res)
                        if (res.status === 201) {
                            const login = await api.post('auth/token/access/', {username, password})
                            // console.log('Login after reg: ', login)
                            if (login.status === 200) {
                                localStorage.setItem(ACCESS_TOKEN, login.data.access)
                                localStorage.setItem(REFRESH_TOKEN, login.data.refresh)
                                localStorage.setItem(USER, JSON.stringify(login.data.user))
                                alert("Success! You are now logged in. We have added a dashboard page for you to upload resources and edit your profile. You will see a green box with your name on the screen to show that you are logged in.")
                                navigate('/')
                            } else if (res.status === 400){
                                // console.log(res)
                                alert(res.statusText)
                            }
                        }
                    }
                } else {
                    const res = await api.post(route, {username, password})
                    // console.log('Res login: ', res)
                    if (res.status === 200){
                        localStorage.setItem(ACCESS_TOKEN, res.data.access)
                        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                        localStorage.setItem(USER, JSON.stringify(res.data.user))
                        navigate('/')
                    } else {alert("Please enter the correct username and password!");}
                }
            }
        }
        catch (err) {
            if (err.message.includes("401")){
                let msg = JSON.parse(err.request.response)
                if (msg.username !== undefined){
                    alert(msg.username)
                } else if (msg.password !== undefined) {
                    alert(msg.password)
                } else if (msg.email) {
                    alert(msg.password)
                } else if (err.response.data.detail !== undefined){
                    alert(`${err.response.data.detail}\nPlease check your username and password and try again`)
                } else {
                    alert("Something went wrong")
                    // console.log(err)
                }
            } else if (err.message.includes("400")){
                if (err.toString().includes('xios')){
                    let msg = JSON.parse(err.request.response)
                    if (msg.username) {
                        alert(msg.username)
                    } else if (msg.email) {
                        alert(msg.email)
                    }
                }
            }
        } finally{
            setLoading(false);
        }
    }

    return <center><br/><br/>
        <h1 className="roon fw-bold text-decoration-underline">Mamochoko Administration</h1>
        <form onSubmit={handleSubmit} className="daFuckingForm w-lg-50 w-md-75 w-sm-75 m-5 bg-light p-2 rounded-3 shadow d-flex flex-column gap-3 justify-content-center align-items-center">
            <h1>{name}</h1>
            <input
                type="text"
                className="form-control my-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username..."
                required
            />
            <input
                type="password"
                className="form-control my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password..."
                required
            />
            {
                method !== 'login' &&   <>
                                            <input
                                                type="password"
                                                className="form-control my-2"
                                                value={password1}
                                                onChange={(e) => setPassword1(e.target.value)}
                                                placeholder="comfirm password..."
                                                required
                                            />
                                            <input
                                                type="email"
                                                className="form-control my-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="email..."
                                                required
                                            />
                                        </>
            }

            {
                og && <div>
                        <p className="text-start text-muted" style={{fontSize: ".8rem"}}>We require an admin root password in order for you to <span className="text-primary">{name}</span></p>
                        <input
                        type="password"
                        value={adminRoot}
                        onChange={(e) => setAdminRoot(e.target.value)}
                        className="form-control my-2"
                        placeholder="admin root password"
                        required
                        />
                    </div>
            }
            

            <div className="form-group float-start">
                <input type="checkbox" name="role" value={og} onChange={(e) => {
                    setOg(e.target.checked)
                    console.log(og)
                }}/>
                <label htmlFor="role" className="mx-2">Continue as Admin</label>
                
            </div>
            
            {
                !loading ? <button className="btn btn-primary bg-roon col-12" type="submit">{name === 'Login' ? name : 'Create Account'}</button>
                    : <button disabled className="btn btn-primary bg-roon col-12" type="submit">loading...</button>
            }
        </form>
        {
            method === 'login' ?
                    <p>Don't have an account? <Link to={'/register'}>Create an account</Link></p>
            :       <p>Already have an account? <Link to={'/login'}>Login</Link></p>
        }
        <a href="https://it-circuit-pricing.netlify.app" target="_blank">Auth by IT Circuit</a>
    </center>
}

export default Form
