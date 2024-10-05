"use client";
import { CloseIcon } from "@/components/icons/svgIcons";
import Button from "@/components/ui/Button";

interface IProps {
  title?: string;
  width?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  content: React.ReactNode;
}

const Popup = ({
  title,
  width,
  confirmBtnText,
  cancelBtnText,
  onClose,
  onCancel,
  onSubmit,
  isLoading,
  content,
}: IProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      <div
        className={`relative flex flex-col p-6 bg-white rounded-lg shadow-lg ${
          width ? "" : "w-[700px] max-h-[95vh]"
        }`}
        style={width ? { width: width } : {}}
      >
        {title && (
          <div className="flex justify-between items-center pb-3 text-gray-800 text-lg border-b border-gray-300">
            {title}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-md border border-white transition-colors duration-400 hover:bg-gray-100 active:bg-gray-200"
            >
              <CloseIcon width={12} fill="gray-600" />
            </button>
          </div>
        )}
        {content}
        <div className="flex justify-center items-center pt-4 border-t border-gray-300 gap-6">
          <Button text={cancelBtnText || "Cancel"} onClick={onCancel} />
          <Button
            text={confirmBtnText || "OK"}
            disabled={isLoading}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
