import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
	Paper,Button,
	Tooltip,
	IconButton,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Add } from "@mui/icons-material";

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

const AddCourse = () => {
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
					<StyledTableRow
						sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
					>
						<StyledTableCell component="th" scope="row">
							<input type="text" />
						</StyledTableCell>
						<StyledTableCell>
							<input type="text" />
						</StyledTableCell>
						<StyledTableCell>
							<input type="text" />
						</StyledTableCell>
						<StyledTableCell>
							<input type="text" />
						</StyledTableCell>
						<StyledTableCell>
							<input type="text" />
						</StyledTableCell>
						<StyledTableCell align="center">
							<Tooltip title="Add">
								<IconButton>
									<Add />
								</IconButton>
							</Tooltip>
						</StyledTableCell>
					</StyledTableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default AddCourse;
