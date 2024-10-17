"use client";

import { TDropDown } from "@/types/uiElements";
import DropDownList from "@/components/ui/DropDown";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { getAllCategoriesJSON } from "@/actions/category/category";
import { TGroupJSON } from "@/types/categories";
import { getCategorySpecs } from "@/actions/category/specifications";
import { ProductSpec, SpecGroup } from "@prisma/client";
import { TAddProductFormValues, TBrand } from "@/types/product";
import { getAllBrands } from "@/actions/brands/brands";

const categoryListFirstItem: TDropDown = {
  text: "Select A Category....",
  value: "",
};

const brandListFirstItem: TDropDown = {
  text: "Select A Brand....",
  value: "",
};

interface IProps {
  formValues: TAddProductFormValues;
  onChange: (props: TAddProductFormValues) => void;
}

const ProductForm = ({ formValues: props, onChange }: IProps) => {
  const [categoryList, setCategoryList] = useState<TDropDown[]>([
    categoryListFirstItem,
  ]);
  const [brandList, setBrandList] = useState<TDropDown[]>([brandListFirstItem]);
  const [selectedCategoryListIndex, setSelectedCategoryListIndex] = useState(0);
  const [selectedBrandListIndex, setSelectedBrandListIndex] = useState(0);

  const [categorySpecs, setCategorySpecs] = useState<SpecGroup[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        setCategoryList(convertJSONtoDropdownList(result.res));
      }
    };

    const fetchBrands = async () => {
      const result = await getAllBrands();
      if (result.res) {
        setBrandList(convertBrandsToDropdownList(result.res));
      }
    };

    const convertJSONtoDropdownList = (json: TGroupJSON[]): TDropDown[] => {
      const dropDownData: TDropDown[] = [categoryListFirstItem];
      json.forEach((group) => {
        dropDownData.push({
          text: group.group.name,
          value: group.group.id,
        });
        group.categories.forEach((category) => {
          dropDownData.push({
            text: group.group.name + " - " + category.category.name,
            value: category.category.id,
          });
          category.subCategories.forEach((sub) => {
            dropDownData.push({
              text:
                group.group.name +
                " - " +
                category.category.name +
                " - " +
                sub.name,
              value: sub.id,
            });
          });
        });
      });

      return dropDownData;
    };

    const convertBrandsToDropdownList = (brandList: TBrand[]): TDropDown[] => {
      const dropDownData: TDropDown[] = [brandListFirstItem];
      brandList.forEach((brand) => {
        dropDownData.push({
          text: brand.name,
          value: brand.id,
        });
      });

      return dropDownData;
    };

    fetchCategories();
    fetchBrands();
  }, []);

  const handleCategoryChange = (index: number) => {
    setSelectedCategoryListIndex(index);
    if (index === 0) {
      onChange({
        ...props,
        specifications: JSON.parse(JSON.stringify(props.specifications)),
        categoryID: "",
      });
      setCategorySpecs([]);
    } else {
      getSpecGroup(categoryList[index].value);
    }
  };

  const handleBrandChange = (index: number) => {
    setSelectedBrandListIndex(index);
    onChange({ ...props, brandID: brandList[index].value });
  };

  const getSpecGroup = async (categoryID: string) => {
    const response = await getCategorySpecs(categoryID);
    if (response.res) {
      const specArray: ProductSpec[] = [];
      response.res.forEach((item) => {
        specArray.push({
          specGroupID: item.id,
          specValues: item.specs.map(() => ""),
        });
      });
      onChange({
        ...props,
        specifications: JSON.parse(JSON.stringify(specArray)),
        categoryID: categoryID,
      });
      setCategorySpecs(response.res);
    }
  };

  const handleSpecialFeatureChange = (index: number, value: string) => {
    const newArray = [...props.specialFeatures];
    newArray[index] = value;
    onChange({ ...props, specialFeatures: newArray });
  };

  return (
    <div className="flex flex-col overflow-y-scroll p-6 rounded-lg bg-white z-10 text-lg">
      <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Name:</span>
        <input
        type="text"
        value={props.name}
        placeholder="Name..."
        onChange={(e) =>
          onChange({
          ...props,
          name: e.currentTarget.value,
          })
        }
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Short Descriptions:</span>
        <input
        type="text"
        value={props.desc}
        onChange={(e) =>
          onChange({
          ...props,
          desc: e.currentTarget.value,
          })
        }
        placeholder="Short Description..."
        />
      </div>
      <div className="max-w-lg">
        <span>Special Features:</span>
        <div className="flex flex-col gap-2">
        <input
          type="text"
          value={props.specialFeatures[0]}
          onChange={(e) =>
          handleSpecialFeatureChange(0, e.currentTarget.value)
          }
        />
        <input
          type="text"
          value={props.specialFeatures[1]}
          onChange={(e) =>
          handleSpecialFeatureChange(1, e.currentTarget.value)
          }
        />
        <input
          type="text"
          value={props.specialFeatures[2]}
          onChange={(e) =>
          handleSpecialFeatureChange(2, e.currentTarget.value)
          }
        />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Price:</span>
        <input
        type="number"
        value={props.price}
        onChange={(e) =>
          onChange({
          ...props,
          price: e.currentTarget.value,
          })
        }
        placeholder="0.00€"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Sale Price:</span>
        <input
        type="number"
        value={props.salePrice}
        onChange={(e) =>
          onChange({
          ...props,
          salePrice: e.currentTarget.value,
          })
        }
        placeholder="0.00€"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Is In Stock:</span>
        <div className="flex items-center">
        <span
          className={`cursor-pointer rounded px-3 py-1 ml-1 border transition-colors ${
          props.isAvailable
            ? "border-none text-white bg-green-500 hover:bg-blue-500"
            : "border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => onChange({ ...props, isAvailable: true })}
        >
          In Stock
        </span>
        <span
          className={`cursor-pointer rounded px-3 py-1 ml-1 border transition-colors ${
          !props.isAvailable
            ? "border-none text-white bg-red-500 hover:bg-red-600"
            : "border-gray-300 hover:bg-gray-200"
          }`}
          onClick={() => onChange({ ...props, isAvailable: false })}
        >
          Out Of Stock
        </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Brand:</span>
        <DropDownList
        data={brandList}
        width="200px"
        selectedIndex={selectedBrandListIndex}
        onChange={handleBrandChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Images:</span>
        <div className="flex flex-col gap-2">
        {props.images.map((img: string, index: number) => (
          <input
          key={index}
          type="text"
          value={img}
          onChange={(e) => {
            props.images[index] = e.currentTarget.value;
            onChange({ ...props });
          }}
          />
        ))}
        </div>
        <Button
        text="+"
        onClick={() => {
          props.images.push("");
          onChange({ ...props });
        }}
        />
        <Button
        text="-"
        onClick={() => {
          props.images.pop();
          onChange({ ...props });
        }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="inline-block w-52">Category</span>
        <DropDownList
        data={categoryList}
        width="430px"
        selectedIndex={selectedCategoryListIndex}
        onChange={handleCategoryChange}
        />
      </div>
      </div>
      <div className="mt-5 border-t border-gray-300 w-full h-auto pt-4 flex flex-col">
      <span className="pb-3">Specifications:</span>
      <div className="flex-grow flex flex-col items-start gap-4 mb-6">
        {categorySpecs.length > 0 ? (
        <>
          {categorySpecs.map((specGroup, groupIndex) => (
          <div className="w-full flex flex-col p-3 rounded border border-gray-300" key={specGroup.id}>
            <span className="w-full pb-3 mb-3 border-b border-gray-300">{specGroup.title}</span>
            <>
            {specGroup.specs.map((spec: string, specIndex: number) => (
              <div className="w-full flex items-center justify-between p-2 pl-4 rounded transition-colors hover:bg-gray-200" key={specIndex}>
              <span>{spec}</span>
              <input
                type="text"
                value={
                props.specifications[groupIndex]?.specValues[
                  specIndex
                ]
                }
                onChange={(e) => {
                props.specifications[groupIndex].specValues[
                  specIndex
                ] = e.currentTarget.value;
                onChange({ ...props });
                }}
              />
              </div>
            ))}
            </>
          </div>
          ))}
        </>
        ) : (
        <span>Can not Find! </span>
        )}
      </div>
      </div>
    </div>
  );
};

export default ProductForm;
