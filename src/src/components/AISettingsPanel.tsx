import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type ContentType = 'chat' | 'image' | 'video' | 'voice';

interface AISettingsPanelProps {
  activeTab: ContentType;
  isOpen: boolean;
  onToggle: () => void;
}

export interface ChatSettings {
  customInstructions: string;
}

export interface ImageSettings {
  ratio: string;
}

export interface VideoSettings {
  length: number;
  ratio: string;
}

export interface VoiceSettings {
  voiceType: string;
  twoSpeakers: boolean;
}

const AISettingsPanel = ({ activeTab, isOpen, onToggle }: AISettingsPanelProps) => {
  // Chat settings
  const [chatSettings, setChatSettings] = useState<ChatSettings>({
    customInstructions: ""
  });

  // Image settings
  const [imageSettings, setImageSettings] = useState<ImageSettings>({
    ratio: "1:1"
  });

  // Video settings
  const [videoSettings, setVideoSettings] = useState<VideoSettings>({
    length: 4,
    ratio: "9:16"
  });

  // Voice settings
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    voiceType: "orion",
    twoSpeakers: false
  });

  const handleSaveChatSettings = () => {
    console.log("Saving chat settings:", chatSettings);
  };

  const renderChatSettings = () => (
    <div className="space-y-3">
      <div>
        <Label htmlFor="instructions" className="text-sm font-medium text-foreground mb-1 block">
          Custom Instructions
        </Label>
        <Textarea
          id="instructions"
          placeholder="Write specific guidance for the AI (tone, style, context)..."
          value={chatSettings.customInstructions}
          onChange={(e) => setChatSettings(prev => ({ ...prev, customInstructions: e.target.value }))}
          className="min-h-[100px] resize-none border-border focus:border-nova-pink"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Affects only the current chat session.
        </p>
        <Button 
          onClick={handleSaveChatSettings} 
          className="mt-2 w-full bg-nova-pink hover:bg-nova-pink/90"
        >
          Save Instructions
        </Button>
      </div>
    </div>
  );

  const renderImageSettings = () => (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium text-foreground mb-1 block">
          Image Ratio
        </Label>
        <Select value={imageSettings.ratio} onValueChange={(value) => setImageSettings(prev => ({ ...prev, ratio: value }))}>
          <SelectTrigger className="border-border focus:border-nova-pink">
            <SelectValue placeholder="Select ratio" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="1:1">1:1 (Square)</SelectItem>
            <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
            <SelectItem value="9:16">9:16 (Vertical)</SelectItem>
            <SelectItem value="4:3">4:3 (Standard)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Changes apply instantly without reloading the page.
        </p>
      </div>
    </div>
  );

  const renderVideoSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-2 block">
          Video Length: {videoSettings.length} second{videoSettings.length !== 1 ? 's' : ''}
        </Label>
        <Slider
          value={[videoSettings.length]}
          onValueChange={(value) => setVideoSettings(prev => ({ ...prev, length: value[0] }))}
          min={1}
          max={8}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1s</span>
          <span>8s</span>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-1 block">
          Video Ratio
        </Label>
        <Select value={videoSettings.ratio} onValueChange={(value) => setVideoSettings(prev => ({ ...prev, ratio: value }))}>
          <SelectTrigger className="border-border focus:border-nova-pink">
            <SelectValue placeholder="Select ratio" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="9:16">9:16 (Short/Reels/TikTok)</SelectItem>
            <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
            <SelectItem value="1:1">1:1 (Square)</SelectItem>
            <SelectItem value="4:5">4:5 (Portrait)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          Allows better platform targeting for content creation.
        </p>
      </div>
    </div>
  );

  const renderVoiceSettings = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium text-foreground mb-1 block">
          Voice Type
        </Label>
        <Select value={voiceSettings.voiceType} onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, voiceType: value }))}>
          <SelectTrigger className="border-border focus:border-nova-pink">
            <SelectValue placeholder="Select voice" />
          </SelectTrigger>
          <SelectContent className="bg-background border-border">
            <SelectItem value="orion">Orion — deep, warm, clear (default)</SelectItem>
            <SelectItem value="atlas">Atlas — strong, authoritative</SelectItem>
            <SelectItem value="jasper">Jasper — friendly, upbeat</SelectItem>
            <SelectItem value="kai">Kai — youthful, chill</SelectItem>
            <SelectItem value="aria">Aria — soft, natural</SelectItem>
            <SelectItem value="luna">Luna — bright, energetic</SelectItem>
            <SelectItem value="nova">Nova — calm, professional</SelectItem>
            <SelectItem value="zara">Zara — confident, storyteller</SelectItem>
            <SelectItem value="echo">Echo — balanced, modern</SelectItem>
            <SelectItem value="sage">Sage — soothing, narrator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">
            Two Speakers
          </Label>
          <Switch
            checked={voiceSettings.twoSpeakers}
            onCheckedChange={(checked) => setVoiceSettings(prev => ({ ...prev, twoSpeakers: checked }))}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Creates either one continuous voice or a dialogue-style output.
        </p>
      </div>
    </div>
  );

  const renderSettings = () => {
    switch (activeTab) {
      case 'chat':
        return renderChatSettings();
      case 'image':
        return renderImageSettings();
      case 'video':
        return renderVideoSettings();
      case 'voice':
        return renderVoiceSettings();
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'chat':
        return 'Chatbot Settings';
      case 'image':
        return 'Image Generation Settings';
      case 'video':
        return 'Video Generation Settings';
      case 'voice':
        return 'Voice Settings';
      default:
        return 'Settings';
    }
  };

  return (
    <>
      {/* Settings Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className={`fixed top-4 right-4 z-50 bg-background border border-border shadow-lg hover:bg-accent transition-all duration-300 ${isOpen ? 'rotate-90 scale-110' : 'hover:scale-105'}`}
      >
        <Menu className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
      </Button>

      {/* Settings Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={onToggle}
          />
          
          {/* Settings Panel */}
          <div className={`fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-xl overflow-y-auto z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{getTitle()}</h2>
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div>
                {renderSettings()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AISettingsPanel;