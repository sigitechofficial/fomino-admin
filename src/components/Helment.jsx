import React from "react";
import { LuSearch } from "react-icons/lu";
import { MdContentCopy } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { PiPrinter } from "react-icons/pi";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";


export default function Helment(props) {

  const printPDF = ()=>{
    window.print()
      }
      
      // ======Download csv========
    //   function convertToCSV(data) {
    //     const csv = data.map(row => {
    //         const values = Object.values(row).map(value => {
    //             if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    //                 // Check for non-null objects that are not arrays (to avoid circular references)
    //                 try {
    //                     return JSON.stringify(value);
    //                 } catch (error) {
    //                     // Handle circular references gracefully
    //                     return '';
    //                 }
    //             } else if (value === undefined) {
    //                 // Handle undefined values
    //                 return '';
    //             } else {
    //                 // Convert to string or use as is
    //                 return value ? value.toString() : '';
    //             }
    //         });
    //         return values.join(',');
    //     }).join('\n');
    //     return csv;
    // }
    
    //   const downloadCSV = (data) => {
    //     console.log(data,"csvdata")
    //     const csv = convertToCSV(data);
    //     const blob = new Blob([csv], { type: 'text/csv' });
    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = url;
    //     a.download = 'data.csv';
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    //     document.body.removeChild(a);
    // };
     // ======Download csv end========

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

        {/* <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <MdContentCopy size={16} />
            <span>Copy</span>
          </button>
        </div> */}

        <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <IoDownloadOutline size={16} />
            <CSVLink   filename={"Data.csv"} data={props.csvdata} >CSV</CSVLink >
          </button>
        </div>

        <div>
          <button
            className="flex items-center gap-1 text-sm border border-themeBorderGray 
        rounded-md px-2 py-1.5 h-9 hover:bg-theme hover:text-white duration-100"
          >
            <PiPrinter size={16} />
            <span onClick={printPDF}>PDF</span>
          </button>
        </div>
      </div>
    </>
  );
}
