"use client";

import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory }   from "@/features/categories/hooks/use-open-category";

import { useConfirm } from "@/hooks/use-confirm";
import { Button }     from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

type Props = {
    id: string;      
};

export const Actions = ({ id }: Props) => {
    const [ConfrimDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this Category!"
    )

    const deleteMutation = useDeleteCategory(id);
    const { onOpen } = useOpenCategory();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        };
    };


    return (
        <>
            <ConfrimDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={() => onOpen(id)}
                    >
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={deleteMutation.isPending}
                        onClick={handleDelete}
                    >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )

}