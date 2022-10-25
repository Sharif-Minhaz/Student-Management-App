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
						<StyledTableCell align="center">Action</StyledTableCell>
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
							<StyledTableCell align="center">
								<Tooltip title="Edit">
									<IconButton color="secondary">
										<Edit />
									</IconButton>
								</Tooltip>

								<Tooltip title="Delete">
									<IconButton color="error">
										<DeleteOutline />
									</IconButton>
								</Tooltip>
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CourseTable;
