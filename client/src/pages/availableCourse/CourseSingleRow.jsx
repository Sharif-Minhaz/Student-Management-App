import { Close, DeleteOutline, Edit, CheckCircleOutline } from "@mui/icons-material";
import { Tooltip, Button, TextField, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useIsLoggedInQuery, useUpdateCourseMutation } from "../../services/apiSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

const CourseSingleRow = ({ rowData, deleteCourse }) => {
	const roleInfo = useIsLoggedInQuery();
	const [updateCourse, responseInfo] = useUpdateCourseMutation();
	const [updateCourseData, setUpdateCourse] = useState(rowData);
	const [updateStatus, setUpdateStatus] = useState(false);

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
            setUpdateStatus(false);
			toast.success(responseInfo.data?.message);
		} else if (responseInfo.isSuccess && !responseInfo.data?.success) {
			toast.error("Something went wrong!");
		}
	}, [responseInfo]);

	const handleClick = () => setUpdateStatus((prev) => !prev);

	const handleOnChange = (e) => {
		setUpdateCourse((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleUpdateSubmit = () => {
		updateCourse(updateCourseData, rowData.courseCode);
	};

	return (
		<StyledTableRow
			key={rowData._id}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<StyledTableCell component="th" scope="row">
				{updateStatus ? (
					<TextField
						label="Course Code"
						size="small"
						name="courseCode"
						onChange={handleOnChange}
						value={updateCourseData.courseCode}
						required
					/>
				) : (
					rowData.courseCode
				)}
			</StyledTableCell>
			<StyledTableCell>
				{updateStatus ? (
					<TextField
						label="Course Name"
						size="small"
						name="courseName"
						onChange={handleOnChange}
						value={updateCourseData.courseName}
						required
					/>
				) : (
					rowData.courseName
				)}
			</StyledTableCell>
			<StyledTableCell>
				{updateStatus ? (
					<TextField
						label="Course Teacher"
						size="small"
						name="courseTeacher"
						onChange={handleOnChange}
						value={updateCourseData.courseTeacher}
						required
					/>
				) : (
					rowData.courseTeacher
				)}
			</StyledTableCell>
			<StyledTableCell>
				{updateStatus ? (
					<TextField
						type="number"
						label="Credit"
						size="small"
						name="credit"
						onChange={handleOnChange}
						value={updateCourseData.credit}
						required
						inputProps={{ min: 1, max: 5 }}
					/>
				) : (
					rowData.credit
				)}
			</StyledTableCell>
			<StyledTableCell>
				{updateStatus ? (
					<TextField
						type="number"
						label="Total Number"
						size="small"
						name="maxNumber"
						onChange={handleOnChange}
						value={updateCourseData.maxNumber}
						required
						inputProps={{ min: 10, max: 100 }}
					/>
				) : (
					rowData.maxNumber
				)}
			</StyledTableCell>
			{roleInfo.data?.success && roleInfo.data?.user?.role === "teacher" && (
				<StyledTableCell align="center">
					<Tooltip title={updateStatus ? "Cancel" : "Edit"}>
						<Button
							variant="outlined"
							color="secondary"
							sx={{ mr: "5px" }}
							onClick={handleClick}
						>
							{updateStatus ? <Close /> : <Edit />}
						</Button>
					</Tooltip>
					{updateStatus && (
						<Tooltip title="Update">
							<Button
								variant="outlined"
								color="success"
								onClick={handleUpdateSubmit}
								sx={{ mr: "5px" }}
							>
								<CheckCircleOutline />
							</Button>
						</Tooltip>
					)}
					<Tooltip title="Delete">
						<Button
							variant="outlined"
							color="error"
							onClick={() => deleteCourse(rowData.courseCode)}
						>
							<DeleteOutline />
						</Button>
					</Tooltip>
				</StyledTableCell>
			)}
		</StyledTableRow>
	);
};

export default CourseSingleRow;
