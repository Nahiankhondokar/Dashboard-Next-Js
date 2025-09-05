import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotebookTabs, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Blog } from '../interface/Blog';
import { useBlogModal } from '@/stores/useBlogModal';

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(blog.id)}
              className="font-medium"
              asChild
            >
              <NotebookTabs />
              Details
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="font-medium" onClick={() => openModal(blog)} asChild>
               <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium"
              onClick={() => navigator.clipboard.writeText(blog.id)}
              asChild
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
}

export default ActionButtons