import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface ChatMessage {
  sender: "user" | "ai";
  content: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <Card className="p-12 text-center border-dashed">
        <div className="flex flex-col items-center justify-center space-y-4 text-muted-foreground">
          <Bot className="h-16 w-16" />
          <div>
            <p className="text-lg font-medium text-foreground">No messages yet</p>
            <p className="text-sm mt-1">
              Upload a document and start asking questions
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`flex items-start space-x-2 max-w-[80%] ${
              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {message.sender === "user" ? (
                <User className="h-5 w-5" />
              ) : (
                <Bot className="h-5 w-5" />
              )}
            </div>
            <Card
              className={`p-4 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card"
              }`}
            >
              {message.sender === "ai" ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </Card>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
