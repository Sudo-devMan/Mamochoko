
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const formStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifySelf: "center",
    alignSelf: "center",
    margin: "1em"
}

const bodyStyles = {
    height: "100vh",
    width: "100%",
    backgroundColor: "#000",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    justifySelf: "center",
    alignSelf: "center",
}

function Administration() {

    const [password, setPassword] = useState("")
    const [theAlert, setAlert] = useState("")
    const navigate = useNavigate();

    if (window.screen.width < 330) {
        bodyStyles.height = ""
    }

    document.title = "O ska re phaphela💀"

    useEffect(() => {
        console.log(document.style)
    }, [])

    const checkPassword = () => {
        if (password === "thisOne") {
            navigate('/admin/home');
        } else {
            setPassword("")
            setAlert("WRONG ADMIN PASSWORD. FEW ATTEMPTS LEFT BEFORE WE PUBLISH YOUR SELFIE, BROWSER HISTORY, AND  YOUR PERSONAL INFORMATION TO THE DARK WEB!💀")
            setTimeout(() => {
                setAlert("")
            }, 12000)
        }
    }
  return (
    <div style={bodyStyles}>
        <div style={formStyles} className='p-3 border rounded-3 col-lg-6'>
            <form onSubmit={e => e.preventDefault()}>
                <h1 className="text-danger text-center">!!AUTHORIZED ACCESS REQUIRED!!</h1>
                <p className='text-center text-light'>Please enter the admin password to proceed to administration</p>
                <p className="text-center text-warning m-2">{theAlert}</p>
                <div className="form-group mb-3">
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder='admin password...'/>
                </div>

                <div className="form-group">
                    {
                        password.trim() ? 
                          <input onClick={() => checkPassword()} type="submit" value="Proceed" className="btn btn-dark col-12" />
                        : <input disabled onClick={() => checkPassword()} type="submit" value="Proceed" className="btn btn-dark col-12" />
                    }
                </div>
            </form>

            <button onClick={() => alert("Visit your nearest clinic and ask for mental health pills. Admisistration access is strictly forbidden! We advise you to leave this page to protect your personal info!!")} className="btn btn-default text-light border my-3">Click here to learn how you can get the password</button>

            <p className="text-light opacity-50 mt-2">
                <span className="text-danger fw-bold">NOTE:</span> We are currently collecting usage data for anyone who visits this page.
                    Your name, selfie, and browser history are being collected. If you get the password wrong
                     3 times, we will publish this information live and expose you, FRAUD!!
            </p>
        </div>
    </div>
  )
}

export default Administration;