"use client";

import React from "react";
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
