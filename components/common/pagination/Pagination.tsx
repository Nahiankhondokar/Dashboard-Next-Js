"use client";

import { Button } from "@/components/ui/button";
import {PaginationMeta} from "@/components/common/pagination/PaginationType";

interface Props {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: Props) {
    if (meta.last_page <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
                Showing {meta.from}–{meta.to} of {meta.total}
            </p>

            <div className="flex gap-1">
                {meta.links.map((link, idx) => (
                    <Button
                        key={idx}
                        variant={link.active ? "default" : "outline"}
                        size="sm"
                        disabled={!link.page}
                        onClick={() => link.page && onPageChange(link.page)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
