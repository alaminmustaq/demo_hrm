import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";

export const ruleApi = createApi({
    reducerPath: "ruleApi",
    baseQuery,
    tagTypes: ["Rule"],

    endpoints: (builder) => ({
        fetchRules: builder.query({
            query: () => ({
                url: "rules",
                method: "GET",
            }),
            providesTags: ["Rule"],
        }),

       
        updateRules: builder.mutation({
            query: (data) => ({
                url: "rules",
                method: "POST",
                body: data, 
            }),
            invalidatesTags: ["Rule"],
        }),
    }),
});

export const {
    useFetchRulesQuery,
    useUpdateRulesMutation,
} = ruleApi;
