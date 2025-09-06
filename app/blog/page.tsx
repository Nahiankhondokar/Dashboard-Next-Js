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
import AddNewBlog from "./components/AddNewBlog";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import EditBlogModal from "./components/EditBlog";
import { BlogDataTable } from "./components/BlogDataTable";

const allData = [
  {
    id: "234sasf",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    image: null,
    // status: true,
  },
  {
    id: "234sdfer",
    title: "Namian",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui ipsam aut atque magnam ut quaerat blanditiis autem? Ad, voluptatibus quam.",
    image: null,
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
              <DialogTrigger asChild>
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
        <BlogDataTable columns={Columns} data={allData} />

        {/* Edit modal */}
        <EditBlogModal />
      </div>
    </div>
  );
};

export default BlogPage;
