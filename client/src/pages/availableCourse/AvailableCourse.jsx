import { Box, Button, Paper } from "@mui/material";
import { useGetAllCoursesQuery, useIsLoggedInQuery } from "../../services/apiSlice";
import CourseTable from "./CourseTable";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import AddCourse from "./AddCourse";

const AvailableCourse = () => {
	document.title = "Student Management | Available-Courses";
	const [editBox, setEditBox] = useState(false);
	const responseInfo = useGetAllCoursesQuery();
	const roleInfo = useIsLoggedInQuery();

	return (
		<>
			<Paper sx={{ m: 3, position: "relative", top: "24px" }}>
				{responseInfo.isSuccess && (
					<CourseTable tableData={responseInfo?.data?.allCourses} />
				)}
			</Paper>
			{roleInfo.data?.success && roleInfo.data?.user?.role === "teacher" && (
				<Box>
					<Button
						onClick={() => setEditBox(true)}
						sx={{ m: 3 }}
						variant="outlined"
						startIcon={<AddIcon />}
					>
						Add new course
					</Button>
					{editBox && <AddCourse />}
				</Box>
			)}
		</>
	);
};

export default AvailableCourse;
