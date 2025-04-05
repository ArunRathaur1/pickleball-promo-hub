
import { useState, useEffect } from "react";
import { Calculator, Camera, Video, CalendarDays, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PricingItem {
  label: string;
  quantity: number;
  rate: number;
  total: number;
}

export function ServiceCalculator() {
  const { toast } = useToast();
  const [eventType, setEventType] = useState<string>("tournament");
  const [eventDuration, setEventDuration] = useState<number[]>([1]);
  const [photographers, setPhotographers] = useState<number>(1);
  const [videographers, setVideographers] = useState<number>(1);
  const [socialMediaPackage, setSocialMediaPackage] = useState<boolean>(false);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<PricingItem[]>([]);
  
  // Pricing constants (in a real app, these might come from an API)
  const RATES = {
    photographer: 350, // per day
    videographer: 500, // per day
    socialMedia: 250, // per day
    tournamentBonus: 200, // flat fee for tournaments
  };
  
  // Calculate estimated cost whenever inputs change
  useEffect(() => {
    const days = eventDuration[0];
    const items: PricingItem[] = [];
    
    // Photographer costs
    if (photographers > 0) {
      items.push({
        label: `Photographer${photographers > 1 ? 's' : ''} (${photographers} × $${RATES.photographer}/day × ${days} day${days > 1 ? 's' : ''})`,
        quantity: photographers * days,
        rate: RATES.photographer,
        total: photographers * RATES.photographer * days,
      });
    }
    
    // Videographer costs
    if (videographers > 0) {
      items.push({
        label: `Videographer${videographers > 1 ? 's' : ''} (${videographers} × $${RATES.videographer}/day × ${days} day${days > 1 ? 's' : ''})`,
        quantity: videographers * days,
        rate: RATES.videographer,
        total: videographers * RATES.videographer * days,
      });
    }
    
    // Social media package
    if (socialMediaPackage) {
      items.push({
        label: `Social Media Package ($${RATES.socialMedia}/day × ${days} day${days > 1 ? 's' : ''})`,
        quantity: days,
        rate: RATES.socialMedia,
        total: RATES.socialMedia * days,
      });
    }
    
    // Tournament bonus
    if (eventType === "tournament") {
      items.push({
        label: "Tournament Coordination Fee",
        quantity: 1,
        rate: RATES.tournamentBonus,
        total: RATES.tournamentBonus,
      });
    }
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + item.total, 0);
    
    setBreakdown(items);
    setEstimatedCost(total);
  }, [eventType, eventDuration, photographers, videographers, socialMediaPackage]);
  
  const handleRequest = () => {
    toast({
      title: "Service Request Sent",
      description: "We'll get back to you shortly with a detailed quote.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-pickle" />
          <CardTitle>Service Cost Estimator</CardTitle>
        </div>
        <CardDescription>
          Calculate an estimate for your pickleball marketing needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="event-type">Event Type</Label>
          <Select
            defaultValue={eventType}
            onValueChange={(value) => setEventType(value)}
          >
            <SelectTrigger id="event-type">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tournament">Tournament</SelectItem>
              <SelectItem value="exhibition">Exhibition Match</SelectItem>
              <SelectItem value="clinic">Training Clinic</SelectItem>
              <SelectItem value="other">Other Event</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="event-duration">Event Duration (Days)</Label>
            <span className="text-sm font-medium">{eventDuration[0]} day{eventDuration[0] > 1 ? 's' : ''}</span>
          </div>
          <Slider
            id="event-duration"
            defaultValue={[1]}
            max={7}
            step={1}
            onValueChange={setEventDuration}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-pickle" />
              <Label htmlFor="photographers">Number of Photographers</Label>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPhotographers(Math.max(0, photographers - 1))}
              >
                -
              </Button>
              <Input
                id="photographers"
                type="number"
                min={0}
                max={5}
                value={photographers}
                onChange={(e) => setPhotographers(Number(e.target.value))}
                className="w-16 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPhotographers(Math.min(5, photographers + 1))}
              >
                +
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-pickle" />
              <Label htmlFor="videographers">Number of Videographers</Label>
            </div>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVideographers(Math.max(0, videographers - 1))}
              >
                -
              </Button>
              <Input
                id="videographers"
                type="number"
                min={0}
                max={5}
                value={videographers}
                onChange={(e) => setVideographers(Number(e.target.value))}
                className="w-16 text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setVideographers(Math.min(5, videographers + 1))}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox
            id="social-media"
            checked={socialMediaPackage}
            onCheckedChange={(checked) => setSocialMediaPackage(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="social-media"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Social Media Package
            </label>
            <p className="text-sm text-muted-foreground">
              Includes daily social media coverage, story creation, and post-event highlight reel
            </p>
          </div>
        </div>
        
        {/* Cost Breakdown */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Info className="h-4 w-4 text-pickle" />
            Estimated Cost Breakdown
          </h3>
          
          {breakdown.length > 0 ? (
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">${item.total.toLocaleString()}</span>
                </div>
              ))}
              
              <div className="flex justify-between font-bold mt-4 pt-4 border-t border-border">
                <span>Total Estimated Cost</span>
                <span className="text-pickle text-lg">${estimatedCost.toLocaleString()}</span>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                This is an estimate only. Final pricing may vary based on specific requirements and location.
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Please select at least one service to see the cost estimate.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setEventType("tournament");
          setEventDuration([1]);
          setPhotographers(1);
          setVideographers(1);
          setSocialMediaPackage(false);
        }}>
          Reset
        </Button>
        {/* <Button className="bg-pickle hover:bg-pickle-dark" onClick={handleRequest}>
          Request Detailed Quote
        </Button> */}
      </CardFooter>
    </Card>
  );
}
