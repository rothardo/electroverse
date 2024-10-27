"use client";
import { useState } from "react";
import styles from "./checkBox.module.scss";
import { CheckIcon } from "@/components/icons/svgIcons";

interface IProps {
  text: string;
  isChecked: boolean;
  onClick: () => void;
}

const CheckBox = ({ text, isChecked, onClick }: IProps) => {
  return (
    <div
      className={`flex items-center gap-8 cursor-pointer transition-all duration-400 ${styles.checkBox} ${isChecked ? styles.checked : ""}`}
      onClick={onClick}
    >
      <div className={`w-6 h-6 rounded-sm flex items-center justify-center border border-gray-300 transition-all duration-400 transition-colors ${styles.box}`}>
        <CheckIcon width={10} strokeWidth={1.5} />
      </div>
      <span className="text-gray-500 user-select-none text-lg transition-colors duration-500">{text}</span>
    </div>

  );
};

export default CheckBox;
