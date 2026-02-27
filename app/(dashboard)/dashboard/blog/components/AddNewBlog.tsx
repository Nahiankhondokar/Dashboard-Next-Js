"use client";

import React, { useEffect, useRef } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import {toast} from "sonner";
import {formSchema} from "@/app/(dashboard)/dashboard/blog/schema/formSchema";
import {Blog} from "@/app/(dashboard)/dashboard/blog/interface/Blog";
import {useBlogStore} from "@/stores/useBlogStore";
import ImageUpload from "@/components/common/ImageUpload";

type formSchemaType = z.infer<typeof formSchema>;

const mapBlogToForm = (blog: Blog): formSchemaType => ({
    title: blog.title ?? "",
    subtitle: blog.subtitle ?? "",
    status: blog.status ?? true,
    description: blog.description ?? "",
    image: blog.image ?? ""
});

const AddNewBlog = () => {

    const {
        mode,
        selectedBlog,
        createBlog,
        updateBlog,
        modalOpen,
        loading,
    } = useBlogStore();

    const fileRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            status: true,
            description: "",
            image: null,
        },
    });

    const onSubmit = async (values: formSchemaType) => {

        const fd = new FormData();
        Object.entries(values).forEach(([k, v]) => {
            if (v === null || v === undefined) return;

            if (k === "image" && v instanceof File) {
                fd.append("image", v);
            } else if (typeof v === "boolean") {
                fd.append(k, v ? "1" : "0");
            } else {
                fd.append(k, v as string);
            }
        });

        try {
            if (mode === "create") {
                await createBlog(fd);
                toast.success("Blog created");
            } else {
                await updateBlog(selectedBlog!.id, fd);
                toast.success("Blog updated");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (mode === "edit" && selectedBlog) {
            form.reset(mapBlogToForm(selectedBlog));
        }

        if (!modalOpen) {
            form.reset();
            if (fileRef.current) fileRef.current.value = "";
        }
    }, [mode, selectedBlog, modalOpen]);

    return (
        <div>
            <Form {...form}>
                <form
                    id="user-form"
                    onSubmit={form.handleSubmit(
                        onSubmit,
                        (errors) => {
                            console.log("❌ FORM ERRORS:", errors);
                        }
                    )}
                    className="space-y-6"
                >

                    {/* Title */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Sub Title */}
                    <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sub Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="sub title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/*Image upload*/}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-semibold text-foreground/80">Profile Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(file) => field.onChange(file)}
                                        onRemove={() => field.onChange(null)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status */}
                    {/* <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value === true} // Convert number to boolean for UI
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? true : false)
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          /> */}

                    {/* Submit */}
                    <Button type="submit" disabled={false} className="w-full">
                        {mode === "create" ? "Create" : "Update"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddNewBlog
