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
import { SkillDataTable } from "./components/ExperienceDataTable";
import EditSkill from "./components/EditExperience";

const allData = [
  {
    id: 1,
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    image: null,
    // status: true,
  },
  {
    id: 2,
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    image: null,
    // status: true,
  },
];

const Skill = () => {
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
        <SkillDataTable columns={Columns} data={allData} />

        {/* Edit modal */}
        <EditSkill />
      </div>
    </div>
  );
};

export default Skill;
