import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

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
    }}>
      <h3>Platform Selection</h3>
      <Stack direction="column" spacing={1}>
        <Chip label="Instagram"  />
        <Chip label="Facebook" />
        <Chip label="Twitter" />
        <Chip label="WhatsApp" />
        <Chip label="Telegram" />
      </Stack>
    </div>
  );
};

export default PlatformSelection;