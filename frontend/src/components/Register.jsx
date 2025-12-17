
import Form from "./Form";

function Register() {
  return (
    <div>
        <Form route={'/auth/register/'} method={'register'} />
    </div>
  )
}

export default Register;
