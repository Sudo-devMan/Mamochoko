
import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import farFront from '../assets/imgs/far-front.jpg'
import trophyImg from '../assets/imgs/moments/clearTrof.jpg'
import withTopMak from '../assets/imgs/moments/withTopMak.jpg'
import matric2024 from '../assets/imgs/2024-matric.jpg'
import mamsLogo from "../assets/imgs/mamochoko.jpg"
import sample1 from "../assets/imgs/sample1 (1).jpg"
import sample2 from "../assets/imgs/sample1 (2).jpg"
import sample3 from "../assets/imgs/sample1 (5).jpg"
// import sample4 from "../assets/imgs/sample.jpg"
import sample5 from "../assets/imgs/sample1 (6).jpg"
import emailIcon from "../assets/imgs/email.jpg"


const About = () => {
    const [aboutData, setAboutData] = useState(null)
    const [loading, setLoading] = useState(true)

  return (
    <div id='about'>
        <div className="container">
            <div className="row" style={{padding: ".5em"}}>
                <div className="col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-1 roon">About Us</h1>
                    <p>Founded in 2016, Mamochoko Secondary School is commited to providing quality education in the heart of Moletjie, Ga-Kobo</p>
                </div>
                <div className="col-lg-6 col-12">
                    <img src={farFront} alt="far front of mamochoko" className='about-side-image'/>
                </div>

                <hr />

                {/* Mission and Vission */}
                <div className="mission-vision-about">
                    <div className="m-box">
                        <h3 className='roon'>Mission</h3>
                        <p>Motivate staff and members on a continuous basis in order to promote the spirit of <span className="roon">learning and teaching</span> to produce high quality education.</p>
                    </div>
                    <div className="m-box">
                        <h3 className='roon'>Vision</h3>
                        <p>To equipt our learners with <span className="roon">high quality education</span> that will provide them with <span className="roon">skills, knowledge and values</span> necessary to produce marketable citizens.</p>
                    </div>
                </div>
                
                <hr />

                <div className="scronimate-left col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-1 roon">Our Identity</h1>
                    <p>Our name 'Mamochoko' is actually an acronym emanating from the three surrounding villages of our school.</p>
                    <ul>
                        <li><span className="roon fw-bold">Ma</span> - Mashita</li>
                        <li><span className="roon fw-bold">mo</span> - Mokgonyana</li>
                        <li><span className="roon fw-bold">cho</span> - Chokoe</li>
                        <li><span className="roon fw-bold">ko</span> - Kobo</li>
                    </ul>
                </div>
                <div className="col-lg-6 col-12 scronimate-right mb-5">
                    <img src={mamsLogo} alt="far front of mamochoko" className='about-side-image'/>
                    <em className='fs-6 text-muted'>Our_Logo</em>
                </div>

                <div className="scronimate-left col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-3 roon">#100% 2024</h1>
                    <p>
                        We were honoured to receive a <span className="roon">trophy from TopMak</span> for our exceptional 2024 matric performance. <span className="roon">100% pass rate</span>
                    </p>
                </div>
                <div className="col-lg-6 col-12 mb-5">
                    <img src={withTopMak} alt="Mamochoko with TopMak posing with a trophy to celebrate the 100% 2024 Matric pass rate" className='about-side-image'/>
                </div>

                <div className="scronimate-right col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-3 roon">History & Achievements</h1>
                    <p>
                        We had our <span className="roon">first matric class in 2019</span>, just like any ordinary school, the results (64% pass rate) were not satisfactory.
                        On subsequent years we gradually improved our results and <span className="roon">achieved an 88% </span>(matric results) in 2020. Our school's <span className="roon">growth became evident</span> as we annually increased our matric pass rate.
                        In 2021 we managed to achieve 91%, 92% the following year - 2022 - to symbolise our developmet and improvement. We knocked the circuit with  a <span className="roon">100% matric pass rate for two successive years</span>, 2023 & 2024!
                    </p>
                </div>
                <div className="col-lg-6 col-12 scronimate-left mb-5">
                    <img src={trophyImg} alt="2024 100% pass rate award" className='about-side-image'/>
                </div>
                
                <div className="scronimate-left col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="display-3 roon">#Sports Fan</h1>
                    <p>
                        We have always been <span className="roon">supportive</span> when it comes to our learners' talents. We have a <span className="roon">soccer field and a netball field</span>, where our learners can give it their all and develop in sports. They play <span className="roon">soccer and netball</span>; participate in <span className="roon">long jumps, high jumps, javelin, running</span> and much more
                    </p>
                </div>
                <div className="col-lg-6 col-12 scronimate-right mb-5">
                    <img src={matric2024} alt="Mamochoko matric class of 2024" className='about-side-image'/>
                </div>
               

                <div className="row">
                    {/* <div className="m-2 col-lg-6 col-md-6 col-12 mt-5">
                        <img src={trophyImg} alt="far front of mamochoko" className='about-side-image'/>
                    </div>
                    <div className="m-2 col-lg-6 col-md-6 col-12 p-3 d-flex flex-column align-items-center justify-content-center">
                        <h1 className="display-2 roon">History & Achievements</h1>
                        <p>
                            We had our <span className="roon">first matric class in 2019</span>, just like any ordinary school, the results (64% pass rate) were not satisfactory.
                            On subsequent years we gradually improved our results and <span className="roon">achieved an 88% </span>(matric results) in 2020. Our school's <span className="roon">growth became evident</span> as we annually increased our matric pass rate.
                            In 2021 we managed to achieve 91%, 92% the following year - 2022 - to symbolise our developmet and improvement. We knocked the circuit with  a <span className="roon">100% matric pass rate for two successive years</span>, 2023 & 2024!
                        </p>
                    </div>
                    <div className="m-2 col-lg-6 col-md-6 col-12 mt-5">
                        <img src={withTopMak} alt="far front of mamochoko" className='about-side-image'/>
                    </div>
                    <div className="m-2 col-lg-6 col-md-6 col-12 p-3 d-flex flex-column align-items-center justify-content-center">
                        <h1 className="display-5 roon">#100% 2024</h1>
                        <p>
                            We were honoured to receive a <span className="roon">trophy from TopMak</span> for our exceptional 2024 matric performance. <span className="roon">100% pass rate</span>
                        </p>
                    </div>

                    <div className="row">
                        <div className="m-2 col-lg-6 col-md-6 col-12 mt-5">
                            <img src={matric2024} alt="far front of mamochoko" className='about-side-image'/>
                        </div>
                        
                        <div className="m-2 col-lg-6 col-md-6 p-3 col-12 d-flex flex-column align-items-center justify-content-center">
                            <h1 className="display-5 roon">#Sports Fan</h1>
                            <p>
                                We have always been <span className="roon">supportive</span> when it comes to our learners' talents. We have a <span className="roon">soccer field and a netball field</span>, where our learners can give it their all and develop in sports. They play <span className="roon">soccer and netball</span>; participate in <span className="roon">long jumps, high jumps, javelin, running</span> and much more
                            </p>
                        </div>
                    </div>
                     */}
                </div>


                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="hovermation scronimate left-bordered-box shadow-lg mt-5 mr-3 p-3 col-lg-5">
                            <h2 className='roon'>History & Achievements</h2>
                            <p>Over the past {new Date().getFullYear() - 2016} years, our students have excelled in competitions, achieved top matric results, and made our community proud.</p>
                        </div> */}
                        {/* <div className="hovermation scronimate left-bordered-box shadow-lg mt-5 p-3 col-lg-5">
                            <h2 className='text-primary'>Facilities & Programs</h2>
                            <p>Our campus includes mordern sports equipment for our sports-loving students, whiteboards for flexible learning integration, sports fields (netball & soccer), and much more.</p>
                        </div> */}
                        
                        <div className="hovermation scronimate-right left-bordered-box shadow-lg mt-5 p-3 col-lg-5">
                            <h2 className='roon fw-bold'>School Times <i className="fas fa-clock me-2"></i></h2>
                            <ul>
                                <li><span className="roon fw-bold mb-1">07:25</span> - School starts</li>
                                <li><span className="roon fw-bold mb-1">10:45</span> - Lunch break</li>
                                <li><span className="roon fw-bold mb-1">10:45</span> - Visiting hours</li>
                                <li><span className="roon fw-bold mb-1">11:30</span> - End of Lunch Break</li>
                                <li><span className="roon fw-bold mb-1">11:30</span> - End of Visiting hours</li>
                                <li><span className="roon fw-bold mb-1">14:30</span> - Afterschool</li>
                                <li><span className="roon fw-bold mb-1">15:00</span> - Grades 11-12 Study</li>
                                <li><span className="roon fw-bold">16:00</span> - End of study (may vary)</li>
                            </ul>
                        </div>
                        <div className="hovermation scronimate-left left-bordered-box shadow-lg mt-5 p-3 col-lg-5">
                            <h2 className='text-success'>More Moments & Achievements</h2>
                            <p>
                                There are plenty more of our moments and achievements you can browse!
                            </p>

                            <Link to='/moments' className="btn btn-success btn-lg">
                                Explore more <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className="uniform-about text-center m-2 mt-5">
                    <h1 className='roon display-2 scronimate-left'>Uniform</h1>
                    <p>You can purchase our uniform at <span className="roon">Phofu, Polokwane, near Game</span>. Here are a few samples of how it looks like</p>
                    <div className="uniform-pics" style={{scrollbarWidth: "none"}}>
                        <img src={sample1} alt="image of student in uniform" className="uniform-pic scronimate-left" />
                        <img src={sample2} alt="image of student in uniform" className="uniform-pic" />
                        <img src={sample3} alt="image of student in uniform" className="uniform-pic" />
                        {/* <img src={sample4} alt="image of student in uniform" className="uniform-pic" /> */}
                        <img src={sample5} alt="image of student in uniform" className="uniform-pic" />
                    </div>
                </div>
                <center>
                    <NavLink to={"/contact"} className={"text-decoration-none scronimate-right"}><h1 className="roon m-5 scronimate-right">Click here to contact us!</h1></NavLink>
                </center>
            </div>
        </div>
    </div>
  )
}

export default About;