import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MsgSent = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "600px", m: "auto", p: 3 }} elevation={2}>
				<Typography textAlign="center" variant="h5" mb={3}>Thanks for letting us know!</Typography>
				<Box sx={{textAlign: "center"}}>
					<Button variant="contained" color="info" onClick={() => navigate("/")}>
						Go to Home
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default MsgSent;
