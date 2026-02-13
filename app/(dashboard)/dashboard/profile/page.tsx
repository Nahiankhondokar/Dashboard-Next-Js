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
import { toast } from "sonner"
import UpdateProfileForm from "@/app/(dashboard)/dashboard/profile/components/UpdateProfileForm";


/* ===============================
   ZOD SCHEMAS
================================ */

const passwordSchema = z.object({
    password: z.string().min(6, "Minimum 6 characters"),
    password_confirmation: z.string().min(6),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
})

type PasswordFormValues = z.infer<typeof passwordSchema>

/* ===============================
   COMPONENT
================================ */

const Profile = () => {
    const pathname = usePathname()

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
                    <UpdateProfileForm />
                </TabsContent>

                {/* ================= PASSWORD TAB ================= */}

                <TabsContent value="password">
                    {/*<Card>*/}
                    {/*    <CardHeader>*/}
                    {/*        <CardTitle>Update Password</CardTitle>*/}
                    {/*        <CardDescription>*/}
                    {/*            Change your account password*/}
                    {/*        </CardDescription>*/}
                    {/*    </CardHeader>*/}

                    {/*    <CardContent>*/}
                    {/*        <Form {...passwordForm}>*/}
                    {/*            <form*/}
                    {/*                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}*/}
                    {/*                className="space-y-6"*/}
                    {/*            >*/}
                    {/*                /!* Password *!/*/}
                    {/*                <FormField*/}
                    {/*                    control={passwordForm.control}*/}
                    {/*                    name="password"*/}
                    {/*                    render={({ field }) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <FormLabel>New Password</FormLabel>*/}
                    {/*                            <FormControl>*/}
                    {/*                                <div className="relative">*/}
                    {/*                                    <Input*/}
                    {/*                                        type={showNewPassword ? "text" : "password"}*/}
                    {/*                                        {...field}*/}
                    {/*                                    />*/}
                    {/*                                    <button*/}
                    {/*                                        type="button"*/}
                    {/*                                        onClick={() => setShowNewPassword(!showNewPassword)}*/}
                    {/*                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"*/}
                    {/*                                    >*/}
                    {/*                                        {showNewPassword ? (*/}
                    {/*                                            <EyeOff size={18} />*/}
                    {/*                                        ) : (*/}
                    {/*                                            <Eye size={18} />*/}
                    {/*                                        )}*/}
                    {/*                                    </button>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage />*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}

                    {/*                /!* Confirm Password *!/*/}
                    {/*                <FormField*/}
                    {/*                    control={passwordForm.control}*/}
                    {/*                    name="password_confirmation"*/}
                    {/*                    render={({ field }) => (*/}
                    {/*                        <FormItem>*/}
                    {/*                            <FormLabel>Confirm Password</FormLabel>*/}
                    {/*                            <FormControl>*/}
                    {/*                                <div className="relative">*/}
                    {/*                                    <Input*/}
                    {/*                                        type={showConfirmPassword ? "text" : "password"}*/}
                    {/*                                        {...field}*/}
                    {/*                                    />*/}
                    {/*                                    <button*/}
                    {/*                                        type="button"*/}
                    {/*                                        onClick={() =>*/}
                    {/*                                            setShowConfirmPassword(!showConfirmPassword)*/}
                    {/*                                        }*/}
                    {/*                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"*/}
                    {/*                                    >*/}
                    {/*                                        {showConfirmPassword ? (*/}
                    {/*                                            <EyeOff size={18} />*/}
                    {/*                                        ) : (*/}
                    {/*                                            <Eye size={18} />*/}
                    {/*                                        )}*/}
                    {/*                                    </button>*/}
                    {/*                                </div>*/}
                    {/*                            </FormControl>*/}
                    {/*                            <FormMessage />*/}
                    {/*                        </FormItem>*/}
                    {/*                    )}*/}
                    {/*                />*/}

                    {/*                <Button type="submit" className="w-full">*/}
                    {/*                    Update Password*/}
                    {/*                </Button>*/}
                    {/*            </form>*/}
                    {/*        </Form>*/}

                    {/*    </CardContent>*/}
                    {/*</Card>*/}
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default Profile
