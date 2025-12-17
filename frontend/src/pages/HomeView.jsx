import React from 'react'
import HomeTabs from '../components/HomeTabs';
import Home from './Home';
import Header from '../components/Header';

function HomeView() {
  return (
    <>
        <div className="body">
            <Header/>
            <Home/>
        </div>
        <div className="hometabs">
            <p className="text-muted text-center fs-6">A RE BONENG MAMOCHOKO!!</p>
            
            
            <HomeTabs/>
            <br /><br /><br />
        </div>
    </>
  )
}

export default HomeView;