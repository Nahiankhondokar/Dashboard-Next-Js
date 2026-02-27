"use client";

import Image from "next/image";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogHeader
} from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import NoImage from "@/public/assets/img/placeholder.webp";

interface MediaPreviewProps {
    src?: string | null;
    alt?: string;
    className?: string;
}

export default function MediaPreview({ src, alt = "media", className = "h-10 w-10" }: MediaPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Handle fallback logic
    const imageSrc = src && src !== "" ? src : NoImage;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className={`relative group cursor-pointer overflow-hidden rounded-md border bg-muted ${className}`}>
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="text-white w-4 h-4" />
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-none shadow-none">
                <DialogHeader className="sr-only">
                    <DialogTitle>Image Preview</DialogTitle>
                </DialogHeader>
                <div className="relative w-full aspect-square md:aspect-video">
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}