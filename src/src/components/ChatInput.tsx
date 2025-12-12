import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Send, Paperclip } from "lucide-react";
import { AttachmentPreview } from "./AttachmentPreview";
import { useToast } from "@/hooks/use-toast";

export interface Attachment {
  id: string;
  file: File;
  type: 'image' | 'video' | 'audio' | 'document';
  preview: string;
  name: string;
  size: number;
}

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: (message: string, attachments: Attachment[]) => void;
  placeholder: string;
  disabled?: boolean;
}

export const ChatInput = ({ message, setMessage, onSend, placeholder, disabled }: ChatInputProps) => {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getFileType = (file: File): Attachment['type'] => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (attachments.length + files.length > 3) {
      toast({
        title: "Too many files",
        description: "You can only attach up to 3 files at once.",
        variant: "destructive"
      });
      return;
    }

    const newAttachments: Attachment[] = [];

    for (const file of files) {
      if (file.size > 20 * 1024 * 1024) { // 20MB limit
        toast({
          title: "File too large",
          description: `${file.name} is too large. Maximum size is 20MB.`,
          variant: "destructive"
        });
        continue;
      }

      const fileType = getFileType(file);
      let preview = '';

      try {
        if (fileType === 'image' || fileType === 'video') {
          preview = URL.createObjectURL(file);
        }

        newAttachments.push({
          id: Date.now().toString() + Math.random(),
          file,
          type: fileType,
          preview,
          name: file.name,
          size: file.size
        });
      } catch (error) {
        toast({
          title: "Error processing file",
          description: `Could not process ${file.name}`,
          variant: "destructive"
        });
      }
    }

    setAttachments(prev => [...prev, ...newAttachments]);
    
    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment?.preview && (attachment.type === 'image' || attachment.type === 'video')) {
        URL.revokeObjectURL(attachment.preview);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage("");
      // Clean up blob URLs
      attachments.forEach(attachment => {
        if (attachment.preview && (attachment.type === 'image' || attachment.type === 'video')) {
          URL.revokeObjectURL(attachment.preview);
        }
      });
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-3">
      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="mb-3">
          <AttachmentPreview
            attachments={attachments}
            onRemove={removeAttachment}
          />
        </div>
      )}

      {/* Input area */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5 text-gray-600" />
        </Button>

        <div className="flex-1 relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full h-12 px-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={(!message.trim() && attachments.length === 0) || disabled}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-nova-pink to-nova-coral hover:opacity-90 text-white rounded-full p-0 flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          multiple
          accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
          className="hidden"
          aria-label="File input"
        />
      </div>
    </div>
  );
};