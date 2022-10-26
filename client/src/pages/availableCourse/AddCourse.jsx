import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Tooltip,
	TextField,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { useAddCourseMutation } from "../../services/apiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const initialState = {
	courseCode: "",
	courseName: "",
	courseTeacher: "",
	credit: 3,
	maxNumber: 100,
};

const AddCourse = ({ handleOpenAddBoxes }) => {
	const [newCourse, setNewCourse] = useState(initialState);
	const [addCourse, responseInfo] = useAddCourseMutation();

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
			toast.success(responseInfo.data?.message);
			setNewCourse(initialState);
		} else if (responseInfo.isSuccess && !responseInfo.data?.success) {
			toast.error("Something went wrong adding course");
		}
	}, [responseInfo]);

	const handleOnChange = (e) => {
		setNewCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const submitCourse = (e) => {
		e.preventDefault();
		addCourse(newCourse);
	};

	return (
		<form onSubmit={submitCourse}>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<StyledTableRow>
							<StyledTableCell>Course Code</StyledTableCell>
							<StyledTableCell>Course Name</StyledTableCell>
							<StyledTableCell>Course Teacher</StyledTableCell>
							<StyledTableCell>Credits</StyledTableCell>
							<StyledTableCell>Total Number</StyledTableCell>
							<StyledTableCell align="right">Action</StyledTableCell>
						</StyledTableRow>
					</TableHead>
					<TableBody>
						<StyledTableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<StyledTableCell component="th" scope="row">
								<TextField
									label="Course Code"
									size="small"
									name="courseCode"
									onChange={handleOnChange}
									value={newCourse.courseCode}
									required
								/>
							</StyledTableCell>
							<StyledTableCell>
								<TextField
									label="Course Name"
									size="small"
									name="courseName"
									onChange={handleOnChange}
									value={newCourse.courseName}
									required
								/>
							</StyledTableCell>
							<StyledTableCell>
								<TextField
									label="Course Teacher"
									size="small"
									name="courseTeacher"
									onChange={handleOnChange}
									value={newCourse.courseTeacher}
									required
								/>
							</StyledTableCell>
							<StyledTableCell>
								<TextField
									type="number"
									label="Credit"
									size="small"
									name="credit"
									onChange={handleOnChange}
									value={newCourse.credit}
									required
									inputProps={{ min: 1, max: 5 }}
								/>
							</StyledTableCell>
							<StyledTableCell>
								<TextField
									type="number"
									label="Total Number"
									size="small"
									name="maxNumber"
									onChange={handleOnChange}
									value={newCourse.maxNumber}
									required
									inputProps={{ min: 10, max: 100 }}
								/>
							</StyledTableCell>
							<StyledTableCell align="right">
								<Tooltip title="Add course">
									<Button
										size="small"
										variant="outlined"
										startIcon={<Add />}
										type="submit"
										sx={{mr: "5px"}}
									>
										ADD
									</Button>
								</Tooltip>
								<Tooltip title="Cancel adding course">
									<Button
										size="small"
										variant="outlined"
										color="error"
										startIcon={<Close />}
										onClick={handleOpenAddBoxes}
									>
										Close
									</Button>
								</Tooltip>
							</StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</form>
	);
};

export default AddCourse;
