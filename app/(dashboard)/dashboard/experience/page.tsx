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
import { ExperienceDataTable } from "./components/ExperienceDataTable";
import EditSkill from "./components/EditExperience";
import {apiFetch} from "@/lib/api";

const allData = [];

// const allData = apiFetch('experiences', {
//   method : "GET"
// });

const Experience = () => {
  const pathname = usePathname();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Skill List</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add New Skill</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
                <DialogDescription>
                  Fill out the details below to create a new blog.
                </DialogDescription>
              </DialogHeader>

              <Separator className="my-2" />

              {/* Your blog form component */}
              <AddNewSkill />
            </DialogContent>
          </Dialog>
        </div>

        {/* Blog Data Table */}
        <ExperienceDataTable columns={Columns} data={allData} />

        {/* Edit modal */}
        <EditSkill />
      </div>
    </div>
  );
};

export default Experience;
