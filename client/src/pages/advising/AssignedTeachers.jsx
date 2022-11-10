import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import { useAllTeacherProfileQuery } from "../../services/apiSlice";
import MiniProfile from "../../templates/MiniProfile";

const Advising = () => {
	document.title = "Student Management | Assigned Teachers";
	const profilesInfo = useAllTeacherProfileQuery();

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "650px", m: "auto", p: 3 }} elevation={2}>
				<Typography variant="h5" mb={1}>
					Assigned Teachers
				</Typography>
				<Divider textAlign="center" sx={{ mb: 2 }}>
					<Chip label="Profile & Basic Info." />
				</Divider>
				{profilesInfo.data?.profiles.map((profile) => (
					<MiniProfile
						key={profile._id}
						role="admin"
						profile={profile}
						advisingRanges={profilesInfo.data?.advisingRanges}
					/>
				))}
			</Paper>
		</Box>
	);
};

export default Advising;
