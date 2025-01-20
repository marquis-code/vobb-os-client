import { useDebounce } from "hooks/useDebounce";
import { useState, useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (metaData, handleParams) => {
  const [currentLimit, setCurrentLimit] = useState(metaData?.pageLimit || 4);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Debounce the loading state to introduce a delay
  const debouncedLoadingMore = useDebounce(loadingMore, 300); // Adjust delay as needed

  // Function to load more tasks by increasing the limit
  const loadMoreTasks = useCallback(() => {
    if (currentLimit < metaData?.totalCount) {
      setLoadingMore(true);
      const newLimit = Math.min(currentLimit + 1, metaData?.totalCount); // Fetch one more task, not exceeding totalCount
      handleParams("limit", newLimit); // Fetch more tasks
      setCurrentLimit(newLimit);
    }
  }, [currentLimit, metaData?.totalCount, handleParams]);

  // Setup IntersectionObserver to detect when reaching the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !debouncedLoadingMore) {
          loadMoreTasks(); // Load more when intersecting
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, loadMoreTasks, debouncedLoadingMore]);

  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
  }, [loadingMore]);

  return { currentLimit, loadingMore, loadMoreRef };
};
