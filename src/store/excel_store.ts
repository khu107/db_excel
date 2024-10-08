// stores/useExcelStore.ts
import { create } from 'zustand';

interface ExcelRow {
  [key: string]: string | number; // Excel 셀 값은 문자열 또는 숫자일 수 있음
}


interface ExcelFileData {
  fileName: string;
  data: ExcelRow[];
}

interface ExcelState {
  files: ExcelFileData[];
  addFileData: (fileName: string, data: ExcelRow[]) => void;
  clearFiles: () => void;
}

export const useExcelStore = create<ExcelState>((set) => ({
  files: [],
  addFileData: (fileName, data) =>
    set((state) => {
      const newFiles = [...state.files, { fileName, data }];
      console.log('Updated Excel Files:', newFiles); // 상태 업데이트 후 콘솔에 출력
      return { files: newFiles };
    }),
  clearFiles: () => set({ files: [] }),

}));

