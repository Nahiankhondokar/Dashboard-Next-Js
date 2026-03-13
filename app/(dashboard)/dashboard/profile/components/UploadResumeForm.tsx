"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { FileText, UploadCloud } from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useProfileStore} from "@/stores/useProfileStore";

/* ===============================
   ZOD SCHEMA
================================ */

// We define a schema that expects a File object
const resumeSchema = z.object({
    media: z
        .any()
        .refine((file) => file instanceof File, "Resume file is required")
        .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB")
        .refine(
            (file) => ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file?.type),
            "Only .pdf, .doc, and .docx formats are supported"
        ),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

const UploadResumeForm = () => {
    // Assuming you'll add uploadResume to your profile store
    const { uploadResume } = useProfileStore();

    const form = useForm<ResumeFormValues>({
        resolver: zodResolver(resumeSchema),
    });

    const onSubmit = async (values: ResumeFormValues) => {
        try {
            // Use FormData for file uploads
            const formData = new FormData();
            formData.append("resume", values.media); // 'resume' matches the Laravel key

            await uploadResume(formData);

            toast.success("Resume uploaded successfully");
            form.reset();
        } catch (err: any) {
            toast.error(err.message || "Failed to upload resume");
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FileText className="text-yellow-500" size={20} />
                    <CardTitle>Update Resume</CardTitle>
                </div>
                <CardDescription>
                    Upload your latest CV (PDF, DOC, or DOCX)
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="media"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem>
                                    <FormLabel>Resume File</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                                                    <p className="mb-2 text-sm text-muted-foreground">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-muted-foreground/60">
                                                        {value instanceof File ? value.name : "PDF, DOC or DOCX (MAX. 5MB)"}
                                                    </p>
                                                </div>
                                                <Input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(event) => {
                                                        const file = event.target.files?.[0];
                                                        onChange(file);
                                                    }}
                                                    {...fieldProps}
                                                />
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Uploading..." : "Upload Resume"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default UploadResumeForm;