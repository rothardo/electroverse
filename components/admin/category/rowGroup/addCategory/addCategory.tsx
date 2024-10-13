"use client";
import { TAddCategory } from "@/actions/category/category";

interface IProps {
  errorMsg: string;
  data: TAddCategory;
  onChange: (data: TAddCategory) => void;
}

const AddCategory = ({ data, errorMsg, onChange }: IProps) => {
  return (
    <div className="flex flex-col gap-1.5 my-3">
      <div className="flex items-center gap-4 px-3 h-10">
      <span className="w-30">Category Name:</span>
      <input
        name="name"
        value={data.name}
        onChange={(e) => onChange({ ...data, name: e.currentTarget.value })}
        type="text"
        placeholder="name..."
        className="flex-1"
      />
      </div>
      <div className="flex items-center gap-4 px-3 h-10">
      <span className="w-30">URL:</span>
      <input
        name="url"
        onChange={(e) => onChange({ ...data, url: e.currentTarget.value })}
        type="text"
        placeholder="URL..."
        value={data.url}
        className="flex-1"
      />
      </div>

      {errorMsg !== "" && (
      <div className="flex items-center gap-4 px-3 h-10">
        <span className="text-red-500 w-full">{errorMsg}</span>
      </div>
      )}
    </div>
  );
};

export default AddCategory;
