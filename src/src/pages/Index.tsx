import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, Image, Video, Mic } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-wider bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">NOVA</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-foreground hover:text-pink-500 transition-colors">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                The next generation AI platform for content creation and conversations.
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-8" size="lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="lg" className="text-foreground hover:text-pink-500 transition-colors">
                  Login
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-3xl font-bold text-foreground">Powerful AI Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              NOVA combines cutting-edge AI technologies to bring you the most powerful content creation tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={MessageCircle}
              title="Advanced Chatbot"
              description="Highly advanced AI chatbot that remembers context, can be customized to your preferences, and produces human-like responses."
            />
            <FeatureCard
              icon={Image}
              title="Realistic Image Generation"
              description="Create stunning, photorealistic images from your descriptions with our powerful image generation model."
            />
            <FeatureCard
              icon={Video}
              title="Video Generation"
              description="Transform text prompts into high-quality videos with customizable styles, duration, and effects."
            />
            <FeatureCard
              icon={Mic}
              title="Voice Generation"
              description="Create natural-sounding voice recordings from text in multiple languages and accents with adjustable tone and speed."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
