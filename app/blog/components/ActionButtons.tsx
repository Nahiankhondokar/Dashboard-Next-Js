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
import { useBlogStore } from "@/stores/useBlogStore";
import Link from "next/link";

const ActionButtons = ({ blog }: { blog: Blog }) => {
  const { openModal } = useBlogStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* Details → navigation (so keep asChild with Link) */}
        <DropdownMenuItem asChild>
          <Link
            href={`/blog/${blog.id}`}
            className="flex items-center w-full font-medium"
          >
            <NotebookTabs className="mr-2 h-4 w-4" />
            Details
          </Link>
        </DropdownMenuItem>

        {/* Edit → just open modal (no navigation) */}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault(); // stop navigation
            e.stopPropagation(); // stop event bubbling to parent row
            openModal(blog); // open your modal
          }}
          className="flex items-center w-full font-medium"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {/* Delete → can later show confirmation modal */}
        <DropdownMenuItem
          onClick={() => console.log("Delete blog", blog.id)}
          className="flex items-center w-full font-medium text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
