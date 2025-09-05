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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogModal } from "@/stores/useBlogModal";

const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  // image: z.instanceof(File).nullable().optional(),
  // status: z.boolean().default(true),
});

type formSchemaType = z.infer<typeof formSchema>;

const EditBlog = () => {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      // image: null,
      // status: true,
    },
  });

  const onSubmit = async (values: formSchemaType) => {
    console.log("Blog submitted:", values);
  };

  const { open, selectedBlog, closeModal } = useBlogModal();

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        {selectedBlog ? (
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
                {/* <FormField
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
          /> */}

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
        ) : (
          <p>No blog selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBlog;
