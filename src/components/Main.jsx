import React, { useContext } from "react";
import { ToggleContext } from "../utilities/ContextApi";

export default function Main(props) {
  const { isToggled, setIsToggled } = useContext(ToggleContext);
  return (
    <main
      className={`${isToggled ? "w-full" : "w-[calc(100%-280px)]"}  float-right relative top-[66px] bg-themeGray min-h-[calc(100vh-66px)] space-y-6`}
    >
      {props?.content}
    </main>
  );
}
