import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$delete"]({ 
                param: { id },
             });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Catefory Deleted");
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["summary"] });
        },
        onError: () => {
            toast.error("Failed to Delete Categories");
        },
    });

    return mutation;
};