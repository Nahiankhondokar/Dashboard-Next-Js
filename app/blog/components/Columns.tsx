"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import ActionButtons from "./ActionButtons";
import Image from "next/image";
import fallbackImage from "./../../../public/assets/img/fallbackimage.png";

export type User = {
  id: string;
  title: string;
  description: string;
  image: string | null;
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
    cell: ({ row }) => (
      <div className="line-clamp-2">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string | null;

      return image != null ? (
        <Image
          src={image}
          alt="blog"
          width={50}
          height={50}
          className="rounded-md object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-[50px] h-[50px] bg-gray-100 rounded-md">
          <Image src={fallbackImage} alt="" className="text-gray-400 w-5 h-5" />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    id: "actions",
    cell: ({ row }) => <ActionButtons blog={row.original} />,
  },
];
