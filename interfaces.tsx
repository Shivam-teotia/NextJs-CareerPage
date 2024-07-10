export interface Job {
  job_id: string;
  name: string;
  job_type: string;
  job_category: string;
  city: string;
  job_slug: string;
}
export interface selectedItemType {
  jobName?: string;
  city?: string[];
  country?: string[];
  role?: string[];
}

export type FilterBox = {
  country?: string[];
  role?: string[];
  city?: string[];
  jobName?: string;
};
export type OptionsType = {
  value: string;
  label: string;
};

export type DropDownType = {
  name: DropDownOptionType["type"];
  options: option[];
  className?: string;
};

export type option = {
  value: string;
  label: string;
};
export type DropDownOptionType = {
  type: "role" | "city" | "country";
};
