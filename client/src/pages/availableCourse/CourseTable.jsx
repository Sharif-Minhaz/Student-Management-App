import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Tooltip,
	IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useDeleteCourseMutation, useIsLoggedInQuery } from "../../services/apiSlice";
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

const CourseTable = ({ tableData }) => {
	const roleInfo = useIsLoggedInQuery();
	const [deleteCourse, responseInfo] = useDeleteCourseMutation();

	useEffect(() => {
		if (responseInfo.isSuccess && responseInfo.data?.success) {
			toast.success(responseInfo.data?.message);
		} else {
			toast.error("Something went wrong");
		}
	}, [responseInfo]);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Course Code</StyledTableCell>
						<StyledTableCell>Course Name</StyledTableCell>
						<StyledTableCell>Course Teacher</StyledTableCell>
						<StyledTableCell>Credits</StyledTableCell>
						<StyledTableCell>Total Number</StyledTableCell>
						{roleInfo.data?.success && roleInfo.data?.user?.role === "teacher" && (
							<StyledTableCell align="center">Action</StyledTableCell>
						)}
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{tableData.map((rowData) => (
						<StyledTableRow
							key={rowData._id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<StyledTableCell component="th" scope="row">
								{rowData.courseCode}
							</StyledTableCell>
							<StyledTableCell>{rowData.courseName}</StyledTableCell>
							<StyledTableCell>{rowData.courseTeacher}</StyledTableCell>
							<StyledTableCell>{rowData.credit}</StyledTableCell>
							<StyledTableCell>{rowData.maxNumber}</StyledTableCell>
							{roleInfo.data?.success && roleInfo.data?.user?.role === "teacher" && (
								<StyledTableCell align="center">
									<Tooltip title="Edit">
										<IconButton color="secondary">
											<Edit />
										</IconButton>
									</Tooltip>

									<Tooltip title="Delete">
										<IconButton
											color="error"
											onClick={() => deleteCourse(rowData.courseCode)}
										>
											<DeleteOutline />
										</IconButton>
									</Tooltip>
								</StyledTableCell>
							)}
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CourseTable;
