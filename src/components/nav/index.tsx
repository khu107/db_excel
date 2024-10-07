import React from "react";
import InputBox from "./InputBox";
import CalBox from "./CalBox";
import ReportingBox from "./ReportingBox";
import Relation from "./Relation";
import ReportingEdit from "./ReportingEdit";
import ToolBox from "./ToolBox";

export default function Nav() {
  return (
    <div className="grid grid-cols-8 text-center gap-x-0.5 mt-0.5">
      <InputBox />
      <div className="grid grid-cols-3 col-start-2 col-end-6">
        <CalBox />
        <ToolBox />
        <ReportingBox />
      </div>
      <Relation />
      <div className="col-start-7 col-end-9">
        <ReportingEdit />
      </div>
    </div>
  );
}
