"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { User } from "../../type/user";
import { useParams, usePathname } from "next/navigation";
import BreadcrumbComponent from "@/components/common/Breadcrumb";

// --- Validation Schema ---
const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().optional(),
  role: z.string().optional(),
  
  facebook: z.string().url("Invalid URL").nullable().optional(),
  github: z.string().url("Invalid URL").nullable().optional(),
  linkedin: z.string().url("Invalid URL").nullable().optional(),
  website: z.string().url("Invalid URL").nullable().optional(),
});

type FormValues = z.infer<typeof userSchema>;

const UserProfileEdit = () => {
  const pathname = usePathname();
  const [editUser, setEditUser] = useState<User | null>(null);
  const { detailsUser, updateUser } = useUserStore();
  const params = useParams();

  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      phone: "",
      role: "",
      facebook: "",
      github: "",
      linkedin: "",
      website: "",
    },
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!params.id) return;
      const user = await detailsUser(Number(params.id));
      if (user) {
        setEditUser(user);

        // reset form values with single user data
        form.reset({
          name: user.name,
          email: user.email,
          username: user.username,
          phone: user.phone,
          role: user.role,
          facebook: user.social?.facebook ?? "",
          github: user.social?.github ?? "",
          linkedin: user.social?.linkedin ?? "",
          website: user.social?.website ?? "",
        });
      }
    };
    loadUser();
  }, [params.id, detailsUser, form]);

  const onSubmit = async (data: FormValues) => {
    if (!editUser) return;

    try {
      await updateUser({
        id: editUser.id,
        name: data.name,
        email: data.email,
        username: data.username,
        phone: data.phone !== undefined ? data.phone : "",
        role: data.role !== undefined ? data.role : "",
        image: editUser.image, // keep old image if not editing
        status: editUser.status,
        social: {
          facebook: data.facebook,
          github: data.github,
          linkedin: data.linkedin,
          website: data.website,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  if (!editUser) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        Loading user details...
      </p>
    );
  }

  return (
   <div>
    <BreadcrumbComponent pathname={pathname} />
     <div className="flex justify-start my-10">
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your profile information and social links.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...form.register("username")} />
              {form.formState.errors.username && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...form.register("phone")} />
            </div>

            {/* Role */}
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" {...form.register("role")} />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" {...form.register("facebook")} />
              </div>
              <div>
                <Label htmlFor="github">Github</Label>
                <Input id="github" {...form.register("github")} />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" {...form.register("linkedin")} />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...form.register("website")} />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
   </div>
  );
};

export default UserProfileEdit;
