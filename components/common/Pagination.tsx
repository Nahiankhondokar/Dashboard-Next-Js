"use client";

import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconDots,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { Skeleton } from "../ui/skeleton";
import { PaginationType } from "./commonTypes/commonTypes";

type PaginationProps = {
  pagination?: PaginationType;
  fetcher: (page?: number, items?: number, q?: string) => Promise<unknown>;
  loading?: boolean;
  setIsPaginating?: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

const Pagination = ({
  pagination,
  fetcher,
  loading,
  setIsPaginating,
  className,
}: PaginationProps) => {
  if (!pagination) return null;

  const handlePageClick = async (url: string) => {
    const parsedUrl = new URL(url);
    const page = parsedUrl.searchParams.get("page") ?? 1;
    setIsPaginating?.(true);
    fetcher?.(Number(page), 10).finally(() => setIsPaginating?.(false));
  };

  if (loading) return <PaginationSkeleton />;

  const { current_page, last_page, links } = pagination.meta;

  // Function to generate pagination numbers with ellipses
  const getPaginationNumbers = () => {
    const range: (number | string)[] = [];
    const delta = 2; // How many adjacent pages to show
    const left = current_page - delta;
    const right = current_page + delta;

    for (let i = 1; i <= last_page; i++) {
      if (i === 1 || i === last_page || (i >= left && i <= right)) {
        range.push(i);
      } else if (i === left - 1 || i === right + 1) {
        range.push("...");
      }
    }
    return range;
  };

  // return null if the pagination is one page
  // if (pagination?.meta.last_page < 2) return null;

  return (
    <div className={cn("flex justify-between items-center", className)}>
      {/* Pagination Info */}
      <h2 className="capitalize text-[667585] text-xs">
        {current_page} page of {last_page}
      </h2>

      {/* Pagination Controls */}
      <ul className="flex items-center gap-2">
        {/* Previous Button */}
        <li>
          <button
            disabled={current_page === 1}
            onClick={() => handlePageClick(links[current_page - 1]?.url)}
            className={cn(
              " border-[1px] rounded-[8px]  border-[#d0d5dd] flex items-center justify-center w-8 h-8 hover:bg-slate-100 transition-all duration-200 disabled:opacity-50",
              current_page === 1 && "cursor-not-allowed"
            )}
          >
            <IconChevronLeft className="w-4 h-4 " />
          </button>
        </li>

        {/* Page Numbers with Ellipses */}
        {getPaginationNumbers().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="w-8 h-8  flex gap-3 items-center text-xs justify-center text-gray-500">
                <IconDots className="w-5 h-5" />
              </span>
            ) : (
              <button
                onClick={() => handlePageClick(links[page as number]?.url)}
                className={cn(
                  "border-[1px] rounded-[8px] border-[#d0d5dd] flex items-center text-xs justify-center w-8 h-8 hover:bg-slate-100 transition-all duration-200",
                  page === current_page &&
                    "bg-black border-black text-white pointer-events-none"
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            disabled={current_page === last_page}
            onClick={() => handlePageClick(links[current_page + 1]?.url)}
            className={cn(
              "flex items-center border-[1px] rounded-[8px] justify-center w-8 h-8 hover:bg-slate-100 transition-all duration-200 disabled:opacity-50",
              current_page === last_page && "cursor-not-allowed"
            )}
          >
            <IconChevronRight className="w-4 h-4 " />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

const PaginationSkeleton = () => {
  return (
    <div className="flex flex-row justify-between items-center mt-4">
      <h2 className="capitalize text-gray-700 text-sm flex items-center gap-2">
        page <Skeleton className="w-10 h-5" /> of
        <Skeleton className="w-10 h-5" />
      </h2>
      <ul className="flex flex-row items-center border-[1px] border-[#d0d5dd] rounded-[8px]">
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <IconArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <Skeleton className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <Skeleton className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <Skeleton className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <Skeleton className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <Skeleton className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={cn(
              "border-l-[1px] border-[#d0d5dd] flex items-center justify-center w-10 h-10 transition-all duration-200 disabled:cursor-not-allowed"
            )}
          >
            <IconArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </li>
      </ul>
    </div>
  );
};


//  <Pagination
//           fetcher={fetchInvoices}
//           loading={loading}
//           pagination={{ meta, links }}
//           className="mt-7"
//         />