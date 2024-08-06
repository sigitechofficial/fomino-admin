import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListItems(props) {
  const location = useLocation().pathname;
  const { Icon } = props;

  return (
    <Link
      className={`flex gap-x-2 items-center py-2 px-3 rounded-lg font-chivo font-medium duration-200
        ${
          location === props.to || props.active
            ? "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white"
            : "bg-transparent text-themeLightGray"
        }
        hover:bg-gradient-to-r hover:from-red-400 hover:via-red-500 hover:to-red-600 hover:text-white
        focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800
      `}
      to={props.to}
    >
      <div className="flex items-center gap-x-2">
        <Icon size={20} />
        <h1 className="font-norms font-medium text-xs lg:text-sm">{props.title}</h1>
      </div>
    </Link>
  );
}

