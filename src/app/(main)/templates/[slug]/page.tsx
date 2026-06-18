import { notFound } from "next/navigation";
import { getTemplateBySlug, templates } from "../../../../lib/templates-data";
import TimberDemo from "../../../components/templates/demos/TimberDemo";
import CakeDemo from "../../../components/templates/demos/CakeDemo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return templates.map((template) => ({
    slug: template.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const template = getTemplateBySlug(params.slug);
  if (!template) return {};

  return {
    title: `${template.name} Template - AVB Software`,
    description: template.description,
  };
}

export default function TemplateDemoPage({ params }: { params: { slug: string } }) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }

  const renderDemo = () => {
    switch (template.demoComponent) {
      case "TimberDemo":
        return <TimberDemo />;
      case "CakeDemo":
        return <CakeDemo />;
      default:
        return <div>Demo not available</div>;
    }
  };

  return renderDemo();
}