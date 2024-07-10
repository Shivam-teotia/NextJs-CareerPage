"use server";

import { FilterBox } from "../../interfaces";

const API = process.env.SOL_URL_PROD;

//get all jobs
export const getJobs = async (
  KEY: string = process.env.KEY!,
  keys = "custom_field[2],job_category,job_type&limit=5"
) => {
  try {
    if (!KEY) return;
    const response = await fetch(`${API}/jobs/${KEY}?keys=${keys}&limit=4`, {
      next: { revalidate: 50 },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

//get job by slug
export const getJobBySlug = async (
  slug: string,
  KEY: string = process.env.KEY!
) => {
  try {
    const response = await fetch(
      `${API}/jobs/by-slug/${KEY}?job_slug=${slug}`,
      {
        next: { revalidate: 60 },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

//get job by search parameter
export const searchJobs = async ({
  filter,
  page = 1,
  KEY = process.env.KEY!,
  keys = "custom_field[2],job_category,job_type",
}: {
  filter: FilterBox;
  page?: number;
  KEY?: string;
  keys?: string;
}) => {
  if (!KEY) return;
  try {
    let query = "";
    if (filter?.jobName) {
      query += `search_keyword=${filter.jobName}&`;
    }
    if (filter?.city?.length) {
      query += `city=${filter.city.join(",")}&`;
    }
    if (filter?.country?.length) {
      query += `country=${filter.country.join(",")}&`;
    }
    if (filter?.role?.length) {
      query += `job_category=${filter.role.join(",")}&`;
    }
    query += `page=${page}&limit=4&`;

    const response = await fetch(
      `${API}/jobs/search/${KEY}?${query}keys=${keys}`,
      { next: { revalidate: 60 } }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};
//get keys
export const getKeys = async (keys: string, KEY: string = process.env.KEY!) => {
  try {
    const response = await fetch(
      `${API}/jobs/additional-info/${KEY}?keys=${keys}`,
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    const revisedData = data?.unique_values?.map((item: string) => {
      if (keys.includes("custom_field")) {
        return {
          label: JSON.parse(item)[`${keys}`],
          value: JSON.parse(item)[`${keys}`],
        };
      }
      return {
        label: JSON.parse(item)[`${keys}`].S,
        value: JSON.parse(item)[`${keys}`].S,
      };
    });
    const filteredData = revisedData?.filter(
      (item: { label: string; value: string }) =>
        item.label !== "None" && item.label !== undefined
    );
    return filteredData || [];
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};

export const applyJob = async ({
  data,
  jobSlug,
  updatedBy,
  KEY = process.env.KEY!,
}: {
  data: FormData;
  jobSlug: string;
  updatedBy: string;
  KEY?: string;
}) => {
  try {
    const response = await fetch(
      `${API}/candidates/apply-job/${KEY}?job_slug=${jobSlug}&updated_by=${updatedBy}`,
      {
        method: "POST",
        body: data,
      }
    );
    const result = await response.json();
    if (response.status === 200 || response.status === 201) {
      return {
        status: response.status,
        data: result,
      };
    } else {
      throw new Error(
        result.message || "Something went wrong. Please try again later."
      );
    }
  } catch (error) {
    if (error instanceof Error) throw error.message;
  }
};
