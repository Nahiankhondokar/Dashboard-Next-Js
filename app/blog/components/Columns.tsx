"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Edit,
  MoreHorizontal,
  NotebookTabs,
  Trash,
} from "lucide-react";
import AddNewBlog from "./AddNewBlog";
import EditBlog from "./EditBlog";

export type User = {
  id: string;
  title: string;
  description: string;
  // image: string;
  // status: boolean;
};

export const Columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   accessorKey: "image",
  //   header: "Image",
  // },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="font-medium"
            >
              <NotebookTabs />
              Details
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className="font-medium"
            >
               <Edit /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-medium"
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
