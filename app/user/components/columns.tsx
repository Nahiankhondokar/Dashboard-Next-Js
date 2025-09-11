"use client";


import { ColumnDef } from "@tanstack/react-table";
import { useUserStore } from "@/stores/useUserStore";
import { User } from "../type/user";
import ActionButtons from "./ActionButtons";

  

export const Columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionButtons user={row.original} />,
  },
];
