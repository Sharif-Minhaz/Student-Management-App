import { Paper } from "@mui/material";
import { useGetAllCoursesQuery } from "../../services/apiSlice";
import CourseTable from "./CourseTable";

const AvailableCourse = () => {
	document.title = "Student Management | Available-Courses";
	const responseInfo = useGetAllCoursesQuery();

	return (
		<Paper sx={{ m: 3, position: "relative", top: "24px" }}>
			{responseInfo.isSuccess && <CourseTable tableData={responseInfo?.data?.allCourses} />}
		</Paper>
	);
};

export default AvailableCourse;
