"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, NotebookTabs } from "lucide-react";
import Link from "next/link";
import DeleteAlert from "./DeleteAlert";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "../type/user";

const ActionButtons = ({ user }: { user: User }) => {
  const { deleteUser } = useUserStore();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Details → navigate to dynamic page */}
        <DropdownMenuItem asChild>
          <Link
            href={`/user/${user.id}`}
            className="flex items-center w-full font-medium"
          >
            <NotebookTabs className="mr-2 h-4 w-4" />
            Details
          </Link>
        </DropdownMenuItem>

        {/* Edit → navigate to edit page */}
        <DropdownMenuItem asChild>
          <Link
            href={`/user/${user.id}/edit`}
            className="flex items-center w-full font-medium"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </DropdownMenuItem>

        {/* Delete → confirm first */}
        <DeleteAlert onConfirm={() => deleteUser(user.id)} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionButtons;
