import { Checkbox, Text, CloseButton, HStack } from "@chakra-ui/react";

const TodoItem = ({ id, title, completed, onToggleTodo, onDeleteTodo }) => {
  return (
    <HStack spacing={3}>
      <Checkbox
        isChecked={completed}
        onChange={() =>
          onToggleTodo({
            variables: {
              id,
              completed: !completed,
            },
          })
        }
      />
      <Text>{title}</Text>
      <CloseButton
        onClick={() =>
          onDeleteTodo({
            variables: { id },
          })
        }
      />
    </HStack>
  );
};

export default TodoItem;
