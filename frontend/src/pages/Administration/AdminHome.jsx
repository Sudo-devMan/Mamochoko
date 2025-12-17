import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../api"

function AdminHome() {
    document.title = "Mamochoko Administration"

    const [fetchingReviews, setFetchingReviews] = useState(false)
    const [pendingReviews, setPendingReviews] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [fetchingApplications, setFetchingApplications] = useState(false)
    const [applications, setApplications] = useState([])
    const [totalApplications, setTotalApplications] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [btnText, setText] = useState("Add")
    const [btnIcon, setIcon] = useState("plus")

    const handleForm = () => {
        setShowForm(p => !p)
        if (!showForm) {
            setText("Hide");
            setIcon("close")
        } else {
            setText("Add");
            setIcon("plus")
        }
    }


    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async() => {
        setFetchingReviews(true)
        setFetchingApplications(true)
        try {
            const res = await api.get('/management/reviews/')
            const data = res.data
            setTotalReviews(data.length)
            const pendRevs = data.filter((rev, i) => {
                if (rev.pending){
                    return rev
                }
            })
            // console.log("Pendrevs: " ,pendRevs)
            const res2 = await api.get('management/learner-applications/')
            const data2 = res2.data
            setTotalApplications(data2.length)
            const pendApps = data2.filter((app, i) => {
                if (app.pending) {
                    return app
                }
            })
            setPendingReviews(pendRevs)
            setApplications(pendApps)
        } catch (err) {
            alert(err)
            console.log(err)
        } finally {
            setFetchingReviews(false)
            setFetchingApplications(false)
            // console.log("set ones: ", pendingReviews)
        }
    }

  return (
    <div className='p-lg-3'>
        <center>
            <span style={{fontSize: ".6rem"}} className="text-muted">*Click on each box to be redirected to the desired page</span>
        <div className="admin-links">
            <Link to={'/admin/users'}>
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span>
                            <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-person me-2"></i>Users</span>
                            <p className="fs-6 no-line">A list of all the people who have accounts in the website</p>
                        </span>
                    </span>
                </div>
            </Link>
            <Link to={'/admin/reviews'}>
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-comment me-2"></i>Reviews</span>
                        <p className="fs-6">Opinions of people about the school. <br />Pending: {pendingReviews.length > 0 ?
                                    <span className="bg-warning p-1 rounded-5 text-black">{pendingReviews.length}</span>
                                    : fetchingReviews ? <span>...</span> : <span>0</span>}
                            <span> | Total: {totalReviews}</span>
                        </p>
                    </span>
                </div>
            </Link>
            <Link to={'/admin/resources'}>
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-book me-2"></i>Resources</span>
                        <p className="fs-6">Question papers, study guides, notes, ATPs, etc.</p>
                    </span>
                </div>
            </Link>
            <Link to={'/admin/announcements'}>
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-bullhorn me-2"></i>Announcements</span>
                        <p className="fs-6">Meetings, news, updates, and all other kinds of announcements</p>
                    </span>
                </div>
            </Link>
            <Link to={'/admin/moments'}> 
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-star me-2"></i>Moments</span>
                        <p className="fs-6">All of Mamochoko moments - competitions, achievements, etc..</p>
                    </span>
                </div>
            </Link>
            <Link to={'/admin/learner-applications'}>  
                <div className="admin-link shadow p-2 border rounded-2 m-2">
                    <span className="fs-5">
                        <span className="underline"><i style={{color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-laptop me-2"></i>Learner Applications</span>
                        <p className="fs-6">Applications submitted online<br />Pending: {applications.length > 0 ?
                                        <span className="bg-warning p-1 rounded-5 text-black">{applications.length}</span>
                                        : fetchingApplications ? <span>...</span> : <span>0</span>}
                            <span> | Total: {totalApplications}</span>
                        </p>
                    </span>
                </div>
            </Link>
        </div>
        </center>
    </div>
  )
}

export default AdminHome;
