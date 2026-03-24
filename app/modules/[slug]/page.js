import { MODULE_DATA } from "@/data/modules";
import ModulePageContent from "@/components/module-page-content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return MODULE_DATA.map((mod) => ({
    slug: mod.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const mod = MODULE_DATA.find((m) => m.slug === slug);
  if (!mod) return {};

  return {
    title: `Module ${mod.id}: ${mod.title} | Smart Agriculture Training`,
    description: mod.description,
  };
}

export default async function ModulePage({ params }) {
  const { slug } = await params;
  const mod = MODULE_DATA.find((m) => m.slug === slug);

  if (!mod) {
    notFound();
  }

  return <ModulePageContent module={mod} allModules={MODULE_DATA} />;
}
