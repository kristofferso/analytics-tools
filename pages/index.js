import { supabase } from "../utils/supabase";
import ToolCard from "./../components/ToolCard";
import Header from "./../components/Header";
import Page from "./../components/Page";
import { useState, useEffect } from "react";
import FilterSection from "../components/FilterSection";
import { reduceDimension } from "../utils/reduceDimension";
import Link from "next/link";

export default function Home({ tools }) {
  const [filterDimensions, setFilterDimensions] = useState({});
  const [typeDimension, setTypeDimension] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    setFilterDimensions({
      ...filterDimensions,
      type: {
        values: reduceDimension(tools, "type"),
        title: null,
        type: "type",
      },
      features: {
        values: reduceDimension(tools, "features"),
        title: "that includes features for",
        type: "multi",
      },
      cookie_based: {
        values: [true, false],
        type: "toggle_values",
      },
      privacy_friendly: {
        values: [true, false],
        type: "toggle_boolean",
      },
      open_source: {
        values: [true, false],
        type: "toggle_boolean",
      },
      hosting: {
        values: ["cloud", "self", "both"],
        type: "toggle_values",
      },
      analysis_level: {
        values: reduceDimension(tools, "analysis_level"),
        title: "and the tooling for data analysis is",
        type: "single",
      },
    });
    setTypeDimension(reduceDimension(tools, "type"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tools]);

  useEffect(() => {
    const filteredToolsArray = tools.filter((tool) => {
      return Object.keys(activeFilters).every((filter) => {
        const filterValue = activeFilters[filter];
        if (typeof filterValue === "object" && filterValue) {
          return filterValue.every((value) => {
            if (!tool[filter]) {
              return false;
            }
            return tool[filter].split(", ").includes(value);
          });
        } else {
          return filterValue === tool[filter];
        }
      });
    });

    setFilteredTools(filteredToolsArray);
  }, [tools, activeFilters]);

  return (
    <Page>
      <Header />
      <h1 className="text-5xl font-medium leading-[1.1] mb-4">
        All the analytics tools
      </h1>
      <FilterSection
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterDimensions={filterDimensions}
        typeDimension={typeDimension}
      />

      <div className="flex flex-col gap-2">
        <div className="divider">
          <h3 className="text-lg min-w-max">
            {filteredTools.length > 0
              ? `${filteredTools.length} ${
                  filteredTools.length === 1 ? "tool" : "tools"
                }`
              : "No tools match your criterias"}
          </h3>
        </div>
        <div className="alert bg-purple-200">
          Too many tools and parameters? Check out the guide
          <Link href="/guide">
            <a className="btn btn-primary rounded-full">Go to guide →</a>
          </Link>{" "}
        </div>
        <div className="flex items-center justify-center grow mt-3">
          {Object.keys(activeFilters).length > 0 && (
            <button
              className="btn btn-sm btn-outline rounded-full"
              onClick={() => {
                setActiveFilters({});
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-6">
        {filteredTools.map((tool, i) => (
          <ToolCard key={i} tool={tool} />
        ))}
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const { data: tools } = await supabase.from("tools").select("*");

  return { props: { tools } };
};
