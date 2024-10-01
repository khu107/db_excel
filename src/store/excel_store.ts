import { create } from "zustand";

interface ExcelData {
  [key: string]: string | number;
}

interface ExcelStore {
  excelData: ExcelData[][] | null;
  setExcelData: (data: ExcelData[][]) => void;
}

export const useExcelStore = create<ExcelStore>((set) => ({
  excelData: null,

  setExcelData: (data: ExcelData[][]) => set({ excelData: data }),
}));
