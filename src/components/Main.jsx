import React from "react";

export default function Main(props) {
  return (
    <main
      className={`w-[calc(100%-280px)] float-right relative top-[66px] bg-themeGray min-h-[calc(100vh-66px)] space-y-6`}
    >
      {props?.content}
    </main>
  );
}
