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
import { useBlogStore } from "@/stores/useBlogStore";
import EditBlogForm from "./EditBlogForm";


const EditBlog = () => {
  const { open, selectedBlog, closeModal } = useBlogStore();

  console.log(open);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>
        {selectedBlog ? (
          <EditBlogForm blog={selectedBlog} closeModal={closeModal} />
        ) : (
          <p>No blog selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBlog;
