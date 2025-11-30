import { useState } from "react";
import { Hero } from "@/components/Hero";
import { DocumentWorkspace } from "@/components/DocumentWorkspace";

const Index = () => {
  const [selectedType, setSelectedType] = useState<'word' | 'powerpoint' | null>(null);

  if (selectedType) {
    return <DocumentWorkspace type={selectedType} onBack={() => setSelectedType(null)} />;
  }

  return <Hero onSelectType={setSelectedType} />;
};

export default Index;
