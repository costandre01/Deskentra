import type { ReactNode } from "react";

import ErrorState from "@/components/states/ErrorState";
import LoadingState from "@/components/states/Loading";

interface DetailStateProps<T> {
    isLoading: boolean;
    error: unknown;
    data: T | null | undefined;

    loadingMessage?: string;
    errorMessage?: string;
    notFoundMessage?: string;

    children: (data: T) => ReactNode;
}

export default function DetailState<T>({
    isLoading,
    error,
    data,
    loadingMessage,
    errorMessage = "Something went wrong.",
    notFoundMessage = "Item not found.",
    children,
}: DetailStateProps<T>) {
    if (isLoading) {
        return <LoadingState message={loadingMessage} />;
    }

    if (error) {
        return <ErrorState message={errorMessage} />;
    }

    if (!data) {
        return <ErrorState message={notFoundMessage} />;
    }

    return <>{children(data)}</>;
}