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
import { DataTable } from "@/components/common/DataTable";
import AddNewBlog from "./components/AddNewBlog";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";

const allData = [
  {
    id: "728ed52f",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    // image: "image.png",
    // status: true,
  },
  {
    id: "728ed52f",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    // image: "image.png",
    // status: true,
  },
  {
    id: "728ed52f",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    // image: "image.png",
    // status: true,
  },
  {
    id: "728ed52f",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    // image: "image.png",
    // status: true,
  },
];

const BlogPage = () => {
  const pathname = usePathname();

  return (
    <div>
      <BreadcrumbComponent pathname={pathname} />
      <div>
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">Blog List</h1>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button type="submit" variant="outline" className="w-full">
                  Add New Blog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Blog</DialogTitle>
                  <DialogDescription>
                    Create your dream blog to express your self
                    <Separator />
                    <AddNewBlog />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* User List Show */}
        <DataTable columns={Columns} data={allData} />
      </div>
    </div>
  );
};

export default BlogPage;
