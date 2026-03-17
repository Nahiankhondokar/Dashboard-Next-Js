"use client";

import { useEffect, useState } from "react";
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
  FacebookIcon,
  GithubIcon,
  Linkedin,
  Globe,
} from "lucide-react";
import { User as UserType } from "../type/user";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";

const UserProfileDetails = () => {
  const params = useParams();
  // const { detailsUser } = useUserStore();
  const [user, setUser] = useState<UserType | null>(null);

  if(!user)  return <div>Loading...</div>;

  return (
      <>

      </>
  );
};

export default UserProfileDetails;
