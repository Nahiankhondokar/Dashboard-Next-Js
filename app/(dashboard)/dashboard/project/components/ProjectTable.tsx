"use client";

import { useEffect } from "react";
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
import Pagination from "@/type/pagination/Pagination";
import {useServiceStore} from "@/stores/useServiceStore";
import ConfirmationAlert from "@/components/common/ConfirmationAlert";
import {toast} from "sonner";
import {useProjectStore} from "@/stores/useProjectStore";

export default function ProjectTable() {
    const {
        projects,
        pagination,
        fetchProject,
        loading,
        openEditModal,
        deleteProject
    } = useProjectStore();

    useEffect(() => {
        fetchProject();
    }, []);

    return (
        <>
            <Table>
                <TableCaption>
                    <Separator/>
                    A list of <b>Projects</b>
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Project Link</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Media</TableHead>
                        <TableHead>Created At</TableHead>
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
                    ) : projects.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No data found
                            </TableCell>
                        </TableRow>
                    ) : (
                        projects.map((project, index) => (
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell className="font-medium">
                                    {project.title}
                                </TableCell>
                                <TableCell>{project.project_link ?? "-"}</TableCell>
                                <TableCell>{project.description ?? "-"}</TableCell>
                                <TableCell>{projects.media ?? "-"}</TableCell>
                                <TableCell>{projects.created_at ?? "-"}</TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="outline" onClick={() => openEditModal(project)}>
                                            <Pencil size={16} />
                                        </Button>

                                        {/*Delete*/}
                                        {/*<ConfirmationAlert*/}
                                        {/*    title="Delete experience?"*/}
                                        {/*    description="This experience will be permanently removed."*/}
                                        {/*    confirmText="Delete"*/}
                                        {/*    onConfirm={async () => {*/}
                                        {/*        try {*/}
                                        {/*            await deleteService(service.id);*/}
                                        {/*            toast.success("Experience deleted");*/}
                                        {/*        } catch {*/}
                                        {/*            toast.error("Delete failed");*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    trigger={*/}
                                        {/*        <Button size="icon" variant="destructive">*/}
                                        {/*            <Trash size={16} />*/}
                                        {/*        </Button>*/}
                                        {/*    }*/}
                                        {/*/>*/}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/*Pagination */}
            {pagination && (
                <Pagination
                    meta={pagination}
                    onPageChange={(page) => fetchProject(page)}
                />
            )}
        </>
    );
}
