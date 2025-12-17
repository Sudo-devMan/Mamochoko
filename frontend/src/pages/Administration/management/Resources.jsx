
import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ResourceForm from '../../../components/ResourceForm'
import api from '../../../api.js'



function Resources() {
    const [showForm, setShowForm] = useState(false)
    const [btnText, setText] = useState("Add Resource")
    const [btnIcon, setIcon] = useState("plus")
    const [downloading, setDownloading] = useState(false);
    const [downID, setDownID] = useState(null);
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');
    const [document, setDocument] = useState(null);
    const [uploading, setUploading] = useState(false)
    const [pending, setPending] = useState(true)


    const handleSubmit = async(e) => {
        e.preventDefault()
        setUploading(true)
        const form = new FormData();
        form.append('heading', heading)
        form.append('body', body);
        form.append('document', document)

        try {
            const res = await api.post('management/resources/', form);
            // console.log(res)
            if (res.status === 201) {
              alert('Successfully uploaded resource')
              setBody('')
              setHeading('')
              e.target.reset()
              setUploading(false)
              // window.location.reload()
              e.target.reset()
              fetchResources()
            }  else {
              alert("Sumn went went wrong")
              console.log(res)
            }
            
        } catch (err) {
            alert(err)
            // console.log(err)
            setUploading(false)
        } finally {
            setUploading(false)
        }
    }


    const handleForm = () => {
        setShowForm(p => !p)
        if (!showForm) {
            setText("Hide Form");
            setIcon("close")
        } else {
            setText("Add Resource");
            setIcon("plus")
        }
    }

      const [thePapers, setThePapers] = useState([])
      const [resources, setResources] = useState([])
      const [search, setSearch] = useState("")
      const [loading, setLoading] = useState(false)
    
      useEffect(() => {
          if (search.trim().length > 0) {
            let theNewPapers = resources.filter((paper) => {
              if (
                  paper.body.toLowerCase().includes(search.toLowerCase()) || 
                  paper.heading.toLowerCase().includes(search.toLowerCase()) ||
                  paper.user.username.toLowerCase().includes(search.toLowerCase()) ||
                  paper.user.role.toLowerCase().includes(search.toLowerCase())
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
        fetchResources()
      }, [])
    
        const fetchResources = () => {
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
              alert(err)
            })
        }

      const [deleting, setDeleting] = useState(false);
      const [deletingID, setDeletingID] = useState(null)

    const deleteResource = async (id) => {
        setDeleting(true)
        setDeletingID(id)
        try{
            const by = await api.get(`management/resources/${id}/`)
            let isSure = prompt("Type 'yes' to delete the reource ".concat(by.data.heading, " by ", by.data.user.username))
            if (!isSure) isSure = "no";
            if (isSure.toLowerCase() === 'yes') {
                const res = await api.delete(`management/resources/${id}/`)
                if (res.status === 204) {
                    setDeleting(false)
                    setDeletingID(null)
                    alert(`Successfully deleted Resource by ${by.data.user.username}`)
                    // window.location.reload()
                    fetchResources()
                } else {
                    // console.log(res)
                    alert("Failed to delete the Resource by ".concat(by.data.user.username, ". Please try again later."))
                    setDeleting(false)
                    setDeletingID(null)
                }

            } else {
                alert("Resource by " + by.data.user.username + " was not deleted because you did not type 'yes'")
                setDeleting(false)
                setDeletingID(null)
            }
        } catch (err) {
            alert(err.message)
            // console.log(err)
            setDeleting(false)
            setDeletingID(null)
        } finally {
            setDeleting(false)
            setDeletingID(null)
        }
    }

  return (
    <div>
        <div className="div bg-dark-roon-sm text-light">
            <nav className='p-2'>
                <NavLink className={"naked-link-sm"} to={"/admin/home"}>Home {">"}</NavLink>
                <NavLink className={"naked-link-sm"} to={"/admin/resources"}>Resources  {">"}</NavLink>
            </nav>
        </div>
        <div className='m-3'>
            <h4 className='text-dark fs-3'>Resources</h4>
            <button onClick={() => handleForm()} className="btn btn-secondary rounded-5">
                <i className={`fas fa-${btnIcon} me-2`}></i> {btnText}
            </button>
        </div>

        {
            showForm && <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
            <h3 className='roon'>Upload a resource</h3>
            <form encType='multipart/form-data' onSubmit={handleSubmit} method='post'>
                <div className="form-group mb-2">
                    <input required value={heading}
                           onChange={(e) => setHeading(e.target.value)}
                           type="text" className="form-control"
                           name='name'
                           placeholder='Title.....' />
                    <textarea required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='About the resource?'
                        name="body" id="body"
                        className="form-control mb-1"
                        rows={5}></textarea>
                    
                </div>

                <div className="form-group mb-5 border bg-white p-3 rounded-5">
                    <label htmlFor="resource">Click to selelect resource</label>
                    <input required type="file" onChange={(e) => setDocument(e.target.files[0])} name="resource" id="resource" />
                </div>

                {
                    uploading ? <input type="button" disabled value={"Uploading..."} className='btn btn-primary' />
                        : <input type="submit" className='btn btn-primary' value={'Upload'} />
                }
            </form>
        </div>
        }

        <form onSubmit={(e) => e.preventDefault()} className="border m-3 form p-1 d-flex justify-self-center col-lg-4">
            <div className="form-group col-12">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder='search resource..' className="form-control" />
            </div>
        </form>

        {thePapers.length > 0 ? 
          thePapers.map((paper, i) => {
            // console.log("Search: ", search) // debugging with the console as usual
            // console.log("Papers: ", thePapers)
            return (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 my-2 d-inline-block m-1">
                <div style={{border: `.15em solid rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`}} className="card">
                  <div className="card-header">{paper.heading}</div>
                  <div className="card-body">
                    <h4 className="card-title">{paper.body}</h4>
                  </div>
                  <div className="card-footer">
                    {downloading && downID === paper.id ?
                       <button disabled style={{backgroundColor: `rgb(50, 76, 232)`}} className="card-link btn btn-success d-inline-block m-1">
                            ...
                          </button>
                          :
                          <button
                        style={{backgroundColor: `rgb(50, 76, 232)`}}
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
                      {
                        deleting && deletingID === paper.id ? <button disabled className='btn btn-danger m-1'>
                                        ...
                                    </button>
                                :   <button className='btn btn-danger m-1' onClick={() => deleteResource(paper.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                      }
                    <p className='text-muted d-inline-block mx-2' style={{fontSize: ".7rem"}}>by: {paper.user.username} | {paper.user.role}
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
  )
}

export default Resources;
