"use client";

import React from "react";
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
import {useServiceStore} from "@/stores/useServiceStore";
import {toast} from "sonner";

const formSchema = z.object({
    title: z.string().min(1, "Title field is required"),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    status: z.number().optional(),
    project_link: z.string().optional(),
    image: z.any().nullable().optional(),
});

type formSchemaType = z.infer<typeof formSchema>;

const AddNewBlog = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
        description: "",
        sub_title: "",
        status: 0,
        project_link: "",
        image: null,
    },
  });

  const {
      mode,
      openCreateModal,
      closeModal,
      createService
  } = useServiceStore();

  const onSubmit = async (values: formSchemaType) => {
    const fd = new FormData();
    Object.entries(values).forEach(([k,v]) => {
        if(v !== null && v !== undefined){
            fd.append(k, v);
        }
    })

      try {
          if(mode === 'create'){
              await createService(fd);
              toast.success("Service is created");
          }
      }catch (err: unknown){
          toast.error("Something went wrong");
      }

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

            {/* Sub Title */}
            <FormField
                control={form.control}
                name="sub_title"
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

            {/* Project Link */}
            <FormField
                control={form.control}
                name="project_link"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Project Link</FormLabel>
                        <FormControl>
                            <Input placeholder="project link" {...field} />
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
              {mode === "create" ? "Create" : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewBlog;

// ToDo: service all the finish.
