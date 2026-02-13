"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useProfileStore} from "@/stores/useProfileStore";
import {toFormData} from "@/lib/toFormData";


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


const UpdatePasswordForm = () => {

    const {updatePassword} = useProfileStore();

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

        try {
            const fd = toFormData(values);
            await updatePassword(fd);

            toast.success("Password updated successfully")
            passwordForm.reset()
        }catch (err: any){
            toast.error(err.message);
        }


    }

    return (
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
    );
}

export default UpdatePasswordForm;