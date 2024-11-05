"use client";
import styles from "./filters.module.scss";

import { CloseIcon } from "@/components/icons/svgIcons";
import { TFilters } from "@/types/product";
import CheckBox from "@/components/ui/Checkbox";
import PriceSlider from "@/components/ui/PriceSlider";
import { SK_Box } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import { TPageStatus } from "@/types/list";

interface IProps {
  showFilters: boolean;
  filters: TFilters;
  isFilterChanged: boolean;
  pageStatus: TPageStatus;
  onToggleWindow: (value: boolean) => void;
  onFilterChange: (value: TFilters) => void;
  onBrandChange: (value: number) => void;
  onApplyFilter: () => void;
}

const Filters = ({
  showFilters,
  filters,
  isFilterChanged,
  pageStatus,
  onToggleWindow,
  onFilterChange,
  onBrandChange,
  onApplyFilter,
}: IProps) => {
  return (
    <div
      className={`min-w-[260px] ${showFilters ? "showMobileFilters" : ""} ${
        styles.filtersContainer
      }`}
    >
      <div
        className={`${styles.background} ${showFilters ? "block" : "hidden"}`}
        onClick={() => onToggleWindow(false)}
      />

      <div
        className={`${styles.filtersWindow} min-w-[220px] max-w-[260px] bg-white p-4 border-r border-[#f0f0f0] overflow-y-auto`}
      >
        <div className={`${styles.header} hidden`}>
          <h2>Filters</h2>
          <button onClick={() => onToggleWindow(false)}>
            <CloseIcon width={12} />
          </button>
        </div>
        <div
          className={`${styles.eachFilter} mb-4 border-b border-[#f0f0f0] last:border-b-0`}
        >
          <div className={`${styles.header} flex justify-between mb-2`}>
            <h3 className="text-lg font-medium text-[#666666]">Availability</h3>
          </div>
          <div className={`${styles.body} flex flex-col gap-2 p-2`}>
            <CheckBox
              text="All"
              onClick={() => onFilterChange({ ...filters, stockStatus: "all" })}
              isChecked={filters.stockStatus === "all"}
            />
            <CheckBox
              text="In Stock"
              onClick={() =>
                onFilterChange({ ...filters, stockStatus: "inStock" })
              }
              isChecked={filters.stockStatus === "inStock"}
            />
            <CheckBox
              text="Out of Stock"
              onClick={() =>
                onFilterChange({ ...filters, stockStatus: "outStock" })
              }
              isChecked={filters.stockStatus === "outStock"}
            />
          </div>
        </div>
        <div
          className={`${styles.eachFilter} mb-4 border-b border-[#f0f0f0] last:border-b-0`}
        >
          <div className={`${styles.header} flex justify-between mb-2`}>
            <h3 className="text-lg font-medium text-[#666666]">Price</h3>
          </div>
          <div className={`${styles.body} flex flex-col gap-2 p-2`}>
            <PriceSlider
              sliderValues={filters.priceMinMax}
              minMaxLimit={filters.priceMinMaxLimitation}
              pageStatus={pageStatus}
              onChange={(value) =>
                onFilterChange({ ...filters, priceMinMax: [...value] })
              }
            />
          </div>
        </div>
        <div
          className={`${styles.eachFilter} mb-4 border-b border-[#f0f0f0] last:border-b-0`}
        >
          <div className={`${styles.header} flex justify-between mb-2`}>
            <h3 className="text-lg font-medium text-[#666666]">Brands</h3>
          </div>
          <div className={`${styles.body} flex flex-col gap-2 p-2`}>
            {pageStatus === "pageLoading" ? (
              <div className={`${styles.loadingBrands} flex flex-col gap-2`}>
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
                <SK_Box width="100%" height="20px" />
              </div>
            ) : pageStatus === "categoryHasNoProduct" ? (
              <div className={styles.optionsList} />
            ) : (
              <div className={`${styles.optionsList} flex flex-col`}>
                {filters.brands.map((brand, index) => (
                  <CheckBox
                    key={brand.id}
                    isChecked={brand.isSelected}
                    text={brand.name}
                    onClick={() => onBrandChange(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={`${styles.apply} mt-4`}>
          <Button
            text="Apply Changes"
            disabled={isFilterChanged}
            onClick={() => onApplyFilter()}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
