import * as yup from 'yup';
import { Todo } from 'src/db/models/todos';

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  priority: yup.number().integer().min(1).max(3).required(),
  dueDate: yup.date().required(),
});

export const todoValidator = async (todo: Todo) => {
  try {
    const result = await schema.validate(todo);
    return result;
  } catch (error) {
    console.error(error.name);
    console.log(error.errors);
    return false;
  }
};
