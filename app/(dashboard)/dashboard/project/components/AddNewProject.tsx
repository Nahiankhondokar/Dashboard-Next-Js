"use client";

import React, {useEffect} from "react";
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
import {useServiceStore} from "@/stores/useServiceStore";
import {useProjectStore} from "@/stores/useProjectStore";
import {toast} from "sonner";
import {Project} from "@/app/(dashboard)/dashboard/project/interface/Project";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.any().nullable().optional(),
  // status: z.boolean().default(true),
});

const mapProjectToForm = (project: Project) => ({
        title : project.title ?? "",
    description : project.description ?? "",
    image : null
})

type formSchemaType = z.infer<typeof formSchema>;

const AddNewProject = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
      // status: true,
    },
  });

    const {
        mode,
        createProject,
        selectedProject,
        updateProject
    } = useProjectStore();

  const onSubmit = async (values: formSchemaType) => {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
          if (v === null || v === undefined) return;

          if (typeof v === "boolean") {
              fd.append(k, v ? "1" : "0"); // or "true"/"false" based on backend
          } else {
              fd.append(k, v);
          }
      });

      try {
          if(mode === 'create'){
              await createProject(fd);
              toast.success("Project is created");
          }else {
              await updateProject(selectedProject!.id, fd);
              toast.success("Project is updated");
          }
      }catch (err: unknown){
          toast.error("Something went wrong");
      }
  };

    useEffect(() => {
        if(mode === 'edit' && selectedProject){
            form.reset(mapProjectToForm(selectedProject));
        }
    }, [mode, selectedProject]);

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


          {/* Image Upload (Optional) */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
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

export default AddNewProject;
