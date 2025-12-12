import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Image, Video, Mic, Paperclip } from "lucide-react";
import { ChatInput, Attachment } from "@/components/ChatInput";
import AISettingsPanel from "@/components/AISettingsPanel";
import UserSettingsPanel from "@/components/UserSettingsPanel";
import ChatHistory from "@/components/ChatHistory";

type ContentType = 'chat' | 'image' | 'video' | 'voice';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  attachments?: Attachment[];
}

interface ContentState {
  chat: Message[];
  image: Message[];
  video: Message[];
  voice: Message[];
}

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState<ContentType>('chat');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [contentState, setContentState] = useState<ContentState>({
    chat: [],
    image: [],
    video: [],
    voice: []
  });

  // Load last session on mount
  useEffect(() => {
    const lastSessionId = localStorage.getItem("lastChatSession");
    if (lastSessionId) {
      loadChatSession(lastSessionId);
    } else {
      // Create new session
      const newSessionId = Date.now().toString();
      setCurrentSessionId(newSessionId);
      localStorage.setItem("lastChatSession", newSessionId);
    }
  }, []);

  // Save session whenever messages change
  useEffect(() => {
    if (currentSessionId) {
      saveChatSession();
    }
  }, [contentState, currentSessionId]);

  const saveChatSession = () => {
    const sessions = JSON.parse(localStorage.getItem("chatSessions") || "[]");
    const sessionIndex = sessions.findIndex((s: any) => s.id === currentSessionId);
    
    const firstMessage = contentState[activeTab][0]?.text || "New conversation";
    const sessionData = {
      id: currentSessionId,
      title: firstMessage.substring(0, 30) + (firstMessage.length > 30 ? "..." : ""),
      timestamp: new Date().toISOString(),
      preview: firstMessage.substring(0, 50),
      contentState,
      activeTab
    };

    if (sessionIndex >= 0) {
      sessions[sessionIndex] = sessionData;
    } else {
      sessions.unshift(sessionData);
    }

    // Keep only last 50 sessions
    if (sessions.length > 50) sessions.pop();
    
    localStorage.setItem("chatSessions", JSON.stringify(sessions));
  };

  const loadChatSession = (sessionId: string) => {
    const sessions = JSON.parse(localStorage.getItem("chatSessions") || "[]");
    const session = sessions.find((s: any) => s.id === sessionId);
    
    if (session) {
      setCurrentSessionId(sessionId);
      setContentState(session.contentState);
      setActiveTab(session.activeTab);
      localStorage.setItem("lastChatSession", sessionId);
    }
  };

  const handleNewChat = () => {
    const newSessionId = Date.now().toString();
    setCurrentSessionId(newSessionId);
    setContentState({
      chat: [],
      image: [],
      video: [],
      voice: []
    });
    setActiveTab('chat');
    localStorage.setItem("lastChatSession", newSessionId);
  };

  const handleSendMessage = (messageText: string, attachments: Attachment[]) => {
    if (messageText.trim() || attachments.length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        isUser: true,
        timestamp: new Date(),
        attachments: attachments.length > 0 ? attachments : undefined
      };

      setContentState(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], newMessage]
      }));

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `AI response for ${activeTab}: ${messageText || 'Received your attachments'}`,
          isUser: false,
          timestamp: new Date()
        };

        setContentState(prev => ({
          ...prev,
          [activeTab]: [...prev[activeTab], aiResponse]
        }));
      }, 1000);
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'chat': return 'Message NOVA...';
      case 'image': return 'Describe the image you want...';
      case 'video': return 'Describe the video you want...';
      case 'voice': return 'What would you like to say...';
      default: return 'Message NOVA...';
    }
  };

  const currentMessages = contentState[activeTab];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages area */}
        <div className="flex-1 p-4 pb-32 overflow-y-auto">
          {currentMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Start a conversation with NOVA</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.isUser
                        ? 'bg-gradient-to-r from-nova-pink to-nova-coral text-white ml-auto'
                        : 'bg-gray-100 text-gray-800 mr-auto'
                    }`}
                  >
                    {msg.text && <p className="text-sm mb-2">{msg.text}</p>}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center gap-2">
                            {attachment.type === 'image' ? (
                              <img
                                src={attachment.preview}
                                alt={attachment.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1">
                                <span className="text-xs">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fixed bottom input area */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
          {/* Message input */}
          <div className="relative">
            <ChatInput
              message={message}
              setMessage={setMessage}
              onSend={handleSendMessage}
              placeholder={getPlaceholder()}
            />
          </div>

          {/* Bottom navigation bar */}
          <div className="bg-white px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-around">
              <Button
                onClick={() => setActiveTab('chat')}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                  activeTab === 'chat'
                    ? 'text-nova-pink'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">Chat</span>
              </Button>
              
              <Button
                onClick={() => setActiveTab('image')}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                  activeTab === 'image'
                    ? 'text-nova-pink'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Image className="w-5 h-5" />
                <span className="text-xs font-medium">Image</span>
              </Button>
              
              <Button
                onClick={() => setActiveTab('video')}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                  activeTab === 'video'
                    ? 'text-nova-pink'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="text-xs font-medium">Video</span>
              </Button>
              
              <Button
                onClick={() => setActiveTab('voice')}
                variant="ghost"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-4 ${
                  activeTab === 'voice'
                    ? 'text-nova-pink'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Mic className="w-5 h-5" />
                <span className="text-xs font-medium">Voice</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings panels */}
      <AISettingsPanel 
        activeTab={activeTab} 
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      />
      <UserSettingsPanel 
        isOpen={isUserSettingsOpen}
        onToggle={() => setIsUserSettingsOpen(!isUserSettingsOpen)}
      />
      
      {/* Chat History */}
      <ChatHistory 
        onNewChat={handleNewChat}
        onLoadChat={loadChatSession}
      />
    </div>
  );
};

export default AIChat;