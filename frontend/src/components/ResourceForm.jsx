
import React, {useState} from 'react'
import api from '../api.js';

function ResourceForm() {
    //         fields = ['id', 'heading', 'body', 'document', 'user', 'upload_date']
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(true)


    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const form = new FormData();
        form.append('heading', heading)
        form.append('body', body);
        form.append('document', document)

        try {
            const res = await api.post('management/resources/', form);
            console.log(res)
            alert('Successfully uploaded resource')
            setLoading(false)
            window.location.reload()
        } catch (err) {
            alert(err)
            console.log(err)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

  return (
        <div className="review-form m-2 border rounded-2 bg-light col-lg-5 p-3">
            <h3 className='roon'>Upload a resource</h3>
            <p className="text-muted">*RESOURCES CAN BE PHOTOS, PDFs, AND OTHER DOCUMENT TYPES</p>
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
                    loading ? <input type="button" disabled value={"Uploading..."} className='btn btn-primary' />
                        : <input type="submit" className='btn btn-primary' value={'Upload'} />
                }
            </form>
        </div>
  )}

export default ResourceForm;
