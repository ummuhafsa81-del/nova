import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Send } from "lucide-react";

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
          <span className="font-medium text-foreground">NOVA Chat</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          How can NOVA help you today?
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-3 text-sm">
          I'd like to generate a realistic image of a mountain landscape
        </div>
        
        {isGenerating && (
          <div className="bg-background border rounded-lg p-3 text-sm text-muted-foreground">
            Creating your image...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-border focus:border-pink-500 transition-colors"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
            disabled={!message.trim() || isGenerating}
          >
            <Send size={16} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
