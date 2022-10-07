import { useGetAllCoursesQuery } from "../../services/apiSlice";

const AvailableCourse = () => {
	document.title = "Student Management | Available-Courses";
	const responseInfo = useGetAllCoursesQuery();
	return <div>AvailableCourse</div>;
};

export default AvailableCourse;
