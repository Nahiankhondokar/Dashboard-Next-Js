import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotebookTabs, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Blog } from "../interface/Blog";
import { useBlogModal } from "@/stores/useBlogModal";
import Link from "next/link";

const ActionButtons = ({ blog }: { blog: Blog }) => {
  const { openModal } = useBlogModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Details */}
        <DropdownMenuItem asChild>
          <Link href={`/blog/${blog.id}`}
          //  onClick={() => navigator.clipboard.writeText(blog.id)}
            className="flex items-center w-full font-medium"
          >
            <NotebookTabs className="mr-2 h-4 w-4" />
            Details
          </Link>
        </DropdownMenuItem>

        {/* Edit */}
        <DropdownMenuItem asChild>
          <button
            onClick={() => openModal(blog)}
            className="flex items-center w-full font-medium"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </button>
        </DropdownMenuItem>

        {/* Delete */}
        <DropdownMenuItem asChild>
          <button
            onClick={() => navigator.clipboard.writeText(blog.id)}
            className="flex items-center w-full font-medium"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
