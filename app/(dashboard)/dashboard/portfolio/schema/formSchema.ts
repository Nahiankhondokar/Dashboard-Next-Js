import {z} from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
    project_link: z.string().url().optional(),
    created_at: z.string().optional(),
    media: z.any().nullable().optional(),
});