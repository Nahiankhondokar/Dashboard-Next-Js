"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
import { useBlogModal } from "@/stores/useBlogModal";
import ActionButtons from "./ActionButtons";

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
    cell: ({ row }) => <ActionButtons blog={row.original} />,
  },
];
