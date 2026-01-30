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
import {formSchema} from "@/app/(dashboard)/dashboard/experience/schema/formSchema";
import {Experience} from "@/app/(dashboard)/dashboard/experience/interface/Experience";

type formSchemaType = z.infer<typeof formSchema>;

const mapExperienceToForm = (exp: Experience): formSchemaType => ({
    title: exp.title ?? "",
    company: exp.company ?? "",
    duration: exp.duration ?? "",
    position: exp.position ?? "",
    start_date: exp.start_date ?? "",
    end_date: exp.end_date ?? "",
    description: exp.description ?? "",
    image: null, // file can't be prefilled
});

const AddNewExperience = () => {

    const {
        mode,
        selectedExperience,
        createExperience,
        updateExperience,
        modalOpen,
        loading,
    } = useExperienceStore();

    const fileRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        company: "",
        duration: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        image: null,
    },
  });

    const onSubmit = async (values: formSchemaType) => {
        const fd = new FormData();
        Object.entries(values).forEach(([k, v]) => {
            if (v !== null && v !== undefined) fd.append(k, v);
        });

        try {
            if (mode === "create") {
                await createExperience(fd);
                toast.success("Experience created");
            } else {
                await updateExperience(selectedExperience!.id, fd);
                toast.success("Experience updated");
            }
        } catch {
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (mode === "edit" && selectedExperience) {
            form.reset(mapExperienceToForm(selectedExperience));
        }

        if (!modalOpen) {
            form.reset();
            if (fileRef.current) fileRef.current.value = "";
        }
    }, [mode, selectedExperience, modalOpen]);

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
            <Button type="submit" disabled={loading} className="w-full">
                {mode === "create" ? "Create" : "Update"}
            </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewExperience
