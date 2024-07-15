"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useJob } from "@/context/JobFilter";
import { option } from "../../interfaces";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSelectedItem } from "@/redux/slice";
import { fetchJobsRedux } from "@/redux/jobThunks";
const Filter = ({ type, options }: { type: string; options: option[] }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const dispatch = useAppDispatch();
  // const { searchJobs } = useJob();
  // const { state, setState } = useJob();
  const { selectedItem } = useAppSelector((state) => state.jobs);
  const item = options.map((option: option) => {
    return {
      label: option.label,
      value: option.value,
    };
  });

  const filteredItems = item.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleFunction = async (e: React.FormEvent, value: string) => {
    e.preventDefault();
    if (type == "country") {
      dispatch(
        setSelectedItem({
          ...selectedItem,
          country: [...(selectedItem.country || []), value],
        })
      );
    } else if (type == "city") {
      dispatch(
        setSelectedItem({
          ...selectedItem,
          city: [...(selectedItem.city || []), value],
        })
      );
    } else if (type == "role") {
      dispatch(
        setSelectedItem({
          ...selectedItem,
          role: [...(selectedItem.role || []), value],
        })
      );
    }
    // setState((prev) => {
    //   if (type === "country") {
    //     return {
    //       ...prev,
    //       selectedItem: {
    //         ...state.selectedItem,
    //         country: [...(state.selectedItem.country || []), value],
    //       },
    //     };
    //   } else if (type === "city") {
    //     return {
    //       ...prev,
    //       selectedItem: {
    //         ...state.selectedItem,
    //         city: [...(state.selectedItem.city || []), value],
    //       },
    //     };
    //   } else if (type === "role") {
    //     return {
    //       ...prev,
    //       selectedItem: {
    //         ...state.selectedItem,
    //         role: [...(state.selectedItem.role || []), value],
    //       },
    //     };
    //   }
    //   return prev;
    // });
    // console.log(selectedItem);
    // const data = await searchJobs(state.selectedItem);
    // console.log(data);
  };
  React.useEffect(() => {
    dispatch(fetchJobsRedux(selectedItem));
  }, [selectedItem, dispatch]);
  return (
    <div className="w-1/3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="focus:outline-none w-4/5">
            {`Select ${type}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <DropdownMenuSeparator />
          <div className="max-h-40 overflow-y-auto">
            {filteredItems.map((item) => (
              <DropdownMenuCheckboxItem
                key={item.value}
                onClick={(e) => handleFunction(e, item.label)}
              >
                {item.label}
              </DropdownMenuCheckboxItem>
            ))}
            {filteredItems.length == 0 && (
              <DropdownMenuCheckboxItem>No Match</DropdownMenuCheckboxItem>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filter;
