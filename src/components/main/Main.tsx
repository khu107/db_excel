import React from "react";

export default function Main() {
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-8 text-center mt-0.5 gap-x-0.5  h-full">
        <div className="bg-yellow-200 ">file</div>
        <div className="col-start-2 col-end-6 bg-slate-300">Box Graph</div>
        <div className="bg-slate-300">connection</div>
        <div className="col-start-7 col-end-9 bg-slate-300">Report Pdf</div>
      </div>
    </div>
  );
}
