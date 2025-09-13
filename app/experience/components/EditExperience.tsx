"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSkillStore } from "@/stores/useSkillStore";
import EditExperienceForm from "./EditExperienceForm";
import { useExperienceStore } from "@/stores/useExperienceStore";


const EditExperience = () => {
  const { open, selectedExperience, closeModal } = useExperienceStore();

  console.log(open);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Experience</DialogTitle>
        </DialogHeader>
        {selectedExperience ? (
          <EditExperienceForm experience={selectedExperience} closeModal={closeModal} />
        ) : (
          <p>No experience selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditExperience;
