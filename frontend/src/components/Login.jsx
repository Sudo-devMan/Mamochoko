
import Form from "./Form.jsx";

function Login() {
  return (
    <div>
        <Form route={'auth/token/access/'} method={'login'}/>
    </div>
  )
}

export default Login;
