import { Card } from "@/components/ui/card";
import { ImageUpload } from "./ImageUpload";
import { TextPromptInput } from "./TextPromptInput";
import { OutputDisplay } from "./OutputDisplay";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToolsPanel } from "./ToolsPanel";
import type { AgentType } from "./AgentSelector";

interface SingleShotInterfaceProps {
  selectedAgent: AgentType;
  imageBase64: string;
  onImageSelect: (base64: string) => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  isRunning: boolean;
  output: string | null;
  isError: boolean;
  logOutput: string;
  onRun: () => void;
  canRun: boolean;
}

export const SingleShotInterface = ({
  selectedAgent,
  imageBase64,
  onImageSelect,
  prompt,
  onPromptChange,
  isRunning,
  output,
  isError,
  logOutput,
  onRun,
  canRun,
}: SingleShotInterfaceProps) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Column - Inputs */}
      <div className="space-y-6">
        <ToolsPanel
          agentType={selectedAgent}
          isRunning={isRunning}
          logOutput={logOutput}
        />
        
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">1</span>
            <span>Configure Agent</span>
          </h2>
          <div className="space-y-6">
            <ImageUpload onImageSelect={onImageSelect} disabled={isRunning} />
            <TextPromptInput
              value={prompt}
              onChange={onPromptChange}
              agentType={selectedAgent}
              disabled={isRunning}
            />
          </div>
        </Card>

        <Button
          onClick={onRun}
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

      {/* Right Column - Output & Logs */}
      <div className="space-y-6">
        <div className="sticky top-24">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">2</span>
            <span>Results & Logs</span>
          </h2>

          {/* Final Output Section */}
          <Card className="p-6 shadow-sm border">
            <h3 className="text-lg font-medium mb-3">Final Output</h3>
            <Separator className="mb-4" />
            <OutputDisplay
              agentType={selectedAgent}
              output={output}
              isError={isError}
            />
          </Card>

          {/* Collapsible Logs Section */}
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="logs">
              <AccordionTrigger className="text-lg font-medium">
                View Execution Logs
              </AccordionTrigger>
              <AccordionContent>
                <Card className="p-4 max-h-[50vh] overflow-y-auto bg-muted/40 border">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {logOutput || "No logs yet. Run the agent to see logs here."}
                  </pre>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
