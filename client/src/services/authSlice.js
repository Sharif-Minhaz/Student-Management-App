import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080/auth/",
		credentials: "include",
	}),
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
		}),
	}),
});

export const { useLoginMutation, useSignupMutation } = authApi;
