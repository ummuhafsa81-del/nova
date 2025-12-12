import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ChatHistoryProps {
  onNewChat: () => void;
  onLoadChat: (sessionId: string) => void;
}

const ChatHistory = ({ onNewChat, onLoadChat }: ChatHistoryProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem("chatSessions");
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(
        parsed.map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp),
        }))
      );
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem("chatSessions");
    setSessions([]);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-background border border-border shadow-lg hover:bg-accent"
        >
          <Clock className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 bg-background border-border z-[100]" align="center">
        <div className="flex items-center justify-between px-2 py-2">
          <h3 className="text-sm font-semibold text-foreground">Chat History</h3>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="h-8 text-xs hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear History
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewChat}
              className="h-8 text-xs hover:bg-accent"
            >
              <Plus className="h-3 w-3 mr-1" />
              New Chat
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="px-2 py-8 text-center text-sm text-muted-foreground">
              No chat history yet
            </div>
          ) : (
            sessions.map((session) => (
              <DropdownMenuItem
                key={session.id}
                onClick={() => onLoadChat(session.id)}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-accent"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium text-sm truncate">{session.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(session.timestamp)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground truncate w-full">
                  {session.preview}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatHistory;
