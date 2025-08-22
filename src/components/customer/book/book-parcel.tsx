"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, MapPin, User, CreditCard, Truck } from "lucide-react";
import { toast } from "sonner";

const BookParcel = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Booking Confirmed!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Parcel Pickup</h1>
          <p className="text-muted-foreground">Schedule a pickup for your package</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sender Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Sender Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Full Name</Label>
                <Input id="senderName" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="senderPhone">Phone Number</Label>
                <Input id="senderPhone" placeholder="+1 (555) 123-4567" required />
              </div>
            </div>
            <div>
              <Label htmlFor="senderAddress">Pickup Address</Label>
              <Textarea id="senderAddress" placeholder="123 Main St, City, State 12345" required />
            </div>
          </CardContent>
        </Card>

        {/* Recipient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Recipient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Full Name</Label>
                <Input id="recipientName" placeholder="Jane Smith" required />
              </div>
              <div>
                <Label htmlFor="recipientPhone">Phone Number</Label>
                <Input id="recipientPhone" placeholder="+1 (555) 987-6543" required />
              </div>
            </div>
            <div>
              <Label htmlFor="recipientAddress">Delivery Address</Label>
              <Textarea id="recipientAddress" placeholder="456 Oak Ave, City, State 67890" required />
            </div>
          </CardContent>
        </Card>

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Package Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input id="weight" type="number" placeholder="2.5" step="0.1" required />
              </div>
              <div>
                <Label htmlFor="dimensions">Dimensions (L×W×H cm)</Label>
                <Input id="dimensions" placeholder="30×20×15" required />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea id="notes" placeholder="Handle with care, fragile items..." />
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Method</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Cash on Delivery (COD)</div>
                      <div className="text-sm text-muted-foreground">Pay when your package is delivered</div>
                    </div>
                    <Truck className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="instant" id="instant" />
                <Label htmlFor="instant" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Instant Payment</div>
                      <div className="text-sm text-muted-foreground">Pay now with card or digital wallet</div>
                    </div>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "instant" && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Estimated Cost:</span>
                  <span className="font-medium">$12.50</span>
                </div>
                <div className="h-px bg-muted my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total:</span>
                  <span>$12.50</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="px-8">
            {paymentMethod === "instant" ? "Pay & Book Pickup" : "Book Pickup"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
