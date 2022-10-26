import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/",
		credentials: "include",
	}),
	tagTypes: ["isLogin", "allCourses"],
	endpoints: (builder) => ({
		// auth api start
		signup: builder.mutation({
			query: (signupData) => ({
				url: "auth/signup",
				method: "POST",
				body: signupData,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
		}),
		login: builder.mutation({
			query: (loginData) => ({
				url: "auth/login",
				method: "POST",
				body: loginData,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["isLogin"],
		}),
		isLoggedIn: builder.query({
			query: () => ({
				url: "auth/check",
				method: "GET",
			}),
			providesTags: ["isLogin"],
		}),
		logout: builder.mutation({
			query: () => ({
				url: "auth/logout",
				method: "POST",
				body: {},
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["isLogin"],
		}),
		// auth api end
		// courses api start
		getAllCourses: builder.query({
			query: () => ({
				url: "courses/all",
				method: "GET",
			}),
			providesTags: ["allCourses"],
		}),
		addCourse: builder.mutation({
			query: (courseData) => ({
				url: "/courses/add",
				method: "POST",
				body: courseData,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["allCourses"],
		}),
		deleteCourse: builder.mutation({
			query: (courseCode) => ({
				url: `/courses/delete/${courseCode}`,
				method: "DELETE",
			}),
			invalidatesTags: ["allCourses"],
		}),
		updateCourse: builder.mutation({
			query: (updatedData, courseCode) => ({
				url: `/courses/update/${courseCode}`,
				method: "PATCH",
				body: updatedData,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["allCourses"],
		}),
		// courses api end
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useIsLoggedInQuery,
	useLogoutMutation,
	useGetAllCoursesQuery,
	useAddCourseMutation,
	useDeleteCourseMutation,
	useUpdateCourseMutation,
} = api;
