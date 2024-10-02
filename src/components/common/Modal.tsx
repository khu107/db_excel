import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="w-full h-full">
      <div className="h-full">
        {" "}
        {/* w-auto와 h-auto로 크기를 내부 내용에 맞춤 */}
        <div className="relative flex flex-col w-full h-full bg-white border-0  shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-2 border-b border-solid rounded-t border-blueGray-200"></div>
          <div className="relative p-2 flex-auto">{children}</div>
          <div className="flex items-center justify-end p-2  border-t border-solid rounded-b border-blueGray-200">
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
