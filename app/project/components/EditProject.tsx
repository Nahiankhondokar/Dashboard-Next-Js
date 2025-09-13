"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProjectStore } from "@/stores/useProjectStore";
import EditProjectForm from "./EditProjectForm";


const EditProject = () => {
  const { open, selectedProject, closeModal } = useProjectStore();

  console.log(open);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        {selectedProject ? (
          <EditProjectForm project={selectedProject} closeModal={closeModal} />
        ) : (
          <p>No project selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;
