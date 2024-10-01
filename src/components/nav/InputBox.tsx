"use client";

import { useExcelStore } from "@/store/excel_store";
import React from "react";
import * as XLSX from "xlsx";
// import { Button } from "../ui/button";

interface ExcelData {
  [key: string]: string | number;
}
export default function InputBox() {
  const setExcelData = useExcelStore((state) => state.setExcelData);

  // const [excelData, setExcelData] = useState<ExcelData[][] | null>(null);
  // console.log(excelData);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const dataArray: ExcelData[][] = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise<ExcelData[]>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
              if (e.target) {
                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: ExcelData[] =
                  XLSX.utils.sheet_to_json(worksheet);
                resolve(jsonData); // 각 파일의 데이터를 Promise로 반환
              } else {
                reject("Error reading file");
              }
            };
            reader.readAsArrayBuffer(file);
          });
        })
      );
      setExcelData(dataArray); // 모든 파일의 데이터를 한 번에 상태에 저장
    }
  };

  return (
    <div className="bg-slate-200 p-2">
      <input
        type="file"
        accept=".xlsx, .xls"
        multiple
        onChange={handleFileUpload}
      />
      {/* <Button variant="outline" size={"sm"}>
        Input Box
      </Button> */}
    </div>
  );
}
