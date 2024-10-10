"use client";
import { TGetAllCategories } from "@/actions/category/category";

interface IProps {
  errorMsg: string;
  data: TGetAllCategories;
  onChange: (data: TGetAllCategories) => void;
}

const GroupCategory = ({ errorMsg, data, onChange }: IProps) => {
  const iconSize: number[] = data.iconSize ? [...data.iconSize] : [];
  return (
    <div className="flex flex-col gap-1 my-3">
      <div className="flex px-3 h-10 items-center gap-4">
        <span className="w-52">Category Group Name:</span>
        <input
          name="name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.currentTarget.value })}
          type="text"
          placeholder="name..."
          className="flex-1"
        />
      </div>
      <div className="flex px-3 h-10 items-center gap-4">
        <span className="w-52">URL:</span>
        <input
          name="url"
          onChange={(e) => onChange({ ...data, url: e.currentTarget.value })}
          type="text"
          placeholder="URL..."
          value={data.url}
          className="flex-1"
        />
      </div>
      <div className="flex px-3 h-10 items-center gap-4">
        <span className="w-52">ICON URL:</span>
        <input
          name="iconUrl"
          onChange={(e) =>
            onChange({ ...data, iconUrl: e.currentTarget.value })
          }
          type="text"
          placeholder="ICON URL..."
          value={data.iconUrl || ""}
          className="flex-1"
        />
      </div>
      <div className="flex px-3 h-10 items-center gap-4">
        <span className="w-52">ICON Size:</span>
        {data.iconSize && (
          <>
            <input
              name="iconSize1"
              type="number"
              onChange={(e) =>
                onChange({
                  ...data,
                  iconSize: [parseInt(e.currentTarget.value) | 0, iconSize[1]],
                })
              }
              placeholder="0"
              value={data.iconSize[0]}
              className="flex-1"
            />
            <input
              name="iconSize2"
              type="number"
              placeholder="0"
              onChange={(e) =>
                onChange({
                  ...data,
                  iconSize: [iconSize[0], parseInt(e.currentTarget.value) | 0],
                })
              }
              value={data.iconSize[1]}
              className="flex-1"
            />
          </>
        )}
      </div>
      {errorMsg !== "" && (
        <div className="flex px-3 h-10 items-center gap-4">
          <span className="text-red-500 w-full">{errorMsg}</span>
        </div>
      )}
    </div>
  );
};

export default GroupCategory;
