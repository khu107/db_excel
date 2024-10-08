import { create } from 'zustand';

interface FileData {
    name: string;
    size: number;
    type: string;
  }
  
  interface TableRow {
    id: number;
    test: string;
    time: string;
    Tables_in_test: string; 
  }
  
  
  
  
  interface dbStoreState {
    fileData: FileData[];
    tableData: TableRow[]; // 테이블 데이터를 저장할 상태 추가
    addFileData: (data: FileData[]) => void;
    clearFiles: () => void;
    setTableData: (data: TableRow[]) => void; // 테이블 데이터를 저장하는 함수
  }
  
  export const dbStore = create<dbStoreState>((set) => ({
    fileData: [],
    tableData: [], // 테이블 데이터를 위한 초기 상태
    addFileData: (data) => set({ fileData: data }),
    clearFiles: () => set({ fileData: [] }),
    setTableData: (data) => set({ tableData: data }), // 테이블 데이터를 상태에 저장
  }));