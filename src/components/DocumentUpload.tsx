import { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadProps {
  onDocumentSelect: (file: File) => void;
  disabled?: boolean;
}

export const DocumentUpload = ({ onDocumentSelect, disabled }: DocumentUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert("Please select a PDF or DOCX file");
      return;
    }

    setSelectedFile(file);
    onDocumentSelect(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="doc-upload" className="text-sm font-medium">
        Upload Document to Knowledge Base
      </Label>
      
      {!selectedFile ? (
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center
            transition-all duration-300 cursor-pointer
            ${disabled 
              ? "border-border bg-muted cursor-not-allowed opacity-50" 
              : "border-border hover:border-accent hover:bg-accent/5"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="doc-upload"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
          />
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Click to upload document
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF or DOCX files
          </p>
        </div>
      ) : (
        <div className="relative rounded-lg border border-border p-4 flex items-center justify-between bg-card">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-accent" />
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          {!disabled && (
            <Button
              onClick={handleRemove}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
