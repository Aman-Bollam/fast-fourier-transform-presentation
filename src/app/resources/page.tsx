import { SectionHeader } from "@/components/shared/SectionHeader";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { RESOURCE_SECTIONS } from "@/lib/placeholders";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Resources"
        title="Reference Material"
        description="Templates, key formulas, references, and common mistakes. Placeholder content for now."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {RESOURCE_SECTIONS.map((section) => (
          <ResourceCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
