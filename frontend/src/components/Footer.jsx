
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { USER } from '../constants';

const Footer = () => {
    const [path, setPath] = useState('/login')
    const [pathName, setPathName] = useState('Login')
    const user = JSON.parse(localStorage.getItem(USER))
    const location = useLocation()

    useEffect(() => {
        if (user !== null) {
            if (user.role === 'Admin') {
                setPath('/admin/home')
                setPathName('Admin')
            } else {
                setPath('')
                setPathName('')
            }
        } else {
            setPath('/login')
            setPathName('Login')
        }
    }, [user])

    const hide = () => {
        return  !location.pathname.includes('admin') &&
                !location.pathname.includes('users') &&
                !location.pathname.includes('moment') &&
                !location.pathname.includes('announcement')
    }
  return (
    hide() && <footer className='m-0 p-0'>
        <br />
        <h3 className='text-center'>Mamochoko Secondary School</h3>
        
        <center className="p-1">
            <nav>
                <Link className='mx-1' to="/">Home</Link>|
                <Link className='mx-1' to="/about">About</Link>|
                <Link className='mx-1' to="/contact">Contact</Link>|
                <Link className='mx-1' to="/moments">Moments</Link>|
                <Link className='mx-1' to="/resources">Resources</Link>|
                <Link className='mx-1' to="/announcements">Announcements</Link>|
                <Link className='mx-1' to={path}>{pathName}</Link>
            </nav>
        </center>
        
        <div className="innfo row m-0 p-0">
            <div className="additional-info col-lg-3">
                <h4>Location & Contact</h4>
                <strong>Address:</strong> Stand 406, Ga-Kobo, Moletjie, Polokwane, Limpopo, South Africa
                <br/><strong>District:</strong> Capricorn North
                <br/><strong>Circuit:</strong> Bahlaloga
                <br/><strong>EMIS Number:</strong> 992205102
                <br/><strong>Examination Centre Number:</strong> 7041108
                <br/><strong>Facebook:</strong> <a target='_blank' href="https://www.facebook.com/profile.php?id=100083172677011">Mamochoko FB page</a>
            </div>
            
            <div className="additional-info col-lg-4">
                <h4>School Classification:</h4>
                <strong>Type:</strong> Public Secondary School
                <br/><strong>Specialisation:</strong> Ordinary
                <br/><strong>Quintile Level:</strong> 2 (No-fee school)
                <br/><strong>Funding:</strong> Eligible to receive government operational funding
            </div>
            
            <div className="additional-info col-lg-3">
                <h4>Admission Process:</h4>
                Required Documents: <br/>
                Certified birth certificate copy <br/>
                Parent/guardian ID <br/>
                Proof of residence <br />
                Last report card (if transferring) <br />
                <span className="text-white">Or you can apply online</span>
            </div>
        </div>
        <br/>
        <center>
            <span>Copyright &copy; <span id="year">{new Date().getFullYear()}</span></span> <br/>
            <span id="devman">Developed by Devman (<a target='_blank' href='wa.me/+27720727038'>WhatsApp</a>)</span>
        </center>
    <br />
    </footer>

    // <footer className='bg-secondary p-3' style={{color: "#ddd"}}>
    //     <div className="row">
    //         <div className="col">
    //             <h3 className='roon'>Mamochoko Secondary School</h3>
    //             <p className='fs-6'>Preparing Future Leaders through quality education and expert guidance</p>
    //         </div>
    //         <div className="col">
    //             <h4 className='roon'>Pages</h4>
    //             <p>Home</p>
    //             <p>About</p>
    //             <p>Moments</p>
    //             <p>Admin</p>
    //         </div>
    //         <div className="devman">
    //             Developed by Devman (<a target='_blank' href='tel://0720727038' style={{fontSize: ".6rem"}}>Click here to WhatsApp</a>)
    //         </div>
    //     </div>
    // </footer>
  )
}

export default Footer;