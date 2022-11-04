import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useDeleteStudentProfileMutation } from "../services/apiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loading from './loading/Loading';

const TeacherMiniProfile = ({ profile, role = "teacher" }) => {
	const [deleteProfile, responseInfo] = useDeleteStudentProfileMutation();

	const handleDeleteProfile = (id) => {
		deleteProfile(id);
	};

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
			toast.success(responseInfo.data?.message);
		}
	}, [responseInfo]);

	if(responseInfo.isLoading) {
		return <Loading />
	}
	return (
		<Accordion elevation={2} TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content">
				<Stack
					sx={{ width: "100%" }}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography>{profile?.fullName}</Typography>
					{role === "student" && (
						<Button
							onClick={() => handleDeleteProfile(profile?._id)}
							size="small"
							color="error"
							variant="outlined"
							sx={{ mr: 2 }}
							disabled={responseInfo.isLoading}
						>
							Unregister
						</Button>
					)}
				</Stack>
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
							<strong>{role === "student" ? "Student Id: " : "Employee Id: "}</strong>
							{profile?.userId}
						</Typography>
						{role === "teacher" && (
							<Typography mb="5px">
								<strong>Designation: </strong>
								{profile?.designation}
							</Typography>
						)}
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
				{role === "student" && (
					<>
						<Divider textAlign="left">
							<Chip label="Local Guardian Info" />
						</Divider>
						<Box sx={{ my: 3 }}>
							<Typography mb="5px">
								<strong>Guardian Name: </strong>
								{profile.localGuardianName}
							</Typography>
							<Typography mb="5px">
								<strong>Guardian Email: </strong>
								{profile.localGuardianEmail}
							</Typography>
							<Typography>
								<strong>Guardian mobile: </strong>
								{profile.localGuardianMobile}
							</Typography>
						</Box>
						<Divider textAlign="left">
							<Chip label="Registered Courses" />
						</Divider>
						{/* course table */}
						<TableContainer component={Paper} sx={{ my: 3 }} elevation={2}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow sx={{ whiteSpace: "nowrap" }}>
										<TableCell>Course Code</TableCell>
										<TableCell align="right">Course Name</TableCell>
										<TableCell align="right">Course Teacher</TableCell>
										<TableCell align="right">Credits</TableCell>
										<TableCell align="right">Max Number</TableCell>
										<TableCell align="right">Number</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{/* {rows.map((row) => ( */}
									<TableRow
										key={"none"}
										sx={{
											"&:last-child td, &:last-child th": { border: 0 },
											whiteSpace: "nowrap",
										}}
									>
										<TableCell component="th" scope="row">
											SE304
										</TableCell>
										<TableCell align="right">
											Advanced Database System
										</TableCell>
										<TableCell align="right">Anisul Islam</TableCell>
										<TableCell align="right">3</TableCell>
										<TableCell align="right">100</TableCell>
										<TableCell align="right">
											<TextField type="number" />
										</TableCell>
									</TableRow>
									{/* ))} */}
								</TableBody>
							</Table>
						</TableContainer>
					</>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default TeacherMiniProfile;
