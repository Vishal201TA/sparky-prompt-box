import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Wrench } from "lucide-react";
import type { AgentType } from "./AgentSelector";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  displayName: string;
  status: "idle" | "running" | "completed";
}

interface ToolsPanelProps {
  agentType: AgentType;
  isRunning: boolean;
  logOutput: string;
}

const AGENT_TOOLS: Record<AgentType, string[]> = {
  "seo": [
    "InitialImageDescriptionTool",
    "SERankingSimilarKeywordTool",
    "SERankingRelatedKeywordTool",
    "SERankingQuestionKeywordTool",
    "SEOEnhancementTool",
  ],
  "image-enhancer": [
    "GenerativeImageTool",
  ],
  "doc-agent": [],
};

const TOOL_DISPLAY_NAMES: Record<string, string> = {
  "InitialImageDescriptionTool": "Image Description",
  "SERankingSimilarKeywordTool": "Similar Keywords",
  "SERankingRelatedKeywordTool": "Related Keywords",
  "SERankingQuestionKeywordTool": "Question Keywords",
  "SEOEnhancementTool": "SEO Enhancement",
  "GenerativeImageTool": "Generative Image",
};

export const ToolsPanel = ({ agentType, isRunning, logOutput }: ToolsPanelProps) => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const toolNames = AGENT_TOOLS[agentType] || [];
    setTools(
      toolNames.map((name) => ({
        name,
        displayName: TOOL_DISPLAY_NAMES[name] || name,
        status: "idle",
      }))
    );
  }, [agentType]);

  useEffect(() => {
    if (!isRunning || !logOutput) return;

    // Simulate tool execution based on log output
    const updatedTools = tools.map((tool) => {
      const toolMentioned = logOutput.toLowerCase().includes(tool.name.toLowerCase());
      if (toolMentioned && tool.status === "idle") {
        return { ...tool, status: "running" as const };
      }
      return tool;
    });

    setTools(updatedTools);

    // After a delay, mark running tools as completed
    const timer = setTimeout(() => {
      setTools((prev) =>
        prev.map((tool) =>
          tool.status === "running" ? { ...tool, status: "completed" as const } : tool
        )
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [logOutput, isRunning]);

  if (tools.length === 0) return null;

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center space-x-2 mb-4">
        <Wrench className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Tools Used</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Badge
            key={tool.name}
            variant="outline"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-all duration-300",
              tool.status === "running" &&
                "animate-pulse bg-primary/20 border-primary shadow-lg shadow-primary/50",
              tool.status === "completed" && "bg-green-500/10 border-green-500/50"
            )}
          >
            {tool.status === "completed" && (
              <CheckCircle2 className="h-4 w-4 mr-1 inline text-green-600" />
            )}
            {tool.displayName}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
