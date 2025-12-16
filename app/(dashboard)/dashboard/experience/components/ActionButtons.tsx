import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotebookTabs, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Experience } from "../interface/Experience";
import Link from "next/link";
import DeleteAlert from "./DeleteAlert";
import { usePathname } from "next/navigation";
import { useExperienceStore } from "@/stores/useExperienceStore";

const ActionButtons = ({ experience }: { experience: Experience }) => {
  const { openModal, deleteExperience } = useExperienceStore();
  const pathname = usePathname();

  const handleDelete = async ({ blogId }: { blogId: number }) => {
    try {
      await deleteExperience(blogId);
      // you can add a toast here if needed
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

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
            href={`${pathname}/${experience.id}`}
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
            openModal(experience); // open your modal
          }}
          className="flex items-center w-full font-medium"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {/* Delete → confirmation modal */}
        <DeleteAlert
          onConfirm={() => handleDelete({ blogId: experience.id })}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
