import { useMutation, useQuery } from "@apollo/client";
import { VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { ALL_TODOS, DELETE_TODO, UPDATE_TODO } from "../apollo/todos";

import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";

const TodoList = () => {
  const { loading, data, error } = useQuery(ALL_TODOS);
  const [updateTodo, { error: updateError }] = useMutation(UPDATE_TODO);
  const [deleteTodo, { error: deleteError }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter((todo) => todo.__ref !== `Todo:${removeTodo.id}`);
          },
        },
      });
    },
  });

  if (loading) return <Spinner />;
  if (error || updateError || deleteError) return <h2>Error</h2>;

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem onToggleTodo={updateTodo} onDeleteTodo={deleteTodo} key={todo.id} {...todo} />
        ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
