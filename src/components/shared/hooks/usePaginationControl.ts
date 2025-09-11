import { useState, useEffect, useMemo, useCallback } from "react";

export interface IPaginationHookProps<T> {
  data: T[];
  itemsPerPage: number;
  resetOnDataChange?: boolean;
}

export interface IPaginationHookResult<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  totalItems: number;
  currentItems: number;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  setCurrentPage: (page: number) => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  startIndex: number;
  endIndex: number;
}

export const usePaginationControl = <T>({
  data,
  itemsPerPage,
  resetOnDataChange = true,
}: IPaginationHookProps<T>): IPaginationHookResult<T> => {
  const [currentPage, setCurrentPage] = useState(0);

  // Reset to first page when data changes
  useEffect(() => {
    if (resetOnDataChange) {
      setCurrentPage(0);
    }
  }, [data, resetOnDataChange]);

  // Calculate pagination values
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = useMemo(
    () => data.slice(startIndex, endIndex),
    [data, startIndex, endIndex]
  );
  const totalItems = data.length;
  const currentItems = paginatedData.length;
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevPage = useCallback(() => {
    if (canGoPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [canGoPrev]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  return {
    currentPage,
    totalPages,
    paginatedData,
    totalItems,
    currentItems,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setCurrentPage,
    canGoNext,
    canGoPrev,
    startIndex,
    endIndex,
  };
};
