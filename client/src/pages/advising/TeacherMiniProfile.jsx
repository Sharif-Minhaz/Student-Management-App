import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const TeacherMiniProfile = ({ profile }) => {
	return (
		<Accordion elevation={2}>
			<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
				<Typography>{profile?.fullName}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Divider />
				<Stack direction="row" py={2} gap={2}>
					<Avatar
						variant="rounded"
						sx={{
							width: 150,
							height: 150,
							objectFit: "cover",
							boxShadow:
								"0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
						}}
						src={profile?.profilePicture}
					/>
					<Divider orientation="vertical" flexItem />
					<Box>
						<Typography mb="5px">
							<strong>Full Name: </strong>
							{profile?.fullName}
						</Typography>
						<Typography mb="5px">
							<strong>Employee Id: </strong>
							{profile?.userId}
						</Typography>
						<Typography mb="5px">
							<strong>Email Address: </strong>
							{profile?.email}
						</Typography>
						<Typography mb="5px">
							<strong>Mobile number: </strong>
							{profile.mobile}
						</Typography>
						<Typography mb="5px">
							<strong>Present Address: </strong>
							{profile.presentAddress}
						</Typography>
						<Typography>
							<strong>Permanent Address: </strong>
							{profile.permanentAddress}
						</Typography>
					</Box>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default TeacherMiniProfile;
