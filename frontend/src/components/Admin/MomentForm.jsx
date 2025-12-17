
import api from '../../api'
import { useState } from 'react'

function MomentForm() {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [facebookLink, setFacebookLink] = useState('')
	const [files, setFiles] = useState([])
	const [uploading, setUploading] = useState(false)

	const handleSubmit = async(e) => {
		e.preventDefault()
		setUploading(true)
		try {
			const formData = new FormData()
			formData.append('title', title)
			formData.append('body', body)
			formData.append('facebook_link', facebookLink)
			files.forEach((f) => formData.append('media_uploads', f))

			const res = await api.post('management/moments/', formData)

			setTitle('')
			setBody('')
			setFiles([])
			e.target.reset()
		} catch (err) {
			alert(err.message)
			console.log(err)
		} finally {
			setUploading(false)
			window.location.reload()
		}
	}
	return (
		<form className='col-lg-4 m-3 p-2 rounded-2 border bg-light' method='post' onSubmit={handleSubmit}>
			<h1 className='roon mb-3'>Share a moment</h1>
			
			<input required type='text' className='form-control mb-2' placeholder='moment title' value={title} onChange={(e) => setTitle(e.target.value)}/>
			
			<textarea required rows={8} value={body} onChange={(e) => setBody(e.target.value)} placeholder='what was happening?' className='form-control mb-3'></textarea>
			
			<label htmlFor='files'>Click below to select videos and pictures</label>
			<input name='files' required type='file' className='form-control mb-2' multiple accept='image/*, video/*' onChange={(e) => setFiles(Array.from(e.target.files))}/>
			
			{
				uploading ? <button type='submit' className='btn btn-primary col-12' disabled>sharing...</button>
							: <button type='submit' className='btn btn-primary col-12'>Share</button>
			}
		</form>
	)
}

export default MomentForm;