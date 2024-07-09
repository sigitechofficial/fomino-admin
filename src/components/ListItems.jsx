import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListItems(props) {
  const location = useLocation().pathname;
  const { Icon } = props;
  return (
    <Link
      className={`flex gap-x-2 items-center py-2 px-3 rounded-lg font-chivo font-medium hover:bg-themeRed hover:text-white duration-200
    ${
      location === props.to || props.active
        ? "bg-themeRed text-white"
        : "bg-transparent text-themeLightGray"
    }`}
      to={props.to}
    >
      <div className="flex items-center gap-x-2">
        <Icon size={20} />
        <h1 className="font-norms font-medium text-xs lg:text-sm">{props.title}</h1>
      </div>
    </Link>
  );
}
