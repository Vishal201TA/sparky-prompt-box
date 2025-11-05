import { useState, useEffect } from "react";
import { AgentSelector, type AgentType } from "@/components/AgentSelector";
import { SingleShotInterface } from "@/components/SingleShotInterface";
import { ChatInterface } from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | undefined>();
  const [imageBase64, setImageBase64] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [logOutput, setLogOutput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset state when agent changes
  useEffect(() => {
    setImageBase64("");
    setPrompt("");
    setOutput(null);
    setIsError(false);
    setLogOutput("");
    setSessionId(null);
  }, [selectedAgent]);

  const handleSessionStart = async (): Promise<string> => {
    try {
      // Simulate session start API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newSessionId = `session_${Date.now()}`;
      setSessionId(newSessionId);
      
      toast({
        title: "Session started",
        description: "Chat session initialized successfully",
      });
      
      return newSessionId;
    } catch (error) {
      toast({
        title: "Session error",
        description: "Failed to start chat session",
        variant: "destructive",
      });
      throw error;
    }
  };

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
    setLogOutput("");

    try {
      // Simulate streaming logs
      setLogOutput("Initializing agent...\n");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Processing image...\n");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Analyzing prompt...\n");
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Generating output...\n");
      await new Promise((resolve) => setTimeout(resolve, 500));

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

      setLogOutput(prev => prev + "✅ Complete!\n");

      toast({
        title: "Success!",
        description: "Agent completed successfully",
      });
    } catch (error) {
      setIsError(true);
      setOutput(error instanceof Error ? error.message : "An unexpected error occurred");
      setLogOutput(prev => prev + `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}\n`);
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
        {/* Agent Selector - Always visible */}
        <Card className="p-6 shadow-[var(--shadow-card)] mb-8">
          <AgentSelector
            value={selectedAgent}
            onChange={setSelectedAgent}
            disabled={isRunning}
          />
        </Card>

        {/* Conditional Interface Rendering */}
        {selectedAgent === "doc-agent" ? (
          <ChatInterface 
            sessionId={sessionId}
            onSessionStart={handleSessionStart}
          />
        ) : selectedAgent ? (
          <SingleShotInterface
            selectedAgent={selectedAgent}
            imageBase64={imageBase64}
            onImageSelect={setImageBase64}
            prompt={prompt}
            onPromptChange={setPrompt}
            isRunning={isRunning}
            output={output}
            isError={isError}
            logOutput={logOutput}
            onRun={handleRunAgent}
            canRun={selectedAgent && imageBase64 && prompt.trim() && !isRunning}
          />
        ) : (
          <Card className="p-12 text-center border-dashed">
            <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
              <Sparkles className="h-16 w-16" />
              <div>
                <p className="text-lg font-medium text-foreground">Select an agent to get started</p>
                <p className="text-sm mt-1">
                  Choose from SEO Content, Image Enhancer, or Document QA agents
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
