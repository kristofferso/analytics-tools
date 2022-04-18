import { useState } from "react";
import TextLink from "../components/elements/TextLink";
import Header from "../components/Header";
import Page from "../components/Page";
import ToolCard from "../components/ToolCard";
import { supabase } from "../utils/supabase";

export default function Guide({ tools }) {
  return (
    <Page>
      <Header />
      <TextLink href="/">← Back to all tools</TextLink>
      <div className="flex flex-col gap-6">
        <h1 className="text-5xl font-medium leading-[1.1]">
          Analytics tool guide
        </h1>

        <GuideSection
          tools={tools}
          recommendedName="Plausible"
          title="Easy, privacy friendly and cookieless analytics"
          description="Tools that think alternatively about tracking by not relying on
          cookies and are explicit about not collecting any personal data while still giving you valuable insights."
          filterFunction={(tool) =>
            tool.privacy_friendly &&
            !tool.cookie_based &&
            tool.analysis_level === "simple" &&
            (tool.hosting === "both" || tool.hosting === "cloud")
          }
        />

        <GuideSection
          recommendedName="Howuku"
          tools={tools}
          title="Tools that look and feel like Google Analytics"
          description="Tools with the same level of reports and predefined dashboards,
              while still having the possiblity of drilling down in to your
              reports or making your own."
          filterFunction={(tool) =>
            tool.analysis_level === "medium" &&
            (tool.hosting === "both" || tool.hosting === "cloud")
          }
        />

        <GuideSection
          tools={tools}
          recommendedName="PostHog"
          title="Next level analytics tools for digital products"
          description="If you want to unleash the potential of advanced product analysis by understanding how users behave, where they meet friction and what they are looking for. Create segments, user paths and funnels better understand churn, conversions and value creation."
          filterFunction={(tool) =>
            tool.analysis_level === "advanced" &&
            tool.type === "product analytics"
          }
        />

        <GuideSection
          tools={tools}
          recommendedName="Pirsch"
          title="Easy and simple. Just web analytics and nothing more"
          description="If you want easy predefined dashboards and reports showing traffic sources, campaigns and which parts of your site is being used. Basic
          filtering and that's about it."
          filterFunction={(tool) =>
            tool.analysis_level === "simple" &&
            tool.type === "web analytics" &&
            tool.hosting === "cloud"
          }
        />
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const { data: tools } = await supabase.from("tools").select("*");

  return { props: { tools } };
};

const GuideSection = ({
  title,
  recommendedName,
  description,
  filterFunction = () => true,
  tools,
}) => {
  const [showAll, setShowAll] = useState(false);

  const recommendedTool = tools.filter(
    (tool) => tool.name === recommendedName
  )[0];
  return (
    <div className="flex flex-col gap-8 mb-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-medium">{title} </h2>
        <p className="">{description}</p>
      </div>
      {recommendedTool && (
        <div className="flex relative">
          <div className="bg-purple-200 border-primary border rounded-full px-4 py-2 rotate-2 self-center font-medium text-lg absolute -top-6 right-20 z-10">
            Recommended
          </div>
          <ToolCard tool={recommendedTool} className="flex-grow" />
        </div>
      )}
      <button
        className="btn btn-sm btn-outline rounded-full self-center"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Hide all alternatives" : "Show all alternatives"}
      </button>
      {showAll && (
        <div className="flex flex-wrap gap-6">
          {tools
            .filter(filterFunction)
            .filter((tool) => tool.name !== recommendedName)
            .map((tool, i) => {
              return <ToolCard key={i} tool={tool} />;
            })}
        </div>
      )}
    </div>
  );
};
