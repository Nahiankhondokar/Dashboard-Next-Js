"use client";

import BreadcrumbComponent from "@/components/common/Breadcrumb";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddNewExperience from "./components/AddNewExperience";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import ExperienceTable  from "./components/ExperienceTable";
import EditExperience from "./components/EditExperience";
import {useExperienceStore} from "@/stores/useExperienceStore";

const Experience = () => {
  const pathname = usePathname();
  const { modalOpen, openCreateModal, closeModal, mode } =
      useExperienceStore();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <div>
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Experience</h1>
            <Button  variant={"outline"} onClick={openCreateModal}>Add New</Button>
          </div>

          <ExperienceTable />

          <Dialog open={modalOpen} onOpenChange={(v) => !v && closeModal()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {mode === "create" ? "Add Experience" : "Edit Experience"}
                </DialogTitle>
              </DialogHeader>

              <AddNewExperience />
            </DialogContent>
          </Dialog>
        </>

      </div>
    </div>
  );
};

export default Experience;
