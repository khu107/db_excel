"use client";
import React, { useState } from "react";
import Modal from "../common/Modal";

import { useExcelStore } from "@/store/excel_store";
import dynamic from "next/dynamic";

const SpreadSheet = dynamic(() => import("../common/SpreadSheet"), {
  ssr: false,
});

export default function Main() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(
    null
  ); // 선택한 파일 인덱스 상태 추가
  const files = useExcelStore((state) => state.files); // Zustand에서 파일 목록 가져오기

  const openModal = (index: number) => {
    setSelectedFileIndex(index); // 선택된 파일의 인덱스 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFileIndex(null); // 모달 닫을 때 인덱스를 초기화
  };

  return (
    <div className="flex flex-col h-full ">
      <div className="grid grid-cols-8 text-center mt-0.5 gap-x-0.5  h-full">
        <div className="bg-yellow-200 ">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-center mt-2 rounded-md border-4 border-gray-800 lg:mx-6 md:mx-4 bg-blue-500 cursor-pointer text-white h-24  tex"
              onClick={() => openModal(index)} // 파일 선택 시 Modal 열기
            >
              {/* {file.fileName} 파일 이름 출력 */}
              Input Box
            </div>
          ))}
        </div>
        <div className="col-start-2 col-end-6 bg-slate-300  ">
          {isModalOpen && selectedFileIndex !== null && (
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Custom Title"
            >
              <SpreadSheet fileIndex={selectedFileIndex} />
            </Modal>
          )}
        </div>
        <div className="bg-slate-300">connection</div>
        <div className="col-start-7 col-end-9 bg-slate-300">Report Pdf</div>
      </div>
    </div>
  );
}
