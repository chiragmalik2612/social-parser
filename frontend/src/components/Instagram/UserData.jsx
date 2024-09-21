import { Link } from "react-router-dom";
import "./UserData.css";

const UserData = () => {
  return (
    <div>
      <h2>UserName's Data</h2>
      <div className="data-options">
        <div className="profile-pic"></div>
        <div className="option option1">
          <Link to="/insta/user/followers" className="link">Followers</Link>
        </div>
        <div className="option option2">
          <Link to="/insta/user/following" className="link">Following</Link>
        </div>
        <div className="option option3">
          <Link to="/insta/user/posts" className="link">Posts</Link>
        </div>
        <div className="option option4">
          <Link to="/insta/user/chats" className="link">Chats</Link>
        </div>
      </div>
    </div>
  );
};

export default UserData;
