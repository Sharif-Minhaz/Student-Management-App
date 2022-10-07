import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/auth/",
		credentials: "include",
	}),
	tagTypes: ["isLogin", "allCourses"],
	endpoints: (builder) => ({
		// auth api start
		signup: builder.mutation({
			query: (signupData) => ({
				url: "signup",
				method: "POST",
				body: signupData,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
		}),
		login: builder.mutation({
			query: (loginData) => ({
				url: "login",
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
				url: "check",
				method: "GET",
			}),
			providesTags: ["isLogin"],
		}),
		logout: builder.mutation({
			query: () => ({
				url: "logout",
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
				url: "all",
				method: "GET",
			}),
			providesTags: ["allCourses"],
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
} = api;
