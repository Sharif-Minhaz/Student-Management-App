import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useDeleteCourseMutation, useIsLoggedInQuery } from "../../services/apiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CourseSingleRow from "./CourseSingleRow";

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
		} else if (responseInfo.isSuccess && !responseInfo.data?.success) {
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
						{roleInfo.data?.success && roleInfo.data?.user?.role === "admin" && (
							<StyledTableCell align="center">Action</StyledTableCell>
						)}
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{tableData.map((rowData, i) => (
						<CourseSingleRow key={i} rowData={rowData} deleteCourse={deleteCourse} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CourseTable;
