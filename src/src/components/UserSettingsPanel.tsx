import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, X, LogOut, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserSettingsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

const UserSettingsPanel = ({ isOpen, onToggle }: UserSettingsPanelProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Admin settings
  const [apiType, setApiType] = useState<string>("");
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [openModelCombobox, setOpenModelCombobox] = useState(false);
  
  // User settings
  const [credentialType, setCredentialType] = useState<string>("");
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Check if user is admin
  useEffect(() => {
    const adminEmail = "abdisamadbashir14@gmail.com";
    const storedEmail = localStorage.getItem("userEmail");
    setIsAdmin(storedEmail === adminEmail);
  }, []);

  // Comprehensive models list by API type
  const popularModels = {
    chat: [
      // OpenAI GPT Models
      "openai/gpt-5",
      "openai/gpt-5-mini",
      "openai/gpt-5-nano",
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "openai/gpt-4-turbo",
      "openai/gpt-4",
      "openai/gpt-3.5-turbo",
      "openai/gpt-3.5-turbo-16k",
      // Google Gemini Models
      "google/gemini-2.5-pro",
      "google/gemini-2.5-flash",
      "google/gemini-2.5-flash-lite",
      "google/gemini-2.0-flash-exp",
      "google/gemini-1.5-pro",
      "google/gemini-1.5-pro-002",
      "google/gemini-1.5-flash",
      "google/gemini-1.5-flash-002",
      "google/gemini-1.5-flash-8b",
      "google/gemini-1.0-pro",
      // Anthropic Claude Models
      "anthropic/claude-sonnet-4-5",
      "anthropic/claude-opus-4-1-20250805",
      "anthropic/claude-sonnet-4-20250514",
      "anthropic/claude-3-7-sonnet-20250219",
      "anthropic/claude-3-5-sonnet-20241022",
      "anthropic/claude-3-5-haiku-20241022",
      "anthropic/claude-3-opus-20240229",
      "anthropic/claude-3-sonnet-20240229",
      "anthropic/claude-3-haiku-20240307",
      // Meta Llama Models
      "meta/llama-3.3-70b",
      "meta/llama-3.2-90b",
      "meta/llama-3.2-11b",
      "meta/llama-3.2-3b",
      "meta/llama-3.2-1b",
      "meta/llama-3.1-405b",
      "meta/llama-3.1-70b",
      "meta/llama-3.1-8b",
      // Mistral Models
      "mistral/mistral-large-latest",
      "mistral/mistral-medium-latest",
      "mistral/mistral-small-latest",
      "mistral/pixtral-12b-2409",
      "mistral/codestral-latest",
      // Cohere Models
      "cohere/command-r-plus",
      "cohere/command-r",
      "cohere/command",
      "cohere/command-light",
      // Perplexity Models
      "perplexity/llama-3.1-sonar-large-128k-online",
      "perplexity/llama-3.1-sonar-small-128k-online",
      // DeepSeek Models
      "deepseek/deepseek-chat",
      "deepseek/deepseek-coder"
    ],
    image: [
      // Google Image Models
      "google/gemini-2.5-flash-image-preview",
      "google/imagen-3",
      "google/imagen-2",
      // OpenAI Image Models
      "openai/gpt-image-1",
      "openai/dall-e-3",
      "openai/dall-e-2",
      // Stability AI Models
      "stability/stable-diffusion-xl-1024-v1-0",
      "stability/stable-diffusion-xl-beta-v2-2-2",
      "stability/stable-diffusion-v1-6",
      "stability/stable-diffusion-512-v2-1",
      "stability/sd3-large",
      "stability/sd3-medium",
      // Midjourney (if accessible via API)
      "midjourney/v6",
      "midjourney/v5",
      // Flux Models
      "black-forest-labs/flux-pro",
      "black-forest-labs/flux-dev",
      "black-forest-labs/flux-schnell",
      // Ideogram
      "ideogram/v2",
      "ideogram/v1",
      // Recraft
      "recraft/recraft-v3"
    ],
    video: [
      // Google Video Models
      "google/veo-2",
      "google/veo-1",
      // OpenAI Video Models
      "openai/sora",
      // Runway Models
      "runway/gen-3-alpha-turbo",
      "runway/gen-3-alpha",
      "runway/gen-2",
      // Pika Models
      "pika/pika-1.5",
      "pika/pika-1.0",
      // Luma AI
      "luma/dream-machine",
      // Kling AI
      "kling/kling-v1.5",
      "kling/kling-v1.0",
      // Haiper
      "haiper/haiper-2.0",
      "haiper/haiper-1.5",
      // Stability AI Video
      "stability/stable-video-diffusion"
    ],
    voice: [
      // Google Voice Models
      "google/gemini-speech",
      "google/gemini-tts-orion",
      "google/gemini-tts-atlas",
      "google/gemini-tts-jasper",
      "google/gemini-tts-kore",
      "google/gemini-tts-puck",
      "google/gemini-tts-charon",
      "google/gemini-tts-fenrir",
      "google/gemini-tts-aoede",
      // OpenAI Voice Models
      "openai/tts-1",
      "openai/tts-1-hd",
      "openai/tts-1-hd-alloy",
      "openai/tts-1-hd-echo",
      "openai/tts-1-hd-fable",
      "openai/tts-1-hd-onyx",
      "openai/tts-1-hd-nova",
      "openai/tts-1-hd-shimmer",
      // ElevenLabs Models
      "elevenlabs/eleven-multilingual-v2",
      "elevenlabs/eleven-turbo-v2",
      "elevenlabs/eleven-monolingual-v1",
      // PlayHT Models
      "playht/playht-2.0",
      "playht/playht-1.0",
      // Azure TTS
      "azure/neural-tts",
      // Amazon Polly
      "aws/polly-neural",
      "aws/polly-standard"
    ]
  };

  // Auto-fill endpoint based on model/provider
  const getEndpointForModel = (model: string) => {
    if (model.startsWith("openai/")) {
      return "https://api.openai.com/v1";
    } else if (model.startsWith("google/")) {
      return "https://generativelanguage.googleapis.com/v1beta";
    } else if (model.startsWith("anthropic/")) {
      return "https://api.anthropic.com/v1";
    } else if (model.startsWith("meta/")) {
      return "https://api.together.xyz/v1";
    } else if (model.startsWith("mistral/")) {
      return "https://api.mistral.ai/v1";
    } else if (model.startsWith("cohere/")) {
      return "https://api.cohere.ai/v1";
    } else if (model.startsWith("perplexity/")) {
      return "https://api.perplexity.ai";
    } else if (model.startsWith("deepseek/")) {
      return "https://api.deepseek.com/v1";
    } else if (model.startsWith("stability/")) {
      return "https://api.stability.ai/v1";
    } else if (model.startsWith("black-forest-labs/")) {
      return "https://api.bfl.ml/v1";
    } else if (model.startsWith("ideogram/")) {
      return "https://api.ideogram.ai/v1";
    } else if (model.startsWith("recraft/")) {
      return "https://api.recraft.ai/v1";
    } else if (model.startsWith("runway/")) {
      return "https://api.runwayml.com/v1";
    } else if (model.startsWith("pika/")) {
      return "https://api.pika.art/v1";
    } else if (model.startsWith("luma/")) {
      return "https://api.lumalabs.ai/v1";
    } else if (model.startsWith("kling/")) {
      return "https://api.klingai.com/v1";
    } else if (model.startsWith("haiper/")) {
      return "https://api.haiper.ai/v1";
    } else if (model.startsWith("elevenlabs/")) {
      return "https://api.elevenlabs.io/v1";
    } else if (model.startsWith("playht/")) {
      return "https://api.play.ht/v1";
    } else if (model.startsWith("azure/")) {
      return "https://api.azure.com/cognitiveservices/v1";
    } else if (model.startsWith("aws/")) {
      return "https://polly.amazonaws.com";
    } else if (model.startsWith("midjourney/")) {
      return "https://api.midjourney.com/v1";
    }
    return "";
  };

  // Update endpoint when model changes
  useEffect(() => {
    const model = customModel || selectedModel;
    if (model) {
      const autoEndpoint = getEndpointForModel(model);
      setEndpoint(autoEndpoint);
    }
  }, [selectedModel, customModel]);

  const handleSaveApiSettings = () => {
    const finalModel = customModel || selectedModel;
    console.log("Saving API settings:", { 
      apiType, 
      apiKey, 
      model: finalModel,
      endpoint 
    });
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      credentialType,
      oldEmail,
      newEmail,
      oldPassword: oldPassword ? "***" : "",
      newPassword: newPassword ? "***" : ""
    });
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("userEmail");
    setShowLogoutDialog(false);
  };

  return (
    <>
      {/* Settings Toggle Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="icon"
        className={`fixed top-4 left-4 z-50 bg-background border border-border shadow-lg hover:bg-accent transition-all duration-300 ${isOpen ? 'rotate-90 scale-110' : 'hover:scale-105'}`}
      >
        <Settings className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
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
          <div className={`fixed left-0 top-0 h-full w-80 bg-background border-r border-border shadow-xl overflow-y-auto z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {isAdmin ? "Administrator Settings" : "User Settings"}
                </h2>
                <Button
                  onClick={onToggle}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {isAdmin ? (
                  <>
                    {/* Statistics */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-2">Statistics</h3>
                      <div className="space-y-1">
                        <p className="text-sm"><span className="font-medium">User Count:</span> 1,247</p>
                        <p className="text-sm"><span className="font-medium">Revenue:</span> $12,450</p>
                      </div>
                    </div>

                    {/* API Settings */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground">API Settings</h3>
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-1 block">
                          Select AI Feature
                        </Label>
                        <Select value={apiType} onValueChange={setApiType}>
                          <SelectTrigger className="border-border focus:border-nova-pink">
                            <SelectValue placeholder="Select feature" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-[100]">
                            <SelectItem value="chat">Chat API</SelectItem>
                            <SelectItem value="image">Image API</SelectItem>
                            <SelectItem value="video">Video API</SelectItem>
                            <SelectItem value="voice">Voice API</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {apiType && (
                        <>
                          {/* Model Selector - Typeable Dropdown */}
                          <div>
                            <Label className="text-sm font-medium text-foreground mb-1 block">
                              Type Model
                            </Label>
                            <Popover open={openModelCombobox} onOpenChange={setOpenModelCombobox}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openModelCombobox}
                                  className="w-full justify-between border-border hover:bg-accent"
                                >
                                  {customModel || selectedModel || "Select or type model..."}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-background border-border" align="start">
                                <Command className="bg-background">
                                  <CommandInput 
                                    placeholder="Search or type model..." 
                                    value={customModel}
                                    onValueChange={setCustomModel}
                                  />
                                  <CommandEmpty>
                                    <div className="p-2 text-sm text-muted-foreground">
                                      {customModel ? (
                                        <div>
                                          Press Enter to use: <span className="font-semibold text-foreground">{customModel}</span>
                                        </div>
                                      ) : (
                                        "Type a custom model or select from popular models"
                                      )}
                                    </div>
                                  </CommandEmpty>
                                  <CommandGroup heading="Popular Models">
                                    {(popularModels[apiType as keyof typeof popularModels] || []).map((model) => (
                                      <CommandItem
                                        key={model}
                                        value={model}
                                        onSelect={(currentValue) => {
                                          setSelectedModel(currentValue);
                                          setCustomModel("");
                                          setOpenModelCombobox(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedModel === model ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {model}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            {customModel && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Custom model: <span className="font-medium text-foreground">{customModel}</span>
                              </p>
                            )}
                          </div>

                          {/* Endpoint Auto-Fill */}
                          <div>
                            <Label htmlFor="endpoint" className="text-sm font-medium text-foreground mb-1 block">
                              API Endpoint
                            </Label>
                            <Input
                              id="endpoint"
                              type="text"
                              placeholder="Auto-filled based on model"
                              value={endpoint}
                              onChange={(e) => setEndpoint(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Auto-updates based on model provider
                            </p>
                          </div>

                          {/* API Key */}
                          <div>
                            <Label htmlFor="api-key" className="text-sm font-medium text-foreground mb-1 block">
                              API Key
                            </Label>
                            <Input
                              id="api-key"
                              type="password"
                              placeholder="Enter API key"
                              value={apiKey}
                              onChange={(e) => setApiKey(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                          
                          <Button 
                            onClick={handleSaveApiSettings} 
                            className="w-full bg-nova-pink hover:bg-nova-pink/90"
                          >
                            Save API Settings
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Change Credentials */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground">Change Credentials</h3>
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-1 block">
                          Credential Type
                        </Label>
                        <Select value={credentialType} onValueChange={setCredentialType}>
                          <SelectTrigger className="border-border focus:border-nova-pink">
                            <SelectValue placeholder="Select credential" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-[100]">
                            <SelectItem value="email">Change Email</SelectItem>
                            <SelectItem value="password">Change Password</SelectItem>
                            <SelectItem value="both">Change Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(credentialType === 'email' || credentialType === 'both') && (
                        <>
                          <div>
                            <Label htmlFor="admin-old-email" className="text-sm font-medium text-foreground mb-1 block">
                              Current Email
                            </Label>
                            <Input
                              id="admin-old-email"
                              type="email"
                              placeholder="Enter current email"
                              value={oldEmail}
                              onChange={(e) => setOldEmail(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin-new-email" className="text-sm font-medium text-foreground mb-1 block">
                              New Email
                            </Label>
                            <Input
                              id="admin-new-email"
                              type="email"
                              placeholder="Enter new email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                        </>
                      )}

                      {(credentialType === 'password' || credentialType === 'both') && (
                        <>
                          <div>
                            <Label htmlFor="admin-old-password" className="text-sm font-medium text-foreground mb-1 block">
                              Current Password
                            </Label>
                            <Input
                              id="admin-old-password"
                              type="password"
                              placeholder="Enter current password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                          <div>
                            <Label htmlFor="admin-new-password" className="text-sm font-medium text-foreground mb-1 block">
                              New Password
                            </Label>
                            <Input
                              id="admin-new-password"
                              type="password"
                              placeholder="Enter new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                        </>
                      )}

                      {credentialType && (
                        <Button 
                          onClick={handleSaveSettings} 
                          className="w-full bg-nova-pink hover:bg-nova-pink/90"
                        >
                          Save Credentials
                        </Button>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="pt-3 border-t border-border">
                      <Button
                        onClick={() => setShowLogoutDialog(true)}
                        variant="destructive"
                        className="w-full flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </Button>
                    </div>

                    {/* Admin Footer */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-foreground leading-relaxed">
                        Nova is owned and operated by Abdisamad, 15 years old. By using Nova, you agree to follow its rules, respect its services, and understand that all rights to the platform belong to Abdisamad.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Subscription Info */}
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-foreground mb-1">Subscription Status</h3>
                      <p className="text-lg font-semibold text-nova-pink">30 days</p>
                      <p className="text-xs text-muted-foreground">until subscription ends</p>
                    </div>

                    {/* Change Credentials Section */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-foreground">Change Credentials</h3>
                      
                      <div>
                        <Label className="text-sm font-medium text-foreground mb-1 block">
                          Credential Type
                        </Label>
                        <Select value={credentialType} onValueChange={setCredentialType}>
                          <SelectTrigger className="border-border focus:border-nova-pink">
                            <SelectValue placeholder="Select credential to change" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border z-[100]">
                            <SelectItem value="email">Change Email</SelectItem>
                            <SelectItem value="password">Change Password</SelectItem>
                            <SelectItem value="both">Change Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {(credentialType === 'email' || credentialType === 'both') && (
                        <>
                          <div>
                            <Label htmlFor="old-email" className="text-sm font-medium text-foreground mb-1 block">
                              Current Email
                            </Label>
                            <Input
                              id="old-email"
                              type="email"
                              placeholder="Enter current email"
                              value={oldEmail}
                              onChange={(e) => setOldEmail(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>

                          <div>
                            <Label htmlFor="new-email" className="text-sm font-medium text-foreground mb-1 block">
                              New Email
                            </Label>
                            <Input
                              id="new-email"
                              type="email"
                              placeholder="Enter new email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                        </>
                      )}

                      {(credentialType === 'password' || credentialType === 'both') && (
                        <>
                          <div>
                            <Label htmlFor="old-password" className="text-sm font-medium text-foreground mb-1 block">
                              Current Password
                            </Label>
                            <Input
                              id="old-password"
                              type="password"
                              placeholder="Enter current password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>

                          <div>
                            <Label htmlFor="new-password" className="text-sm font-medium text-foreground mb-1 block">
                              New Password
                            </Label>
                            <Input
                              id="new-password"
                              type="password"
                              placeholder="Enter new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="border-border focus:border-nova-pink"
                            />
                          </div>
                        </>
                      )}

                      {credentialType && (
                        <Button 
                          onClick={handleSaveSettings} 
                          className="w-full bg-nova-pink hover:bg-nova-pink/90"
                        >
                          Save Settings
                        </Button>
                      )}
                    </div>

                    {/* Logout Section */}
                    <div className="pt-3 border-t border-border">
                      <Button
                        onClick={() => setShowLogoutDialog(true)}
                        variant="destructive"
                        className="w-full flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to sign in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
            >
              No
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSettingsPanel;