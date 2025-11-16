"use client";

import trackEvent from "../utils/trackEvent";
import TypeFilterIcons from "./TypeFilterIcons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

interface FilterDimensions {
  [key: string]: {
    values: (string | boolean)[];
    title?: string | null;
    type: "type" | "multi" | "single" | "toggle_values" | "toggle_boolean";
  };
}

interface ActiveFilters {
  [key: string]: string | boolean | string[] | undefined;
}

interface FilterSectionProps {
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
  filterDimensions: FilterDimensions;
  typeDimension?: string[];
}

export default function FilterSection({
  activeFilters,
  setActiveFilters,
  filterDimensions,
  typeDimension,
}: FilterSectionProps) {
  const handleMultiFilter = (dimension: string, selectedValue: string) => {
    if (Array.isArray(activeFilters[dimension]) && (activeFilters[dimension] as string[]).includes(selectedValue)) {
      setActiveFilters({
        ...activeFilters,
        [dimension]: [
          ...(activeFilters[dimension] as string[]).filter(
            (value) => value !== selectedValue
          ),
        ],
      });
    } else {
      const newActiveFilters = {
        ...activeFilters,
        [dimension]: [...((activeFilters[dimension] as string[]) || []), selectedValue],
      };
      setActiveFilters(newActiveFilters);
      trackEvent({
        name: `filter ${dimension}`,
        props: {
          value: selectedValue,
          allActiveFilters: newActiveFilters,
        },
      });
    }
  };

  const handleSingleFilter = (dimension: string, selectedValue: string | boolean) => {
    if (activeFilters[dimension] === selectedValue) {
      const newActiveFilters = { ...activeFilters };
      delete newActiveFilters[dimension];
      setActiveFilters(newActiveFilters);
    } else {
      const newActiveFilters = { ...activeFilters, [dimension]: selectedValue };
      setActiveFilters(newActiveFilters);
      trackEvent({
        name: `filter ${dimension}`,
        props: {
          value: selectedValue,
          allActiveFilters: newActiveFilters,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {Object.keys(filterDimensions)
        .filter(
          (dimensionKey) =>
            ["single", "multi", "type"].includes(
              filterDimensions[dimensionKey].type
            )
        )
        .map((dimension, i) => {
          const dimObject = filterDimensions[dimension];

          return (
            <div key={i} className="flex flex-wrap gap-2">
              {dimObject.title && (
                <h3 className="text-xl font-medium">{dimObject.title}</h3>
              )}
              {dimObject.type === "type" && (
                <TypeFilter
                  dimObject={dimObject}
                  dimension={dimension}
                  activeFilters={activeFilters}
                  handleSingleFilter={handleSingleFilter}
                />
              )}
              {dimObject.type === "multi" && (
                <MultiFilterButtons
                  dimObject={dimObject}
                  dimension={dimension}
                  activeFilters={activeFilters}
                  handleMultiFilter={handleMultiFilter}
                />
              )}
              {dimObject.type === "single" && (
                <SingleFilterButtons
                  dimObject={dimObject}
                  dimension={dimension}
                  activeFilters={activeFilters}
                  handleSingleFilter={handleSingleFilter}
                />
              )}
            </div>
          );
        })}
      <div className="flex flex-wrap gap-2">
        <BooleanFilters
          filterDimensions={filterDimensions}
          activeFilters={activeFilters}
          handleSingleFilter={handleSingleFilter}
        />
      </div>
    </div>
  );
}

interface MultiFilterButtonsProps {
  dimObject: FilterDimensions[string];
  dimension: string;
  activeFilters: ActiveFilters;
  handleMultiFilter: (dimension: string, selectedValue: string) => void;
}

const MultiFilterButtons = ({
  dimObject,
  dimension,
  activeFilters,
  handleMultiFilter,
}: MultiFilterButtonsProps) => (
  <>
    {dimObject.values.map((feature, index) => {
      const selected = Array.isArray(activeFilters[dimension]) && (activeFilters[dimension] as string[]).includes(feature as string);
      return (
        <Button
          key={index}
          variant={selected ? "default" : "outline"}
          size="lg"
          className={cn(
            "rounded-full",
            !selected && "bg-purple-100 hover:bg-purple-200"
          )}
          onClick={() => {
            handleMultiFilter(dimension, feature as string);
          }}
        >
          {feature}
          {selected && <span className="ml-2">×</span>}
        </Button>
      );
    })}
  </>
);

interface SingleFilterButtonsProps {
  dimObject: FilterDimensions[string];
  dimension: string;
  activeFilters: ActiveFilters;
  handleSingleFilter: (dimension: string, selectedValue: string | boolean) => void;
}

const SingleFilterButtons = ({
  dimObject,
  dimension,
  activeFilters,
  handleSingleFilter,
}: SingleFilterButtonsProps) => {
  const values = ["simple", "medium", "advanced"];
  return (
    <ButtonGroup>
      {values.map((feature, j) => {
        const selected = activeFilters[dimension] === feature;
        return (
          <Button
            key={j}
            variant={selected ? "default" : "outline"}
            size="lg"
            className={cn(
              "rounded-full",
              !selected && "bg-purple-100 hover:bg-purple-200"
            )}
            onClick={() => {
              handleSingleFilter(dimension, feature);
            }}
          >
            {feature}
            {selected && <span className="ml-2">×</span>}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

interface BooleanFiltersProps {
  filterDimensions: FilterDimensions;
  activeFilters: ActiveFilters;
  handleSingleFilter: (dimension: string, selectedValue: string | boolean) => void;
}

const BooleanFilters = ({
  filterDimensions,
  activeFilters,
  handleSingleFilter,
}: BooleanFiltersProps) => {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <h3 className="text-xl font-medium">and it is</h3>
      {Object.keys(filterDimensions)
        .filter(
          (dimensionKey) =>
            filterDimensions[dimensionKey].type === "toggle_values" ||
            filterDimensions[dimensionKey].type === "toggle_boolean"
        )
        .map((dimension, i) => {
          const dimObject = filterDimensions[dimension];
          return (
            <div key={i}>
              {dimObject.type === "toggle_values" && (
                <ButtonGroup>
                  {dimObject.values.map((feature, j) => {
                    const selected = activeFilters[dimension] === feature;
                    const label =
                      dimension === "cookie_based"
                        ? feature
                          ? "Cookie based"
                          : "Cookieless"
                        : dimension === "hosting"
                        ? feature === "both"
                          ? "both"
                          : `${feature} hosted`
                        : String(feature);
                    return (
                      <Button
                        key={j}
                        variant={selected ? "default" : "outline"}
                        size="lg"
                        className={cn(
                          "rounded-full",
                          !selected && "bg-purple-100 hover:bg-purple-200"
                        )}
                        onClick={() => {
                          handleSingleFilter(dimension, feature as string | boolean);
                        }}
                      >
                        {label}
                        {selected && <span className="ml-2">×</span>}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              )}
              {dimObject.type === "toggle_boolean" && (
                <Button
                  variant={activeFilters[dimension] ? "default" : "outline"}
                  size="lg"
                  className={cn(
                    "rounded-full",
                    !activeFilters[dimension] && "bg-purple-100 hover:bg-purple-200"
                  )}
                  onClick={() => {
                    handleSingleFilter(dimension, true);
                  }}
                >
                  {dimension === "privacy_friendly" && "Privacy friendly"}
                  {dimension === "open_source" && "Open source"}
                  {activeFilters[dimension] && <span className="ml-2">×</span>}
                </Button>
              )}
            </div>
          );
        })}
    </div>
  );
};

interface TypeFilterProps {
  dimObject: FilterDimensions[string];
  dimension: string;
  activeFilters: ActiveFilters;
  handleSingleFilter: (dimension: string, selectedValue: string | boolean) => void;
}

const TypeFilter = ({
  dimObject,
  dimension,
  activeFilters,
  handleSingleFilter,
}: TypeFilterProps) => {
  return (
    <div className="flex gap-4 w-full flex-wrap items-start mb-2">
      {dimObject.values.map((feature, j) => {
        const selected = activeFilters[dimension] === feature;
        return (
          <Button
            key={j}
            variant="outline"
            className={cn(
              "!p-6 !flex !flex-col !items-start !justify-between rounded-2xl h-44 sm:h-48 w-48 grow border shadow group hover:border-primary [&_svg]:!size-auto",
              selected && "border-primary bg-purple-100"
            )}
            onClick={() => {
              handleSingleFilter(dimension, feature as string);
            }}
          >
            <p className="text-left text-lg font-medium capitalize group-hover:text-primary z-10">
              {feature as string}
            </p>
            <TypeFilterIcons feature={feature as string} selected={selected} />
          </Button>
        );
      })}
    </div>
  );
};

