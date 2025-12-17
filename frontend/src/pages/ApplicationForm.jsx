
import { useState } from "react";
import api from "../api";

function ApplicationForm() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(e.target)
            formData.append('pending', true)
            let data = {}
            formData.forEach((value, key) => {
                data[key] = value
            })
            // console.log("formData: ", formData)
            // console.log("data: ",data)
            const res = await api.post('management/learner-applications/', formData)
            if (res.status === 201) {
                alert(`Application for admission for ${formData.get('learner_first_name')} has been submitted successfully and is now pending. Please await a response from us via your phone number or email.`)
                e.target.reset()
            } else {
                alert("Something went wrong. Please try again, if the issue persists we advise you contact us.")
            }
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className="row p-2">
        <div className="col-lg-6">
            <h1 className="m-5 text-center roon">ONLINE APPLICATION FORM</h1>
            <p className="text-center">*Please ensure that you provide accurate and required information otherwise your application would not be successful.</p>
        </div>
        <div className="border p-2 rounded-2 mb-5 m-2 col-lg-4 application-form">
            <form encType='multipart/form-data' method="post" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="learner_first_name">Learner's name:</label>
                    <input required type="text" placeholder="learner's name..." name='learner_first_name' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="learner_surname">Learner's surname:</label>
                    <input required type="text" placeholder="learner's surname..." name='learner_surname' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="picture">Learner's full body picture:</label>
                    <input required type="file" accept="image/*" name='picture' className="form-control" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="parent_first_name">Parent's name:</label>
                    <input required type="text" placeholder="parent's name..." name='parent_first_name' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="parent_surname">Parent's surname:</label>
                    <input required type="text" placeholder="parent's surname..." name='parent_surname' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="parent_relation">Relation to parent:</label>
                    <select required className="form-control" name="parent_relation">
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Sister">Sister</option>
                        <option value="Brother">Brother</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Grandmother">Grandmother</option>
                        <option value="Grandfather">Grandfather</option>
                    </select>
                </div>

                
                <div className="form-group mb-3">
                    <label htmlFor="grade_applied_for">Grade applying for:</label>
                    <select required name="grade_applied_for" className="form-control">
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="highest_grade_passed">Highest grade passed:</label>
                    <select required name="highest_grade_passed" className="form-control">
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="previous_school">Previous school:</label>
                    <input required type="text" name="previous_school" placeholder="previous school name..." className="form-control" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="year_when_grade_was_passed">Year passed:</label>
                    <input required type="number" placeholder='year learner passed the grade...' name='year_when_grade_was_passed' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="last_report">Picture of learner's last report:</label>
                    <input required type="file" accept="image/*" name='last_report' className="form-control"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="date_of_birth">Birth date:</label>
                    <input required type="date" name="date_of_birth" className="form-control" />
                    {/* <input required type="text" placeholder="eg. 31 February 2010" name='date_of_birth' className='form-control' /> */}
                </div>

                
                <div className="form-group mb-3">
                    <label htmlFor="gender">Learner's gender:</label>
                    <select required className="form-control" name="gender">
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="id_or_passport">Learner's ID or passwort number:</label>
                    <input required type="text" placeholder="ID or Passport..." name='id_or_passport' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="citizenship">Citizenship</label>
                    <input required type="text" placeholder="eg. South African, Nigerian, etc" name='citizenship' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="country_of_residence">Country of residence:</label>
                    <input required type="text" placeholder="country..." name='country_of_residence' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="phone">Parent's phone number:</label>
                    <input required type="text" placeholder="phone..." name='phone' className='form-control' />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="email">Parent's email: (optional)</label>
                    <input type="text" placeholder="email..." name='email' className='form-control' />
                </div>

                <div className="form-group">
                    {
                        loading ? <button disabled className="btn btn-success col-12">Submitting...</button>
                                : <input type="submit" value="Apply" className="btn btn-success col-12"/>
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default ApplicationForm;