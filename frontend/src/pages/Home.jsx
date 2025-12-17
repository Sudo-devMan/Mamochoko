
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='homepage'>
        <section className="hero align-middle">
            <div>
                <h1 className='text-white fw-bold display-1 m-2 mt-4 text-jump-bruh'>PREPARING <br /> FUTURE <span className='roon'>LEADERS</span></h1>
                <p className='text-white mx-2 my-2 fs-4'>The school is dedicated to providing quality education, fostering academic excellence and holistic development.</p>
                <Link to={'/online/application'}>
                    <button className='btn btn-default text-white fs-4' style={{backgroundColor: "#9c2121"}}>Apply online</button>
                </Link>
            </div>
        </section>
    </div>
  )
}

export default Home;