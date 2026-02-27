"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { UploadCloud, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value: File | string | null;
    onChange: (file: File | null) => void;
    onRemove: () => void;
}

export default function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!value) {
            setPreview(null);
            return;
        }
        if (typeof value === "string") {
            setPreview(value);
            return;
        }
        const url = URL.createObjectURL(value);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [value]);

    return (
        <div className="w-full">
            {preview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-muted bg-muted/30">
                    <Image
                        src={preview}
                        alt="Upload preview"
                        fill
                        className="object-contain"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full shadow-lg"
                        onClick={onRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <label className={cn(
                    "relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 transition-all hover:bg-muted/10 hover:border-primary/50",
                )}>
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <div className="mb-3 rounded-full bg-primary/10 p-3 text-primary">
                            <UploadCloud className="h-6 w-6" />
                        </div>
                        <p className="mb-1 text-sm font-medium text-foreground">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            SVG, PNG, JPG or WEBP (MAX. 800x400px)
                        </p>
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                        }}
                    />
                </label>
            )}
        </div>
    );
}