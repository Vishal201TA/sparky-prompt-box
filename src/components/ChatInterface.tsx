import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DocumentUpload } from "./DocumentUpload";
import { ChatMessages, type ChatMessage } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  sessionId: string | null;
  onSessionStart: () => Promise<string>;
}

export const ChatInterface = ({ sessionId, onSessionStart }: ChatInterfaceProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [logOutput, setLogOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleDocumentUpload = async (file: File) => {
    if (!sessionId) {
      toast({
        title: "Starting session",
        description: "Initializing chat session...",
      });
      await onSessionStart();
    }

    setIsRunning(true);
    setLogOutput("");

    try {
      // Simulate document ingestion with streaming logs
      setLogOutput("Ingesting document...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Splitting into chunks...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Creating embeddings...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Storing in vector database...\n");
      await new Promise(resolve => setTimeout(resolve, 500));

      setChatMessages(prev => [
        ...prev,
        {
          sender: "ai",
          content: `✅ Successfully added '${file.name}' to the knowledge base. You can now ask questions about this document.`
        }
      ]);

      toast({
        title: "Document uploaded",
        description: `${file.name} has been added to the knowledge base`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!sessionId) {
      toast({
        title: "No session",
        description: "Please upload a document first",
        variant: "destructive",
      });
      return;
    }

    setChatMessages(prev => [...prev, { sender: "user", content: message }]);
    setIsRunning(true);
    setLogOutput("");

    try {
      // Simulate AI response with streaming logs
      setLogOutput("Calling DocumentQueryTool...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Searching vector database...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Found 3 relevant chunks...\n");
      await new Promise(resolve => setTimeout(resolve, 500));
      setLogOutput(prev => prev + "Generating response...\n");
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockResponse = `Based on the document you uploaded, here's what I found:\n\n${message.includes("main topic") || message.includes("about") ? "The document discusses key concepts related to AI and machine learning, focusing on practical applications and implementation strategies." : "I found relevant information in the document that addresses your question. The content suggests multiple approaches to this topic."}`;

      setChatMessages(prev => [...prev, { sender: "ai", content: mockResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">1</span>
          <span>Upload Document</span>
        </h2>
        <DocumentUpload onDocumentSelect={handleDocumentUpload} disabled={isRunning} />
      </Card>

      <Card className="p-6 shadow-[var(--shadow-card)]">
        <h2 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">2</span>
          <span>Chat with Document</span>
        </h2>
        
        <div className="space-y-4">
          {isRunning && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-accent mr-2" />
              <span className="text-sm text-muted-foreground">Processing...</span>
            </div>
          )}
          
          <ChatMessages messages={chatMessages} />
          <ChatInput onSend={handleSendMessage} disabled={isRunning} />
        </div>
      </Card>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="logs">
          <AccordionTrigger className="text-lg font-medium">
            View Execution Logs
          </AccordionTrigger>
          <AccordionContent>
            <Card className="p-4 max-h-[50vh] overflow-y-auto bg-muted/40 border">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                {logOutput || "No logs yet. Upload a document or send a message to see logs here."}
              </pre>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
