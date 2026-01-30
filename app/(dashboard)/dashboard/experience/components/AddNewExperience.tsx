"use client";

import { useEffect, useRef } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {useExperienceStore} from "@/stores/useExperienceStore";
import {toast} from "sonner";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().optional(),
    duration: z.string().optional(),
    position: z.string().optional(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    description: z.string().optional(),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, {
            message: "Max file size is 2MB",
        })
        .optional()
        .or(z.null()),
});

type formSchemaType = z.infer<typeof formSchema>;

const AddNewExperience = () => {

    const {
        createExperience,
        fetchExperiences,
        mode,
        selectedExperience,
        modalOpen
    } = useExperienceStore();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        company: "",
        duration: "",
        position: "",
        start_date: null,
        end_date: null,
        description: "",
        image: null,
    },
  });

  const onSubmit = async (values: formSchemaType) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
              formData.append(key, value);
          }
      });

      await createExperience(formData);

      toast.success('Experience added');
  };


  return (
    <div>
      <Form {...form}>
        <form
          id="user-form"
          onSubmit={form.handleSubmit(onSubmit)}
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

            {/* Company */}
            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                            <Input placeholder="company" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Position */}
            <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                            <Input placeholder="position" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Duration */}
            <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                            <Input placeholder="duration" {...field} />
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


          {/* Image Upload (Optional) */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] ?? null)
                    }
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
          <Button type="submit" variant="outline" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewExperience
