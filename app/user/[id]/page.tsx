"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Edit, 
  Mail, 
  Phone, 
  User, 
  UserCheck, 
  Facebook, 
  Github, 
  Linkedin,
  Globe
} from "lucide-react";
import { User as UserType } from "../type/user";

interface UserProfileDetailsProps {
  user: UserType;
}

export default function UserProfileDetails({ user }: UserProfileDetailsProps) {
  return (
   <div>
     <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar */}
          <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="text-2xl font-bold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {/* Name and Status */}
          <div>
            <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
            <div className="flex items-center justify-center mt-1">
              <Badge variant={user.status === "active" ? "default" : "secondary"} className="text-xs">
                <UserCheck className="w-3 h-3 mr-1" />
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Role */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Role</p>
          <p className="font-medium">{user.role}</p>
        </div>
        
        <Separator />
        
        {/* Contact Information */}
        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <div className="bg-muted p-2 rounded-full">
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
          
          {/* Phone */}
          <div className="flex items-center space-x-3">
            <div className="bg-muted p-2 rounded-full">
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
          </div>
          
          {/* Username */}
          <div className="flex items-center space-x-3">
            <div className="bg-muted p-2 rounded-full">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="text-sm font-medium">@{user.username}</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Social Media Links */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Social Media</p>
          <div className="flex justify-center space-x-4">
            {user.social?.facebook && (
              <Button variant="ghost" size="sm" asChild>
                <a href={user.social.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </a>
              </Button>
            )}
            
            {user.social?.github && (
              <Button variant="ghost" size="sm" asChild>
                <a href={user.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            
            {user.social?.linkedin && (
              <Button variant="ghost" size="sm" asChild>
                <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </a>
              </Button>
            )}
            
            {user.social?.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={user.social.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-5 w-5 text-green-600" />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        {/* Edit Button */}
        <div className="pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-muted-foreground">
                  Edit profile form would go here
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
   </div>
  );
}