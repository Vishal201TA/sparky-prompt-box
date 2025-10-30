import { Card } from "@/components/ui/card";
import { FileText, Image as ImageIcon, AlertCircle } from "lucide-react";
import type { AgentType } from "./AgentSelector";
import ReactMarkdown from "react-markdown";

interface OutputDisplayProps {
  agentType: AgentType | undefined;
  output: string | null;
  isError?: boolean;
}

export const OutputDisplay = ({ agentType, output, isError }: OutputDisplayProps) => {
  if (!output) {
    return (
      <Card className="p-12 text-center border-dashed">
        <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
          {agentType === "seo" ? (
            <FileText className="h-16 w-16" />
          ) : agentType === "image-enhancer" ? (
            <ImageIcon className="h-16 w-16" />
          ) : (
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          )}
          <div>
            <p className="text-lg font-medium text-foreground">No output yet</p>
            <p className="text-sm mt-1">
              Select an agent, upload an image, and run it to see results here
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6 border-destructive bg-destructive/5">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
          <div>
            <h3 className="font-semibold text-destructive mb-1">Error</h3>
            <p className="text-sm text-destructive/90">{output}</p>
          </div>
        </div>
      </Card>
    );
  }

  if (agentType === "seo") {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
          <FileText className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">SEO Content</h3>
        </div>
        <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground">
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>
      </Card>
    );
  }

  if (agentType === "image-enhancer") {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4 pb-3 border-b">
          <ImageIcon className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">Enhanced Image</h3>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={output}
              alt="Enhanced output"
              className="w-full h-auto"
            />
          </div>
          <p className="text-xs text-muted-foreground break-all">
            <span className="font-medium">File path:</span> {output}
          </p>
        </div>
      </Card>
    );
  }

  return null;
};
