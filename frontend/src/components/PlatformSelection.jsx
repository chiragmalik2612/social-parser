import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Link } from "react-router-dom";

const PlatformSelection = () => {
  return (
    <div
    style={{
        width:"250px",
        height:"300px",
        margin:"auto",
        padding:"10px",
        border:"1px solid black",
        borderRadius:"5px",
        marginTop:"100px",
        textAlign:"center",
    }}>
      <h3>Platform Selection</h3>
      <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        gap:"1rem",
        alignItems:"center",
      }}>

      <Link to ="/insta/user"> <Chip label="Instagram"/></Link>
        <Chip label="Facebook" />
        <Chip label="Twitter" />
        <Chip label="WhatsApp" />
        <Chip label="Telegram" />

      </div>
    </div>
  );
};

export default PlatformSelection;