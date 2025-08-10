"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Car, Fuel, MapPin, BatteryCharging, CircleDotDashed, Clock, Phone, MessageSquare, Navigation, CheckCircle, X, DollarSign, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { CardSkeleton } from "@/components/ui/card-skeleton";
import { AnimatedDiv } from "@/components/animated-div";

const initialRequests = [
  {
    id: 1,
    issue: "Flat Tire",
    icon: CircleDotDashed,
    distance: "3.2 km away",
    estimatedTime: "15 min",
    vehicle: "2019 Toyota Corolla",
    location: "Victoria Island, Lagos",
    customerName: "Adunni Okafor",
    customerPhone: "+234 803 456 7890",
    customerImage: "/images/customer-sarah.jpg",
    comments: "Front-left tire is completely flat. I have a spare tire in the boot but no tools to change it.",
    priority: "High",
    requestTime: "7 minutes ago",
    customerRating: 4.8,
    estimatedPay: "₦12,500"
  },
  {
    id: 2,
    issue: "Dead Battery",
    icon: BatteryCharging,
    distance: "5.8 km away",
    estimatedTime: "22 min",
    vehicle: "2020 Honda Accord",
    location: "Ikeja GRA, Lagos",
    customerName: "Chinedu Okwu",
    customerPhone: "+234 807 123 4567",
    customerImage: "/images/customer-mike.jpg",
    comments: "Car won't start at all. Lights are very dim. I think the battery is completely dead.",
    priority: "Medium",
    requestTime: "12 minutes ago",
    customerRating: 5.0,
    estimatedPay: "₦8,500"
  },
  {
    id: 3,
    issue: "Out of Fuel",
    icon: Fuel,
    distance: "8.5 km away",
    estimatedTime: "28 min",
    vehicle: "2018 Nissan Pathfinder",
    location: "Lekki Phase 2, Lagos",
    customerName: "Fatima Abdullahi",
    customerPhone: "+234 809 987 6543",
    customerImage: "/images/customer-emily.jpg",
    comments: "Completely out of fuel on Lekki-Epe Expressway. Need about 10 litres to get to nearest filling station.",
    priority: "Low",
    requestTime: "18 minutes ago",
    customerRating: 4.9,
    estimatedPay: "₦6,000"
  },
];

const activeJobs = [
  {
    id: 4,
    issue: "Car Lockout",
    customer: "Kemi Adebayo",
    location: "Surulere, Lagos",
    status: "En Route",
    eta: "12 minutes",
    customerImage: "/images/customer-mike.jpg"
  }
];

export default function MechanicDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptJob = (jobId: number) => {
    setRequests(requests.filter(req => req.id !== jobId));
  };

  const handleDeclineJob = (jobId: number) => {
    setRequests(requests.filter(req => req.id !== jobId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 py-8">
        <div className="container px-4">
          {/* Header */}
          <AnimatedDiv delay={0.1}>
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Mechanic Dashboard</h1>
                  <p className="text-muted-foreground">
                    Manage your roadside assistance requests across Nigeria
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Today's Earnings: ₦42,500</span>
                  </div>
                  <Badge variant="outline" className="px-3 py-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </Badge>
                  <Avatar>
                    <AvatarImage src="/images/customer-mike.jpg" />
                    <AvatarFallback>TA</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </AnimatedDiv>

          <Tabs defaultValue="available" className="space-y-6">
            <AnimatedDiv delay={0.2}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="available" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available ({loading ? '...' : requests.length})
                </TabsTrigger>
                <TabsTrigger value="active" className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Active ({activeJobs.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Completed (5)
                </TabsTrigger>
              </TabsList>
            </AnimatedDiv>

            <TabsContent value="available" className="space-y-6">
              {loading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
              ) : requests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                    <p className="text-muted-foreground text-center">
                      No new requests at the moment. New jobs will appear here automatically.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {requests.map((request, i) => (
                    <AnimatedDiv key={request.id} delay={i * 0.1}>
                      <Card className="flex flex-col hover:shadow-lg transition-shadow h-full">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-lg">
                                <request.icon className="h-5 w-5 text-primary" />
                              </div>
                              <CardTitle className="text-lg">{request.issue}</CardTitle>
                            </div>
                            <Badge variant={getPriorityColor(request.priority) as any}>
                              {request.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {request.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {request.estimatedTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 font-medium text-green-600">
                              <span>₦</span>
                              {request.estimatedPay.replace('₦', '')}
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="flex-grow space-y-4">
                          {/* Customer Info */}
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                              <Image
                                src={request.customerImage || "/placeholder.svg"}
                                alt={request.customerName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{request.customerName}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{request.customerRating}</span>
                                </div>
                                <span>•</span>
                                <span>{request.requestTime}</span>
                              </div>
                            </div>
                          </div>

                          {/* Vehicle & Location */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{request.vehicle}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <span className="text-sm">{request.location}</span>
                            </div>
                          </div>

                          {/* Customer Comments */}
                          {request.comments && (
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-sm font-medium text-blue-900 mb-1">Customer Notes:</p>
                              <p className="text-sm text-blue-800">{request.comments}</p>
                            </div>
                          )}
                        </CardContent>
                        
                        <CardFooter className="flex gap-2 pt-4">
                          <Button 
                            className="flex-1" 
                            onClick={() => handleAcceptJob(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleDeclineJob(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Navigation className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </AnimatedDiv>
                  ))}
                </div>
              )}
            </TabsContent>
            {/* Other TabsContent remain the same */}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
