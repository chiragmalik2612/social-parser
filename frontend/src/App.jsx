import { Routes, Route } from "react-router-dom";
import UserData from "./components/Instagram/Userdata";
import PlatformSelection from "./components/PlatformSelection";
import Posts from "./components/Instagram/Posts";
import Followers from "./components/Instagram/Followers";
import Following from "./components/Instagram/Following";
import Chats from "./components/Instagram/Chats";

function App() {
  return (
    <div
      style={{
        padding: "0.5rem",
      }}
    >
      <Routes>
        <Route path="/" element={<PlatformSelection />} />
        <Route path="/insta/user" element={<UserData />} />
        <Route path="/insta/user/posts" element={<Posts />} />
        <Route path="/insta/user/followers" element={<Followers />} />
        <Route path="/insta/user/following" element={<Following />} />
        <Route path="/insta/user/chats" element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
