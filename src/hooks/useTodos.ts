import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../store/hooks";
import { setTodos } from "../store/slices/todoSlice";
import { fetchTodos } from "../services/todoService";
import { Todo } from "../types/todo";
import { useEffect } from "react";

export const useFetchTodos = () => {
  const dispatch = useAppDispatch();

  const query = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Sync fetched data to Redux store
  useEffect(() => {
    if (query.data) {
      dispatch(setTodos(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};
