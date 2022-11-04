import {
	Box,
	Button,
	InputLabel,
	Paper,
	Stack,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import { useGetAllCoursesQuery, useIsLoggedInQuery } from "../../services/apiSlice";
import CourseTable from "./CourseTable";
import { Add, PlaylistAddCheck } from "@mui/icons-material";
import { useState } from "react";
import AddCourse from "./AddCourse";
import Loading from "../../templates/loading/Loading";
import "./availableCourse.css";

const AvailableCourse = () => {
	document.title = "Student Management | Available-Courses";
	const [addBox, setAddBox] = useState(false);
	const [sortType, setSortType] = useState("auto");
	const responseInfo = useGetAllCoursesQuery(sortType);
	const roleInfo = useIsLoggedInQuery();

	const handleOpenAddBoxes = () => {
		setAddBox((prev) => !prev);
	};

	const handleOnSelect = (e) => {
		setSortType(e.target.value);
	}

	return (
		<>
			<Paper sx={{ mx: 3, mt: "88px", p: 2 }} elevation={2}>
				<Stack alignItems="center" direction="row" justifyContent="space-between">
					<Typography variant="h5" className="course-heading-container">
						<span className="courses-heading">
							<PlaylistAddCheck fontSize="large" /> Available Courses
						</span>
					</Typography>
					<Box sx={{ minWidth: 150 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Sort</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={sortType}
								label="Sort"
								size="small"
								name="sort"
								onChange={handleOnSelect}
							>
								<MenuItem value="auto">Auto</MenuItem>
								<MenuItem value="courseName">Course (A-Z)</MenuItem>
								<MenuItem value="credit">Credits (1-10)</MenuItem>
								<MenuItem value="maxNumber">Number (1-100)</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Stack>
			</Paper>
			<Paper sx={{ m: 3, mt: 2 }} elevation={2}>
				{responseInfo.isSuccess ? (
					<CourseTable tableData={responseInfo?.data?.allCourses} />
				) : (
					<Loading />
				)}
			</Paper>
			{roleInfo.data?.success && roleInfo.data?.user?.role === "admin" && (
				<Box sx={{ mx: 3, mb: 3 }}>
					<Button
						onClick={handleOpenAddBoxes}
						sx={{ mb: 3 }}
						variant="outlined"
						startIcon={<Add />}
					>
						Add new course
					</Button>
					{addBox && <AddCourse handleOpenAddBoxes={handleOpenAddBoxes} />}
				</Box>
			)}
		</>
	);
};

export default AvailableCourse;
