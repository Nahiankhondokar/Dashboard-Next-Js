"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth.schema";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            setLoading(true);

            // CSRF (if Sanctum)
            // const baseUrl = "http://localhost:8000";
            // await fetch(
            //     `${baseUrl}/sanctum/csrf-cookie`,
            //     { credentials: "include" }
            // );

            await fetch(
                "http://localhost:8000/sanctum/csrf-cookie",
                { credentials: "include" }
            );

            await apiFetch("/api/login", {
                method: "POST",
                body: JSON.stringify(data),
            });

            router.push("/dashboard");
        } catch (error: any) {
            form.setError("root", {
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader className="text-center border-b-2 mb-1">
                    <CardTitle>SignIn</CardTitle>
                    <CardDescription>
                        Login to access your dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input {...form.register("email")} />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                {...form.register("password")}
                            />
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Root Error */}
                        {form.formState.errors.root && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <Button
                            className="w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
