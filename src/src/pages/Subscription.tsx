import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<'paypal' | 'card' | null>(null);

  const handlePaymentSelect = (method: 'paypal' | 'card') => {
    setSelectedPayment(method);
    // Simulate payment processing and redirect to AI page
    setTimeout(() => {
      navigate('/ai');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <Link to="/signup" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </Link>
          <h1 className="text-xl font-bold tracking-wider text-nova-pink">NOVA</h1>
        </div>
        
        <Card className="border-0 shadow-[var(--shadow-card)]">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Subscribe to NOVA AI</h2>
            <p className="text-muted-foreground text-sm">Get full access to all features for just $20.99/month</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-foreground">NOVA Premium</h3>
                  <p className="text-sm text-muted-foreground">Monthly subscription</p>
                </div>
                <div className="text-2xl font-bold text-nova-pink">$20.99</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium text-foreground mb-2">Pay with PayPal</h3>
                <p className="text-xs text-muted-foreground mb-4">Secure payments with PayPal - Credit & Debit cards accepted</p>
                
                <div className="flex items-center justify-center mb-4">
                  <img 
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjI2IiB2aWV3Qm94PSIwIDAgMTAwIDI2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIuMjUgNC4yNUgxOC41QzIwLjU3IDQuMjUgMjIuMjUgNS45MyAyMi4yNSA4VjEwQzIyLjI1IDEyLjA3IDIwLjU3IDEzLjc1IDE4LjUgMTMuNzVIMTUuNzVMMTQuNSAyMS43NUgxMC41TDEyLjI1IDQuMjVaIiBmaWxsPSIjMDAzMDg3Ii8+CjxwYXRoIGQ9Ik0yNS41IDQuMjVIMzEuNzVDMzMuODIgNC4yNSAzNS41IDUuOTMgMzUuNSA4VjEwQzM1LjUgMTIuMDcgMzMuODIgMTMuNzUgMzEuNzUgMTMuNzVIMjlMMjcuNzUgMjEuNzVIMjMuNzVMMjUuNSA0LjI1WiIgZmlsbD0iIzAwNzlDMSIvPgo8cGF0aCBkPSJNMzguNzUgNC4yNUg0NUMzNy4wNyA0LjI1IDM4Ljc1IDUuOTMgMzguNzUgOFYxMEMzOC43NSAxMi4wNyAzNy4wNyAxMy43NSAzNSAxMy43NUgzMi4yNUwzMSAyMS43NUgyN0wzOC43NSA0LjI1WiIgZmlsbD0iIzAwOTlENCIvPgo8L3N2Zz4K" 
                    alt="PayPal" 
                    className="h-8"
                  />
                </div>
              </div>

              <Button 
                onClick={() => handlePaymentSelect('paypal')}
                className="w-full h-14 bg-[#FFC439] hover:bg-[#FFB800] text-[#003087] font-semibold text-lg rounded-lg"
              >
                PayPal
              </Button>

              <Button 
                onClick={() => handlePaymentSelect('card')}
                className="w-full h-14 bg-[#2C2E2F] hover:bg-[#1A1B1C] text-white font-semibold text-lg rounded-lg flex items-center justify-center gap-3"
              >
                <CreditCard className="w-5 h-5" />
                Debit or Credit Card
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Powered by <span className="font-semibold text-[#003087]">PayPal</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;