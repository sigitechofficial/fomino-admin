import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListHead(props) {
  const { Icon, Angle } = props;
  const location = useLocation().pathname;

  return (
    <li className="px-3">
      <Link to={props.to} className="space-y-1">
        <div
          className={`flex gap-x-2 justify-between items-center py-2 lg:py-3 px-2 rounded-md duration-200
            ${
              location === props.to || props.active
                ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 font-medium rounded-lg text-sm py-2.5 text-center mb-2"
                : "bg-transparent text-themeLightGray"
            }
            hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:text-white
            focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
          `}
          onClick={props.onClick}
        >
          <div className="flex items-center gap-x-1">
            <Icon size={22} />
            <h1 className="font-norms font-medium text-sm lg:text-base">
              {props.title}
            </h1>
          </div>

          <button>{Angle && <Angle />}</button>
        </div>
        <hr className="w-full" />
      </Link>
    </li>
  );
}
