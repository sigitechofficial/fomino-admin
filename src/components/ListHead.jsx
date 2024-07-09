import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListHead(props) {
  const { Icon, Angle } = props;
  const location = useLocation().pathname;

  return (
    <li className="px-3">
      <Link to={props.to} className="space-y-1">
        <div
          className={`flex gap-x-2 justify-between items-center py-2 lg:py-3 px-2 rounded-md  hover:bg-themeRed hover:text-white duration-200
       ${
         location === props.to || props.active
           ? "bg-themeRed text-white"
           : "bg-transparent text-themeLightGray"
       }`}
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
