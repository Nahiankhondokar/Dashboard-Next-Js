"use client"

import { useState } from "react"
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



/* ===============================
   ZOD SCHEMAS
================================ */

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    image: z
        .instanceof(File)
        .optional()
        .nullable(),
})

const passwordSchema = z.object({
    newPassword: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>


/* ===============================
   COMPONENT
================================ */

const Profile = () => {
    const pathname = usePathname()
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    /* ---------- PROFILE FORM ---------- */

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "John Doe",
            email: "john@example.com",
            image: null,
        },
    })

    const handleProfileSubmit = async (values: ProfileFormValues) => {
        console.log(values)

        // TODO: call your update profile API here

        toast.success("Profile updated successfully")
    }

    /* ---------- PASSWORD FORM ---------- */
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
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
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input {...profileForm.register("name")} />
                                    <p className="text-sm text-red-500">
                                        {profileForm.formState.errors.name?.message}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input {...profileForm.register("email")} />
                                    <p className="text-sm text-red-500">
                                        {profileForm.formState.errors.email?.message}
                                    </p>
                                </div>

                                <Button type="submit" className="w-full">
                                    Update Profile
                                </Button>
                            </form>
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
                            <form
                                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                                className="space-y-6"
                            >
                                {/* New Password */}
                                <div className="space-y-2">
                                    <Label>New Password</Label>

                                    <div className="relative">
                                        <Input
                                            type={showNewPassword ? "text" : "password"}
                                            {...passwordForm.register("newPassword")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <p className="text-sm text-red-500">
                                        {passwordForm.formState.errors.newPassword?.message}
                                    </p>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label>Confirm Password</Label>

                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...passwordForm.register("confirmPassword")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    <p className="text-sm text-red-500">
                                        {passwordForm.formState.errors.confirmPassword?.message}
                                    </p>
                                </div>


                                <Button type="submit" className="w-full">
                                    Update Password
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Profile
