"use client";
import BackArrow from "@/components/svg/BackArrow";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { getJobBySlug } from "@/services/JobService";
import { DialogDemo } from "@/components/ApplicationForm";
const JobDescription = ({ params }: { params: { jobSlug: string } }) => {
  const [Job, setJob] = useState<{
    name: string;
    company_name: string;
    job_description_text: string;
    owner: string;
  }>();
  useEffect(() => {
    const getJobBySlugFunc = async () => {
      const data = await getJobBySlug(params.jobSlug);
      setJob(data);
    };
    getJobBySlugFunc();
  }, [params.jobSlug]);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={`flex justify-center h-screen ${open ? "filter blur-sm" : ""}`}
    >
      <div className="container relative isolate my-16 md:my-32 lg:px-8 max-w-5xl">
        <div className="item-center mb-6 hidden w-10 rounded-full bg-slate-200 p-2 text-slate-700 transition-all ease-in hover:shadow-sm hover:shadow-slate-400 md:flex ">
          <Link href="/">
            <BackArrow />
          </Link>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex flex-col items-start justify-between gap-1 self-stretch pr-1.5 max-md:max-w-full max-md-flex-wrap">
            <div className="flex flex-col flex-wrap gap-1">
              <h1 className="max-w-[500px] text-5xl text-black max-md:text-3xl font-serif font-bold ">
                {Job && Job.name}
              </h1>
              <section className="whitespace-nowrap text-base font-medium text-slate-400 font-mono">
                {Job && Job.company_name}
              </section>
            </div>
            <div className="bg-red-500 mt-3 p-2.5 text-white hover:bg-red-700">
              <button onClick={(e) => setOpen(!open)}>Apply Now</button>
            </div>
          </div>
        </div>
        <div className="h-1/4"></div>
        {Job && Job.job_description_text && (
          <div>{parse(Job.job_description_text)}</div>
        )}
        <div className="h-1/4"></div>
      </div>
      {Job && (
        <DialogDemo
          open={open}
          setOpen={setOpen}
          jobSlug={params.jobSlug}
          ownerId={Job.owner}
        />
      )}
    </div>
  );
};

export default JobDescription;
