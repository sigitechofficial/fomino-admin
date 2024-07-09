import React from "react";
import { LuSearch } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { PiPrinter } from "react-icons/pi";
import { useLocation } from "react-router-dom";

export default function Helment(props) {
  const location = useLocation().pathname;
  return (
    <>
      <div className="flex justify-end flex-wrap gap-2">
        <div className="relative">
          <input
            type="search"
            placeholder="Search.."
            className="w-60 h-9 bg-transparent rounded-md pl-9 pr-2 outline-none border border-themeBorderGray placeholder:font-switzer placeholder:text-themeBorderGray placeholder:text-sm"
            onChange={props.searchOnChange}
            value={props.searchValue}
          />
          <LuSearch
            size={18}
            color="#111827"
            className="absolute top-2.5 left-3"
          />
        </div>

        <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <MdContentCopy size={16} />
            <span>Copy</span>
          </button>
        </div>

        <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <IoDownloadOutline size={16} />
            <span>CSV</span>
          </button>
        </div>

        <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <PiPrinter size={16} />
            <span>Print</span>
          </button>
        </div>
      </div>
    </>
  );
}
