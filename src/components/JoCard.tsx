import Link from "next/link";
import React from "react";
interface Job {
  job_id: string;
  name: string;
  job_type: string;
  job_category: string;
  city: string;
  job_slug: string;
}

const JoCard = ({ job }: { job: Job }) => {
  return (
    <Link href={`/${job.job_slug}`}>
      <div className="border border-black w-full h-60 mb-10 flex flex-col p-6 transition duration-500 hover:shadow-custom hover:bg-gray-100 group">
        <h2 className="font-semibold text-2xl p-2">{job.name}</h2>
        <div className="flex gap-2 mt-2 p-2">
          {job.job_type && (
            <div className="border border-black rounded-xl p-1 px-2 font-semibold">
              {job.job_type}
            </div>
          )}
          {job.job_category && (
            <div className="border border-black rounded-xl p-1 px-2 font-semibold">
              {job.job_category}
            </div>
          )}
          {job.city && (
            <div className="border border-black rounded-xl p-1 px-2 font-semibold">
              {job.city}
            </div>
          )}
        </div>
        <button className="group-hover:bg-red-600 w-1/3 p-2 mt-3 group-hover:text-white transition duration-500">
          Apply Now
        </button>
      </div>
    </Link>
  );
};

export default JoCard;
