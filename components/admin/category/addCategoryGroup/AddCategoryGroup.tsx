"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { TGetAllCategories, addCategory } from "@/actions/category/category";
import Popup from "@/components/ui/Popup";
import GroupCategory from "@/components/admin/forms/groupCategory";

interface IProps {
  onReset: () => void;
}

const AddCategoryGroup = ({ onReset }: IProps) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const defaultGroupData: TGetAllCategories = {
    id: "",
    parentID: null,
    name: "",
    url: "",
    iconSize: [10, 10],
    iconUrl: "",
  };
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [groupCategoryData, setGroupCategory] =
    useState<TGetAllCategories>(defaultGroupData);

  const handleAddGroup = async () => {
    const { name, url, iconUrl, iconSize } = groupCategoryData;
    if (!name || !url || !iconUrl || !iconSize) return;
    if (name === "") {
      setErrorMsg("Name is empty!");
      return;
    }
    if (iconSize[0] === 0 || iconSize[1] === 0) {
      setErrorMsg("Icon Size is empty!");
      return;
    }
    if (iconUrl === "") {
      setErrorMsg("Icon Url is empty!");
      return;
    }
    if (url === "") {
      setErrorMsg("URL is empty!");
      return;
    }

    setButtonDisabled(true);
    const result = await addCategory(groupCategoryData);

    if (result.res) {
      setGroupCategory(defaultGroupData);
      setButtonDisabled(false);
      setErrorMsg("");
      setShowWindow(false);
      onReset();
    } else {
      setButtonDisabled(false);
      setErrorMsg("Can't Insert it to Database!");
    }
  };

  return (
    <div>
      <Button
        onClick={() => setShowWindow(true)}
        text="Add Group"
        className="ml-24px"
      />
      {showWindow && (
        <Popup
          content={
            <GroupCategory
              errorMsg={errorMsg}
              data={groupCategoryData}
              onChange={setGroupCategory}
            />
          }
          isLoading={buttonDisabled}
          onCancel={() => setShowWindow(false)}
          onClose={() => setShowWindow(false)}
          onSubmit={() => handleAddGroup()}
          title="Add Category Group"
        />
      )}
    </div>
  );
};

export default AddCategoryGroup;
