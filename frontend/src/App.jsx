import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from 'react-router-dom'
import Home from "./pages/Home";
import Header from "./components/Header";
import HomeTabs from "./components/HomeTabs";
import Footer from "./components/Footer";
import HomeView from "./pages/HomeView";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Moments from "./pages/Moments";
import Resources from "./pages/Resources";
import Administration from "./pages/Administration";
import RealAdmin from "./pages/RealAdmin";
import Reviews from "./pages/Reviews";
import Main from "./pages/Administration/Main";
import Staff from "./pages/Administration/Staff";
import AdminHeader from "./pages/Administration/Header";
import ReviewsAdmin from "./pages/Administration/public_info/Reviews";
import ResourcesAdmin from "./pages/Administration/management/Resources";
import Test from "./components/1-Test";
import Register from "./components/Register";
import Protected from "./components/Protected";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { USER } from "./constants";
import LoggedIndicator from "./components/LoggedIndicator";
import AdminHome from "./pages/Administration/AdminHome";
import Users from "./pages/Administration/management/Users";
import Announcements from "./pages/Administration/management/Announcements";
import EditAnnouncement from "./pages/Administration/management/EditAnnouncement";
import AnnouncementDetail from "./pages/Administration/management/AnnouncementDetail";
import UserDetail from "./pages/Administration/management/UserDetail";
import EditProfile from "./pages/Administration/management/EditProfile";
import ApplicationForm from "./pages/ApplicationForm";
import LearnerApplications from "./pages/Administration/management/LearnerApplications";
import LearnerApplicationsApproved from "./pages/Administration/management/LearnerApplicationsApproved";
import ApplicationDetail from './pages/Administration/management/ApplicationDetail'
import MomentsAdmin from './pages/Administration/management/Moments'
import MomentDetail from "./pages/Administration/management/MomentDetail";
import EditMoment from "./pages/Administration/management/EditMoment";
import MomentDetailPublic from "./pages/MomentDetailPublic";
import UserProfile from "./pages/1-PublicAuth/UserProfile";
import EditProfilePublic from "./pages/1-PublicAuth/EditProfile";
import AnnouncementsPublic from "./pages/Announcements";
import Announcement from "./pages/Announcement";

function Logout() {
  localStorage.clear()
  return <Navigate to={'/'}/>
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

function App() {
  // console.clear()

  const location = useLocation();

  useEffect(() => {
    location.pathname = `${location.pathname}/#mtop`
  }, [location.pathname])


  const noHeaderRoutes = () => {
    const theRoutes = ["/", "/moments", "/resources", "/o-ska-re-phaphela", "/reviews",
                        "/admin/home",
                        "/admin/staff",
                        "/admin/resources",
                        "/admin/announcements",
                        "/admin/learners/applications",
                        "/admin/moments",
                        "/admin/reviews",
                        "/login",
                        "/register",
                        "/admin/users",
                        "/admin/announcements/edit/:id"
    ]
    return !theRoutes.includes(location.pathname)
  }

  const noFooterRoutes = () => {
    const theRoutes = ["/o-ska-re-phaphela", "/reviews", "/resources", "/admin/home",
                        "/admin/staff",
                        "/admin/resources",
                        "/admin/announcements",
                        "/admin/learners/applications",
                        "/admin/moments",
                        "/admin/reviews",
                        "/login",
                        "/register",
                        "/admin/users",
                        "/admin/announcements/edit/:id"
                      ]
    return !theRoutes.includes(location.pathname);
  }

  const adminHeader = () => {
    return location.pathname.includes("/admin/")
  }

  const user = JSON.parse(localStorage.getItem(USER))
  // console.log(user)

  return (
    <div className="App bg-light">
      {noHeaderRoutes() && <Header/>}
      {adminHeader() && <AdminHeader/>}
      {user && <LoggedIndicator/>}
      <Routes>
        <Route path="/" element={<HomeView/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/moments" element={<Moments/>}/>
        <Route path="/resources" element={<Resources/>}/>
        <Route path="/o-ska-re-phaphela" element={<Administration/>}/>
        <Route path="/mamochoko-administration-page" element={<RealAdmin/>}/>
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/online/application" element={<ApplicationForm/>} />
        <Route path="/moments/:id/detail" element={<MomentDetailPublic/>} />
        <Route path="/users/profile/:id" element={<UserProfile/>} />
        <Route path="/users/profile/:id/edit" element={<EditProfilePublic/>} />
        <Route path="/announcements" element={<AnnouncementsPublic/>} />
        <Route path="/announcements/:id/detail" element={<Announcement/>} />

        {/* TESTING */}
        <Route path="/test" element={<Test/>}/>

        {/* ADMIN ROUTES */}
        <Route path="/admin/home" element={<Protected><AdminHome/></Protected>}/>
        <Route path="/admin/staff-not-found" element={<Protected><Staff/></Protected>}/>
        <Route path="/admin/reviews" element={<Protected><ReviewsAdmin/></Protected>}/>
        <Route path="/admin/resources" element={<Protected><ResourcesAdmin/></Protected>} />
        <Route path="/admin/users" element={<Protected><Users/></Protected>} />
        <Route path="/admin/users/:id/detail" element={<Protected><UserDetail/></Protected>} />
        <Route path="/admin/users/:id/edit" element={<Protected><EditProfile/></Protected>} />
        <Route path="/admin/announcements" element={<Protected><Announcements/></Protected>} />
        <Route path="/admin/announcements/edit/:id" element={<Protected><EditAnnouncement/></Protected>} />
        <Route path="/admin/announcements/detail/:id" element={<Protected><AnnouncementDetail/></Protected>} />
        <Route path="/admin/learner-applications" element={<Protected><LearnerApplications/></Protected>} />
        <Route path="/admin/learner-applications/approved" element={<Protected><LearnerApplicationsApproved/></Protected>} />
        <Route path="/admin/learner-applications/:id/detail" element={<Protected><ApplicationDetail/></Protected>} />
        <Route path="/admin/moments" element={<Protected><MomentsAdmin/></Protected>} />
        <Route path="/admin/moments/:id/detail" element={<Protected><MomentDetail/></Protected>} />
        <Route path="/admin/moments/edit/:id" element={<Protected><EditMoment/></Protected>} />
        
        {/* AUTH */}
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {noFooterRoutes() && <Footer/>}
    </div>
  )
}

export default App;