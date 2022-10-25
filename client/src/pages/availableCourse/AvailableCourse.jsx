import { Box, Button, Paper } from "@mui/material";
import { useGetAllCoursesQuery, useIsLoggedInQuery } from "../../services/apiSlice";
import CourseTable from "./CourseTable";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCourse from "./AddCourse";

const AvailableCourse = () => {
	document.title = "Student Management | Available-Courses";
	const [addBox, setAddBox] = useState(false);
	const responseInfo = useGetAllCoursesQuery();
	const roleInfo = useIsLoggedInQuery();

	const handleOpenAddBoxes = () => {
		setAddBox((prev) => !prev);
	};

	return (
		<>
			<Paper sx={{ m: 3, mt: "88px" }}>
				{responseInfo.isSuccess && (
					<CourseTable tableData={responseInfo?.data?.allCourses} />
				)}
			</Paper>
			{roleInfo.data?.success && roleInfo.data?.user?.role === "teacher" && (
				<Box sx={{ mx: 3, mb: 3 }}>
					<Button
						onClick={handleOpenAddBoxes}
						sx={{ mb: 3,  }}
						variant="outlined"
						startIcon={<AddIcon />}
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
