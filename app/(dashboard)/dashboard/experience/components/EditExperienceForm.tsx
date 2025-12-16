import React, { useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "../interface/Experience";
import { useExperienceStore } from "@/stores/useExperienceStore";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});

type formSchemaType = z.infer<typeof formSchema>;

const EditSkillForm = ({
  experience,
  closeModal,
}: {
  experience: Experience;
  closeModal: () => void;
}) => {
  // Fix: Select individual properties instead of an objects
  const { updateExperience, loading } = useExperienceStore();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: experience.title,
      description: experience.description ?? "",
      image: null,
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description ?? "");
      if (values.image) {
        formData.append("image", values.image);
      }
      await updateExperience(experience.id, formData);
      closeModal();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Fix: Memoize the reset values to prevent unnecessary resets
  useEffect(() => {
    const resetValues = {
      title: experience.title,
      description: experience.description ?? "",
      image: null,
    };
    
    form.reset(resetValues);
  }, [experience, form]);

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
          
          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Image</FormLabel>
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
          
          {/* Submit */}
          <Button type="submit" variant="outline" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditSkillForm;