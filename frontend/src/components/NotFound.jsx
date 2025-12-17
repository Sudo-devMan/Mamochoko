
import React from 'react'

function NotFound() {
  return (
    <div style={{zIndex: "1", marginTop: "5em", marginBottom: "23em"}} className='w-100 h-100 bg-white'>
        <h1 className='display-1 fw-bold text-center m-1'>The page you have requested was <span className="text-danger">NOT FOUND</span></h1>
        <p className='text-center display-4'>Ayakwen</p>
        <center>
          <button className='btn btn-secondary m-1' onClick={() => history.back()}>Go back</button>
        </center>
    </div>
  )
}

export default NotFound;