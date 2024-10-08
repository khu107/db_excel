"use client";

import React, { useEffect, useRef } from "react";
import * as GC from "@grapecity/spread-sheets"; // SpreadJS 라이브러리 import
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css"; // SpreadJS 스타일 import
import { useExcelStore } from "@/store/excel_store"; // Zustand에서 데이터 가져오기
import { dbStore } from "@/store/db_store";

// SpreadSheet 컴포넌트가 fileIndex prop을 받을 수 있도록 타입 정의
interface SpreadSheetProps {
  fileIndex: number; // 반드시 전달되는 인덱스 값 (null은 전달되지 않음)
}

const SpreadSheet: React.FC<SpreadSheetProps> = ({ fileIndex }) => {
  const spreadRef = useRef<HTMLDivElement>(null);
  const { files } = useExcelStore();
  const { tableData } = dbStore(); // Zustand에서 Excel 데이터를 가져옴

  useEffect(() => {
    if (spreadRef.current && files.length > fileIndex) {
      // SpreadJS 인스턴스 생성
      const spread = new GC.Spread.Sheets.Workbook(spreadRef.current);
      spread.options.scrollbarMaxAlign = true;

      // 첫 번째 시트 가져오기
      const sheet = spread.getActiveSheet();

      // 파일 데이터가 있으면, 해당 파일의 데이터를 SpreadJS 시트에 적용
      const fileData = files[fileIndex].data;

      if (fileData.length > 0) {
        // 첫 번째 행에 컬럼 제목 설정 (첫 번째 객체의 키 값 사용)
        const columnHeaders = Object.keys(fileData[0]);
        columnHeaders.forEach((header, colIndex) => {
          sheet.setValue(0, colIndex, header); // 첫 번째 행에 제목 설정
        });

        // 나머지 데이터를 1번째 행부터 채워 넣음
        fileData.forEach((rowData, rowIndex) => {
          Object.keys(rowData).forEach((colKey, colIndex) => {
            sheet.setValue(rowIndex + 1, colIndex, rowData[colKey]); // 제목 이후부터 데이터를 설정
          });
        });
      }
    }
  }, [fileIndex, files]); // fileIndex나 files가 변경될 때마다 SpreadJS 업데이트

  return <div ref={spreadRef} style={{ width: "100%", height: "100%" }} />;
};

export default SpreadSheet;
