import { Link } from "react-router-dom";
import { Paper, Typography, Button } from "@mui/material";
import { AccountBox } from "@mui/icons-material";

const NoProfile = () => {
	return (
		<Paper sx={{ m: 3, p: 3, mt: "88px" }} elevation={2}>
			<Typography variant="h5" mb={2} textAlign="center">
				Currently, you don't have any profile!
			</Typography>
			<Typography textAlign="center">
				<Link to="/profile/create" replace>
					<Button size="small" variant="contained" color="info" endIcon={<AccountBox />}>
						Create Profile
					</Button>
				</Link>
			</Typography>
		</Paper>
	);
};

export default NoProfile;
