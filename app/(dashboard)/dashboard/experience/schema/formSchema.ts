import {z} from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().optional(),
    duration: z.string().optional(),
    position: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    description: z.string().optional(),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Max file size is 2MB",
        })
        .optional()
        .nullable(),
});