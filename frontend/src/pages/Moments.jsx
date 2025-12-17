
import React, { useEffect, useState } from 'react'
// import moments from '../../data/moments.js';
import clearTrofAsBg from '../../data/moments/clearTrof.jpg'
import Header from '../components/Header.jsx';
import api from '../api.js';
import MomentCard from '../components/Admin/MomentCard.jsx';

function Moments() {
    const [moments, setMoments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchMoments()
    }, [])

    const fetchMoments = async() => {
        setLoading(true)
        try {
            const res = await api.get('management/moments/')
            if (res.status === 200) {
                setMoments(res.data)
            } else {
                alert('Failed to fetch moments. Reloading the page to try again.')
                document.location.reload()
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <>
        <div className="body-2">
            <Header/>
            <div className='homepage'>
                <section className="white-on-phone hero align-middle">
                    <div>
                        <h1 className='text-secondary fw-bold display-1 m-2 mt-4'>HERE ARE <br /> MAMOCHOKO <span className='roon'>MOMENTS</span></h1>
                        <p className='text-white mx-2 mt-2 fs-4'>This background image is a trophy we have received from Topmak for obtaining position one in the district for our 2024 matric 100% pass rate</p>
                    </div>
                </section>
            </div>
        </div>
        <div className="row p-1" id='momentsDiv'>
            <br /><br />
            <div className="container p-2 my-5 text-center">
                <h1 className="text-center roon mb-1 display-1">Our moments</h1>
                <p>We are not a school that only focuses on learning and teaching; we capture the <span className="roon">special moments</span> we have as a school, even the little ones. So we have dedicated a page to showcase all the moments for people all around to see just how much we enjoy being a school that <span className="roon">prepares future leaders!</span></p>
            </div> <br /><br />
            {moments.length > 0 ? 
                moments.map((moment, i) => {
                    return (
                        <MomentCard key={i} moment={moment}/>
                    )
                })
            : loading ? <h1 className="text-muted text-center m-3">LOADING MOMENTS... <br /><br /><br /><br /><br /></h1> : <h1 className="text-muted text-center m-3">Eish... no moments yet <br /><br /><br /><br /><br /></h1> }
        </div>
    </>
  )
}

export default Moments;
