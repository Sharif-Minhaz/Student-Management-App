import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import MiniProfile from "../../templates/MiniProfile";
import { useAllStudentProfileQuery } from "../../services/apiSlice";
import "./registeredStudent.css";
const RegisteredStudent = () => {
	document.title = "Student Management | Registered-Students";
	const profilesInfo = useAllStudentProfileQuery();

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "650px", m: "auto", p: 3 }} elevation={2}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Typography variant="h5" mb={1}>
						Registered Students
					</Typography>
					<span>
						<Chip label={`Total: ${profilesInfo.data?.profiles?.length}`} />
					</span>
				</Stack>
				<Divider textAlign="center" sx={{ mb: 2 }}>
					<Chip label="Profile & Basic Info." />
				</Divider>
				{profilesInfo.data?.profiles.map((profile) => (
					<MiniProfile key={profile._id} profile={profile} role="student" />
				))}
			</Paper>
		</Box>
	);
};

export default RegisteredStudent;
