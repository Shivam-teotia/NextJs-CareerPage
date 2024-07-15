import { createAsyncThunk } from "@reduxjs/toolkit";
import { Job, FilterBox } from "../../interfaces";
import { searchJobs } from "@/services/JobService";

export const fetchJobsRedux = createAsyncThunk<Job[], FilterBox>(
  "jobs/fetchJobs",
  async (filter) => {
    console.log(filter);
    const response = await searchJobs({ filter });
    console.log(response.data);
    return response.data;
  }
);

export const fetchMoreJobsRedux = createAsyncThunk<
  Job[],
  { filter: FilterBox; page: number }
>("jobs/fetchMoreJobs", async ({ filter, page }) => {
  const response = await searchJobs({ filter, page });
  return response;
});

// export const applyJobRedux = createAsyncThunk(
//   "jobs/applyJob",
//   async ({ data, jobSlug, updatedBy, KEY }: ApplyJobArgs) => {
//     const response = await applyJob({ data, jobSlug, updatedBy, KEY });
//     return response;
//   }
// );
