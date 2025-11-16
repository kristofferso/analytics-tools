"use client";

import trackEvent from "../utils/trackEvent";
import TypeFilterIcons from "./TypeFilterIcons";

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
        <button
          key={index}
          className={`btn btn-sm ${
            selected
              ? "btn-primary"
              : "btn-ghost bg-purple-100 hover:bg-purple-200"
          } rounded-full`}
          onClick={() => {
            handleMultiFilter(dimension, feature as string);
          }}
        >
          <p>
            {feature}
            {selected && <span className="ml-3 mb-3">×</span>}
          </p>
        </button>
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
    <div className="btn-group">
      {values.map((feature, j) => {
        const selected = activeFilters[dimension] === feature;
        return (
          <button
            key={j}
            className={`btn btn-sm btn-ghost ${
              selected ? "btn-active" : "bg-purple-100 hover:bg-purple-200"
            } rounded-full`}
            onClick={() => {
              handleSingleFilter(dimension, feature);
            }}
          >
            <p>
              {feature}
              {selected && <span className="ml-3 mb-3">×</span>}
            </p>
          </button>
        );
      })}
    </div>
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
    <div className="flex gap-2 flex-wrap">
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
                <div className="btn-group">
                  {dimObject.values.map((feature, j) => {
                    const selected = activeFilters[dimension] === feature;
                    return (
                      <button
                        key={j}
                        className={`btn btn-sm btn-ghost ${
                          selected
                            ? "btn-active"
                            : "bg-purple-100 hover:bg-purple-200"
                        } rounded-full`}
                        onClick={() => {
                          handleSingleFilter(dimension, feature as string | boolean);
                        }}
                      >
                        {dimension === "cookie_based" &&
                          (feature ? (
                            <p>
                              Cookie based
                              {activeFilters[dimension] === feature && (
                                <span className="ml-3 mb-3">×</span>
                              )}
                            </p>
                          ) : (
                            <p>
                              Cookieless
                              {activeFilters[dimension] === feature && (
                                <span className="ml-3 mb-3">×</span>
                              )}
                            </p>
                          ))}
                        {dimension === "hosting" &&
                          (feature === "both" ? (
                            <p>
                              {feature}
                              {selected && <span className="ml-3 mb-3">×</span>}
                            </p>
                          ) : (
                            <p>
                              {feature} hosted
                              {selected && <span className="ml-3 mb-3">×</span>}
                            </p>
                          ))}
                      </button>
                    );
                  })}
                </div>
              )}
              {dimObject.type === "toggle_boolean" && (
                <button
                  className={`btn btn-sm ${
                    activeFilters[dimension]
                      ? "btn-primary"
                      : "btn-ghost bg-purple-100 hover:bg-purple-200"
                  } rounded-full`}
                  onClick={() => {
                    handleSingleFilter(dimension, true);
                  }}
                >
                  {dimension === "privacy_friendly" && (
                    <p>
                      Privacy friendly
                      {activeFilters[dimension] && (
                        <span className="ml-3 mb-3">×</span>
                      )}
                    </p>
                  )}
                  {dimension === "open_source" && (
                    <p>
                      Open source
                      {activeFilters[dimension] && (
                        <span className="ml-3 mb-3">×</span>
                      )}
                    </p>
                  )}
                </button>
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
          <button
            key={j}
            className={`card p-4 items-start justify-between rounded-2xl h-36 sm:h-40 w-40 grow border border-base-content shadow group hover:border-primary-focus ${
              selected ? "border-primary-focus bg-purple-100" : ""
            }`}
            onClick={() => {
              handleSingleFilter(dimension, feature as string);
            }}
          >
            <p className="text-left text-lg font-medium capitalize group-hover:text-primary-focus z-10">
              {feature as string}
            </p>
            <TypeFilterIcons feature={feature as string} selected={selected} />
          </button>
        );
      })}
    </div>
  );
};

