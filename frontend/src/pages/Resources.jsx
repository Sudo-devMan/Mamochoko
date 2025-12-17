
import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import farFront from '../assets/imgs/far-front.jpg'
import papers from '../../data/papers';
import api from '../api.js'
import { Link } from 'react-router-dom';
import { USER } from '../constants.js';

const resourceLinks = {
  textDecoration: "underline",
  fontSize: "1.2rem",
  color: "#000"
}

function Resources() {

  const [thePapers, setThePapers] = useState([])
  const [resources, setResources] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false);
  const [downID, setDownID] = useState(null);
  const localUser = JSON.parse(localStorage.getItem(USER))


  useEffect(() => {
      if (search.trim().length > 0) {
        let theNewPapers = resources.filter((paper) => {
          if (
              paper.body.toLowerCase().includes(search.toLowerCase()) || 
              paper.heading.toLowerCase().includes(search.toLowerCase()) ||
              paper.user.username.toLowerCase().includes(search.toLowerCase())
            )
            {
            return paper
          }
        })
      // console.log(theNewPapers)
      setThePapers(theNewPapers);
    } else {
      setThePapers(resources);
    }
  }, [search])

  useEffect(() => {
    setLoading(true)
    api.get('management/resources/')
      .then(resources_d => {
        setResources(resources_d.data)
        setThePapers(resources_d.data)
        // console.log(resources_d)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        alert(err.message)
      })
  }, [])

  return (
    <>
      <div className="body-2">
          <Header/>
          <div className='homepage'>
              <section className="hero align-middle">
                  <div>
                      <h1 className='white-on-phone text-secondary fw-bold display-1 m-2 mt-4'>WE'VE COOKED <br /> UP SOME <span className='roon'>RESOURCES</span></h1>
                      <p className='text-white mx-2 mt-2 fs-4'>Here are some of the best resources to assist learners in excelling in their studies. These resources are for everyone, not just Mamochoko learners!</p>
                  </div>
              </section>
          </div>
      </div>

      <div className="goUpBg row my-1 border p-2 shadow rounded-3 mx-2" style={{padding: ".5em"}}>
        <h1 className="text-center roon">Resource websites</h1>
        <div className="col-lg-12 col-6 d-flex flex-column align-items-center justify-content-center">
          <a style={resourceLinks} target='_blank' href="https://devmanio.pythonanywhere.com">ExtraPolation (Maths QPs)</a> <br />
          {/* <a style={resourceLinks} target='_blank' href="https://testpapers.com">TestPapers (All subjects QPs)</a> */}
        </div>

        <hr className="my-3" />

        <h2 className="text-center roon mt-2">Do you have resources you wish to share?</h2>
        <p className="text-center">Join us and share your useful resources to help all students in their studies</p>
        <center>
          {
            localUser !== null ?<button disabled className="btn btn-success px-5 fs-5">Joined</button>
                              : <Link to={'/register'}><button className="btn btn-success px-5 fs-5">Join</button></Link>
          }
        </center>
        <hr className="my-3" />
        <div className="col-lg-12 col-6 align-middle" style={{
          display: "flex",
          alignSelf: "center"
        }}>
          <i style={{transform: "scale(2)", color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="fas fa-book display-1 d-lg-none-bruh"></i>
        </div> 
      
        <div className="col-12 mt-5 row rounded-3 p-2">
          <h1 className="text-center roon">Question papers and study guides</h1>

          <center>
            <div className='col-lg-4 col-md-4 col-sm-8 d-flex justify-self-center m-1'>
              <input type="search"
                  name="search" 
                  id="search" 
                  placeholder='search...' 
                  className=' form-control rounded-5'
                  onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </center>

        {thePapers.length > 0 ? 
          thePapers.map((paper, i) => {
            // console.log("Search: ", search) // debugging with the console as usual
            // console.log("Papers: ", thePapers)
            return (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 my-2">
                <div style={{border: `.15em solid rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="card">
                  <div className="card-header">{paper.heading}</div>
                  <div className="card-body">
                    <h4 className="card-title">{paper.body}</h4>
                  </div>
                  <div className="card-footer">
                    {downloading && downID === paper.id ?
                       <button disabled style={{backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`}} className="card-link btn btn-success d-inline-block m-1">
                            ...
                          </button>
                          :
                          <button
                        style={{backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`}}
                        className="card-link btn btn-success d-inline-block m-1"
                        onClick={async() => {
                          setDownloading(true)
                          setDownID(paper.id)
                          try {
                            const f = await fetch(paper.document);
                            const b = await f.blob();
                            const url = window.URL.createObjectURL(b);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = paper.heading;
                            a.click();
                            window.URL.revokeObjectURL(url);
                          } catch (err) {
                            alert(err.message)
                          } finally {
                            setDownloading(false)
                            setDownID(null)
                          }
                        }}
                        ><i className='fas fa-file-download'></i></button>
                        }
                      <a href={paper.document} target='_blank' className="btn btn-secondary">
                        <i className="fas fa-eye"></i>
                      </a>
                    <p className='text-muted d-inline-block mx-2' style={{fontSize: ".7rem"}}>{paper.user.username} | {paper.user.role}
                        <br />
                        {String(paper.upload_date).slice(0, String(paper.upload_date).slice(0, String(paper.upload_date).lastIndexOf('.')).lastIndexOf(':')).split('T').join(' ~ ').split('-').join('/')}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        : loading ? <div className="text-center text-muted fw-bold">
                      <h1 className='text-center m-5 text-muted fw-bold'>Loading...</h1>
                    </div>
                  : search.trim().length > 0 ? <h1 className="text-center text-muted m-5">Could not find <span className="text-warning">{search}</span></h1>
                                            : <h1 className='text-center text-muted m-5'>No papers/study guides</h1>}

        </div>
      </div>
    </>
  )
}

export default Resources;