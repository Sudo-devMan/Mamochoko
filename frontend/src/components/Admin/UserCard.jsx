
import profilePic from '../../assets/imgs/profile.png'
import { Link } from 'react-router-dom';
import { USER } from '../../constants';

function UserCard({username, email, pp, role, id}) {
    const mail = `mailto:${email}`
    const localUser = JSON.parse(localStorage.getItem(USER))
  return (
    <div style={{width: "20em"}} className="card d-inline-block m-1 p-2 col-lg-3 col-md-4 col-12 col-sm-12">
        <img style={{width: "2.8em", height: "2.8em", borderRadius: "100%", objectFit: "cover", marginRight: ".3em"}} src={pp ? pp : profilePic} alt="user profile picture" className="d-inline-block" />
        <Link to={`/admin/users/${id}/detail`}>
          <h4 className="d-inline-block text-dark">{username} <i className="fa-solid fa-square-arrow-up-right"></i>{localUser.id === id && <span>(YOU)</span>}</h4><br />
        </Link>
        <em style={{marginLeft: "3.45em", fontSize: ".9rem"}} className="text-muted text-break"><a href={mail}><i className="fas fa-envelope"></i>{email}</a></em> <br />
        <em style={{marginLeft: "3.45em", fontSize: ".9rem"}} className="text-muted">{role} user</em>
    </div>
  )
}

const picStyle = {width: "2.8em", height: "2.8em", borderRadius: "100%", objectFit: "cover", marginRight: ".3em"}

export default UserCard;
export {profilePic, picStyle}