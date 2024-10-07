"use client";

import { useExcelStore } from "@/store/excel_store";
import React, { ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Database, File } from "lucide-react";

export default function InputBox() {
  const { addFileData, clearFiles } = useExcelStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      clearFiles(); // 이전 파일 데이터를 초기화

      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });

          // 첫 번째 시트를 JSON으로 변환
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData: { [key: string]: string | number }[] =
            XLSX.utils.sheet_to_json(worksheet);

          // 파일명과 데이터를 zustand에 저장
          addFileData(file.name, jsonData);
        };

        reader.readAsArrayBuffer(file);
      });
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "input-file"
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> Input Box</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              <span>DataBase</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={triggerFileInput}>
              <File className="mr-2 h-4 w-4" />
              <span>File</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        className="hidden"
        type="file"
        name="file"
        id="input-file"
        accept=".xlsx, .xls"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
}
