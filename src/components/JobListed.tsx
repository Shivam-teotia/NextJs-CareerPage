"use client";
import React, { useCallback, useRef } from "react";
import JoCard from "./JoCard";
import { useJob } from "@/context/JobFilter";
import { useInView } from "react-intersection-observer";
import noSearch from "../../public/search_no_result.png";
import Loader from "./Loader";
import Image from "next/image";
const JobListed = () => {
  const { jobs, loading, fetchMoreJobs, hasMore } = useJob();
  const [ref, inView] = useInView();
  React.useEffect(() => {
    if (inView && hasMore) {
      fetchMoreJobs();
    }
  }, [inView, fetchMoreJobs, hasMore]);
  return (
    <div className="flex items-center justify-center h-1/2 px-5 pt-5">
      <div className="w-3/4 h-1/2 grid grid-cols-2 gap-3">
        {jobs &&
          jobs?.map((job) => {
            return <JoCard key={job.job_id} job={job} />;
          })}
        {!loading && jobs?.length === 0 && (
          <div className="flex w-full h-80 items-center justify-center">
            <div className="flex items-center text-2xl font-semibold text-primary">
              {/* <span>No jobs found</span>
               */}
              <Image src={noSearch} alt="no" />
            </div>
          </div>
        )}
        {loading && <Loader />}
        {hasMore && jobs.length !== 0 && !loading && (
          <div ref={ref} className="absolure left-1/2">
            <span>Loading more jobs...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListed;
