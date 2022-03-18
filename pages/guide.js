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
        <h1 className="text-5xl font-medium">Analytics tool guide</h1>

        <GuideSection
          tools={tools}
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
          title="Next level analytics tools for digital products"
          description="If you want to unleash the potential of advanced product analysis by understanding how users behave, where they meet friction and what they are looking for. Create segments, user paths and funnels better understand churn, conversions and value creation."
          filterFunction={(tool) =>
            tool.analysis_level === "advanced" &&
            tool.type === "product analytics"
          }
        />

        <GuideSection
          tools={tools}
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
  description,
  filterFunction = () => true,
  tools,
}) => (
  <div className="flex flex-col gap-8 mb-12">
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-medium">{title} </h2>
      <p className="">{description}</p>
    </div>
    <div className="flex flex-wrap gap-6">
      {tools.filter(filterFunction).map((tool, i) => {
        return <ToolCard key={i} tool={tool} />;
      })}
    </div>
  </div>
);
