import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utility/baseQuery";
import { getFilterParams } from "@/utility/helpers";

export const jobListApi = createApi({
    reducerPath: "job-list",
    baseQuery,
    tagTypes: ["job-list"],
    endpoints: (builder) => ({
        fetchJobList: builder.query({
            query: ({ params, useFilters = true } = {}) => ({
                url: "recruitment/job_list",
                params: { ...(useFilters ? getFilterParams() : {}), ...params },
            }),
            providesTags: ["job-list"],
        }),

        createJob: builder.mutation({
            query: (data) => ({
                url: "recruitment/job_list",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["job-list"],
        }),

        updateJob: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `recruitment/job_list/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["job-list"],
        }),

        deleteJob: builder.mutation({
            query: (id) => ({
                url: `recruitment/job_list/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["job-list"],
        }),
    }),
});

export const {
    useFetchJobListQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobListApi;
