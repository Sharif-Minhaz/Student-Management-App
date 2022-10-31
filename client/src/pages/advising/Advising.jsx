import {
	Box,
	Chip,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { useAllTeacherProfileQuery } from "../../services/apiSlice";
import TeacherMiniProfile from "./TeacherMiniProfile";

const Advising = () => {
	document.title = "Student Management | Advising";
	const profilesInfo = useAllTeacherProfileQuery();

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "650px", m: "auto", p: 3 }} elevation={2}>
				<Typography variant="h5" mb={1}>
					Advised Teacher
				</Typography>
				<Divider textAlign="center" sx={{ mb: 2 }}>
					<Chip label="Profile & Basic Info." />
				</Divider>
				{profilesInfo.data?.profiles.map((profile) => (
					<TeacherMiniProfile key={profile._id} profile={profile} />
				))}
			</Paper>
		</Box>
	);
};

export default Advising;
