"use client";
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import { searchJobs } from "@/services/JobService";
// import { FilterBox } from "../../interfaces";
// import { Job, selectedItemType } from "../../interfaces";

// interface JobContextType {
//   jobs: Job[];
//   loading: boolean;
//   setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
//   searchJobs: any;
//   hasMore: boolean;
//   selectedItem: selectedItemType;
//   setSelectedItem: React.Dispatch<React.SetStateAction<selectedItemType>>;
//   fetchMoreJobs: (filter?: FilterBox, page?: number) => Promise<void>;
// }

// const JobContext = createContext<JobContextType | undefined>(undefined);

// export const useJob = () => {
//   const context = useContext(JobContext);
//   if (!context) {
//     throw new Error("useJob must be used within a JobProvider");
//   }
//   return context;
// };

// export const JobProvider = ({ children }: { children: React.ReactNode }) => {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [selectedItem, setSelectedItem] = React.useState<selectedItemType>({
//     jobName: "",
//     city: [],
//     country: [],
//     role: [],
//   });
//   const [page, setPage] = useState<number>(2);
//   const [hasMore, setHasMore] = useState(true);
//   const searchJobsAndUpdateState = async (filter: FilterBox) => {
//     try {
//       setLoading(true);
//       const data = await searchJobs({ filter: selectedItem });
//       setJobs(data.data);
//       if (page >= data.total_pages || jobs.length >= data.total_count) {
//         setHasMore(false);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error searching jobs:", error);
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     searchJobsAndUpdateState(selectedItem);
//   }, [selectedItem]);
//   const fetchMoreJobs = useCallback(async () => {
//     setLoading(true);
//     setPage(page + 1);
//     try {
//       const newData = await searchJobs({ filter: selectedItem, page });

//       setJobs((prevJobs) => [...prevJobs, ...newData.data]);

//       if (page >= newData.total_pages || jobs.length >= newData.total_count) {
//         setHasMore(false);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching more jobs:", error);
//       setLoading(false);
//     }
//   }, [page]);

//   const contextValue: JobContextType = {
//     jobs,
//     setJobs,
//     searchJobs: searchJobsAndUpdateState,
//     loading,
//     hasMore,
//     fetchMoreJobs,
//     selectedItem,
//     setSelectedItem,
//   };

//   return (
//     <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { searchJobs } from "@/services/JobService";
import { FilterBox } from "../../interfaces";
import { Job, selectedItemType } from "../../interfaces";

interface JobState {
  jobs: Job[];
  loading: boolean;
  selectedItem: selectedItemType;
  page: number;
  hasMore: boolean;
}

interface JobContextType {
  state: JobState;
  searchJobs: (filter: FilterBox) => Promise<void>;
  fetchMoreJobs: (filter?: FilterBox, page?: number) => Promise<void>;
  setState: React.Dispatch<React.SetStateAction<JobState>>;
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

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJob must be used within a JobProvider");
  }
  return context;
};

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<JobState>(initialState);

  const searchJobsAndUpdateState = async (filter: FilterBox) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const data = await searchJobs({ filter: state.selectedItem });
      setState((prevState) => ({
        ...prevState,
        jobs: data.data,
        loading: false,
        hasMore: prevState.page < data.total_pages + 1,
        // prevState.jobs.length < data.total_count,
      }));
    } catch (error) {
      console.error("Error searching jobs:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    searchJobsAndUpdateState(state.selectedItem);
  }, [state.selectedItem]);

  const fetchMoreJobs = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      page: prevState.page + 1,
    }));
    try {
      const newData = await searchJobs({
        filter: state.selectedItem,
        page: state.page,
      });
      setState((prevState) => ({
        ...prevState,
        jobs: [...prevState.jobs, ...newData.data],
        loading: false,
        hasMore: prevState.page < newData.total_pages + 1,
        // prevState.jobs.length < newData.total_count,
      }));
    } catch (error) {
      console.error("Error fetching more jobs:", error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.page, state.selectedItem]);

  const contextValue: JobContextType = {
    state,
    searchJobs: searchJobsAndUpdateState,
    fetchMoreJobs,
    setState,
  };

  return (
    <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
  );
};
