import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterBox, Job, selectedItemType } from "../../interfaces";
import { fetchJobsRedux, fetchMoreJobsRedux } from "./jobThunks";
interface JobState {
  jobs: Job[];
  loading: boolean;
  selectedItem: selectedItemType;
  page: number;
  hasMore: boolean;
}
const initialState: JobState = {
  jobs: [],
  loading: false,
  selectedItem: {
    jobName: "",
    city: [],
    country: [],
    role: [],
  },
  page: 2,
  hasMore: true,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<FilterBox>) {
      state.selectedItem = action.payload;
    },
    clearFilter(state) {
      state.selectedItem = { jobName: "", city: [], country: [], role: [] };
      state.page = 2;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchJobsRedux.fulfilled,
        (state, action: PayloadAction<Job[]>) => {
          state.loading = false;
          state.jobs = action.payload;
          state.hasMore = action.payload.length > 0;
        }
      )
      .addCase(fetchJobsRedux.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchMoreJobsRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMoreJobsRedux.fulfilled,
        //typescript error here
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.jobs.push(...action.payload.data);
          state.page = state.page + 1;
          state.hasMore = state.page <= action.payload.total_pages;
        }
      )
      .addCase(fetchMoreJobsRedux.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSelectedItem, clearFilter } = jobSlice.actions;
export default jobSlice.reducer;
