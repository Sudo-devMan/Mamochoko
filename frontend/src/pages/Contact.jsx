
import React from 'react'
import locationImg from '../assets/imgs/location.jpg'
import phoneImg from '../assets/imgs/phone.jpg'
import emailImg from '../assets/imgs/email.jpg'
import farFront from '../assets/imgs/far-front.jpg'

function Contact() {
  return (
    <div className='mt-3 container container-fluid' id='contact'>
      <br />
        <div className="container">
              {window.screen.width > 480 ? 
                <div className="row my-3" style={{padding: ".5em"}}>
                  <div className="col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <h1 className="roon">Contact Info</h1>
                    <hr />
                    <h3>Address <i className="fas fa-location me-2"></i>:</h3>
                    <p>Limpopo, Polokwane, Moletjie, Ga-Kobo, Stand no. 406 <br />
                       PO BOX 3192 <br />KOLOTI <br /> 0709</p>
                    
                    <h3>Email & Phone <i className="fas fa-email me-2"></i><i className="fas fa-phone me-2"></i></h3>
                    <p><strong className='text-secondary'>Email:</strong> mamochokos@gmail.com <br />
                       <strong className='text-secondary'>Phone:</strong> 066 559 8863</p>
                    <br />
                    <h3>Facebook Page <i className="fas fa-circle-user me-2"></i>:</h3>
                    <p><a href="https://www.facebook.com/profile.php?id=100083172677011" target='_blank'>Mamochoko Secondary School</a></p>
                  </div>
                  <div className="col-lg-6 col-12">
                      <img src={farFront} width={100} alt="location icon" className='contact-side-image align-middle'/>
                  </div>
                </div>
                :                  <div className="row my-3" style={{padding: ".5em"}}>
                  <div className="col-lg-6 col-12 d-flex flex-column align-items-center justify-content-center">
                    <div className="col-lg-6 col-12">
                        <img src={farFront} width={100} alt="location icon" className='contact-side-image'/>
                    </div>
                    <h1 className="roon">Contact Info</h1>
                    <hr />
                    <h3>Address <i className="fas fa-location me-2"></i>:</h3>
                    <p>Limpopo, Polokwane, Moletjie, Ga-Kobo, Stand no. 406 <br />
                       PO BOX 3192 <br />KOLOTI <br /> 0709</p>
                    
                    <h3>Email & Phone <i className="fas fa-email me-2"></i><i className="fas fa-phone me-2"></i></h3>
                    <p><strong className='text-secondary'>Email:</strong> mamochokos@gmail.com <br />
                       <strong className='text-secondary'>Phone:</strong> 066 559 8863</p>
                    <br />
                    <h3>Facebook Page <i className="fas fa-circle-user me-2"></i>:</h3>
                    <p><a href="https://www.facebook.com/profile.php?id=100083172677011" target='_blank'>Mamochoko Secondary School</a></p>
                  </div>
                </div>
                 }
                <hr />

              <div className="row">
                <div id='emailDivInContactPage' className="col-lg-4 h-50 col-12">
                  <img src={emailImg} width={100} alt="email icon" className='email-side-image'/>
                </div>
                <div className="col-lg-6 col-12 p-4 mt-5 m-1 rounded-3 border shadow bg-light">
                  <h1 className="text-center">Send a quick email</h1>
                  <form method='post' className="form ">
                    <div className="form-group">
                      <label htmlFor="name">Your name and Surname:</label>
                      <input disabled type="text" className="form-control fs-5" placeholder='name & surname...' />
                    </div>

                    <div className="form-group my-2">
                      <label htmlFor="body">Write your message:</label>
                      <textarea disabled name="body" cols={3} placeholder='write your message here...' className="form-control fs-5"></textarea>
                    </div>

                    <div className="form-group mb-2 w-100">
                      <input disabled type="submit" value="Send Email" className="btn btn-secondary col-12 mt-3" />
                    </div>
                  </form>
                </div>

                
                <div className="col-lg-6 col-12 m-5">
                  <h1 className='roon'>Additional info</h1>
                  <h3>Visiting hours: </h3>
                  <p>Visitors can only visit at break time ( between <span className="roon fw-bold">10:45-11:30</span> ) unless stated otherwise by the school administration.</p>
                </div>
              </div>
        </div>
    </div>
  )
}

export default Contact;