"use client";

import { useEffect } from "react";
import { useExperienceStore } from "@/stores/useExperienceStore";
import Pagination from "@/components/common/pagination/Pagination";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function ExperienceTable() {
    const {
        experiences,
        pagination,
        fetchExperiences,
        loading,
        openEditModal
    } = useExperienceStore();

    useEffect(() => {
        fetchExperiences();
    }, []);

    return (
        <>
            <Table>
                <TableCaption>
                    <Separator/>
                    A list of <b>Experiences</b>
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : experiences.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No data found
                            </TableCell>
                        </TableRow>
                    ) : (
                        experiences.map((exp, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell className="font-medium">
                                    {exp.title}
                                </TableCell>
                                <TableCell>{exp.company ?? "-"}</TableCell>
                                <TableCell>{exp.duration ?? "-"}</TableCell>
                                <TableCell>{exp.start_date ?? "-"}</TableCell>
                                <TableCell>{exp.end_date ?? "-"}</TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="outline" onClick={() => openEditModal(exp)}>
                                            <Pencil size={16} />
                                        </Button>
                                        <Button size="icon" variant="destructive">
                                            <Trash size={16} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {pagination && (
                <Pagination
                    meta={pagination}
                    onPageChange={(page) => fetchExperiences(page)}
                />
            )}
        </>
    );
}
