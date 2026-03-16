"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface StatusToggleProps {
    status: boolean | number | string | undefined;
    id: number;
    updateFn: (id: number, status: boolean) => Promise<void>;
}

export default function StatusUpdateToggle({ status, id, updateFn }: StatusToggleProps) {
    const [loading, setLoading] = useState(false);

    // Convert to boolean just in case the API sends 1/0
    const isActive = Boolean(status);

    const handleToggle = async () => {
        setLoading(true);
        try {
            await updateFn(id, !isActive);
            toast.success(`Status updated to ${!isActive ? "Active" : "Inactive"}`);
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow",
                isActive
                    ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                    : "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20",
                loading && "opacity-70 cursor-not-allowed"
            )}
        >
            {loading ? (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : null}
            {isActive ? "Active" : "Inactive"}
        </button>
    );
}