import TypeFilterIcons from "./TypeFilterIcons";
export default function FilterSection({
  activeFilters,
  setActiveFilters,
  filterDimensions,
}) {
  const handleMultiFilter = (dimension, selectedValue) => {
    if (activeFilters[dimension]?.includes(selectedValue)) {
      setActiveFilters({
        ...activeFilters,
        [dimension]: [
          ...activeFilters[dimension].filter(
            (value) => value !== selectedValue
          ),
        ],
      });
    } else {
      setActiveFilters({
        ...activeFilters,
        [dimension]: [...(activeFilters[dimension] || []), selectedValue],
      });
    }
  };

  const handleSingleFilter = (dimension, selectedValue) => {
    if (activeFilters[dimension] === selectedValue) {
      const newActiveFilters = { ...activeFilters };
      delete newActiveFilters[dimension];
      setActiveFilters(newActiveFilters);
    } else {
      setActiveFilters({ ...activeFilters, [dimension]: selectedValue });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {Object.keys(filterDimensions)
        .filter(
          (dimensionKey) =>
            (dimensionKey = ["single", "multi", "type"].includes(
              filterDimensions[dimensionKey].type
            ))
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

const MultiFilterButtons = ({
  dimObject,
  dimension,
  activeFilters,
  handleMultiFilter,
}) => (
  <>
    {dimObject.values.map((feature, index) => {
      const selected = activeFilters[dimension]?.includes(feature);
      return (
        <button
          key={index}
          className={`btn btn-sm ${
            selected ? "btn-primary" : "btn-ghost bg-gray-200"
          } rounded-full`}
          onClick={() => {
            handleMultiFilter(dimension, feature);
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

const SingleFilterButtons = ({
  dimObject,
  dimension,
  activeFilters,
  handleSingleFilter,
}) => {
  return (
    <div className="btn-group">
      {dimObject.values.map((feature, j) => {
        const selected = activeFilters[dimension]?.includes(feature);
        return (
          <button
            key={j}
            className={`btn btn-sm btn-ghost ${
              selected ? "btn-active" : "bg-gray-200"
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

const BooleanFilters = ({
  filterDimensions,
  activeFilters,
  handleSingleFilter,
}) => {
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
                          selected ? "btn-active" : "bg-gray-200"
                        } rounded-full`}
                        onClick={() => {
                          handleSingleFilter(dimension, feature);
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
                      : "btn-ghost bg-gray-200"
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

const TypeFilter = ({
  dimObject,
  dimension,
  activeFilters,
  handleSingleFilter,
}) => {
  return (
    <div className="flex gap-4 w-full flex-wrap items-start mb-2">
      {dimObject.values.map((feature, j) => {
        const selected = activeFilters[dimension] === feature;
        return (
          <button
            key={j}
            className={`card p-4 items-start justify-between rounded-2xl h-40 sm:h-32 w-40 grow border border-base-content shadow group hover:border-primary-focus ${
              selected ? "border-primary-focus bg-purple-100" : ""
            }`}
            onClick={() => {
              handleSingleFilter(dimension, feature);
            }}
          >
            <p className="text-left text-lg font-medium capitalize group-hover:text-primary-focus z-10">
              {feature}
            </p>
            <TypeFilterIcons feature={feature} selected={selected} />
          </button>
        );
      })}
    </div>
  );
};
