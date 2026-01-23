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
import { Columns } from "./components/Columns";
import AddNewSkill from "./components/AddNewExperience";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import ExperienceTable  from "./components/ExperienceTable";
import EditSkill from "./components/EditExperience";
import {apiFetch} from "@/lib/api";
import EditExperience from "./components/EditExperience";

const Experience = () => {
  const pathname = usePathname();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Experience List</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add New Experience</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Experience</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a Experience.
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-2" />

              {/* Your Experience form component */}
              <AddNewSkill />
            </DialogContent>
          </Dialog>
        </div>

        {/* Experience Data Table */}
        <ExperienceTable />

        {/* Edit modal */}
        <EditExperience />
      </div>
    </div>
  );
};

export default Experience;
