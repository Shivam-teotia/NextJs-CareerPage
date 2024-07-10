"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { getKeys } from "@/services/JobService";
import Filter from "./Filter";
import { DropDownType, OptionsType } from "../../interfaces";
import { useJob } from "@/context/JobFilter";
const FilterBox: React.FC = () => {
  const [jobName, setjobName] = useState<string>("");
  const { setState, state } = useJob();
  const removeFilter = (type: string, value: string) => {
    if (type === "jobName") {
      setState({
        ...state,
        selectedItem: { ...state.selectedItem, jobName: "" },
      });
      setjobName("");
    } else if (type === "country") {
      const filteredArray =
        state.selectedItem.country?.filter((item) => item !== value) ?? [];
      setState({
        ...state,
        selectedItem: { ...state.selectedItem, country: filteredArray },
      });
    } else if (type === "city") {
      const filteredArray =
        state.selectedItem.city?.filter((item) => item !== value) ?? [];
      setState({
        ...state,
        selectedItem: { ...state.selectedItem, city: filteredArray },
      });
    } else if (type === "role") {
      const filteredArray =
        state.selectedItem.role?.filter((item) => item !== value) ?? [];
      setState({
        ...state,
        selectedItem: { ...state.selectedItem, role: filteredArray },
      });
    }
  };

  const searchHandler = async (e: FormEvent) => {
    e.preventDefault();

    setState({
      ...state,
      selectedItem: { ...state.selectedItem, jobName: jobName },
    });
  };
  const resetHandler = (e: FormEvent) => {
    e.preventDefault();
    setjobName("");
    setState({
      ...state,
      selectedItem: { jobName: "", city: [], country: [], role: [] },
    });
  };
  const [filterBoxComponents, setFilterBoxComponents] = useState<{
    dropDown: DropDownType[];
  }>({
    dropDown: [
      {
        name: "country",
        className: "border-2 rounded-none",
        options: [],
      },
      {
        name: "city",
        className: "border-2 rounded-none",
        options: [],
      },
      {
        name: "role",
        className: "border-2 rounded-none",
        options: [],
      },
    ],
  });
  const countryKeysFunc = async () => {
    const countryKeys: OptionsType[] = await getKeys("country");
    const cityKeys: OptionsType[] = await getKeys("city");
    const roleKeys: OptionsType[] = await getKeys("job_category");
    setFilterBoxComponents({
      dropDown: [
        {
          name: "country",
          className: "border-2 rounded-none",
          options: countryKeys,
        },
        {
          name: "city",
          className: "border-2 rounded-none",
          options: cityKeys,
        },
        {
          name: "role",
          className: "border-2 rounded-none",
          options: roleKeys,
        },
      ],
    });
  };
  useEffect(() => {
    countryKeysFunc();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-20">
      <div className="w-3/4">
        <form className="w-full pb-3 border-b-2" onSubmit={searchHandler}>
          <input
            className="p-2 m-1 w-4/5 focus:outline-none"
            placeholder="Job Name"
            value={jobName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setjobName(e.target.value)
            }
          />
          <button
            className="bg-red-500 p-1.5 mx-5 text-white px-4 text-sm"
            type="submit"
          >
            Search
          </button>
          <button className="text-slate-700 p-2" onClick={resetHandler}>
            Reset
          </button>
        </form>
      </div>
      <div className="w-3/4 flex justify-evenly p-4 m-4">
        {filterBoxComponents &&
          filterBoxComponents.dropDown &&
          filterBoxComponents.dropDown.map((dp) => {
            return <Filter key={dp.name} type={dp.name} options={dp.options} />;
          })}
      </div>
      <div className="flex flex-wrap gap-3 p-0 mt-1">
        {state?.selectedItem && state?.selectedItem.jobName && (
          <>
            <div className="border px-2.5 py-0.5 font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mt-2 flex cursor-pointer items-center gap-1 text-sm transition hover:bg-slate-100 bg-slate-200 text-slate-700 rounded-none">
              <span>{state?.selectedItem.jobName}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-x "
                onClick={(e) =>
                  removeFilter("jobName", state?.selectedItem.jobName as string)
                }
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </div>
          </>
        )}
        {state?.selectedItem &&
          state?.selectedItem.city?.map((cityName) => {
            return (
              <>
                <div className="border px-2.5 py-0.5 font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mt-2 flex cursor-pointer items-center gap-1 text-sm transition hover:bg-slate-100 bg-slate-200 text-slate-700 rounded-none">
                  <span>{cityName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x "
                    onClick={(e) => removeFilter("city", cityName)}
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </div>
              </>
            );
          })}
        {state?.selectedItem &&
          state?.selectedItem.country?.map((cityName) => {
            return (
              <>
                <div className="border px-2.5 py-0.5 font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mt-2 flex cursor-pointer items-center gap-1 text-sm transition hover:bg-slate-100 bg-slate-200 text-slate-700 rounded-none">
                  <span>{cityName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x "
                    onClick={(e) => removeFilter("country", cityName)}
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </div>
              </>
            );
          })}
        {state?.selectedItem &&
          state?.selectedItem.role?.map((cityName) => {
            return (
              <>
                <div className="border px-2.5 py-0.5 font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent mt-2 flex cursor-pointer items-center gap-1 text-sm transition hover:bg-slate-100 bg-slate-200 text-slate-700 rounded-none">
                  <span>{cityName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-x "
                    onClick={(e) => removeFilter("role", cityName)}
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default FilterBox;
