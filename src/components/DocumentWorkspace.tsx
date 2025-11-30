import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Download, Sparkles, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface DocumentWorkspaceProps {
  type: 'word' | 'powerpoint';
  onBack: () => void;
}

export const DocumentWorkspace = ({ type, onBack }: DocumentWorkspaceProps) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [refiningId, setRefiningId] = useState<string | null>(null);

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    
    const newSection: Section = {
      id: Date.now().toString(),
      title: newSectionTitle,
      content: ""
    };
    
    setSections([...sections, newSection]);
    setNewSectionTitle("");
    toast.success("Section added");
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
    toast.success("Section removed");
  };

  const generateContent = (id: string) => {
    setGeneratingId(id);
    
    // Simulate AI generation
    setTimeout(() => {
      const section = sections.find(s => s.id === id);
      if (section) {
        const generatedContent = type === 'word' 
          ? `This is a professionally generated paragraph for "${section.title}". The content is clear, insightful, and follows best practices for business documentation. It includes relevant details and maintains a consistent tone throughout the section.\n\nAdditional context and supporting information are provided in subsequent paragraphs to ensure comprehensive coverage of the topic.`
          : `• Key point about ${section.title}\n• Supporting detail with specific examples\n• Implementation strategy and best practices\n• Expected outcomes and benefits\n• Next steps and recommendations`;
        
        setSections(sections.map(s => 
          s.id === id ? { ...s, content: generatedContent } : s
        ));
        toast.success("Content generated!");
      }
      setGeneratingId(null);
    }, 1500);
  };

  const refineContent = (id: string) => {
    if (!refinementPrompt.trim()) return;
    
    setRefiningId(id);
    
    // Simulate AI refinement
    setTimeout(() => {
      const section = sections.find(s => s.id === id);
      if (section) {
        const refinedContent = `${section.content}\n\n[Refined based on: "${refinementPrompt}"]`;
        setSections(sections.map(s => 
          s.id === id ? { ...s, content: refinedContent } : s
        ));
        toast.success("Content refined!");
        setRefinementPrompt("");
      }
      setRefiningId(null);
    }, 1200);
  };

  const exportDocument = () => {
    toast.success(`Exporting to ${type === 'word' ? 'Word' : 'PowerPoint'}...`);
    // In a real app, this would trigger actual export
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      
      <header className="glass border-b border-border/50 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} size="icon" className="hover:bg-primary/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold">
                {type === 'word' ? 'Word Document' : 'PowerPoint Presentation'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {sections.length} {sections.length === 1 ? 'section' : 'sections'}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={exportDocument} 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity glow-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* Outline Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-6 glass shadow-card sticky top-24 border-border/50">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                Outline
              </h3>
              
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder={type === 'word' ? 'Section title...' : 'Slide title...'}
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSection()}
                  className="glass border-border/50 focus:border-primary/50 transition-colors"
                />
                <Button 
                  onClick={addSection} 
                  size="icon"
                  className="bg-primary/20 hover:bg-primary/30 border border-primary/50 glow-primary"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 glass rounded-xl hover:border-primary/30 transition-all duration-200"
                  >
                    <span className="text-sm font-medium flex items-center gap-2">
                      <span className="text-primary font-bold">{index + 1}</span>
                      {section.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                      onClick={() => removeSection(section.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {sections.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Add sections to start building your document
                </p>
              )}
            </Card>
          </motion.div>

          {/* Content Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {sections.map((section) => (
              <Card key={section.id} className="p-6 glass shadow-card border-border/50 hover:border-primary/20 transition-all duration-300">
                <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent glow-accent" />
                  {section.title}
                </h4>
                
                {!section.content ? (
                  <div className="text-center py-12">
                    <Button
                      onClick={() => generateContent(section.id)}
                      disabled={generatingId === section.id}
                      className="bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity glow-accent"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {generatingId === section.id ? 'Generating...' : 'Generate Content'}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Textarea
                      value={section.content}
                      onChange={(e) => setSections(sections.map(s => 
                        s.id === section.id ? { ...s, content: e.target.value } : s
                      ))}
                      className="min-h-[200px] mb-4 glass border-border/50 focus:border-accent/50 transition-colors"
                    />
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Refine this section (e.g., 'make it shorter', 'more formal')"
                        value={refiningId === section.id ? "" : refinementPrompt}
                        onChange={(e) => setRefinementPrompt(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && refineContent(section.id)}
                        className="glass border-border/50 focus:border-secondary/50 transition-colors"
                      />
                      <Button
                        onClick={() => refineContent(section.id)}
                        disabled={!refinementPrompt.trim() || refiningId === section.id}
                        variant="outline"
                        className="glass border-secondary/50 hover:bg-secondary/10"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        {refiningId === section.id ? 'Refining...' : 'Refine'}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            {sections.length === 0 && (
              <Card className="p-12 text-center glass shadow-card border-border/50">
                <h4 className="font-bold text-2xl mb-2">Ready to Create?</h4>
                <p className="text-muted-foreground">
                  Add sections to your outline to get started with AI-powered content generation
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
