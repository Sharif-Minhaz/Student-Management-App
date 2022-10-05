import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/auth/",
		credentials: "include",
	}),
	tagTypes: ["isLogin"],
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (signupData) => {
				return {
					url: "signup",
					method: "POST",
					body: signupData,
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				};
			},
		}),
		login: builder.mutation({
			query: (loginData) => {
				return {
					url: "login",
					method: "POST",
					body: loginData,
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				};
			},
			invalidatesTags: ["isLogin"],
		}),
		isLoggedIn: builder.query({
			query: () => {
				return {
					url: "check",
					method: "GET",
				};
			},
			providesTags: ["isLogin"],
		}),
		logout: builder.mutation({
			query: () => {
				return {
					url: "logout",
					method: "POST",
					body: {},
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				};
			},
			invalidatesTags: ["isLogin"],
		}),
	}),
});

export const { useLoginMutation, useSignupMutation, useIsLoggedInQuery, useLogoutMutation } = authApi;
