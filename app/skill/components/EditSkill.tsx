"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSkillStore } from "@/stores/useSkillStore";
import EditSkillForm from "./EditSkillForm";


const EditSkill = () => {
  const { open, selectedSkill, closeModal } = useSkillStore();

  console.log(open);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        {selectedSkill ? (
          <EditSkillForm skill={selectedSkill} closeModal={closeModal} />
        ) : (
          <p>No skill selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSkill;
