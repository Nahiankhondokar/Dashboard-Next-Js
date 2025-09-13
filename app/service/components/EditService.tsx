"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBlogStore } from "@/stores/useBlogStore";
import EditServiceForm from "./EditServiceForm";


const EditBlog = () => {
  const { open, selectedBlog, closeModal } = useBlogStore();

  console.log(open);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        {selectedBlog ? (
          <EditServiceForm blog={selectedBlog} closeModal={closeModal} />
        ) : (
          <p>No service selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditBlog;
