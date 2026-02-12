"use client"

import {useEffect, useState} from "react"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import BreadcrumbComponent from "@/components/common/Breadcrumb"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {toFormData} from "@/lib/toFormData";
import {apiFetch} from "@/lib/api";




/* ===============================
   ZOD SCHEMAS
================================ */

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    username:z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    socials: z.array(z.string()).nullable().optional(),
    image: z
        .instanceof(File)
        .optional()
        .nullable(),
})

const passwordSchema = z.object({
    password: z.string().min(6, "Minimum 6 characters"),
    password_confirmation: z.string().min(6),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
})

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

const mapProfileToForm = (profile: Profile) => {
    const mapProfileToForm = (profile) => {
    name: profile.name ?? "",
        email: profile.email ?? "",
        username: profile.username ?? "",
        bio: profile.bio ?? "",
        location: profile.location ?? "",
        website: profile.website ?? "",
        phone: profile.phone ?? "",
        socials: profile.socials ?? [],
        image: null, // file input can't be prefilled
};

/* ===============================
   COMPONENT
================================ */

const Profile = () => {
    const pathname = usePathname()
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const {fetchProfile} = useProfileStore();

    /* ---------- PROFILE FORM ---------- */

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            bio: "",
            location: "",
            website: "",
            phone: "",
            socials: [],
            image: null,
        },
    })

    const handleProfileSubmit = async (values: ProfileFormValues) => {
        // ensure socials is array (if your default is [] this is fine)
        // ensure image is File | null (your file input set profileForm.setValue("image", file))
        const fd = toFormData(values, { arrayFormat: "brackets", booleanFormat: "1/0" });

        // Inspect FormData entries in console (useful)
        for (const [k, v] of fd.entries()) {
            console.log(k, v);
        }

        // call your api helper (apiFetch) - don't set Content-Type header for FormData
        try {
            await apiFetch("profile/update", { method: "PUT", body: fd });
            toast.success("Profile updated successfully");
        } catch (e) {
            toast.error("Update failed");
        }
    };

    /* ---------- PASSWORD FORM ---------- */
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            password_confirmation: "",
        },
    })

    const handlePasswordSubmit = async (values: PasswordFormValues) => {
        console.log(values)

        // TODO: call your update password API here

        toast.success("Password updated successfully")
        passwordForm.reset()
    }

    /* ---------- IMAGE CHANGE ---------- */

    const handleImageChange = (file: File | null) => {
        if (!file) return

        setImagePreview(URL.createObjectURL(file))
        profileForm.setValue("image", file)
    }


    useEffect(() => {
        const res =

        console.log(res.data)
        profileForm.reset(res);
    }, []);

    return (
        <div className="space-y-6">
            <BreadcrumbComponent pathname={pathname} />

            <Tabs defaultValue="profile" className="w-1/2">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>

                {/* ================= PROFILE TAB ================= */}

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Profile</CardTitle>
                            <CardDescription>
                                Update your personal information
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...profileForm}>
                                <form
                                    onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                                    className="space-y-6"
                                >
                                    {/* Avatar */}
                                    <div className="flex items-center gap-6">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={imagePreview ?? ""} />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>

                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleImageChange(e.target.files?.[0] ?? null)
                                            }
                                        />
                                    </div>

                                    <Separator />

                                    {/* Name */}
                                    <FormField
                                        control={profileForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* User name */}
                                    <FormField
                                        control={profileForm.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nick Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your username" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Phone */}
                                    <FormField
                                        control={profileForm.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your phone" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Email */}
                                    <FormField
                                        control={profileForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Bio */}
                                    <FormField
                                        control={profileForm.control}
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your bio" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Website */}
                                    <FormField
                                        control={profileForm.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your website" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Location */}
                                    <FormField
                                        control={profileForm.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your location" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">
                                        Update Profile
                                    </Button>
                                </form>
                            </Form>

                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ================= PASSWORD TAB ================= */}

                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Password</CardTitle>
                            <CardDescription>
                                Change your account password
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...passwordForm}>
                                <form
                                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                                    className="space-y-6"
                                >
                                    {/* Password */}
                                    <FormField
                                        control={passwordForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>New Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showNewPassword ? "text" : "password"}
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        >
                                                            {showNewPassword ? (
                                                                <EyeOff size={18} />
                                                            ) : (
                                                                <Eye size={18} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Confirm Password */}
                                    <FormField
                                        control={passwordForm.control}
                                        name="password_confirmation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setShowConfirmPassword(!showConfirmPassword)
                                                            }
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        >
                                                            {showConfirmPassword ? (
                                                                <EyeOff size={18} />
                                                            ) : (
                                                                <Eye size={18} />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">
                                        Update Password
                                    </Button>
                                </form>
                            </Form>

                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Profile
