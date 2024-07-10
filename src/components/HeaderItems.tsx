"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const HeaderItems: React.FC = () => {
  const [open, setopen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOpem = () => {
    setopen(!open);
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setopen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <>
      <div className="rounded-2px flex flex-row-reverse gap-5 w-1/2">
        <div className="bg-slate-900 rounded-xl text-white flex justify-center w-40 h-12 mt-2">
          <button>
            <Link
              href={
                "https://calendly.com/recruitcrm/api-powered-career-s-page-integration"
              }
            >
              Get in Touch
            </Link>
          </button>
        </div>
        <div className="w-40" ref={dropdownRef}>
          <button onClick={handleOpem} className="pt-6">
            Choose a Theme
          </button>
          {open && (
            <ul
              className="relative pt-2 bg-slate-900  text-white text-sm rounded-xl flex flex-col
            pb-1 px-0.5"
            >
              <Link
                href="#"
                className="hover:bg-white hover:text-black p-1.5 hover:rounded-md"
              >
                Lavender Leap
              </Link>
              <Link
                href="#"
                className="hover:bg-white hover:text-black p-1.5 hover:rounded-md"
              >
                Crimson Clue
              </Link>
              <Link
                href="#"
                className="hover:bg-white hover:text-black p-1.5 hover:rounded-md"
              >
                Spectrum Search
              </Link>
              <Link
                href="#"
                className="hover:bg-white hover:text-black p-1.5 hover:rounded-md"
              >
                Violet Vocation
              </Link>
              <Link
                href="#"
                className="hover:bg-white hover:text-black p-1.5 hover:rounded-md"
              >
                Slate Search
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderItems;
