import { useState } from "react";
import { AgentSelector, type AgentType } from "@/components/AgentSelector";
import { ImageUpload } from "@/components/ImageUpload";
import { TextPromptInput } from "@/components/TextPromptInput";
import { OutputDisplay } from "@/components/OutputDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | undefined>();
  const [imageBase64, setImageBase64] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const handleRunAgent = async () => {
    // Validation
    if (!selectedAgent) {
      toast({
        title: "Select an agent",
        description: "Please choose an AI agent to run",
        variant: "destructive",
      });
      return;
    }

    if (!imageBase64) {
      toast({
        title: "Upload an image",
        description: "Please upload a product image",
        variant: "destructive",
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Enter a prompt",
        description: "Please provide a text prompt",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput(null);
    setIsError(false);

    try {
      // Simulate API call - Replace with actual backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock response based on agent type
      if (selectedAgent === "seo") {
        const mockMarkdown = `# Product Title: Premium Eco-Friendly Water Bottle

## Product Description

Introducing our **revolutionary** stainless steel water bottle designed for the modern, environmentally-conscious consumer.

### Key Features:
- **Double-wall insulation** keeps drinks cold for 24 hours or hot for 12 hours
- Made from 100% recycled stainless steel
- BPA-free and eco-friendly materials
- Leak-proof design with secure locking mechanism
- Available in 5 vibrant colors

### Benefits:
- Reduce plastic waste and environmental impact
- Save money on disposable bottles
- Perfect for outdoor activities, gym, or office
- Easy to clean and dishwasher safe

*Order now and join the sustainable living movement!*`;
        setOutput(mockMarkdown);
      } else {
        // For image enhancer, use a placeholder image URL
        setOutput("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop");
      }

      toast({
        title: "Success!",
        description: "Agent completed successfully",
      });
    } catch (error) {
      setIsError(true);
      setOutput(error instanceof Error ? error.message : "An unexpected error occurred");
      toast({
        title: "Error",
        description: "Failed to run agent",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const canRun = selectedAgent && imageBase64 && prompt.trim() && !isRunning;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Agent Hub</h1>
              <p className="text-sm text-muted-foreground">Multi-agent AI platform for content and images</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <Card className="p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">1</span>
                <span>Configure Agent</span>
              </h2>
              <div className="space-y-6">
                <AgentSelector
                  value={selectedAgent}
                  onChange={setSelectedAgent}
                  disabled={isRunning}
                />

                <ImageUpload
                  onImageSelect={setImageBase64}
                  disabled={isRunning}
                />

                <TextPromptInput
                  value={prompt}
                  onChange={setPrompt}
                  agentType={selectedAgent}
                  disabled={isRunning}
                />
              </div>
            </Card>

            <Button
              onClick={handleRunAgent}
              disabled={!canRun}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Run Agent
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">2</span>
                <span>View Results</span>
              </h2>
              
              {isRunning ? (
                <Card className="p-12 text-center">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-accent mb-4" />
                  <p className="text-lg font-medium">Processing your request...</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {selectedAgent === "seo" 
                      ? "Generating SEO-optimized content" 
                      : "Creating enhanced image"}
                  </p>
                </Card>
              ) : (
                <OutputDisplay
                  agentType={selectedAgent}
                  output={output}
                  isError={isError}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
