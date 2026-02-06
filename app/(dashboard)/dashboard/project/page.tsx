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
import AddNewProject from "./components/AddNewProject";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import ServiceTable from "@/app/(dashboard)/dashboard/service/components/ServiceTable";
import AddNewService from "@/app/(dashboard)/dashboard/service/components/AddNewService";
import {useProjectStore} from "@/app/(dashboard)/dashboard/project/components/ProjectTable";

const Project = () => {
  const pathname = usePathname();
  const {
    fetchProject,
    loading,
    error,
    openCreateModal,
    modalOpen,
    closeModal,
    mode
  } = useProjectStore();

  return (
      <div>
        <BreadcrumbComponent pathname={pathname} />
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Project</h1>
            <Button  variant={"outline"} onClick={openCreateModal}>Add New</Button>
          </div>

          <ServiceTable />

          <Dialog open={modalOpen} onOpenChange={(v) => !v && closeModal()}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {mode === "create" ? "Add Project" : "Edit Project"}
                </DialogTitle>
              </DialogHeader>

              <AddNewProject />
            </DialogContent>
          </Dialog>
        </>
    </div>
  );
};

export default Project;
