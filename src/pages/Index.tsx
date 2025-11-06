import { useState, useEffect } from "react";
import { AgentSelector, type AgentType } from "@/components/AgentSelector";
import { SingleShotInterface } from "@/components/SingleShotInterface";
import { ChatInterface } from "@/components/ChatInterface";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import tigerAnalyticsLogo from "@/assets/tiger-analytics-logo.svg";

const BACKEND_URL = "http://localhost:8000";

const Index = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | undefined>();
  const [imageBase64, setImageBase64] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [finalOutput, setFinalOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [logOutput, setLogOutput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset state when agent changes
  useEffect(() => {
    setImageBase64("");
    setPrompt("");
    setFinalOutput(null);
    setIsError(false);
    setLogOutput("");
    setSessionId(null);
  }, [selectedAgent]);

  const handleImageUpload = (dataUrl: string) => {
    const base64String = dataUrl.split(',')[1];
    setImageBase64(base64String);
  };

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
    if (!selectedAgent || !imageBase64 || !prompt.trim()) {
      toast({
        title: "Missing Inputs",
        description: "Please select an agent, upload an image, and enter a prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setLogOutput("Initializing stream...");
    setFinalOutput(null);
    setIsError(false);

    let finalResult: string | null = null;
    let currentLogs = "Initializing stream...\n";

    try {
      const agentName = selectedAgent === "seo" ? "seo_agent" : "image_enhancer_agent";
      const payload = {
        agent_name: agentName,
        user_query: prompt,
        image_base64: imageBase64,
      };

      const response = await fetch(`${BACKEND_URL}/api/run-agent-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const lines = value.split("\n");
        for (const line of lines) {
          if (line.startsWith("data:")) {
            try {
              const data = JSON.parse(line.substring(5));
              const message: string = data.message;

              if (message === "STREAM_END") {
                break;
              } else if (message.startsWith("FINAL_OUTPUT:")) {
                finalResult = message.substring(13);
              } else if (message.startsWith("ERROR:")) {
                finalResult = message;
                setIsError(true);
              } else {
                currentLogs += message + "\n";
                setLogOutput(currentLogs);
              }
            } catch (parseError) {
              console.warn("Failed to parse stream data chunk:", line, parseError);
            }
          }
        }
      }

      if (finalResult) {
        if (agentName === "image_enhancer_agent" && !finalResult.startsWith("Error:")) {
          setFinalOutput(BACKEND_URL + finalResult);
        } else {
          setFinalOutput(finalResult);
        }
        toast({
          title: "Success!",
          description: "Agent completed successfully",
        });
      } else if (!isError) {
        throw new Error("Stream ended without a final result.");
      }
    } catch (error: any) {
      setIsError(true);
      const errorMessage = error.message || "An unexpected error occurred while streaming.";
      setLogOutput((prev) => (prev || "") + "\n" + errorMessage);
      setFinalOutput(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
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
            <img src={tigerAnalyticsLogo} alt="Tiger Analytics" className="h-10" />
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
            onImageSelect={handleImageUpload}
            prompt={prompt}
            onPromptChange={setPrompt}
            isRunning={isRunning}
            output={finalOutput}
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
